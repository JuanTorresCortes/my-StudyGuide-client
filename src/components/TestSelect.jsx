import React from 'react'

const TestSelect = () => {
    const handleClick = async (test) => {
       console.log(test)
    }
  return (
    <div className='test-select'>
        <div className='test-select-card' onClick={handleClick("math")}>Math test</div>
        <div className='test-select-card' onClick={handleClick("science")}>Science test</div>
        <div className='test-select-card' onClick={handleClick("reading")}>Reading test</div>
    </div>
  )
}

export default TestSelect 