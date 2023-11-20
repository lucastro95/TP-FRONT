import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'
import Hamburger from 'hamburger-react'
import logo from '../../assets/logo.png'
import { GoTriangleDown } from 'react-icons/go'
import { IconContext } from 'react-icons'
import { useClient } from '../../context/UseContext';
import { useNavigate } from 'react-router-dom'


const Navbar = ({ options, admin }) => {
    const [isOpen, setOpen] = useState(false)
    const navigate = useNavigate();
    const { client, setClient } = useClient();

    const handleSumbit = () => {
        localStorage.clear();
        setClient({});
        navigate('/');
    }

    function capitalizarPrimeraLetra(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            <div className={isOpen ? 'burger-btn active' : 'burger-btn'}>
                <Hamburger toggled={isOpen} toggle={setOpen} color='var(--light-blue)' size={28} />
            </div>
            <div className="profile">
                <h3 className='profile__title'>Bienvenido, {client.nombre}</h3>
                <IconContext.Provider value={{ color: "var(--white)" }}>
                    <GoTriangleDown />
                </IconContext.Provider>;
                <div className="profile__option">
                    <button className="profile__option__btn" onClick={handleSumbit}>Cerrar sesión</button>
                </div>
            </div>
            <nav className={isOpen ? 'navbar active' : 'navbar'}>
                <img className='navbar__img' src={logo} alt="Borcelle Administration" />
                <ul className='navbar__container'>
                    {options.map(option => <Link key={option} className='navbar__container__link' to={admin ? `/admin/${option}` : `/${option}`}>{capitalizarPrimeraLetra(option)}</Link>)}
                </ul>
            </nav>
        </>
    )
}

export default Navbar