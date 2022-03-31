import "./App.css";
import { useState } from "react";

import Tarea from "./Components/Tarea";

function App() {

//Estado para almacenar todas las tareas y mostrarlas
//la tarea es un array de objetos que almacena id, nombre y estado
//el estado es true para pendiente y false para completada
  const [tareas, setTareas] = useState([]); 


//contador de tareas para el listado todal de tareas
  const [contador, setContador] = useState(0); 
  const [pendientes, setPendientes] = useState(0); //contador de tareas pendientes para el listado de pendientes
  var temp = contador;

  //funcion de Bootstrap para validar el formulario
  (function () {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  })();


  //funcion para obtener valor del formulario y agregar la tarea al listado
  const agregarTarea = (e) => {
    e.preventDefault();

    const formTarea = e.target[0].value; //valor obtenido del formulario
    if (formTarea === "") {
      console.log("input vacio"); //verificar por que no valida cuando se hace el primer insert a la lista
    } else {
      setTareas([...tareas, { id: contador, nombre: formTarea, estado: true }]); 
      temp++;
      setContador(temp);
      document.getElementById("nuevaTarea").value = "";
      actualizarPendientes(true);
    }
  };

  //funcion para eliminar la tarea del listado
  //recibe el id de la tarea que se quiere eliminar
  function eliminarTarea(idTarea) {
    let nuevoListado = tareas.filter((tarea) => tarea.id !== idTarea);
    setTareas(nuevoListado);
    let estadoTarea = verificarEstadoTarea(idTarea);
    if (estadoTarea === true) {
      actualizarPendientes(false);
    }
  }

  //funcion para completar las tareas
  //recibe el id de la tarea que se ha de marcar|desmarcar como completada
  function completarTarea(idTarea) {
    let tareaCompletada = tareas.filter((tarea) => tarea.id === idTarea);
    let tareasSinCompletada = tareas.filter((tarea) => tarea.id !== idTarea);
    let tareasTemp = tareas;
    setTareas(tareasSinCompletada);

    tareasTemp.map((item) => {
      if (item.id === tareaCompletada[0].id) {
        if (item.estado === true) {
          item.estado = false;
          actualizarPendientes(false);
        } else {
          item.estado = true;
          actualizarPendientes(true);
        }
      }
    });

    setTareas([...tareasTemp]);
  }

  //funcion que verifica el estado de la tarea
  //recibe el id de tarea para verificar si su estado es completado o pendiente
  function verificarEstadoTarea(idVerificar) {
    let tareaTemp = tareas.filter((tarea) => tarea.id === idVerificar);

    if (tareaTemp[0].estado === true) {
      return true;
    } else {
      return false;
    }
  }

  //funcion que actualiza el listado de pendientes
  function actualizarPendientes(motivo) {
    //motivo es aumentar o disminuir
    let pendientesTemp = pendientes;

    if (motivo === true) {
      //console.log("aumentar contador");
      pendientesTemp++;
      //console.log(pendientesTemp);
    } else {
      //console.log("reducir contador");
      pendientesTemp--;
      //console.log(pendientesTemp);
    }

    setPendientes(pendientesTemp);
  }

  return (
    <>
      <div className="container-fluid text-center">
        <h1 className="">Tareas</h1>

        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <form
              className="needs-validation  d-flex justify-content-center"
              noValidate
              onSubmit={agregarTarea}
            >
              <div className="input-group mb-3 w-75">
                <input
                  type="text"
                  id="nuevaTarea"
                  className="form-control"
                  placeholder="Ingrese una Tarea"
                  required
                />
                <button className="btn btn-outline-primary" type="submit">
                  Agregar Tarea
                </button>
              </div>
            </form>
          </div>
          <div className="col-1"></div>
        </div>
        <hr />

        <div className="row">
          <div className="col">
            <h4>
              Tareas Totales:
              {tareas.length > 0 ? (
                <span className="text-danger fw-bold">{tareas.length}</span>
              ) : (
                <span className="text-success fw-bold">{tareas.length}</span>
              )}
            </h4>
          </div>
          <div className="col">
            <h4>
              Tareas Pendientes:
              {pendientes > 0 ? (
                <span className="text-danger fw-bold">{pendientes}</span>
              ) : (
                <span className="text-success fw-bold">{pendientes}</span>
              )}
            </h4>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <ul className="list-group" id="listadoTareas">
              {tareas.map((item) => (
                <>
                  <div className="d-flex">
                    <Tarea tarea={item} key={item.id} />
                    <button
                      className="btn btn-outline-success"
                      onClick={() => {
                        completarTarea(item.id);
                      }}
                    >
                      Completar
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        eliminarTarea(item.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              ))}
            </ul>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </>
  );
}

export default App;