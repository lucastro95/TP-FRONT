import React, { useState } from 'react'
import './Persona.scss'

import Navbar from '../components/Navbar/Navbar'
import Boton from '../components/Boton/Boton'

const Persona = () => {
  const [persona, setPersona] = useState('')

  const handleInput = (e) => {
    setPersona(e.target.value)
  }

  return (
    <>
        <Navbar options={['home', 'reclamos', 'personas']} admin={true}/>
        <main className='persona'>
            <div className="persona__botones">
              <Boton msg='Agregar Persona'/>
              <Boton msg='Eliminar Persona'/>
            </div>
            <form className='persona__form'>
              <h2 className='persona__form__title'>Buscar persona</h2>
              <input type="text" className='persona__form__input' onChange={handleInput}/>
              <Boton msg='Buscar'/>
            </form>
        </main>
    </>
  )
}

export default Persona