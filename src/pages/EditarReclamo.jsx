import React, { useEffect, useState } from 'react'
import './EditarReclamo.scss'

import Navbar from '../components/Navbar/Navbar'
import Boton from '../components/Boton/Boton'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Loader from '../components/Loader/Loader'

const EditarReclamo = () => {
    const { id } = useParams()

    const [option, setOption] = useState('')   
    const [reclamo, setReclamo] = useState() 
    const [loading, setLoading] = useState(true)
    const [reloadData, setReloadData] = useState(false);
    const [img, setImg] = useState()

    const handleSelect = (e) => {
        setOption(e.target.value)
    }

    useEffect(() => {
        async function fetchReclamo() {
            try {
                setLoading(true)
                const response = await fetch(`https://localhost:8080/reclamos/${id}`)
                if (!response.ok) {
                    throw new Error('error')
                }
                const data = await response.json()
                setReclamo(data)
                setLoading(false)
                console.log(data)
            } catch (error) {
                console.error("Error:", error)
                setLoading(false)
            }
        }
        async function fetchImagenes() {
            try {
                setLoading(true)
                const response = await fetch(`https://localhost:8080/reclamos/imagenes:${id}`)
                if (!response.ok) {
                    throw new Error('error')
                }
                const data = await response.json()
                setImg(data)
                setLoading(false)
                console.log(data)
            } catch (error) {
                console.error("Error:", error)
                setLoading(false)
            }
        }
        fetchReclamo()
        fetchImagenes()
        if(reloadData){
            fetchReclamo()
            fetchImagenes()
            setReloadData(false)
        }
    }, [id, reloadData])
    

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
                const response = await fetch(`https://localhost:8080/reclamos/cambiarEstado:${id}/estado=${option}`, {
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
                  setReloadData(true)
            }catch(error){
                console.error("Error:", error)
            }
        }
    }

  return (
    <>
     <Navbar options={['home', 'reclamos', 'personas']} admin={true}/>
    { loading ? <Loader /> : (
           
            <main className='reclamo'>
                <h2 className='reclamo__title'>Reclamo n° {id}</h2>
                <div className='reclamo__info'>
                    <p className='reclamo__info__item'><span>Estado: </span>{reclamo.estado}</p>
                    <p className='reclamo__info__item'><span>Edificio: </span>{reclamo.edificio.codigo} - {reclamo.edificio.nombre}</p>
                    <p className='reclamo__info__item'><span>Unidad: </span>piso {reclamo.unidad.piso} - número {reclamo.unidad.numero}</p>
                    <p className='reclamo__info__item'><span>Ubicación: </span>{reclamo.ubicacion}</p>
                    <p className='reclamo__info__item'><span>Descripción: </span>{reclamo.descripcion}</p>
                </div>
                {img && (
                    <div className="reclamo__img">
                        {
                            Array.isArray(img) ?
                            img.map((i) => (
                                <img className='reclamo__img__item' src={i.direccion} alt='imagen reclamo' />
                            )) :
                            <img className='reclamo__img__item' src={img.direccion} alt='imagen reclamo' />
                        }
                    </div>
                )}
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
            
        )}
    </>
  )
}

export default EditarReclamo