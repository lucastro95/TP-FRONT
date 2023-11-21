import React from 'react'
import './Persona.scss'

import Navbar from '../components/Navbar/Navbar'
import Boton from '../components/Boton/Boton'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Persona = () => {
  const navigate = useNavigate()

  const agregarPersona = () => {
    navigate('/admin/personas/nueva')
  }

  const eliminarPersona = () => {
    Swal.fire({
      title: "Ingrese el mail de la persona",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      showLoaderOnConfirm: true,
      preConfirm: async (persona) => {
        try {
          await fetch(`https://localhost:8080/personas/eliminar/${persona}`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json"
              }
          });
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
          title: "Persona eliminada con éxito",
          icon: 'success'
        });
      
      }
    });
  }

  return (
    <>
        <Navbar options={['home', 'reclamos', 'personas']} admin={true}/>
        <main className='persona'>
            <div className="persona__botones">
              <Boton msg='Agregar Persona' action={e => agregarPersona(e)}/>
              <Boton msg='Eliminar Persona' action={e => eliminarPersona(e)}/>
            </div>
        </main>
    </>
  )
}

export default Persona