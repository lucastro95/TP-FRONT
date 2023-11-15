import React from 'react'
import './Unidad.scss'
import Navbar from '../components/Navbar/Navbar'

const Unidad = () => {
  return (
    <>
        <Navbar options={['home', 'reclamos', 'unidades']} admin={false}/>
    </>
  )
}

export default Unidad