import React, { Component } from 'react';
import './Spinner.css';

export class Spinner extends Component {
    
    render() {
        return (
            <>
            <div className='parentDisable verlay-box'><div className='loader center'></div> </div>
            </>
        )
    }
}

export default Spinner