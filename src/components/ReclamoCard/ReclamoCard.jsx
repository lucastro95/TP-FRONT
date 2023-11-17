import React from 'react'
import './ReclamoCard.scss'

const ReclamoCard = ({admin, reclamo}) => {
    return (
        <>
            <div className="card">
                <div className="card__container">
                    <div className={`card__container_bg ${reclamo.estado}`}></div>

                    <div className="card__container_title">
                        N°: {reclamo.numero} - {reclamo.ubicacion}
                    </div>

                    <p className='card__container_desc'><span>Edificio:</span> {reclamo.edificio.nombre}</p>
                    <p className='card__container_desc'><span>Unidad:</span> piso {reclamo.unidad.piso} - dpto {reclamo.unidad.numero}</p>
                    <p className='card__container_desc'><span>Descripción:</span> {reclamo.descripcion}</p>
                    {admin && <p className='card__container_desc'><span>Persona:</span> {reclamo.usuario.documento}</p>}
                </div>
            </div>
        </>
    )
}

export default ReclamoCard