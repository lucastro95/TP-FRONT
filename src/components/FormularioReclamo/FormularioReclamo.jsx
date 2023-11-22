import React, { useEffect, useState } from 'react'
import './FormularioReclamo.scss'
import Boton from '../Boton/Boton'
import Loader from '../Loader/Loader'
import { useClient } from '../../context/UseContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

const FormularioReclamo = () => {

    const { client } = useClient();
    const navigate = useNavigate()

    const [data, setData] = useState({
        usuario: {
            documento: client.documento
        },
        unidad: "",
        edificio: {
            codigo: 0,
        },
        ubicacion: "",
        descripcion: "",
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        if(value !== "Elegir unidad"){
            if (name === 'unidad') {
                const selectedIndex = e.target.selectedIndex;
                const unidadSeleccionada = unidades[selectedIndex - 1]; 
                const unidadData = {
                    piso: unidadSeleccionada.piso,
                    numero: unidadSeleccionada.numero,
                };
    
                data.edificio.codigo = unidadSeleccionada.edificio.codigo
        
                setData(prevData => ({
                    ...prevData,
                    [name]: unidadData
                }));
            } else {
                setData(prevData => ({
                    ...prevData,
                    [name]: value
                }));
            }
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(data.descripcion === '' || data.ubicacion === '' || data.descripcion === '' || data.imagen === '') {
            Swal.fire({
                title: 'Error',
                text: 'Se deben llenar todos los campos',
                icon: 'error',
            });
            return
        }
        try {
            await fetchNuevoReclamo();
        } catch (error) {
            console.error("Error:", error);
        }
        console.log(data);
    }

    const [unidades, setUnidades] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchUnidadesPersona() {
            try{
                const response = await fetch(`https://localhost:8080/personas/habilitado:${client.mail}`)
                
                if(!response){
                    throw new Error("Error")
                }

                const data = await response.json()
                setUnidades(data)
                setLoading(false)

            }catch(error){
                console.error("Error:", error)
                setLoading(false)
            }
        }
        fetchUnidadesPersona()
    }, [client.mail])

    async function fetchNuevoReclamo() {
        fetch(`https://localhost:8080/reclamos/agregar`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => 
            {
                Swal.fire({
                    title: "Operación completada con éxito",
                    icon: 'success'
                  });
                  navigate('/reclamos')
            }
            )
    }

    return (
        <form action="" className='form'>
            <h2 className='form__title'>Nuevo Reclamo</h2>
            <div className="form__opcion">
                <label htmlFor="unidad">Unidad:</label>
                <select className='form__opcion__select' name="unidad" id="unidad" onChange={handleInput}>
                {
                        (loading ? <Loader/>:
                        (
                            <>
                            <option id="unidad">Elegir unidad</option>
                            {
                                unidades.map((unidad) => (
                                    <option id="unidad">Edificio:{unidad.edificio.codigo}  piso:{unidad.piso}  numero:{unidad.numero}</option>
                                ))
                            }
                            </>
                        )
                        
                        )
                    }
                </select>
            </div>
            <div className="form__opcion">
                <label htmlFor="ubicacion">Ubicación:</label>
                <input className='input' type="text" name="ubicacion" id="ubicacion" onChange={handleInput} />
            </div>
            <div className="form__opcion">
                <label htmlFor="descripcion">Descripción:</label>
                <input className='textarea' type="textarea" name="descripcion" id="descripcion" onChange={handleInput} />
            </div>
            <Boton msg='Iniciar Reclamo' action={e => handleSubmit(e)} />
        </form>
    )
}

export default FormularioReclamo