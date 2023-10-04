import {
  Box,
  Button,
  ChakraProps,
  Flex,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { SearchField } from "../components/SearchField/SearchField";
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import { Pagination } from "../components/Pagination/Pagination";
import { RootLoaderData } from "./loaders";
import { ChangeEvent, useEffect } from "react";
import { debounce } from "../utils";
import { AiFillHome } from "react-icons/ai";

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

  const handleInputChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData(e.target.form!);

    console.log(formData.get("favorite"));
    // const favorite = formData.get("favorite") === "true";

    // formData.set("favorite", (!favorite).toString());
    submit(formData);
  }, 250);

  const [searchParams] = useSearchParams();

  const isFavorite = searchParams.has("favorite");
  const q = searchParams.get("q") ?? "";

  useEffect(() => {
    const input = document.querySelector(
      'input[name="q"]'
    ) as HTMLInputElement | null;
    if (input) input.value = q;
  }, [q]);

  return (
    <Flex direction="column" h="100svh" p={4} bg="gray.200">
      <Flex as="header" zIndex={1} gap={4} {...commonProps} flexWrap="wrap">
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

        <Box as={Form} display="flex" flex="1">
          <SearchField
            containerProps={{ maxW: "calc(20rem + 10vw)" }}
            defaultValue={searchParams.get("q") ?? ""}
            onChange={handleInputChange}
            name="q"
            aria-label="Search Query"
          />
          <input type="hidden" name="page" value="1" />

          <FormControl
            display="flex"
            alignItems="center"
            gap={1}
            justifyContent="end"
          >
            <FormLabel htmlFor="favorite" m={0}>
              Favorite
            </FormLabel>
            <Switch
              id="favorite"
              defaultChecked={isFavorite}
              name="favorite"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const formData = new FormData(e.target.form!);
                console.log(formData.get("favorite"));

                formData.set("q", "");
                formData.set("page", "1");

                void submit(formData);
              }}
            />
          </FormControl>
        </Box>
      </Flex>

      <Outlet />

      <Box as="footer" mb={4} bottom={0} {...commonProps}>
        <Pagination page_count={data.page_count} />
      </Box>
    </Flex>
  );
};
