import React from 'react'
import './Unidad.scss'
import Navbar from '../components/Navbar/Navbar'
import Loader from '../components/Loader/Loader'

const Unidad = () => {
  return (
    <>
        <Navbar options={['home', 'reclamos', 'unidades']} admin={false}/>
    </>
  )
}

export default Unidad