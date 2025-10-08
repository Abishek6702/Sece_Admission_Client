import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Check,
  ChevronRight,
  ClipboardList,
  Home,
  LayoutDashboard,
  X,
  FileText,
  UserRound,
  FileImage,
  MessageSquare,
} from "lucide-react";
import { toast } from "react-toastify";

const renderField = (value) => {
  if (value === undefined || value === null || value === "") return "N/A";
  return value;
};

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const isUpdated = (app, fieldkey) =>
  Array.isArray(app?.lastUpdatedFields) &&
  app.lastUpdatedFields.includes(fieldkey);

const renderFileCard = (file, label, fieldkey, app) => {
  if (!file || (Array.isArray(file) && file.length === 0)) {
    return (
      // <div className="bg-gray-100 rounded-md p-3 text-center text-gray-400 ">
      //   {label}: N/A
      // </div>
      <div
        className={`rounded-md p-3 text-center ${
          isUpdated(app, fieldkey)
            ? "bg-yellow-300 border border-yellow-400 text-yellow-600"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        {label}:N/A
      </div>
    );
  }
  const openTab = (url) => {
    // Prepend base URL if file path doesn't already start with http/https
    const fullUrl = url.startsWith("http") ? url : `${baseUrl}/${url}`;
    window.open(fullUrl, "_blank");
  };
  if (Array.isArray(file)) {
    return file.map((url, i) => (
      <div
        key={url}
        className={`cursor-pointer bg-white border border-gray-300 rounded-md  mb-2 p-3 flex items-center gap-3 hover:ring hover:ring-[#0B56A4] ${
          isUpdated(app, fieldkey)
            ? "border-yellow-400 bg-yellow-50"
            : "border-gray-300 bg-white"
        }`}
        onClick={() => openTab(url)}
        title={label}
      >
        <FileImage className="text-blue-600 w-6 h-6" />
        <span>
          {label} {i + 1}
        </span>
      </div>
    ));
  }
  const fullUrl = file.startsWith("http") ? file : `${baseUrl}/${file}`;
  return (
    <div
      className={`cursor-pointer  border  rounded-md  mb-2 p-3 flex items-center gap-3 hover:ring hover:ring-[#0B56A4] ${
        isUpdated(app, fieldkey)
          ? "border-yellow-400 bg-yellow-50"
          : "border-gray-300 bg-white"
      }`}
      onClick={() => openTab(file)}
      title={label}
    >
      <FileText className="text-blue-600 w-6 h-6" />
      <span>{label}</span>
    </div>
  );
};

export default function ApplicationDetail() {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [remarkModalOpen, setRemarkModalOpen] = useState(false);
  const [remarkText, setRemarkText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/application/${id}`)
      .then((res) => res.json())
      .then((json) => setApp(json.data))
      .catch(console.error);
  }, [id]);
  console.log(app);

  if (!app)
    return (
      <>
        <div className=" ">
          <div className="loader m-auto"></div>
          <p className="m-auto text-center mt-4">Loading...</p>
        </div>
      </>
    );

  const handleApprove = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/application/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Admitted" }),
        }
      );
      if (!res.ok) throw new Error("Failed to update status");
      const data = await res.json();
      setApp((prev) => ({ ...prev, status: data.status }));
      toast.success("Status updated to Selected!");
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Submit remark handler
  const handleSubmitRemark = async () => {
    if (!remarkText.trim()) {
      toast.error("Enter a remark first");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/application/${id}/remark`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ remark: remarkText.trim() }),
        }
      );

      const data = await res.json(); // read server response

      if (!res.ok) throw new Error(data.message || "Failed to submit remark");

      toast.success(`Remark submitted successfully!`, {
        onClose: () => window.location.reload(),
      });
      setRemarkModalOpen(false);
      setRemarkText("");
      // Optionally fetch updated remarks
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl ">
      {/* Breadcrumb */}
      <div className="flex mb-4 items-center justify-between">
        <nav className="flex items-center gap-2 text-gray-600 rounded-md px-4 py-2 w-fit">
          <Link to="/admin" className="flex items-center gap-1">
            <LayoutDashboard className="w-5" />
            Dashboard
          </Link>
          <ChevronRight />
          <Link
            to="/admin/application_list"
            className="flex items-center gap-1"
          >
            <ClipboardList className="w-5" />
            Application List
          </Link>
          <ChevronRight />
          <span className="font-semibold text-[#0B56A4]">
            {renderField(app.studentName)}{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ml-4
                ${
                  app.status === "Admitted" ? "bg-green-100 text-green-600" : ""
                }
                ${
                  app.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : ""
                }
                ${app.status === "Remark" ? "bg-red-100 text-red-600" : ""}`}
            >
              {app.status}
            </span>
          </span>
        </nav>
        <div className="flex items-center gap-4">
          {app.status === "Pending" && (
            <>
              <button
                disabled={loading}
                onClick={handleApprove}
                className="p-1 rounded-lg px-2 gap-1 flex items-center bg-green-100 text-green-600 hover:bg-green-200 cursor-pointer"
                title="Approve"
              >
                <Check size={20} />
                Approve
              </button>

              <button
                disabled={loading}
                onClick={() => setRemarkModalOpen(true)}
                className="p-1 rounded-lg px-2 gap-1 flex items-center bg-blue-100 text-blue-600 hover:bg-blue-200 cursor-pointer"
                title="Add Remark"
              >
                <MessageSquare size={20} />
                Remark
              </button>
            </>
          )}
        </div>
      </div>
      {remarkModalOpen && (
        <div className="fixed inset-0 tint flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Remark</h3>
              <button
                onClick={() => setRemarkModalOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            </div>
            <textarea
              value={remarkText}
              onChange={(e) => setRemarkText(e.target.value)}
              placeholder="Enter your remark..."
              className="w-full border outline-none border-gray-300 rounded-md p-2 mb-4 h-24 resize-none"
            />
            <div className="text-right mt-4 space-x-2 flex justify-end items-center gap-2">
              <button
                onClick={() => setRemarkModalOpen(false)}
                disabled={loading}
                className={`px-4 py-2 rounded ${
                  loading
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleSubmitRemark}
                className={`px-4 py-2 rounded text-white ${
                  loading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-[#0B56A4] hover:bg-[#094a83]"
                }`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid layout for sections */}
      <div className="grid grid-cols-1 gap-6">
        {/* Personal Details */}
        <section className="bg-white px-5 py-3 shadow rounded-lg">
          <h2 className="text-xl font-semibold text-[#0B56A4] mb-1">
            Personal Details
          </h2>
          <div className="border-b border-gray-300 mb-4"></div>
          <dl className="grid grid-cols-4 gap-x-10 gap-y-3 text-sm">
            <dt className="font-medium">Full Name:</dt>
            <dd
              className={
                isUpdated(app, "studentName")
                  ? "bg-yellow-200 w-fit   px-4  rounded"
                  : ""
              }
            >
              {renderField(app.studentName)}
            </dd>
            <dt className="font-medium">Date of Birth:</dt>
            <dd
              className={
                isUpdated(app, "dob")
                  ? "bg-yellow-200 w-fit    px-2 rounded"
                  : ""
              }
            >
              {app.dob ? new Date(app.dob).toLocaleDateString() : "N/A"}
            </dd>

            <dt className="font-medium">Gender:</dt>
            <dd
              className={
                isUpdated(app, "gender")
                  ? "bg-yellow-200 w-fit   px-2 rounded"
                  : ""
              }
            >
              {renderField(app.gender)}
            </dd>

            <dt className="font-medium">Community:</dt>
            <dd
              className={
                isUpdated(app, "community")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.community)}
            </dd>

            <dt className="font-medium">Caste:</dt>
            <dd
              className={
                isUpdated(app, "casteName")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.casteName)}
            </dd>

            <dt className="font-medium">Mother Tongue:</dt>
            <dd
              className={
                isUpdated(app, "motherTongue")
                  ? "bg-yellow-50 px-2 rounded"
                  : ""
              }
            >
              {renderField(app.motherTongue)}
            </dd>

            <dt className="font-medium">Religion:</dt>
            <dd
              className={
                isUpdated(app, "religion")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.religion)}
            </dd>

            <dt className="font-medium">Blood Group:</dt>
            <dd
              className={
                isUpdated(app, "bloodGroup")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.bloodGroup)}
            </dd>

            <dt className="font-medium">Aadhar No:</dt>
            <dd
              className={
                isUpdated(app, "aadharNo")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.aadharNo)}
            </dd>

            <dt className="font-medium">Mobile:</dt>
            <dd
              className={
                isUpdated(app, "selfMobileNo")
                  ? "bg-yellow-50 px-2 rounded"
                  : ""
              }
            >
              {renderField(app.selfMobileNo)}
            </dd>

            <dt className="font-medium">Email:</dt>
            <dd
              className={
                isUpdated(app, "selfEmail")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.selfEmail)}
            </dd>

            <dt className="font-medium">Hostel/Day Scholar:</dt>
            <dd
              className={
                isUpdated(app, "hostelDayScholar")
                  ? "bg-yellow-50 px-2 rounded"
                  : ""
              }
            >
              {renderField(app.hostelDayScholar)}
            </dd>

            <dt className="font-medium">Permanent Address:</dt>
            <dd
              className={
                isUpdated(app, "permanentAddress")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {app.permanentAddress
                ? `${renderField(app.permanentAddress.doorNo)}, ${renderField(
                    app.permanentAddress.street
                  )}, ${renderField(app.permanentAddress.taluk)}, ${renderField(
                    app.permanentAddress.district
                  )}, ${renderField(
                    app.permanentAddress.state
                  )} - ${renderField(app.permanentAddress.pincode)}`
                : "N/A"}
            </dd>
            <dt className="font-medium">Temporary Address:</dt>
            <dd
              className={
                isUpdated(app, "temporaryAddress")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {app.temporaryAddress
                ? `${renderField(app.temporaryAddress.doorNo)}, ${renderField(
                    app.temporaryAddress.street
                  )}, ${renderField(app.temporaryAddress.taluk)}, ${renderField(
                    app.temporaryAddress.district
                  )}, ${renderField(
                    app.temporaryAddress.state
                  )} - ${renderField(app.temporaryAddress.pincode)}`
                : "N/A"}
            </dd>
            <dt className="font-medium">Community No:</dt>
            <dd
              className={
                isUpdated(app, "communityCertificateNo")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.communityCertificateNo)}
            </dd>
          </dl>
        </section>

        {/* Academic Details */}
        <section className="bg-white px-5 py-3 shadow rounded-lg">
          <h2 className="text-xl font-semibold text-[#0B56A4] mb-1">
            Academic Details
          </h2>
          <div className="border-b border-gray-300 mb-4"></div>
          <dl className="grid grid-cols-4 gap-x-10 gap-y-3 text-sm">
            <dt className="font-medium">Course Entry Type:</dt>
            <dd
              className={
                isUpdated(app, "courseEntryType")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.courseEntryType)}
            </dd>

            <dt className="font-medium">Preferred Course:</dt>
            <dd
              className={
                isUpdated(app, "preferredCourse")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.preferredCourse)}
            </dd>

            <dt className="font-medium">Quota:</dt>
            <dd
              className={
                isUpdated(app, "Quota")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.Quota)}
            </dd>

            <dt className="font-medium">Career Option:</dt>
            <dd
              className={
                isUpdated(app, "careerOption")
                  ? "bg-yellow-200 w-fit   px-2 rounded"
                  : ""
              }
            >
              {renderField(app.careerOption)}
            </dd>

            <dt className="font-medium">First Graduate Status:</dt>
            <dd
              className={
                isUpdated(app, "isFirstGraduate")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {app.isFirstGraduate ? "Yes" : "No"}
            </dd>

            <dt className="font-medium">Family Income (Certificate):</dt>
            <dd
              className={
                isUpdated(app, "familyIncomeAsPerCertificate")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.familyIncomeAsPerCertificate)}
            </dd>

            <dt className="font-medium">Income Certificate No:</dt>
            <dd
              className={
                isUpdated(app, "incomeCertificateNo")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.incomeCertificateNo)}
            </dd>

            <dt className="font-medium">Twelfth Cut Off:</dt>
            <dd
              className={
                isUpdated(app, "twelfthMarks.cutOff")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {app.twelfthMarks?.cutOff ?? "N/A"}
            </dd>

            <dt className="font-medium">EMIS No:</dt>
            <dd
              className={
                isUpdated(app, "emisNo")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.emisNo)}
            </dd>
          </dl>
        </section>

        {/* Parent/Guardian Details */}
        <section className="bg-white px-5 py-3 shadow rounded-lg">
          <h2 className="text-xl font-semibold text-[#0B56A4] mb-1">
            Family & Guardian Details
          </h2>
          <div className="border-b border-gray-300 mb-4"></div>
          <dl className="grid grid-cols-4 gap-x-10 gap-y-3 text-sm ">
            <dt>Father's Name:</dt>
            <dd
              className={
                isUpdated(app, "father.name")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.father?.name)}
            </dd>

            <dt>Father's Qualification:</dt>
            <dd
              className={
                isUpdated(app, "father.qualification")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.father?.qualification)}
            </dd>

            <dt>Father's Income:</dt>
            <dd
              className={
                isUpdated(app, "father.annualIncome")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.father?.annualIncome)}
            </dd>

            <dt>Father's Mobile:</dt>
            <dd
              className={
                isUpdated(app, "father.mobile")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.father?.mobile)}
            </dd>

            <dt>Mother's Name:</dt>
            <dd
              className={
                isUpdated(app, "mother.name")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.mother?.name)}
            </dd>

            <dt>Mother's Qualification:</dt>
            <dd
              className={
                isUpdated(app, "mother.qualification")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.mother?.qualification)}
            </dd>

            <dt>Mother's Income:</dt>
            <dd
              className={
                isUpdated(app, "mother.annualIncome")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.mother?.annualIncome)}
            </dd>

            <dt>Mother's Mobile:</dt>
            <dd
              className={
                isUpdated(app, "mother.mobile")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.mother?.mobile)}
            </dd>

            <dt>Guardian Name:</dt>
            <dd
              className={
                isUpdated(app, "guardian.name")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.guardian?.name)}
            </dd>

            <dt>Guardian Mobile:</dt>
            <dd
              className={
                isUpdated(app, "guardian.mobile")
                  ? "bg-yellow-200 w-fit  px-2 rounded"
                  : ""
              }
            >
              {renderField(app.guardian?.mobile)}
            </dd>
          </dl>
        </section>

        {/* Sibling Details */}
        <section className="bg-white px-5 py-3 shadow rounded-lg">
          <h2 className="text-xl font-semibold text-[#0B56A4] mb-1">
            Sibling Details
          </h2>
          <div className="border-b border-gray-300 mb-4"></div>
          <dl className="grid grid-cols-4 gap-x-10 gap-y-3 text-sm">
            <dt className="font-medium">Name:</dt>
            <dd>{renderField(app.siblingDetails?.name)}</dd>
            <dt className="font-medium">Roll No:</dt>
            <dd>{renderField(app.siblingDetails?.rollNo)}</dd>
            <dt className="font-medium">Department:</dt>
            <dd>{renderField(app.siblingDetails?.department)}</dd>
            <dt className="font-medium">Year of Admission:</dt>
            <dd>{renderField(app.siblingDetails?.yearOfAdmission)}</dd>
          </dl>
        </section>

        {/* Uploaded Files section */}
        <section className="bg-white px-5 py-3 shadow rounded-lg">
          <h2 className="text-xl font-semibold text-[#0B56A4] mb-1">
            Uploaded Files
          </h2>
          <div className="border-b border-gray-300 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderFileCard(
              app.studentPhoto,
              "Student Photo",
              "studentPhoto",
              app
            )}
            {renderFileCard(
              app.fatherPhoto,
              "Father Photo",
              "fatherPhoto",
              app
            )}
            {renderFileCard(
              app.motherPhoto,
              "Mother Photo",
              "motherPhoto",
              app
            )}
            {renderFileCard(
              app.tenthMarkSheet,
              "10th Marksheet",
              "tenthMarkSheet",
              app
            )}
            {renderFileCard(
              app.eleventhMarkSheet,
              "11th Marksheet",
              "eleventhMarkSheet",
              app
            )}
            {renderFileCard(
              app.twelthMarkSheet,
              "12th Marksheet",
              "twelthMarkSheet",
              app
            )}
            {renderFileCard(
              app.transferCertificate,
              "Transfer Certificate",
              "transferCertificate",
              app
            )}
            {renderFileCard(
              app.communityCertificate,
              "Community Certificate",
              "communityCertificate",
              app
            )}
            {renderFileCard(
              app.incomeCertificate,
              "Income Certificate",
              "incomeCertificate",
              app
            )}
            {renderFileCard(
              app.migrationCertificate,
              "Migration Certificate",
              "migrationCertificate",
              app
            )}
            {renderFileCard(app.aadharCopy, "Aadhar Copy", "aadharCopy", app)}

            {renderFileCard(app.allotmentOrder, "Allotment Order")}
            {renderFileCard(
              app.firstGraduateCertificate,
              "First Graduate Cert."
            )}
            {renderFileCard(app.declarationForm, "Declaration Form")}
            {renderFileCard(app.physicalFitnessForm, "Physical Fitness Form")}
            {/* {renderFileCard(app.applicationPdfUrl, "Application PDF")} */}
          </div>
        </section>

        {/* Meta info/status */}
        <section className="bg-white px-5 py-3 shadow rounded-lg mb-4">
          <h2 className="text-xl font-semibold text-[#0B56A4] mb-1">
            Application Meta
          </h2>
          <div className="border-b border-gray-300 mb-4"></div>
          <dl className="grid grid-cols-4 gap-x-10 gap-y-3 text-sm">
            <dt className="font-medium">Status:</dt>
            <dd>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium
                ${
                  app.status === "Admitted" ? "bg-green-100 text-green-600" : ""
                }
                ${
                  app.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : ""
                }
                ${app.status === "Remark" ? "bg-red-100 text-red-600" : ""}`}
              >
                {app.status}
              </span>
            </dd>
            <dt className="font-medium">Created At:</dt>
            <dd>
              {app.createdAt ? new Date(app.createdAt).toLocaleString() : "N/A"}
            </dd>
            <dt className="font-medium">Remarks:</dt>
            <dd>
              {app.remarks && app.remarks.length > 0
                ? app.remarks[app.remarks.length - 1].remark
                : "No remarks yet"}
            </dd>

            {/* <dt className="font-medium">Submission Count:</dt>
            <dd>{renderField(app.submissionCount)}</dd> */}
          </dl>
        </section>
      </div>
    </div>
  );
}
