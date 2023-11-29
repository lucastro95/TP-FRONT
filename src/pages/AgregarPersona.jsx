import React, { useState } from 'react'
import './AgregarPersona.scss'
import Navbar from '../components/Navbar/Navbar'
import Boton from '../components/Boton/Boton'
import Swal from 'sweetalert2'

const AgregarPersona = () => {
    const [persona, setPersona] = useState({
        nombre: '',
        documento: '',
        mail: '',
        password: ''
    })

    const handleInput = (e) => {
        const { name, value } = e.target;
        setPersona({ ...persona, [name]: value });
    };

    const handleAgregar = async (e) => {
        e.preventDefault()
        if (persona.nombre === '' || persona.documento === '' || persona.mail === '' || persona.password === '') {
            Swal.fire({
                title: 'Error',
                text: 'Se deben llenar todos los campos',
                icon: 'error',
            });
        } else {
            try {
                const response = await fetch(`https://localhost:8080/personas/registrar`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(persona),
                });
                if (!response.ok) {
                    throw new Error('error');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                Swal.fire({
                    title: "Persona agregada con éxito",
                    icon: 'success'
                });
            }
        }


    }

  return (
    <>
        <Navbar options={['home', 'reclamos', 'personas']} admin={true}/>
        <main className='agregar'>
            <form className='agregar__form' onSubmit={handleAgregar}>
                <h2 className='agregar__form__title'>Agregar una persona</h2>
                <input className='agregar__form__input' type="text" name='nombre' onChange={handleInput} placeholder='Nombre' />
                <input className='agregar__form__input' type="text" name='documento' onChange={handleInput} placeholder='Documento' />
                <input className='agregar__form__input' type="text" name='mail' onChange={handleInput} placeholder='Email' />
                <input className='agregar__form__input' type="password" name='contrasenia' onChange={handleInput} placeholder='Contraseña' />
                <Boton msg='Agregar'/>
            </form>
        </main>
    </>
  )
}

export default AgregarPersona