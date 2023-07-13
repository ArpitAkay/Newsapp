import React from 'react'
import loading from '../loading.gif';
import '../spinner.css';

const Spinner = () => {
  return (
    <div className="text-center">
      <img src={loading} alt="Error loading" />
    </div>
  )
}

export default Spinner;