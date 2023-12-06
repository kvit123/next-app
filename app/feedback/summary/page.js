
'use client'
import React from 'react'
import QuestionCard from './QuestionCard'
import csatData from '../summary/csatData.json'
import CSATTable from './CSATTable'
import csatDataDetail from '../summary/csatDataDetail.json'

const page = () => {
  return (
    <>
    <h1> Feedback Dashboard</h1>
    <div className="container mx-auto p-4">

      {/* Flex container for horizontal layout */}
      <div className="flex flex-row flex-wrap -mx-2">
        {csatData.map((data, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <QuestionCard question={data.question} responses={data.responses} />
          </div>
        ))}
      </div>

        <CSATTable csatData={csatDataDetail} />

    </div>
  </>
  )
}

export default page