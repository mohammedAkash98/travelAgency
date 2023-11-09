const HotelCard = ({ hotel }) => {
  const { photoURL, hotelName, city, totalNumberOfGuest, roomDescription } = hotel;
  return (
    <div className="overflow-hidden rounded-lg border border-[#003276] relative gallery-card text-white">
      {/* Card Image Background */}
      <img
        className="object-cover w-full h-full rounded-lg"
        src={photoURL}
        alt="Hotel"
      />
      {/* Card Texts */}
      <div className="w-full h-full absolute top-0 bg-[#0031768a] gallery-body p-4 rounded-xl space-y-3 flex flex-col justify-center">
        <h2 className="lg:text-2xl font-bold uppercase">{hotelName}</h2>
        <p className="text-sm lg:text-base">City: {city}</p>
        <p className="text-sm lg:text-base">Total Guests: {totalNumberOfGuest}</p>
        <p className="text-sm lg:text-base">{roomDescription}</p>
      </div>
    </div>
  );
};

export default HotelCard;
