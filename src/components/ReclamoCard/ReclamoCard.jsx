import './ReclamoCard.scss'
import Boton from '../Boton/Boton'
import Swal from 'sweetalert2'


const ReclamoCard = ({admin, reclamo}) => {

    const data = {
        direccion: "",
        tipo: "JPG",
    }


    const popupPersona = () => {
        Swal.fire({
            title: "Ingresar URL Imagen",
            html: `
            <input id="swal-input1" placeholder="URL" class="swal2-input">
            <input id="swal-input2" placeholder="TIPO: ej: JPG" class="swal2-input">
          `,
            showCancelButton: true,
            confirmButtonText: "Agregar",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
              try {
                data.direccion =  document.getElementById("swal-input1").value
                data.tipo = document.getElementById("swal-input2").value
                console.log(data)
                const response = await fetch(`https://localhost:8080/reclamos/agregar/imagen/${reclamo.numero}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                  return Swal.showValidationMessage(`
                    ${JSON.stringify(await response.json())}
                  `);
                }
              } catch (error) {
                Swal.showValidationMessage(`
                  Request failed: ${error}
                `);
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Operación completada con éxito",
                icon: 'success'
              });
            
            }
          });
    }

    const handleAgregarImg = (e) => {
        e.preventDefault()
        popupPersona()
    }

    const handleEliminarReclamo = (e) => {
      fetch(`https://localhost:8080/reclamos/eliminar/${reclamo.numero}`, {
            method: "DELETE",
        })
            .catch((error) => console.error("Error:", error))
            .then((response) => 
            {
                Swal.fire({
                    title: "Operación completada con éxito",
                    icon: 'success'
                  });
            }
            )
    }

    return (
        <>
            <div className="card">
                <div className="card__container">
                    <div className={`card__container_bg ${reclamo.estado}`}></div>

                    <div className="card__container_title">
                        N°: {reclamo.numero} - {reclamo.ubicacion}
                    </div>

                    <p className='card__container_desc'><span>Edificio:</span> {reclamo.edificio.nombre}</p>
                    <p className='card__container_desc'><span>Unidad:</span> piso {reclamo.unidad.piso} - dpto {reclamo.unidad.numero}</p>
                    <p className='card__container_desc'><span>Descripción:</span> {reclamo.descripcion}</p>
                    {admin && <p className='card__container_desc'><span>Persona:</span> {reclamo.usuario.documento}</p>}
                    { !admin && <Boton  action={e => handleAgregarImg(e)}  msg={"Agregar Imagen"} />}
                    { !admin && <Boton  action={e => handleEliminarReclamo(e)}  msg={"Eliminar"} />}
                    
                </div>
            </div>
        </>
    )
}

export default ReclamoCard