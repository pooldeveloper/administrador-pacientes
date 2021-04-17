import React, {Fragment, useState, useEffect} from 'react'
import Formulario from './components/Formulario'
import Cita from './components/Cita'
function App() {
  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(citasIniciales == null){
    citasIniciales = [];
  }
  //Arreglos de cita
  const[citas, guardarCitas] = useState(citasIniciales);
  //Use Effect para ciertas operaciones cunado el state cambia
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales !== null){
      localStorage.setItem('citas',JSON.stringify(citas));
    }else{
      localStorage.setItem('citas',JSON.stringify([]));
    }
  }, [citas])
  //Funcion que tome las citas actuales y agrege las nuevas
  const crearCita = cita =>{
    guardarCitas([
      ...citas,
      cita
    ])
  }
  //Funcion eliminar cita por su id
  const eliminarCita = (id) =>{
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }
  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'

  return (
   <Fragment>
     <h1>Administrador de Pacientes</h1>
      <div className = "container">
        <div className = "row">
          <div className = "one-half column">
            <Formulario
              crearCita = {crearCita}
            />
          </div>
          <div className = "one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita =>(
              <Cita
                key = {cita.id}
                cita = {cita}
                eliminarCita = {eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
   </Fragment>
  );
}

export default App;
