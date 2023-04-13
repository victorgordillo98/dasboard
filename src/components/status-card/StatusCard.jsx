import React from 'react'

import './statuscard.css'


const StatusCard = props => {
    return (
        <div className='status-card'>
            <div className="status-card__icon">
                <a href="src\pages\Perfiles.jsx"><img src="src/assets/images/tuat.png" alt="" /></a>
            </div>
            <div className="status-card__info">
                <span>{props.title}</span>
            </div>
        </div>
    )
}

export default StatusCard
