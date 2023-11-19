import React, { useEffect, useState } from 'react'
import './Admin.scss'

import Navbar from '../components/Navbar/Navbar'
import EdificioCard from '../components/EdificioCard/EdificioCard'
import Loader from '../components/Loader/Loader'

const Admin = () => {
  const [edificios, setEdificios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEdificios() {
      try {
        const response = await fetch('https://localhost:8080/edificios/')

        if (!response.ok) {
          throw new Error('error')
        }
        const data = await response.json()
        setEdificios(data)
        setLoading(false)
      } catch (error) {
        console.error("Error:", error)
        setLoading(false)
      }
    }
    fetchEdificios()
  }, [])

  return (
    <>
      {loading ? <Loader /> :
        (<>
          <Navbar options={['home', 'reclamos', 'personas']} admin={true} />
          <main className='admin'>
            <h1 className='admin__title'>Una nueva manera de administrar</h1>
            <div className='admin__container'>
              {
                edificios.map((edificio) => (
                  <EdificioCard id={edificio.codigo} building={edificio.nombre} location={edificio.direccion} key={edificio.codigo} />
                ))
              }
            </div>
          </main>
        </>
        )
      }
    </>
  )
}

export default Admin