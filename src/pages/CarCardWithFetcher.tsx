import { FC } from "react";
import {
  CardSearchCard,
  CardSearchCardProps,
} from "../components/CarSearchCard/CarSearchCard";
import { api } from "../api";
import { useFetcher } from "react-router-dom";
import { LikeButton } from "../components/LikeButton/LikeButton";

type FavoriteProps = { car: api.CarDetails; action?: string };

function Favorite({ car }: FavoriteProps) {
  const fetcher = useFetcher();

  const isFavorite = fetcher.data ?? car.isFavorite;
  const isSubmitting = fetcher.state === "submitting";

  return (
    <fetcher.Form method="POST">
      <LikeButton
        isFavorite={isFavorite}
        name="id"
        value={car.id}
        type="submit"
        isLoading={isSubmitting}
      />
    </fetcher.Form>
  );
}

export const CarCardWithFetcher: FC<
  Omit<CardSearchCardProps, "Favorite"> & Pick<FavoriteProps, "action">
> = ({ action, ...props }) => {
  return (
    <CardSearchCard
      {...props}
      favorite={<Favorite action={action} car={props} />}
    />
  );
};
