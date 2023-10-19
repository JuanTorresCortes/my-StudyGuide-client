import React from 'react'
import TestRecords from '../components/TestRecords'
import TestSelect from '../components/TestSelect'

const DashboardPage = () => {
  return (
    <div>
        <h2>Dashboard</h2>
        <hr />
        Test records
        <TestRecords />
        <hr />
        Test selection
        <TestSelect />
    </div>
  )
}

export default DashboardPage 