import React from 'react'
import './ReclamoCard.scss'

const ReclamoCard = ({admin, numero, numeroEdificio, piso, numeroUnidad, descrip, documento}) => {
    return (
        <>
            <div className="card">
                <div className="card__container">
                    <div className="card__container_bg desestimado"></div>

                    <div className="card__container_title">
                        N°: {numero} - Nombre de reclamo
                    </div>

                    <p className='card__container_desc'>Edificio: {numeroEdificio}</p>
                    <p className='card__container_desc'>Unidad: piso {piso} - dpto {numeroUnidad}</p>
                    <p className='card__container_desc'>Descripción: {descrip}</p>
                    {admin && <p className='card__container_desc'>Persona: {documento}</p>}
                </div>
            </div>
        </>
    )
}

export default ReclamoCard