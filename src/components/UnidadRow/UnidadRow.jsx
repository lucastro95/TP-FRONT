import React from 'react'
import './UnidadRow.scss'

const UnidadRow = ({ id, piso, numero, habitado, title}) => {
  return (
    <div className={title ? 'title' : 'row'}>
        <div className="column"><p>{id}</p></div>
        <div className="column"><p>{piso}</p></div>
        <div className="column"><p>{numero}</p></div>
        <div className="column"><p>{habitado}</p></div>
    </div>
  )
}

export default UnidadRow