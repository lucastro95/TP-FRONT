import React, { useEffect, useState } from 'react'
import './Unidad.scss'
import Navbar from '../components/Navbar/Navbar'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import Boton from '../components/Boton/Boton'
import Swal from 'sweetalert2'

const Unidad = () => {
    let { id, piso, numero } = useParams()

    const [loading, setLoading] = useState(false)
    const [duenios, setDuenios] = useState([])
    const [inquilinos, setInquilinos] = useState([])

    const [data] = useState({
            id: "",
            numero: numero,
            piso: piso,
            edificio: {
                codigo: id
            },
            persona: {
                documento: ""
            }
    })

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

    const popupPersona = (url) => {
        Swal.fire({
            title: "Ingrese el DNI de la persona",
            input: "text",
            inputAttributes: {
              autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Agregar",
            showLoaderOnConfirm: true,
            preConfirm: async (persona) => {
              try {
                data.persona.documento = persona
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                  return Swal.showValidationMessage(`
                    ${JSON.stringify(await response.json())}
                  `);
                }
              } catch (error) {
                Swal.showValidationMessage(`
                  Request failed: ${error}
                `);
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Operación completada con éxito",
                icon: 'success'
              });
            
            }
          });
    }

    const handleAgregar = (e) => {
        e.preventDefault()
        popupPersona("https://localhost:8080/unidades/agregar/inquilino")
    }

    const handleAlquilar = (e) => {
        e.preventDefault()
        popupPersona("https://localhost:8080/unidades/alquilar")
    }

    const handleTransferir = (e) => {
        e.preventDefault()
        popupPersona("https://localhost:8080/unidades/transferir")
    }

    const handleLiberar = async (e) => {
        try{
            data.persona.documento = ""
            const response = await fetch("https://localhost:8080/unidades/liberar", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            })
            
            if(!response){
                throw new Error("Error")
            }
            Swal.fire({
                title: "Operación completada con éxito",
                icon: 'success'
              });
            setLoading(false)
        }catch(error){
            console.error("Error:", error)
            setLoading(false)
        }
    }

    const handleHabitar = async (e) => {
        try{
            data.persona.documento = ""
            const response = await fetch("https://localhost:8080/unidades/habitar", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            })
            
            if(!response){
                throw new Error("Error")
            }
            Swal.fire({
                title: "Operación completada con éxito",
                icon: 'success'
              });
            setLoading(false)
        }catch(error){
            console.error("Error:", error)
            setLoading(false)
        }
    }

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
                            <div className="unidad__botones">
                                <Boton msg={'Agregar inquilino'} action={e => handleAgregar(e)}/>
                                <Boton msg={'Alquilar unidad'} action={e => handleAlquilar(e)}/>
                                <Boton msg={'Transferir unidad'} action={e => handleTransferir(e)}/>
                                <Boton msg={'Liberar unidad'} action={e => handleLiberar(e)}/>
                                <Boton msg={'Habitar unidad'} action={e => handleHabitar(e)}/>
                            </div>
                        </>
                    )}
            </main>
        </>
    )
}

export default Unidad