import { AiOutlineCheckCircle } from "react-icons/ai";
import useAdmin from "../../hooks/useAdmin";
import useOwner from "../../hooks/useOwner";

const ResultCard = ({ room, handleReserve }) => {
  const {
    photoURL,
    hotelName,
    hotelType,
    address,
    price,
    roomDescription,
    totalNumberOfGuest,
  } = room;
  const [isAdmin] = useAdmin();
  const [isOwner] = useOwner();

  const noReserve = isAdmin || isOwner;
  return (
    <div className="card bg-base-100 shadow-xl border">
      <figure>
        <img src={photoURL} alt="Shoes" />
      </figure>
      <div className="card-body">
        <div className="lg:flex block justify-between space-y-1">
          <h2 className="card-title">{hotelName}</h2>
          <div className="badge badge-lg bg-[#003276] text-white p-3">
            $ {price}
          </div>
        </div>
        <p>{roomDescription}</p>
        <p>{address}</p>
        <p>Type: {hotelType}</p>
        <div className="badge badge-lg bg-[#003276] text-white p-3">
          Total Guests: {totalNumberOfGuest}
        </div>
        <div className="card-actions justify-end">
          <button
            disabled={noReserve}
            onClick={() => handleReserve(room)}
            className={
              noReserve
                ? "px-5 lg:px-10 py-3 bg-[#003276] rounded-md text-white font-semibold flex gap-2 items-center justify-center line-through"
                : "px-5 lg:px-10 py-3 bg-[#003276] rounded-md text-white font-semibold flex gap-2 items-center justify-center transition ease-in-out delay-150 hover:scale-95 hover:bg-[#042656] duration-300"
            }
          >
            <AiOutlineCheckCircle className="text-2xl" />
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
