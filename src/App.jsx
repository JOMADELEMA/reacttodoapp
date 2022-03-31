import "./App.css";
import { useState } from "react";
import { Square, SquareCheck } from "tabler-icons-react";

import Tarea from "./Components/Tarea";

function App() {
  const [tareas, setTareas] = useState([]);
  const [contador, setContador] = useState(0);
  const [pendientes, setPendientes] = useState(0);
  var temp = contador;

  // }
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

  const agregarTarea = (e) => {
    e.preventDefault();

    const formTarea = e.target[0].value;
    if (formTarea === "") {
      console.log("input vacio");
    } else {
      setTareas([...tareas, { id: contador, nombre: formTarea, estado: true }]);
      temp++;
      setContador(temp);
      document.getElementById("nuevaTarea").value = "";
      actualizarPendientes(true);
    }
  };

  function eliminarTarea(idTarea) {
    let nuevoListado = tareas.filter((tarea) => tarea.id !== idTarea);
    setTareas(nuevoListado);
    let estadoTarea = verificarEstadoTarea(idTarea);
    if (estadoTarea === true) {
      actualizarPendientes(false);
    }
  }

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

  function verificarEstadoTarea(idVerificar) {
    let tareaTemp = tareas.filter((tarea) => tarea.id === idVerificar);

    if (tareaTemp[0].estado === true) {
      return true;
    } else {
      return false;
    }
  }

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
                      className="btn btn-outline-danger"
                      onClick={() => {
                        // console.log(item.id);
                        eliminarTarea(item.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </>
                // <li
                //   className="list-group-item list-group-item-action d-flex rounded"
                //   key={item.id}
                // >
                //   {item.estado === true ? (
                //     <Square className="align-self-center" size={25} />
                //   ) : (
                //     <SquareCheck className="align-self-center" size={25} />
                //   )}
                //   <div
                //     className="align-self-center text-start ms-5 flex-fill"
                //     style={{ userSelect: "none" }}
                //     onClick={() => {
                //       completarTarea(item.id);
                //     }}
                //   >
                //     {item.estado === true ? (
                //       <span className="">{item.nombre}</span>
                //     ) : (
                //       <span className="text-decoration-line-through">
                //         {item.nombre}
                //       </span>
                //     )}
                //   </div>
                //   <button
                //     className="btn btn-outline-success"
                //     onClick={() => {
                //       completarTarea(item.id);
                //     }}
                //   >
                //     Completada
                //   </button>
                //   <button
                //     className="btn btn-outline-danger"
                //     onClick={() => {
                //       eliminarTarea(item.id);
                //     }}
                //   >
                //     Eliminar
                //   </button>
                // </li>
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
