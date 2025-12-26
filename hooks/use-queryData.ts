import {
  Enabled,
  QueryFunction,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";

export const useQueryData = async (
  queryKey: QueryKey,
  queryFn: QueryFunction,
  enabled?: Enabled
) => {
  const { data, isPending, isFetched, refetch, isFetching } = useQuery({
    queryKey,
    queryFn,
    enabled,
  });

  return { data, isPending, isFetched, isFetching, refetch };
};
