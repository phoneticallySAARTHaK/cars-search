/// <reference lib="webworker" />
import { clientsClaim } from "workbox-core";
import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { matchPrecache } from "workbox-precaching";
import { Strategy } from "workbox-strategies";
import { api } from "./api";

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell.
// https://developer.chrome.com/docs/workbox/modules/workbox-routing/#how-to-register-a-navigation-route
registerRoute(
  new NavigationRoute(createHandlerBoundToURL("/index.html"), {
    denylist: [/\/docs*/],
  })
);

self.addEventListener("message", async (event) => {
  const data = event.data;
  if (!data) return;

  switch (data.type) {
    case "SKIP_WAITING":
      self.skipWaiting();
      break;
  }
});

self.addEventListener("activate", (e) => e.waitUntil(init()));

async function init() {
  const request = indexedDB.open("db");

  request.onblocked = (e) => {
    console.error("init blocked");
    (e.target as IDBOpenDBRequest).result?.close();
  };

  request.onupgradeneeded = () => {
    const db = request.result;

    db.onerror = (e) => console.error("Init db error ", e);

    db.createObjectStore("cars", {
      keyPath: "id",
    }).transaction.commit();
  };

  request.onsuccess = async () => {
    const db = request.result;
    const transaction = db.transaction("cars", "readonly");

    const req = transaction.objectStore("cars").getAll();

    const [newData, storedData] = await Promise.all([
      matchPrecache("/cars.json").then((res) => {
        if (!res) {
          throw res;
        }
        return res.json();
      }) as Promise<Omit<api.CarDetails[], "isFavorite">>,
      new Promise<api.CarDetails[]>((r) => {
        req.onsuccess = () => {
          r(req.result);
        };
      }),
    ] as const).catch((e) => (console.error("Some error occuered", e), []));

    req.onerror = (e) => {
      console.log("transaction errror", e);
    };

    const storedDataMap = new Map(
      storedData.map(({ id, ...data }) => [id, data])
    );

    const newDataMap = new Map(newData.map(({ id, ...data }) => [id, data]));

    const writeTranscation = db.transaction("cars", "readwrite");
    newData.forEach(
      (data) =>
        void writeTranscation.objectStore("cars").put({
          ...data,
          isFavorite: Boolean(storedDataMap.get(data.id)?.isFavorite),
        })
    );

    storedData
      .filter((data) => {
        !newDataMap.has(data.id);
      })
      .forEach(
        (data) => void writeTranscation.objectStore("cars").delete(data.id)
      );

    writeTranscation.commit();
    db.close();
  };
}

class IDBRead extends Strategy {
  protected async _handle(request: Request): Promise<Response | undefined> {
    const url = new URL(request.url);
    const isFavorite = url.searchParams.has("favorite");
    const q = (url.searchParams.get("q") ?? "").toLowerCase();
    const page = parseInt(url.searchParams.get("page") ?? "1") - 1;

    let offest = page < 0 ? 0 : page * 6;
    const results: api.CarDetails[] = [];

    return new Response(
      JSON.stringify(
        await new Promise<api.CarDetails[]>((res) => {
          const req = indexedDB.open("db");
          req.onsuccess = () => {
            const db = req.result;
            const transaction = db.transaction("cars", "readonly");
            const objectStore = transaction.objectStore("cars");
            const cursorReq = objectStore.openCursor();

            cursorReq.onsuccess = () => {
              const cursor = cursorReq.result;

              if (!cursor || results.length === 6) {
                res(results);
                transaction.commit();
                return;
              }

              const value = cursor.value as api.CarDetails;

              let matches = `${value.brand}${value.model}`
                .toLowerCase()
                .includes(q);

              if (isFavorite) {
                matches = matches && value.isFavorite;
              }

              if (!matches) {
                cursor.continue();
                return;
              }

              if (offest !== 0) {
                cursor.continue();
                offest -= 1;
                return;
              }

              results.push(value);
              cursor.continue();
            };
          };

          req.onerror = (e) => {
            console.log("open error", e);
          };
        })
      ),
      {
        headers: [["Content-Type", "application/json"]],
      }
    );
  }
}

const apiRouteMatcher: Parameters<typeof registerRoute>[0] = ({ url }) =>
  url.pathname === "/api";

registerRoute(apiRouteMatcher, new IDBRead());

class IDBWrite extends Strategy {
  protected async _handle(request: Request): Promise<Response | undefined> {
    const data = await request.json();
    const id = data.id ?? "";

    return new Response(
      JSON.stringify(
        await new Promise((res) => {
          const req = indexedDB.open("db");
          req.onerror = (e) => console.log("IDB error", e);

          req.onsuccess = () => {
            const db = req.result;
            const transaction = db.transaction("cars", "readwrite");
            const objectStore = transaction.objectStore("cars");
            const readReq = objectStore.get(id);

            readReq.onerror = (e) => console.log("read error", e);

            readReq.onsuccess = () => {
              const value = readReq.result as api.CarDetails;

              if (!value) return res(false);
              const writeReq = objectStore.put({
                ...value,
                isFavorite: !value.isFavorite,
              });
              writeReq.onsuccess = () => res(!value.isFavorite);
              writeReq.onerror = (e) => console.log("write error", e);
            };
          };
        })
      )
    );
  }
}

registerRoute(apiRouteMatcher, new IDBWrite(), "POST");
