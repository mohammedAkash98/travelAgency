import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useOwner = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: isOwner, isLoading: isOwnerLoading } = useQuery({
    queryKey: ["owner", user?.email],
    enabled: !!user && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/owner/${user?.email}`);

      return res.data.owner;
    },
  });
  return [isOwner, isOwnerLoading];
};
export default useOwner;
