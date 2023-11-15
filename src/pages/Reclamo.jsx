import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import './Reclamo.scss'
import { useNavigate } from 'react-router-dom'
import ReclamoCard from '../components/ReclamoCard/ReclamoCard'
import Boton from '../components/Boton/Boton'
import Loader from '../components/Loader/Loader'

const Reclamo = () => {
    const navigate = useNavigate()

    let id = 'DNI41200440'

    const handleNuevoReclamo = () => {
        navigate('/reclamos/nuevo')
    }

    const [reclamos, setReclamos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchReclamos() {
            try{
                const response = await fetch(`https://localhost:8080/reclamos/persona:${id}`)
                
                if(!response){
                    throw new Error("Error")
                }

                const data = await response.json()
                setReclamos(data)
                setLoading(false)

            }catch(error){
                console.error("Error:", error)
                setLoading(false)
            }
        }
        fetchReclamos()
    }, [id])

    return (
        <>
        {loading ? <Loader />: 
        (<>
            <Navbar options={['home', 'reclamos']} admin={false}/>
            <main className='reclamos'>
                <div className='reclamos__opciones'>
                    <h2 className='reclamos__opciones_title'>Mis reclamos</h2>
                    <Boton msg='Nuevo Reclamo' action={event => handleNuevoReclamo(event)}/>
                </div>
                <div className="reclamos__table">
                    {
                        reclamos.map((reclamo) => (
                            <ReclamoCard key={reclamo.id}
                                            admin={false} 
                                            numeroEdificio={reclamo.edificio.codigo} 
                                            piso={reclamo.unidad.piso} 
                                            numeroUnidad={reclamo.unidad.numero} 
                                            descrip={reclamo.descripcion} 
                                            documento={reclamo.usuario.documento}
                                            ></ReclamoCard>
                        ))
                    }
                </div>
            </main>
        </>
        )
        }

        </>
    )
}

export default Reclamo