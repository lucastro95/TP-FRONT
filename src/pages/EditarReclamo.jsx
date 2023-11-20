import React, { useEffect, useState } from 'react'
import './EditarReclamo.scss'

import Navbar from '../components/Navbar/Navbar'
import Boton from '../components/Boton/Boton'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const EditarReclamo = () => {
    const { id } = useParams()

    const [option, setOption] = useState('')   
    const [reclamo, setReclamo] = useState() 

    const handleSelect = (e) => {
        setOption(e.target.value)
    }

    useEffect(() => {
        async function fetchReclamo() {
            try {
                const response = await fetch(`https://localhost:8080/reclamos/${id}`)
                if (!response.ok) {
                    throw new Error('error')
                }
                const data = await response.json()
                setReclamo(data)
            } catch (error) {
                console.error("Error:", error)
            }
        }
        fetchReclamo()
    }, [])
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(option === '') {
            Swal.fire({
                title: "Error",
                text: "Debe elegir una opción",
                icon: "error"
              });
              
        } else {
            try{
                const response = await fetch(`http://localhost:8080/reclamos/cambiarEstado:${id}/estado=${option}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                
                if(!response){
                    throw new Error("Error")
                }
                Swal.fire({
                    title: "Operación completada con éxito",
                    icon: 'success'
                  });
            }catch(error){
                console.error("Error:", error)
            }
        }
    }

  return (
    <>
    <Navbar options={['home', 'reclamos', 'personas']} admin={true}/>
    <main className='reclamo'>
        <h2 className='reclamo__title'>Reclamo n° {id}</h2>
        <p><span>Estado: </span>{reclamo.estado}</p>
        <form className='reclamo__form' onSubmit={handleSubmit}>
        <select className='reclamo__form__input' name="estado" id="estado" onChange={handleSelect}>
            <option value="">Eliga un estado</option>
            <option value="1">Abierto</option>
            <option value="2">En proceso</option>
            <option value="3">Desestimado</option>
            <option value="4">Anulado</option>
            <option value="5">Terminado</option>
        </select>
        <Boton msg={'Cambiar Estado'} />
        </form>
    </main>
    </>
  )
}

export default EditarReclamo