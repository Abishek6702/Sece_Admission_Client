import React from "react";
import EnquiryCard from "./EnquiryCard";
import EnquiryListTable from "./EnquiryListTable";

const EnquiryList = () => {
  return (
    <>
      <div className=" w-full h-full ">
        <div className="card-container">
          <EnquiryCard />
        </div>
        <div className="table  w-full mt-6">
          <EnquiryListTable />
        </div>
      </div>
    </>
  );
};

export default EnquiryList;
