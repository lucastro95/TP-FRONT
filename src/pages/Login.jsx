import React, { useState } from 'react'
import Swal from 'sweetalert2'
import './Login.scss'

import Boton from '../components/Boton/Boton.jsx'
import Loader from '../components/Loader/Loader.jsx'

const Login = () => {

    const [user, setUser] = useState([])

    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({
        user: "",
        password: ""
    })

    const usuarioBody = {
        mail: "",
        documento: "",
        contrasenia: "",
        nombre: ""
    }


    const handleInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleSumbit = async (e) => {
        e.preventDefault()
        if(data.user === "" || data.password === "") {
            Swal.fire({
                title: "Error",
                text: "Se deben llenar todos los campos",
                icon: "error"
              });
        }
        usuarioBody.mail = data.user
        fetchUsuario(usuarioBody)
        console.log(data);
    }

    async function fetchUsuario(body) {

        // UN GET NO PUEDE TENER BODY -> revisar
        try {
            const response = await fetch('https://localhost:8080/personas/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
  
          if (!response.ok) {
            throw new Error('error')
          }
          const data = await response.json()
          setUser(data)
          console.log(user);
          setLoading(false)
        } catch (error) {
          console.error("Error:", error)
          setLoading(false)
        }
      }

    return (
        <main className='login'>
            <div className="login__bg">
            </div>
            <form className='login__form'>
                <h2 className='login__form__title'>Iniciar Sesión</h2>
                <input className='login__form__input' name='user' type="text" placeholder='Usuario' onChange={handleInput} value={data.user}/>
                <input className='login__form__input' name='password' type="password" placeholder='Contraseña' onChange={handleInput} value={data.password}/>
                <Boton msg="Iniciar Sesión" action={e => handleSumbit(e)}/>
                {loading && <Loader />}
            </form>
        </main>
    )
}

export default Login