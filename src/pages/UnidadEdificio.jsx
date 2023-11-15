import React from 'react'
import './UnidadEdificio.scss'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import UnidadRow from '../components/UnidadRow/UnidadRow';

const UnidadEdificio = () => {
    let { id } = useParams()
    
    return (
        <>
            <Navbar options={['home', 'reclamos', 'unidades']} admin={true} />
            <main className='unidad'>
                <h2 className='unidad__title'>Unidades del edificio:</h2>
                <div className="unidad__table">
                    <UnidadRow id='ID' piso='Piso' numero='Numero' habitado='Habitado' title={true}/>
                    <UnidadRow id='1' piso='1' numero='1' habitado='S'/>
                    <UnidadRow id='2' piso='1' numero='2' habitado='S'/>
                    <UnidadRow id='3' piso='1' numero='3' habitado='N'/>
                    <UnidadRow id='4' piso='2' numero='1' habitado='S'/>
                    <UnidadRow id='5' piso='2' numero='2' habitado='N'/>
                    <UnidadRow id='6' piso='2' numero='3' habitado='S'/>
                </div>
            </main>
        </>
    )
}

export default UnidadEdificio