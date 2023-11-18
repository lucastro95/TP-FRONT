import React, { useState } from 'react'
import Swal from 'sweetalert2'
import './Login.scss'

import Boton from '../components/Boton/Boton.jsx'
import Loader from '../components/Loader/Loader.jsx'

const Login = () => {

    const [user, setUser] = useState([])

    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({
        mail: "",
        password: ""
    })


    const handleInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleSumbit = async (e) => {
        e.preventDefault()
        if(data.mail === "" || data.password === "") {
            Swal.fire({
                title: "Error",
                text: "Se deben llenar todos los campos",
                icon: "error"
            });
        }
        fetchUsuario()
        console.log("user", user)
    }

    async function fetchUsuario() {
        //UN GET NO PUEDE TENER BODY -> revisar
        try {
            const response = await fetch(`https://localhost:8080/personas/${data.mail}:${data.password}`, {
            });
            if (!response.ok) {
                throw new Error('error')
            }
            const res = await response.json()
            setUser(res)
            console.log(res)
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
                <input className='login__form__input' name='mail' type="text" placeholder='Usuario' onChange={handleInput} value={data.mail}/>
                <input className='login__form__input' name='password' type="password" placeholder='Contraseña' onChange={handleInput} value={data.password}/>
                <Boton msg="Iniciar Sesión" action={e => handleSumbit(e)}/>
                {loading && <Loader />}
            </form>
        </main>
    )
}

export default Login