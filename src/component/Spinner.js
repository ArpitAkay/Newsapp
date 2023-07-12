import React, { Component } from 'react'
import loading from '../loading.gif';
import '../spinner.css';

class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={loading} alt="Error loading" />
      </div>
    )
  }
}

export default Spinner;