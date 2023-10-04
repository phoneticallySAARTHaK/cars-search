import { SearchIcon } from "@chakra-ui/icons";
import {
  ChakraProps,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { FC } from "react";

export type SearchFieldProps = {
  containerProps?: ChakraProps;
} & InputProps;

/**
 *
 * Search Field
 * @param props - InputProps
 * @param props.containerProps - Props passed to the container
 * @returns
 */
export const SearchField: FC<SearchFieldProps> = ({
  containerProps,
  ...props
}) => {
  return (
    <InputGroup {...containerProps}>
      <Input
        type="search"
        borderRadius="3xl"
        variant="filled"
        backgroundColor="gray.50 !important"
        {...props}
      />
      <InputRightElement>
        <SearchIcon />
      </InputRightElement>
    </InputGroup>
  );
};
