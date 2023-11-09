import { Link } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const RoomRow = ({
  singleRoom,
  index,
  handleApprove,
  handleDeny,
  handleDeleteRoom,
}) => {
  const { _id, photoURL, hotelName, maxPeople, hotelType, city, status } =
    singleRoom;
  const [isAdmin] = useAdmin();

  return (
    <tr className={status === "approved" ? "bg-[#ddebff]" : ""}>
      <th>{index + 1}</th>
      <td>
        <div className="block lg:flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={photoURL} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{hotelName}</div>
            <div className="text-sm opacity-50">
              Max People: <span className="font-semibold">{maxPeople}</span>
            </div>
          </div>
        </div>
      </td>
      <td>{hotelType}</td>
      <td>{city}</td>
      <td>{status}</td>
      <th className="space-x-2 space-y-1">
        {isAdmin ? (
          <>
            <button
              disabled={status === "approved"}
              onClick={() => handleApprove(_id)}
              className="btn bg-[#003276] btn-xs text-white hover:text-black"
            >
              approve
            </button>
            <button
              disabled={status === "denied"}
              onClick={() => handleDeny(_id)}
              className="btn bg-[#003276] btn-xs text-white hover:text-black"
            >
              deny
            </button>
          </>
        ) : status !== "pending" ? (
          <>
            <button
              disabled={true}
              className="btn bg-[#003276] btn-xs text-white hover:text-black"
            >
              edit
            </button>
            <button
              disabled={true}
              className="btn bg-[#003276] btn-xs text-white hover:text-black"
            >
              delete
            </button>
          </>
        ) : (
          <>
            <Link to={`/dashboard/update-room/${_id}`}>
              <button className="btn bg-[#003276] btn-xs text-white hover:text-black">
                edit
              </button>
            </Link>
            <button
              onClick={() => handleDeleteRoom(_id)}
              className="btn bg-[#003276] btn-xs text-white hover:text-black"
            >
              delete
            </button>
          </>
        )}
      </th>
    </tr>
  );
};

export default RoomRow;
