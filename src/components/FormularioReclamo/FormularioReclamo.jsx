import React, { useState } from 'react'
import './FormularioReclamo.scss'
import Boton from '../Boton/Boton'

const FormularioReclamo = () => {

    const [data, setData] = useState({
        unidad: "",
        ubicacion: "",
        desc: "",
        img: null
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    
    const handleFile = (e) => {
        const imgData = e.target.files[0]
        const formData = new FormData()
        formData.append('image', imgData)
        setData({...data, img: formData})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //COMPROBACION DATOS
        console.log(data);
    }


    return (
        <form action="" className='form' onSubmit={handleSubmit}>
            <h2 className='form__title'>Nuevo Reclamo</h2>
            <div className="form__opcion">
                <label htmlFor="unidad">Unidad:</label>
                <select className='select' name="unidad" id="unidad" onChange={handleInput}>
                    <option value="">n° de unidad</option>
                    <option value="1">1</option>
                </select>
            </div>
            <div className="form__opcion">
                <label htmlFor="ubicacion">Ubicación:</label>
                <input className='input' type="text" name="ubicacion" id="ubicacion" onChange={handleInput} />
            </div>
            <div className="form__opcion">
                <label htmlFor="desc">Descripción:</label>
                <input className='textarea' type="textarea" name="desc" id="desc" onChange={handleInput} />
            </div>
            <div className="form__opcion">
                <label htmlFor="imagenes">Imágenes:</label>
                <input type="file" name="imagenes" id="imagenes" accept="image/png, image/jpeg" onChange={handleFile} />
            </div>
            <Boton msg='Iniciar Reclamo' />
        </form>
    )
}

export default FormularioReclamo