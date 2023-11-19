import React, { useEffect, useState } from 'react'
import './Unidad.scss'
import Navbar from '../components/Navbar/Navbar'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import Boton from '../components/Boton/Boton'

const Unidad = () => {
    let { id, piso, numero } = useParams()

    const [loading, setLoading] = useState(false)
    const [duenios, setDuenios] = useState([])
    const [inquilinos, setInquilinos] = useState([])

    useEffect(() => {
        async function fetchDuenios() {
            try {
                const response = await fetch(`https://localhost:8080/unidades/duenios/codigo:${id}/piso:${piso}/numero:${numero}`)

                if (!response.ok) {
                    throw new Error('error')
                }
                const data = await response.json()
                setDuenios(data)
                setLoading(false)
            } catch (error) {
                console.error("Error:", error)
                setLoading(false)
            }
        }
        async function fetchInquilinos() {
            try {
                const response = await fetch(`https://localhost:8080/unidades/inquilinos/codigo:${id}/piso:${piso}/numero:${numero}`)

                if (!response.ok) {
                    throw new Error('error')
                }
                const data = await response.json()
                setInquilinos(data)
                setLoading(false)
            } catch (error) {
                console.error("Error:", error)
                setLoading(false)
            }
        }
        fetchDuenios()
        fetchInquilinos()
    }, [id, piso, numero])

    return (
        <>
            <Navbar options={['home', 'reclamos', 'personas']} admin={true} />
            <main className='unidad'>
                {loading ? <Loader />
                    :
                    (
                        <>
                            <h2 className='unidad__title'>Piso: {piso} - Número: {numero}</h2>
                            <div className="unidad__personas">
                                <h3 className='unidad__subtitle'>Duenios</h3>
                                {duenios.map((duenio) => <p key={duenio.documento} className='unidad__subtitle__item'>Nombre: {duenio.nombre}<br />Documento: {duenio.documento}</p>)}
                                <h3 className='unidad__subtitle'>Inquilinos</h3>
                                {inquilinos.map((inquilino) => <p key={inquilino.documento} className='unidad__subtitle__item'>Nombre: {inquilino.nombre}<br />Documento: {inquilino.documento}</p>)}
                            </div>
                            <Boton msg={'Agregar inquilino'} />
                            <Boton msg={'Alquilar unidad'} />
                            <Boton msg={'Transferir unidad'} />
                            <Boton msg={'Liberar unidad'} />
                            <Boton msg={'Habitar unidad'} />
                        </>
                    )}
            </main>
        </>
    )
}

export default Unidad