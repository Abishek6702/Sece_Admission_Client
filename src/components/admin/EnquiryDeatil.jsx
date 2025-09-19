import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Check,
  ChevronRight,
  ClipboardList,
  Home,
  Layout,
  LayoutDashboard,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

export default function EnquiryDetail() {
  const { id } = useParams();
  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/enquiries/${id}`)
      .then((res) => res.json())
      .then(setEnquiry)
      .catch(console.error);
  }, [id]);

  if (!enquiry) return <div>Loading...</div>;

  const address = enquiry.address || {};
  const changeStatus = async (newStatus) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/enquiries/${
          enquiry._id
        }/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      const data = await res.json();

      toast.success("Status Updated Sucessfully");
      setEnquiry((prev) => ({ ...prev, status: data.status }));
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  return (
    <div className=" max-w-6xl ">
      {/* Breadcrumb */}
      <div className="flex mb-4 items-center justify-between">
        <nav className="flex items-center gap-2 text-gray-600 rounded-md px-4 py-2   w-fit">
          <Link to="/admin" className="flex items-center gap-1">
            <LayoutDashboard className="w-5" />
            Dashboard
          </Link>
          <ChevronRight />
          <Link to="/admin/enquiry_list" className="flex items-center gap-1">
            <ClipboardList className="w-5" />
            Enquiry List
          </Link>
          <ChevronRight />
          <span className="font-semibold text-[#0B56A4] ">
            {enquiry.studentName}
          </span>
        </nav>
        <div className="flex items-center gap-4">
          {enquiry.status === "Pending" && (
            <>
              <button
                onClick={() => changeStatus("Selected")}
                className="p-1 rounded-lg px-2 gap-1 flex items-center bg-green-100 text-green-600 hover:bg-green-200 cursor-pointer"
                title="Approve"
              >
                <Check size={20} />
                Approve
              </button>
              <button
                onClick={() => changeStatus("Rejected")}
                className="p-1 flex items-center gap-1 px-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 cursor-pointer"
                title="Reject"
              >
                <X size={20} />
                Reject
              </button>
            </>
          )}
        </div>
      </div>

      {/* <h1 className="text-3xl font-bold mb-8">{enquiry.studentName}</h1> */}

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {/* Personal Details */}
        <section className="bg-white px-5 py-3 shadow rounded-lg">
          <h2 className="text-xl font-semibold  text-[#0B56A4] mb-1 playfair">
            Personal Details
          </h2>
          <div className="border-b border-gray-300 mb-4"></div>
          <dl className="grid grid-cols-4 gap-x-6 gap-y-3 text-sm">
            <dt className="font-medium">Full Name:</dt>
            <dd>{enquiry.studentName}</dd>

            <dt className="font-medium">Date of Birth:</dt>
            <dd>
              {enquiry.dob ? new Date(enquiry.dob).toLocaleDateString() : "-"}
            </dd>

            <dt className="font-medium">Gender:</dt>
            <dd>{enquiry.gender}</dd>

            <dt className="font-medium">Community:</dt>
            <dd>{enquiry.community}</dd>

            <dt className="font-medium">Father's Name:</dt>
            <dd>{enquiry.fatherName}</dd>

            <dt className="font-medium">Mother's Name:</dt>
            <dd>{enquiry.motherName}</dd>

            

            <dt className="font-medium">Phone Number:</dt>
            <dd>{enquiry.studentMobile}</dd>

            <dt className="font-medium">Email:</dt>
            <dd>{enquiry.studentEmail}</dd>
            <dt className="font-medium">Address:</dt>
            <dd>
              {address.doorNo}, {address.street}, {address.taluk},{" "}
              {address.district}, {address.state} - {address.pincode}
            </dd>
          </dl>
        </section>

        {/* Academic Details */}
        <section className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold text-[#0B56A4] playfair mb-1">
            Academic Details
          </h2>
          <div className="border-b border-gray-300 mb-4"></div>

          <dl className="grid grid-cols-4 gap-x-6 gap-y-3 text-sm">
            <dt className="font-medium">Course Required:</dt>
            <dd>{enquiry.courseRequired?.join(", ")}</dd>

            <dt className="font-medium">First Graduate:</dt>
            <dd>{enquiry.isFirstGraduate ? "Yes" : "No"}</dd>

            <dt className="font-medium">Cut Off:</dt>
            <dd>{enquiry.twelfthMarks?.cutOff}</dd>

            <dt className="font-medium">Twelfth School Name:</dt>
            <dd>{enquiry.twelfthSchoolName}</dd>

            <dt className="font-medium">Twelfth School Board:</dt>
            <dd>{enquiry.twelfthSchoolBoard}</dd>

            <dt className="font-medium">Twelfth Register No:</dt>
            <dd>{enquiry.twelfthRegisterNo}</dd>

            <dt className="font-medium">Tenth School Board:</dt>
            <dd>{enquiry.tenthSchoolBoard}</dd>

            <dt className="font-medium">Date of Visit:</dt>
            <dd>
              {enquiry.dateOfVisit
                ? new Date(enquiry.dateOfVisit).toLocaleDateString()
                : "-"}
            </dd>

            <dt className="font-medium">Status:</dt>
            <dd>
              <div className="inline-flex items-center space-x-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium
        ${enquiry.status === "Pending" ? "bg-yellow-100 text-yellow-600" : ""}
        ${enquiry.status === "Selected" ? "bg-green-100 text-green-600" : ""}
        ${enquiry.status === "Rejected" ? "bg-red-100 text-red-600" : ""}`}
                >
                  {enquiry.status}
                </span>
              </div>
            </dd>
          </dl>
        </section>

        {/* Family Contact Details */}
        <section className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold text-[#0B56A4] mb-1 playfair">
            Family Contact Details
          </h2>
          <div className="border-b border-gray-300 mb-4"></div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <dt className="font-medium">Father's Email:</dt>
            <dd>{enquiry.fatherEmail}</dd>

            <dt className="font-medium">Father's Mobile:</dt>
            <dd>{enquiry.fatherMobile}</dd>

            <dt className="font-medium">Mother's Email:</dt>
            <dd>{enquiry.motherEmail}</dd>

            <dt className="font-medium">Mother's Mobile:</dt>
            <dd>{enquiry.motherMobile}</dd>
          </dl>
        </section>
      </div>
    </div>
  );
}
