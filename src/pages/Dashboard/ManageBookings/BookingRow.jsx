import useAdmin from "../../../hooks/useAdmin";

const BookingRow = ({
  singleBooking,
  index,
  handleApprove,
  handleDeny,
  handleDelete,
}) => {
  const { _id, hotelName, price, reservedDate, status } = singleBooking;
  const [isAdmin] = useAdmin();

  return (
    <tr className={status === "approved" ? "bg-[#ddebff]" : ""}>
      <th>{index + 1}</th>
      <td>{hotelName}</td>
      <td>$ {price}</td>
      <td>{reservedDate}</td>
      <td>{status}</td>
      <th className="space-x-2 space-y-1">
        {isAdmin ? (
          <>
            <button
              onClick={() => handleDelete(_id)}
              className="btn bg-[#003276] btn-xs text-white hover:text-black"
            >
              delete
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleApprove(_id)}
              disabled={status !== "pending"}
              className="btn bg-[#003276] btn-xs text-white hover:text-black"
            >
              approve
            </button>
            <button
              onClick={() => handleDeny(_id)}
              disabled={status !== "pending"}
              className="btn bg-[#003276] btn-xs text-white hover:text-black"
            >
              deny
            </button>
          </>
        )}
      </th>
    </tr>
  );
};

export default BookingRow;
