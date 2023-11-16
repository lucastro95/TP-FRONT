import React, { useEffect, useState } from 'react'
import './FormularioReclamo.scss'
import Boton from '../Boton/Boton'
import Loader from '../Loader/Loader'

const FormularioReclamo = () => {

    const [data, setData] = useState({
        usuario: {
            documento: "DNI41200440"
        },
        unidad: "",
        edificio: {
            codigo: 0,
        },
        ubicacion: "",
        descripcion: "",
        imagen: null
    })

    const handleInput = (e) => {
        const { name, value } = e.target
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
    
    const handleFile = (e) => {
        const imgData = e.target.files[0]
        const formData = new FormData()
        formData.append('image', imgData)
        setData({...data, img: formData})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        //COMPROBACION DATOS
        try {
            await fetchNuevoReclamo();
        } catch (error) {
            console.error("Error:", error);
        }
        console.log(data);
    }

    let mail = 'gian@gmail.com'
    const [unidades, setUnidades] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchUnidadesPersona() {
            try{
                const response = await fetch(`https://localhost:8080/personas/habilitado:${mail}`)
                
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
    }, [mail])

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
            .then((response) => console.log("Success:", response))

    }

    return (
        <form action="" className='form'>
            <h2 className='form__title'>Nuevo Reclamo</h2>
            <div className="form__opcion">
                <label htmlFor="unidad">Unidad:</label>
                <select className='select' name="unidad" id="unidad" onChange={handleInput}>
                    {
                        (loading ? <Loader/>:
                        (
                            <>
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
            <div className="form__opcion">
                <label htmlFor="imagenes">Imágenes:</label>
                <input type="file" name="imagenes" id="imagenes" accept="image/png, image/jpeg" onChange={handleFile} />
            </div>
            <Boton msg='Iniciar Reclamo' action={e => handleSubmit(e)} />
        </form>
    )
}

export default FormularioReclamo