import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import './Home.scss'

const Home = () => {
  return (
    <main className='home'>
      <Navbar options={['home', 'reclamos']}  admin={false}/>
      <div className="home__title">
        <h2>Contigo</h2>
        <h2>Siempre.</h2>
      </div>
    </main>
  )
}

export default Home