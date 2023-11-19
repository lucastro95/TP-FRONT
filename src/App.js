import { useEffect } from 'react';
import './App.scss';
import Routes from './router/Routes';
import { useClient } from './context/UseContext';

function App() {

  const { setClient } = useClient();

  useEffect(() => {
    function verificoClient() {
      const storage = localStorage.getItem('user')
      if( storage !==  null){
          const usuario = JSON.parse(storage)
          console.log(usuario)
          if(usuario.mail === 'admin@borcelle.com'){
            setClient({...usuario, admin: true })
          } else {
            setClient({...usuario, admin: false })
          }
      } 
      
  }
  verificoClient()
  }, [setClient])

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
