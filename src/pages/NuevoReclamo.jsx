import React from 'react'
import FormularioReclamo from '../components/FormularioReclamo/FormularioReclamo'
import './NuevoReclamo.scss'
import Boton from '../components/Boton/Boton'
import { useNavigate } from 'react-router-dom'

const NuevoReclamo = () => {
  const navigate = useNavigate()

  const handleAtras = (e) => {
        navigate('/reclamos')
  }

  return (
    <main className='nuevorec'>
        <FormularioReclamo />
        <Boton msg='Atrás' action={e => handleAtras(e)}/>
    </main>
  )
}

export default NuevoReclamo