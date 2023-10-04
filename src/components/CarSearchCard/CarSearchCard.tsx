import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  ListIcon,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { api } from "../../api";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { GrDashboard } from "react-icons/gr";
import { BsFuelPumpFill } from "react-icons/bs";
import { PiSteeringWheelFill } from "react-icons/pi";

export type CardSearchCardProps = api.CarDetails & {
  favorite: ReactNode;
};

/**
 * Search Card Component
 * @param props
 * @returns
 */
export const CardSearchCard: FC<CardSearchCardProps> = ({
  favorite,
  ...props
}) => {
  const {
    brand,
    model,
    launch_year,
    drive,
    fuel_type,
    mileage,
    number_of_seats,
    rent_per_month,
    currency,
  } = props;

  return (
    <Card borderRadius="2xl" bg="gray.100" boxShadow="lg" p={3}>
      <CardBody p={0}>
        <Image
          m="auto"
          src={`https://source.unsplash.com/random/400x300/?${brand}+${model}`}
          fallbackSrc="https://via.placeholder.com/400x300"
          alt="Car Image"
          borderRadius="lg"
        />
        <Stack mt={4} spacing="3">
          <Flex justify="space-between">
            <Heading size="md">
              {brand} {model}
            </Heading>
            <Badge
              borderRadius="lg"
              alignSelf="center"
              border="1px dashed blue"
              lineHeight={1}
              p={1}
            >
              {launch_year}
            </Badge>
          </Flex>

          <UnorderedList
            listStyleType="none"
            display="grid"
            gridTemplateColumns="1fr 1fr"
            alignContent="space-between"
          >
            <ListItem>
              <ListIcon>
                <MdOutlinePeopleAlt />
              </ListIcon>
              {number_of_seats} People
            </ListItem>
            <ListItem>
              <ListIcon>
                <BsFuelPumpFill />
              </ListIcon>
              {fuel_type}
            </ListItem>
            <ListItem>
              <ListIcon>
                <GrDashboard />
              </ListIcon>
              {mileage}
            </ListItem>
            <ListItem>
              <ListIcon>
                <PiSteeringWheelFill />
              </ListIcon>
              {drive}
            </ListItem>
          </UnorderedList>
        </Stack>
      </CardBody>

      <Divider borderColor="gray" my={2} />

      <CardFooter display="flex" p={0}>
        <Text mr="auto" alignSelf="center" fontSize="xl" fontWeight="bold">
          {rent_per_month.toLocaleString("en-IN", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          <Text as="span" fontSize="sm" fontWeight="normal">
            /month
          </Text>
        </Text>

        {favorite}

        <Button colorScheme="blue" size="sm" ml="2">
          Rent now
        </Button>
      </CardFooter>
    </Card>
  );
};
