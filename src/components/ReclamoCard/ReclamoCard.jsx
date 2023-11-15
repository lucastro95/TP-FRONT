import React from 'react'
import './ReclamoCard.scss'

const ReclamoCard = ({admin, numeroEdificio, piso, numeroUnidad, descrip, documento}) => {
    return (
        <>
            <div className="card">
                <div className="card__container">
                    <div className="card__container_bg desestimado"></div>

                    <div className="card__container_title">
                        N°: 23 - Nombre de reclamo
                    </div>

                    <p className='card__container_desc'>Edificio: {numeroEdificio}</p>
                    <p className='card__container_desc'>Unidad: piso {piso} - dpto {numeroUnidad}</p>
                    <p className='card__container_desc'>Descripción: {descrip}</p>
                    {admin && <p className='card__container_desc'>Persona: {documento}</p>}

                    <div className="card__container_date-box">
                        Fecha de reclamo:
                        <span className="card__container_date">
                            04.11.2022
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReclamoCard