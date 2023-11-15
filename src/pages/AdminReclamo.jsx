import React, { useState } from 'react'
import './AdminReclamo.scss'
import Navbar from '../components/Navbar/Navbar'
import ReclamoCard from '../components/ReclamoCard/ReclamoCard'

const AdminReclamo = () => {

    const [form, setForm] = useState({
        tipo: "",
        dato: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

  return (
    <>
        <Navbar options={['home', 'reclamos', 'unidades']} admin={true}/>
        <main className='reclamos'>
            <form action="">
                <h2>Filtrar por:</h2>
                <select name="tipo" id="tipo" onChange={handleInput} value={form.tipo}>
                    <option value="">Tipo de filtro</option>
                    <option value="edificio">Edificio</option>
                    <option value="numero">Número</option>
                    <option value="persona">Persona</option>
                </select>
                <input name='dato' type="text" value={form.dato} onChange={handleInput}/>
            </form>
            <div className="reclamos__table">
                <ReclamoCard admin={true} />
                <ReclamoCard admin={true} />
                <ReclamoCard admin={true} />
                <ReclamoCard admin={true} />
                <ReclamoCard admin={true} />
                <ReclamoCard admin={true} />
                <ReclamoCard admin={true} />
            </div>
        </main>
    </>
  )
}

export default AdminReclamo