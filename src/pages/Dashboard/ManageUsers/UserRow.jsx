const UserRow = ({ user, index, handleMakeAdmin, handleMakeOwner }) => {
  const isAdmin = user.role === "admin";
  const isOwner = user.role === "owner";
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <th className="space-x-2 space-y-1">
        <button
          disabled={isAdmin}
          onClick={() => handleMakeAdmin(user)}
          className="btn bg-[#003276] btn-xs text-white hover:text-black"
        >
          make admin
        </button>
        <button
          disabled={isOwner}
          onClick={() => handleMakeOwner(user)}
          className="btn bg-[#003276] btn-xs text-white hover:text-black"
        >
          make owner
        </button>
      </th>
    </tr>
  );
};

export default UserRow;
