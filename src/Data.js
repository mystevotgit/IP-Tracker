import React from 'react'

function Data(props) {
    return (
        <div className="data">
            <h3 className="info-title">{props.title}</h3>
            <h3 className="info-data">{props.info}</h3>
        </div>
    )
}

export default Data
