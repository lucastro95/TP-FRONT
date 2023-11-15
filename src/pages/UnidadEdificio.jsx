import React, { useEffect, useState } from 'react'
import './UnidadEdificio.scss'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import UnidadRow from '../components/UnidadRow/UnidadRow';
import Loader from '../components/Loader/Loader';

const UnidadEdificio = () => {
    let { id } = useParams()

    const [unidades, setUnidades] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        async function fetchEdificios() {
            try {
                const response = await fetch(`https://localhost:8080/edificios/unidades/${id}`)

                if (!response.ok) {
                    throw new Error('error')
                }
                const data = await response.json()
                setUnidades(data)
                setLoading(false)
            } catch (error) {
                console.error("Error:", error)
                setLoading(false)
            }
        }
        fetchEdificios()
    }, [id])

    return (
        <>
            {loading ? <Loader /> :
                (
                    <>
                        <Navbar options={['home', 'reclamos', 'unidades']} admin={true} />
                        <main className='unidad'>
                            <h2 className='unidad__title'>Unidades del edificio:</h2>
                            <div className="unidad__table">
                                <UnidadRow id='ID' piso='Piso' numero='Numero' habitado='Habitado' title={true} />
                                {unidades.map((unidad) => (
                                    <UnidadRow id={unidad.id} piso={unidad.piso} numero={unidad.numero} habitado={unidad.habitado ? 'S' : 'N'} />
                                ))}
                            </div>
                        </main>
                    </>
                )}
            { }
        </>
    )
}

export default UnidadEdificio