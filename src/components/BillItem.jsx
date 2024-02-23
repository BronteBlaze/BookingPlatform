const BillItem = ({ billDetails }) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    device,
    duration,
    dateOfBooking,
    bookingId,
    startTime,
    endTime,
    bookPrice,
  } = billDetails;
  let fullName = firstName + " " + lastName;
  return (
    <div className="bg-white py-6 px-12 text-gray-700 xl:mx-56 lg:mx-24">
      <div>
        <div className="md:flex justify-between items-center">
          <div className="text-4xl font-medium">
            <h2>INVOICE</h2>
          </div>
          <div className="underline italic">
            <h2>Gaming Launge</h2>
          </div>
        </div>
        <div className="mt-6 border-b border-gray-300 py-2 font-bold">
          <h3>User Info</h3>
        </div>
        <div className="mt-2">
          <div className="grid md:grid-cols-5">
            <span className="font-medium">Name:</span>
            <span className="md:px-4">{fullName}</span>
          </div>
          <div className="grid md:grid-cols-5 py-2">
            <span className="font-medium">Username:</span>
            <span className="md:px-4">{userName}</span>
          </div>
          <div className="grid md:grid-cols-5">
            <span className="font-medium">Email:</span>
            <span className="md:px-4">{email}</span>
          </div>
        </div>
        <div className="mt-6 border-b border-gray-300 py-2 font-bold">
          <h3>Booking Info</h3>
        </div>
        <div className="mt-2">
          <div className="grid md:grid-cols-5">
            <span className="font-medium">Booking Id: </span>
            <span className="md:px-4">{bookingId}</span>
          </div>
          <div className="grid md:grid-cols-5 py-2">
            <span className="font-medium">Device: </span>
            <span className="md:px-4">{device}</span>
          </div>
          <div className="grid md:grid-cols-5">
            <span className="font-medium">Duration: </span>
            <span className="md:px-4">{duration}</span>
          </div>
          <div className="grid md:grid-cols-5 py-2">
            <span className="font-medium">Date of Booking: </span>
            <span className="md:px-4">{dateOfBooking}</span>
          </div>
          <div className="grid md:grid-cols-5">
            <span className="font-medium">Start Time: </span>
            <span className="md:px-4">{startTime}</span>
          </div>
          <div className="grid md:grid-cols-5 py-3">
            <span className="font-medium">End Time: </span>
            <span className="md:px-4">{endTime}</span>
          </div>
        </div>
        <div className="py-3 text-right border-t border-gray-300">
          <span className="text-2xl">
            Total Rs. <span className="font-bold">{bookPrice}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BillItem;
