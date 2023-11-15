import React, { useEffect, useState } from 'react'
import './Admin.scss'

import Navbar from '../components/Navbar/Navbar'
import EdificioCard from '../components/EdificioCard/EdificioCard'

const Admin = () => {
  let edificios = []
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEdificios() {
      try {
        const response = await fetch('https://localhost:8080/edificios/')

        if (!response.ok) {
          throw new Error('error')
        }
        const data = await response.json()
        edificios = data
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
      {loading ? <p>Cargando datos</p>
        :
        (
          <>
            <Navbar options={['home', 'reclamos', 'unidades']} admin={true} />
            <main className='admin'>
              <h1 className='admin__title'>Una nueva manera de administrar</h1>
              <div className='admin__container'>
                {edificios.map(edificio => console.log(edificio))}
                <EdificioCard id={''} building={''} location={''} />
              </div>
            </main>
          </>
        )}
    </>
  )
}

export default Admin