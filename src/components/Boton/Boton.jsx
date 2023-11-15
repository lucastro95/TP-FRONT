import React from 'react'
import './Boton.scss'

const Boton = ({msg, action}) => {

  return (
    <button className='btn' type="submit" onClick={action}>{msg}</button>
  )
}

export default Boton