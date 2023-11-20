import { useEffect, useState } from 'react';
import './App.scss';
import Routes from './router/Routes';
import { useClient } from './context/UseContext';
import Loader from './components/Loader/Loader';

function App() {

  const { setClient } = useClient();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    function verificoClient() {

      const storage = localStorage.getItem('user')
      // console.log(storage)
      if( storage !==  null){
          setLoading(true)
          const usuario = JSON.parse(storage)
          if(usuario.mail === 'admin@borcelle.com'){
            setClient({ ...usuario, admin: true })
          } else {
            setClient({...usuario, admin: false })
          }
          setLoading(false)
      }
  }
  verificoClient()
  }, [setClient])

  return (
    <>
    {
      loading ? <Loader /> : (
        <div className="App">
        <Routes />
      </div>
      ) 
    }
    </>

  );
}

export default App;
