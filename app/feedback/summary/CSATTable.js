import React from 'react'

const CSATTable = ({ csatData }) => {

  // Function to apply conditional styling
  const scoreCellClass = (score) => score < 3 ? 'bg-red-100' : '';

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 font-medium text-left text-gray-900">Date</th>
            <th className="px-4 py-2 font-medium text-left text-gray-900">Customer Phone</th>
            <th className="px-4 py-2 font-medium text-left text-gray-900">Q1 Score</th>
            <th className="px-4 py-2 font-medium text-left text-gray-900">Q2 Score</th>
            <th className="px-4 py-2 font-medium text-left text-gray-900">Contact ID</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {csatData.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 text-gray-700">{item.date}</td>
              <td className="px-4 py-2 text-gray-700">{item.customerPhone}</td>
              <td className={`px-4 py-2 ${scoreCellClass(item.q1Score)}`}>{item.q1Score}</td>
              <td className={`px-4 py-2 ${scoreCellClass(item.q2Score)}`}>{item.q2Score}</td>
              <td className="px-4 py-2 text-gray-700">{item.contactId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CSATTable