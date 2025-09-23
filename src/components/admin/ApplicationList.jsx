import React from 'react'
import ApplicationCard from './ApplicationCard'
import ApplicationListTable from './ApplicationListTable'

const ApplicationList = () => {
  return (
    <>
      <div className=" w-full h-full ">
        <div className="card-container">
          <ApplicationCard/>
        </div>
        <div className="table   w-full mt-6">
         <ApplicationListTable/>
        </div>
      </div>
    </>
  )
}

export default ApplicationList