import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import './Login.scss';

import Boton from '../components/Boton/Boton.jsx';
import Loader from '../components/Loader/Loader.jsx';
import { useClient } from '../context/UseContext.jsx';

const Login = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        mail: '',
        password: '',
    });

    const { client, setClient } = useClient();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSumbit = async (e) => {
        e.preventDefault();

        if (data.mail === '' || data.password === '') {
            Swal.fire({
                title: 'Error',
                text: 'Se deben llenar todos los campos',
                icon: 'error',
            });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`https://localhost:8080/personas/${data.mail}:${data.password}`, {});
            if (!response.ok) {
                throw new Error('error');
            }
            const res = await response.json();

            if (res.mail === '') {
                Swal.fire({
                    title: 'Error',
                    text: 'Usuario y/o constraseña incorrectos',
                    icon: 'error',
                });
            } else {
                if (res.mail === 'admin@borcelle.com') {
                    setClient({ ...res, admin: true });
                    navigate('./admin/home')
                } else {
                    setClient({ ...res, admin: false });
                    navigate('./home')
                }
                localStorage.setItem('user', JSON.stringify(res));
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if ( client !== null){
            if(client.admin){
                navigate('./admin/home')
            } else{
                navigate('./home')
            }
        }
    }, [client, navigate])

    return (
        <main className="login">
            <div className="login__bg"></div>
            <form className="login__form">
                <h2 className="login__form__title">Iniciar Sesión</h2>
                <input
                    className="login__form__input"
                    name="mail"
                    type="text"
                    placeholder="Usuario"
                    onChange={handleInput}
                    value={data.mail}
                />
                <input
                    className="login__form__input"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    onChange={handleInput}
                    value={data.password}
                />
                <Boton msg="Iniciar Sesión" action={(e) => handleSumbit(e)} disabled={loading} />
                {loading && <Loader />}
            </form>
        </main>
    );
};

export default Login;
