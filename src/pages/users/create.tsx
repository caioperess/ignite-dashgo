import { Input } from "@/components/Form/Input";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useRouter } from "next/router";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "Mínimo 6 caracteres"),
  password_confirmation: yup
    .string()
    .required("Senha obrigatória")
    .oneOf([yup.ref("password")], "Senhas não coincidem"),
});

function CreateUser() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createUser = useMutation(
    async (data: CreateUserFormData) => {
      const response = await api.post("/users", {
        user: {
          ...data,
          created_at: new Date(),
        },
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    }
  );

  const { register, handleSubmit, formState } = useForm<CreateUserFormData>({
    resolver: yupResolver(CreateUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
    await createUser.mutateAsync(data);

    router.push("/users");
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                {...register("name")}
                error={formState.errors.name}
                name="name"
                label="Nome completo"
              />
              <Input
                error={formState.errors.name}
                {...register("email")}
                name="email"
                label="E-mail"
                type="email"
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                error={formState.errors.password}
                {...register("password")}
                name="password"
                label="Senha"
                type="password"
              />
              <Input
                error={formState.errors.password_confirmation}
                {...register("password_confirmation")}
                name="password_confirmation"
                label="Confirmação da senha"
                type="password"
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default CreateUser;
