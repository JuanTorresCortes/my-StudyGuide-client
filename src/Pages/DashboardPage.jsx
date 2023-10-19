import React from 'react'
import TestRecords from '../components/TestRecords'
import TestSelect from '../components/TestSelect'

const DashboardPage = () => {
  return (
    <div>
        <h2>Dashboard</h2>
        <TestRecords />
        Select a test
        <TestSelect />
    </div>
  )
}

export default DashboardPage 