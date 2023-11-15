import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import './Reclamo.scss'
import { useNavigate } from 'react-router-dom'
import ReclamoCard from '../components/ReclamoCard/ReclamoCard'
import Boton from '../components/Boton/Boton'

const Reclamo = () => {
    const navigate = useNavigate()

    const handleNuevoReclamo = () => {
        navigate('/reclamos/nuevo')
    }

    return (
        <>
            <Navbar options={['home', 'reclamos']} admin={false}/>
            <main className='reclamos'>
                <div className='reclamos__opciones'>
                    <h2 className='reclamos__opciones_title'>Mis reclamos</h2>
                    <Boton msg='Nuevo Reclamo' action={event => handleNuevoReclamo(event)}/>
                </div>
                <div className="reclamos__table">
                    <ReclamoCard />
                    <ReclamoCard />
                    <ReclamoCard />
                    <ReclamoCard />
                    <ReclamoCard />
                    <ReclamoCard />
                    <ReclamoCard />
                    <ReclamoCard />
                    <ReclamoCard />
                </div>
            </main>
        </>
    )
}

export default Reclamo