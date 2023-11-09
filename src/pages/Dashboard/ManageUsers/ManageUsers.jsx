import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UserRow from "./UserRow";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });
  //   Handling Admin
  const handleMakeAdmin = (user) => {
    fetch(`https://travel-stay-server.vercel.app/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin now.`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
  };
  //   Handling Owner
  const handleMakeOwner = (user) => {
    const owner = {
      name: user.name,
      image: user.photo,
      email: user.email,
    };
    fetch(`https://travel-stay-server.vercel.app/users/owner/${user._id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(owner),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Owner now.`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
  };
  return (
    <div className="mt-20 text-center lg:mt-10">
      <Helmet>
        <title>Manage Users | Travel Stay</title>
      </Helmet>
      <h3 className="text-2xl font-semibold lg:text-3xl">Manage Users</h3>
      <div className="mt-10 lg:w-3/4 lg:mx-auto mx-10">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No.</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Role</th>
                <th>Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <UserRow
                  key={user._id}
                  user={user}
                  index={index}
                  handleMakeAdmin={handleMakeAdmin}
                  handleMakeOwner={handleMakeOwner}
                ></UserRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
