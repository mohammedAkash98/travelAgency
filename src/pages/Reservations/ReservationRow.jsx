const ReservationRow = ({ singleData, index, handleDelete }) => {
  const { _id, hotelName, price, reservedDate, status } = singleData;
  return (
    <tr className={status === "approved" ? "bg-[#ddebff]" : ""}>
      <th>{index + 1}</th>
      <td>{hotelName}</td>
      <td>${price}</td>
      <td>{reservedDate}</td>
      <td>{status}</td>
      <th className="space-x-2 space-y-1">
        <button
          onClick={() => handleDelete(_id)}
          disabled={status !== "pending"}
          className="btn bg-[#003276] btn-xs text-white hover:text-black"
        >
          cancel
        </button>
      </th>
    </tr>
  );
};

export default ReservationRow;
