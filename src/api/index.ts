export namespace api {
  export type CarDetails = {
    id: number;
    brand: string;
    model: string;
    launch_year: number;
    number_of_seats: number;
    fuel_type: string;
    mileage: string;
    drive: string;
    rent_per_month: number;
    currency: string;
    isFavorite: boolean;
  };

  export function fetchCars(
    q: string,
    page: string,
    isFavorite?: "true" | "false"
  ) {
    return fetch(
      `/api?q=${q ?? ""}&page=${page ?? 1}&favorite=${isFavorite ?? "false"}`
    ).then((r) => r.json());
  }

  export async function fetchPageCount(url: URL) {
    url;
    return 10;
  }

  export async function toggleFavorite(id: string) {
    const res = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({ id: parseInt(id) }),
      headers: [["Content-Type", "application/json"]],
    }).then((r) => r.json());

    return res;
  }
}
