import { Box, Button, ChakraProps, Flex } from "@chakra-ui/react";
import { SearchField } from "../components/SearchField/SearchField";
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import { Pagination } from "../components/Pagination/Pagination";
import { RootLoaderData } from "./loaders";
import { ChangeEvent } from "react";
import { debounce } from "../utils";
import { AiOutlineHeart, AiFillHome } from "react-icons/ai";

export const Component = () => {
  const data = useLoaderData() as RootLoaderData;

  const commonProps: ChakraProps = {
    position: "fixed",
    left: 0,
    right: 0,
    mx: 4,
    p: 2,
    boxShadow: "xl",
    borderRadius: "xl",
    backdropFilter: "blur(30px)",
  } as const;

  const submit = useSubmit();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    submit(e.target.form);
  }

  const [searchParams, setSearchParams] = useSearchParams();

  const isFavorite = searchParams.get("favorite") === "true";

  function toggleFavorite() {
    setSearchParams((prev) => {
      return {
        ...Object.fromEntries(prev.entries()),
        favorite: prev.get("favorite") !== "true" ? "true" : "false",
      };
    });
  }

  return (
    <Flex direction="column" h="100svh" p={4} bg="gray.200">
      <Flex as="header" zIndex={1} gap={4} {...commonProps}>
        <Button
          size="sm"
          as={NavLink}
          to="/"
          title="Home"
          alignSelf="center"
          colorScheme="blue"
          variant="ghost"
        >
          <AiFillHome />
        </Button>

        <Box as="form">
          <SearchField
            containerProps={{ maxW: "calc(20rem + 10vw)" }}
            defaultValue={searchParams.get("q") ?? ""}
            onChange={debounce(handleChange, 250)}
            name="q"
          />
          <input type="hidden" name="page" value="1" />
        </Box>

        <Button
          size="sm"
          onClick={toggleFavorite}
          title="toggle favorites"
          alignSelf="center"
          ml="auto"
          colorScheme="blue"
          variant={isFavorite ? "solid" : "outline"}
          leftIcon={<AiOutlineHeart />}
        >
          Favorites
        </Button>
      </Flex>

      <Outlet />

      <Box as="footer" mb={4} bottom={0} {...commonProps}>
        <Pagination page_count={data.page_count} />
      </Box>
    </Flex>
  );
};
