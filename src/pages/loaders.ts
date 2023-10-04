import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "react-router-dom";
import { api } from "../api";

export type RootLoaderData = { page_count: number };
export async function rootLoader({
  request,
}: LoaderFunctionArgs): Promise<RootLoaderData | Response> {
  const url = new URL(request.url);

  const hasPageParam = url.searchParams.has("page");
  const hasQueryParam = url.searchParams.has("q");

  if (!hasPageParam || !hasQueryParam) {
    const newUrl = new URL(url);
    if (!hasPageParam) newUrl.searchParams.set("page", "1");
    if (!hasQueryParam) newUrl.searchParams.set("q", "");

    return redirect(newUrl.toString());
  }

  return {
    page_count: await api.fetchPageCount(url),
  };
}

export async function resultLoader({
  request,
}: LoaderFunctionArgs): Promise<api.CarDetails[]> {
  const url = new URL(request.url);
  const isFavorite = url.searchParams.has("favorite");

  const res = await api.fetchCars(
    url.searchParams.get("q") ?? "",
    url.searchParams.get("page") ?? "1",
    isFavorite
  );

  if (!res || !Array.isArray(res) || !res.length)
    throw "No data available on this page.";

  return res;
}

export async function resultAction({
  request,
}: ActionFunctionArgs): Promise<unknown> {
  return api.toggleFavorite(
    ((await request.formData()).get("id") ?? "0") as string
  );
}
