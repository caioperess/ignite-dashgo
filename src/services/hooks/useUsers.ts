import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersResponse = {
  totalCount: number;
  users: User[];
};

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data } = await api.get("/users", {
    params: {
      page,
    },
  });

  const users = data.data.models.map((user: User) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return {
    totalCount: Number(data.meta.totalCount),
    users,
  };
}

export function useUsers(page: number) {
  return useQuery({
    queryKey: ["users", page],
    staleTime: 1000 * 60 * 10, // 10 minutes
    queryFn: () => getUsers(page),
  });
}
