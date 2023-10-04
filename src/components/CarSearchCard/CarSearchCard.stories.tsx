import type { Meta, StoryObj } from "@storybook/react";
import { CardSearchCard } from "./CarSearchCard";
import { LikeButton } from "../LikeButton/LikeButton";

const meta = {
  component: CardSearchCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof CardSearchCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isFavorite: false,
    favorite: <LikeButton />,
    brand: "Maruti",
    model: "800",
    drive: "manual",
    fuel_type: "petrol",
    id: 1,
    launch_year: 2012,
    mileage: "200",
    number_of_seats: 4,
    rent_per_month: 400,
    currency: "INR",
  },
};
