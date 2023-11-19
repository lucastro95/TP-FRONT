import React from 'react'
import './Persona.scss'
import Navbar from '../components/Navbar/Navbar'

const Persona = () => {
  return (
    <>
        <Navbar options={['home', 'reclamos', 'personas']} admin={true}/>
    </>
  )
}

export default Persona