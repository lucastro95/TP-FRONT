import React from 'react'
import './EdificioCard.scss'
import { Link } from 'react-router-dom'

const EdificioCard = ({ id, building, location }) => {
    return (
        <Link to={`/admin/unidades/${id}`} className="container">
            <div className="wrapper">
                <img className='banner-image' src='https://upload.wikimedia.org/wikipedia/commons/4/45/WilderBuildingSummerSolstice.jpg' alt="" />
                <h1>{building}</h1>
                <p>{location}</p>
            </div>
        </Link>
    )
}

export default EdificioCard