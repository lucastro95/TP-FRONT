import React, { useState } from 'react'
import './AdminReclamo.scss'
import Navbar from '../components/Navbar/Navbar'
import ReclamoCard from '../components/ReclamoCard/ReclamoCard'
import Boton from '../components/Boton/Boton'
import Loader from '../components/Loader/Loader'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const AdminReclamo = () => {
    const [reclamos, setReclamos] = useState([])
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        tipo: "",
        dato: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    async function fetchReclamos(url) {
        try {
            setLoading(true)
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('error')
            }
            const data = await response.json()
            setReclamos(data)
            setLoading(false)
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'No existe un reclamo con esa información',
                icon: 'error',
            });
            setLoading(false)
        }
    }

    const handleSumbit = (e) => {
        e.preventDefault()
        let unidad

        switch (form.tipo) {
            case "edificio":
                fetchReclamos(`https://localhost:8080/reclamos/edificio/${form.dato}`)
                break;

            case "numero":
                fetchReclamos(`https://localhost:8080/reclamos/${form.dato}`)
                break;

            case "persona":
                fetchReclamos(`https://localhost:8080/reclamos/persona:${form.dato}`)
                break;

            case "unidad":
                unidad = form.dato.split(';')
                fetchReclamos(`https://localhost:8080/reclamos/unidad/codigo:${unidad[0]}/piso:${unidad[1]}/numero:${unidad[2]}`)
                break;

            default:
                break;
        }
    }


    return (
        <>
            <Navbar options={['home', 'reclamos', 'personas']} admin={true} />
            <main className='reclamos'>
                <form className='reclamos__form'>
                    <h2 className='reclamos__form__title'>Filtrar por:</h2>
                    <select className='reclamos__form__filter' name="tipo" id="tipo" onChange={handleInput} value={form.tipo}>
                        <option value="">Tipo de filtro</option>
                        <option value="edificio">Edificio</option>
                        <option value="numero">Número</option>
                        <option value="persona">Persona</option>
                        <option value="unidad">Unidad</option>
                    </select>
                    <input className='reclamos__form__filter' name='dato' type="text" value={form.dato} onChange={handleInput} />
                    <Boton action={e => handleSumbit(e)} msg={"Filtrar"} />
                </form>
                <div className="reclamos__table">
                    {loading ? <Loader /> :
                        (
                            Array.isArray(reclamos) ?
                                reclamos.map((reclamo) => (
                                    <Link to={`/admin/reclamos/${reclamo.numero}`}>
                                        <ReclamoCard
                                        admin={true}
                                        reclamo={reclamo}
                                        key={reclamo.numero}
                                    />
                                    </Link>
                                )) :
                                <Link to={`/admin/reclamos/${reclamos.numero}`}>
                                <ReclamoCard
                                    admin={true}
                                    reclamo={reclamos}
                                    key={reclamos.numero}
                                />
                                </Link>
                        )}
                </div>
            </main>
        </>
    )
}

export default AdminReclamo