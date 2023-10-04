import { useLoaderData } from "react-router-dom";
import { CardSearchCardProps } from "../components/CarSearchCard/CarSearchCard";
import { Grid } from "@chakra-ui/react";
import { CarCardWithFetcher } from "./CarCardWithFetcher";

export const Component = () => {
  const data = useLoaderData() as CardSearchCardProps[];

  const gap = "1.5rem";
  const minW = "400px";
  const maxCols = 3;

  const templateColumns = `repeat(auto-fit, minmax(${minW}, calc((100% - ${
    maxCols - 1
  } * ${gap}) / ${maxCols})))`;

  return (
    <Grid
      templateColumns={templateColumns}
      gap={gap}
      p={6}
      py={20}
      justifyContent="center"
      justifyItems="center"
      overflowY="auto"
    >
      {data.map((car) => (
        <CarCardWithFetcher key={car.id} {...car} />
      ))}
    </Grid>
  );
};
