import React, { useState } from 'react'
import './Login.scss'

import Boton from '../components/Boton/Boton.jsx'

const Login = () => {
    const [data, setData] = useState({
        user: "",
        password: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleSumbit = async (e) => {
        e.preventDefault()
    }

    return (
        <main className='login'>
            <div className="login__container">
                <form className='login__form' onSubmit={handleSumbit}>
                <h2 className='login__form__title'>Iniciar Sesión</h2>
                    <div className="login__form__input">
                        <label htmlFor="user">Usuario:</label>
                        <input type="text" value={data.user} onChange={handleInput} name='user' placeholder='ejemplo@email.com'/>
                    </div>
                    <div className="login__form__input">
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" value={data.password} onChange={handleInput} name='password' placeholder='••••••••••••'/>
                    </div>
                    <Boton msg='Iniciar Sesión' />
                </form>
            </div>
        </main>
    )
}

export default Login