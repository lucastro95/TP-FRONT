import React, { useState } from 'react'
import './AdminReclamo.scss'
import Navbar from '../components/Navbar/Navbar'
import ReclamoCard from '../components/ReclamoCard/ReclamoCard'
import Boton from '../components/Boton/Boton'
import Loader from '../components/Loader/Loader'

const AdminReclamo = () => {
    const [reclamos, setReclamos] = useState([])
    const [loading, setLoading] = useState(false)
    const [placeholder, setPlaceholder] = useState("")

    const [form, setForm] = useState({
        tipo: "",
        dato: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
        console.log(form);
        switch (form.tipo) {
            case "edificio":
                setPlaceholder("Ej.: 1")
                break;

            case "numero":
                setPlaceholder("Ej.: 1")
                break;

            case "persona":
                setPlaceholder("Ej.: DNI33333333")
                break;

            case "unidad":
                setPlaceholder("Ej.: edificio,piso,numero")
                break;
        
            default:
                break;
        }
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
            console.log(data);
            setLoading(false)
        } catch (error) {
            console.error("Error:", error)
            setLoading(false)
        }
    }

    const handleSumbit = (e) => {
        e.preventDefault()
        let numero

        switch (form.tipo) {
            case "edificio":
                numero = parseInt(form.dato)
                fetchReclamos(`https://localhost:8080/reclamos/edificio/${form.dato}`)
                break;

            case "numero":
                numero = parseInt(form.dato)
                fetchReclamos(`https://localhost:8080/reclamos/${form.dato}`)
                break;

            case "persona":
                fetchReclamos(`https://localhost:8080/reclamos/persona:${form.dato}`)
                break;

            default:
                break;
        }
    }


    return (
        <>
            <Navbar options={['home', 'reclamos', 'unidades']} admin={true} />
            <main className='reclamos'>
                <form className='reclamos__table'>
                    <h2 className='reclamos__table__title'>Filtrar por:</h2>
                    <select className='reclamos__table__filter' name="tipo" id="tipo" onChange={handleInput} value={form.tipo}>
                        <option value="">Tipo de filtro</option>
                        <option value="edificio">Edificio</option>
                        <option value="numero">Número</option>
                        <option value="persona">Persona</option>
                        <option value="unidad">Unidad</option>
                    </select>
                    <input className='reclamos__table__filter' placeholder={placeholder} name='dato' type="text" value={form.dato} onChange={handleInput} />
                    <Boton action={e => handleSumbit(e)} msg={"Filtrar"} />
                </form>
                <div className="reclamos__table">
                    {loading ? <Loader /> :
                        (
                            Array.isArray(reclamos) ?
                                reclamos.map((reclamo) => (
                                    <ReclamoCard
                                        admin={true}
                                        reclamo={reclamo}
                                        key={reclamo.numero}
                                    />
                                )) :
                                <ReclamoCard
                                    admin={true}
                                    reclamo={reclamos}
                                    key={reclamos.numero}
                                />
                        )}
                </div>
            </main>
        </>
    )
}

export default AdminReclamo