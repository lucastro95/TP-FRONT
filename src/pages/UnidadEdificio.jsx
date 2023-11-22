import React, { useEffect, useState } from 'react'
import './UnidadEdificio.scss'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import UnidadRow from '../components/UnidadRow/UnidadRow';
import Loader from '../components/Loader/Loader';
import Boton  from '../components/Boton/Boton';
import Swal from 'sweetalert2';

const UnidadEdificio = () => {
    let { id } = useParams()
    const navigate = useNavigate()
    const [unidades, setUnidades] = useState([])
    const [reloadData, setReloadData] = useState(false);

    const [loading, setLoading] = useState(true)
    const unidad = {
        edificio: {
            codigo:0
        },
        piso: "",
        numero: ""
    }
    
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

        if(reloadData){
          fetchEdificios()
          setReloadData(false)
        }
    }, [id, reloadData])

    const handleAgregarUnidad = (e) => {
        Swal.fire({
            title: "Ingresar datos Unidad",
            html: `
            <input id="swal-input1" placeholder="Piso" class="swal2-input">
            <input id="swal-input2" placeholder="Numero" class="swal2-input">
          `,
            showCancelButton: true,
            confirmButtonText: "Agregar",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
              try {
                unidad.edificio.codigo = id
                unidad.piso =  document.getElementById("swal-input1").value
                unidad.numero = document.getElementById("swal-input2").value
                const response = await fetch(`https://localhost:8080/unidades/registrar/codigo:${unidad.edificio.codigo}/piso:${unidad.piso}/numero:${unidad.numero}`, {
                    method: "PUT",
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

const handleEliminarEdificio = (e) => {
    
    Swal.fire({
        title: "Estas seguro que desea eliminar este edificio?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            const response = await fetch(`https://localhost:8080/edificios/eliminar/${id}`, {
                method: "DELETE",
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
          navigate("/")
        }
        
      });
}

    return (
        <>
            {loading ? <Loader /> :
                (
                    <>
                        
                        <Navbar options={['home', 'reclamos', 'personas']} admin={true} />
                        <main className='unidad'>
                            <h2 className='unidad__title'>Unidades del edificio:</h2>
                            <Boton  action={e => handleAgregarUnidad(e)}  msg={"Agregar unidad"} />
                            <Boton  action={e => handleEliminarEdificio(e)}  msg={"Eliminar edificio"} />
                            <div className="unidad__table">
                                <UnidadRow id='ID' piso='Piso' numero='Numero' habitado='Habitado' title={true} />
                                {unidades.map((unidad) => (
                                    <Link to={`/admin/unidad/${id}/${unidad.piso}/${unidad.numero}`}>
                                        <UnidadRow id={unidad.id} piso={unidad.piso} numero={unidad.numero} habitado={unidad.habitado ? 'S' : 'N'} key={unidad.id} />
                                    </Link>
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