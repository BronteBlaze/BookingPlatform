import { useSelector } from "react-redux";
import BillItem from "../../components/BillItem";
import { FaBars } from "react-icons/fa";
import { getBill } from "../../redux/AdminSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const BillingPage = ({ setShowNav }) => {
  const navigate = useNavigate();
  const billDetails = useSelector(getBill);
  console.log(billDetails);

  useEffect(() => {
    if (!billDetails.bookingId) {
      navigate("/admin/bookings");
    }
  }, [billDetails, navigate]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      <div
        className="text-3xl text-fuchsia-700 pb-10"
        onClick={() => {
          setShowNav((prevNav) => !prevNav);
        }}
      >
        <button>
          <FaBars />
        </button>
      </div>
      <div>
        {billDetails.bookingId && <BillItem billDetails={billDetails} />}
      </div>
    </section>
  );
};

export default BillingPage;
