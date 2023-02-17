import {
  Flex,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Button,
  Stack,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        variant="filled"
        name={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        _hover={{
          bgColor: "gray.900",
        }}
        size="lg"
        {...rest}
      />
    </FormControl>
  );
}
