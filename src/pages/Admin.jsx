import React, { useEffect, useState } from 'react'
import './Admin.scss'

import Navbar from '../components/Navbar/Navbar'
import EdificioCard from '../components/EdificioCard/EdificioCard'
import Loader from '../components/Loader/Loader'
import Swal from 'sweetalert2'

const Admin = () => {
  const [edificios, setEdificios] = useState([])
  const [reloadData, setReloadData] = useState(false);
  const [loading, setLoading] = useState(true)
  const edificio = {
    nombre:"",
    direccion:""
  }

  useEffect(() => {
    async function fetchEdificios() {
      try {
        const response = await fetch('https://localhost:8080/edificios/')
        if (!response.ok) {
          throw new Error('error')
        }
        const data = await response.json()
        setEdificios(data)
        setLoading(false)
      } catch (error) {
        console.error("Error:", error)
        setLoading(false)
      }
    }
    fetchEdificios()

    if(reloadData){
      fetchEdificios()
      setReloadData(false)
    }

  }, [reloadData])


  const handleAgregarEdificio = (e) => {
    Swal.fire({
      title: "Agregar nuevo Edificio",
      html: `
      <input id="swal-input1" placeholder="Nombre:" class="swal2-input">
      <input id="swal-input2" placeholder="Direccion:" class="swal2-input">
    `,
      showCancelButton: true,
      confirmButtonText: "Agregar",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          edificio.nombre = document.getElementById("swal-input1").value
          edificio.direccion = document.getElementById("swal-input2").value
          const response = await fetch(`https://localhost:8080/edificios/registrar`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(edificio),
          });
          if (!response.ok) {
            return Swal.showValidationMessage(`
              ${JSON.stringify(await response.json())}
            `);
          }
          setReloadData(true)
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

  return (
    <>
      {loading ? <Loader /> :
        (<>
          <Navbar options={['home', 'reclamos', 'personas']} admin={true} />
          <main className='admin'>
            <h1 className='admin__title'>Una nueva manera de administrar</h1>
            <button className='admin__button' type="submit" onClick={handleAgregarEdificio}>Agregar Edificio</button>
            <div className='admin__container'>
              {
                edificios.map((edificio) => (
                  <EdificioCard id={edificio.codigo} building={edificio.nombre} location={edificio.direccion} key={edificio.codigo} />
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

export default Admin