import "./App.css";
import { useState } from "react";
import {
  X,
  Check,
  Plus,
  Notes,
  List,
  ListCheck,
  ListDetails,
  Circle,
  CircleCheck,
  Square,
  SquareCheck,
} from "tabler-icons-react";

import Tarea from "./Components/Tarea";
import CambiarTema from "./Components/CambiarTema";

import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";

function App() {
  //Estado para almacenar todas las tareas y mostrarlas
  //la tarea es un array de objetos que almacena id, nombre y estado
  //el estado es true para pendiente y false para completada
  const [tareas, setTareas] = useState([]);
  const [tareasTemp, setTareasTemp] = useState([]);
  const [estadoLista, setEstadoLista] = useState(0); //se pondrán 3 valores 0 = todos, 1 = pendientes y 2 = completados

  const [colorScheme, setColorScheme] = useState("dark");

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

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

  /**Obtiene el valor del formulario y agrega la tarea al listado.
   *
   * @param {string} e
   */

  const agregarTarea = (e) => {
    e.preventDefault();

    const formTarea = e.target[0].value; //valor obtenido del formulario
    if (formTarea === "") {
      console.log("input vacio"); //verificar por que no valida cuando se hace el primer insert a la lista
    } else {
      setTareas([...tareas, { id: contador, nombre: formTarea, estado: true }]);
      setTareasTemp([
        ...tareas,
        { id: contador, nombre: formTarea, estado: true },
      ]);
      temp++;
      setContador(temp);
      document.getElementById("nuevaTarea").value = "";
      actualizarPendientes(true);
    }
  };

  /**
   *funcion para eliminar la tarea del listado, recibe el id de la tarea que se quiere eliminar
   *
   * @param {string} idTarea
   */
  function eliminarTarea(idTarea) {
    let nuevoListado = tareas.filter((tarea) => tarea.id !== idTarea);
    setTareas(nuevoListado);
    if (estadoLista === 0) {
      setTareasTemp(nuevoListado);
    }

    let estadoTarea = verificarEstadoTarea(idTarea);
    if (estadoTarea === true) {
      actualizarPendientes(false);
    }
  }

  //funcion para completar las tareas
  //recibe el id de la tarea que se ha de marcar|desmarcar como completada
  function completarTarea(idTarea) {
    let tareaCompletada = tareas.filter((tarea) => tarea.id === idTarea);
    //let tareasSinCompletada = tareas.filter((tarea) => tarea.id !== idTarea);
    let tareasTemporal = tareas;
    //setTareas(tareasSinCompletada);
    //console.log(idTarea);

    tareasTemporal.map((item) => {
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
  }

  function marcarTodasCompletas() {
    let tareasTemporal = tareas;
    //setTareas(tareasSinCompletada);
    //console.log(idTarea);

    tareasTemporal.map((item) => {
      if (item.estado === true) {
        item.estado = false;
        actualizarPendientes(false);
      }
      // else {
      //   item.estado = true;
      //   actualizarPendientes(true);
      // }
    });
  }
  function marcarTodasPendientes() {
    let tareasTemporal = tareas;
    //setTareas(tareasSinCompletada);
    //console.log(idTarea);

    tareasTemporal.map((item) => {
      if (item.estado === false) {
        item.estado = true;
        actualizarPendientes(true);
      }
      // else {
      //   item.estado = false;
      //   actualizarPendientes(false);
      // }
    });
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

  function listarTareas() {
    setTareas([...tareasTemp]);
    setEstadoLista(0);
  }

  function listarTareasPendientes() {
    let listadoTareas;
    if (estadoLista === 0) {
      listadoTareas = tareas.filter((tarea) => tarea.estado === true);
      setTareas([...listadoTareas]);
      setEstadoLista(1);
    }
    if (estadoLista === 1) {
      setTareas([...tareasTemp]);
      setEstadoLista(0);
    }
    if (estadoLista === 2) {
      listadoTareas = tareasTemp.filter((tarea) => tarea.estado === true);
      setTareas([...listadoTareas]);
      setEstadoLista(1);
    }
  }

  function listarTareasCompletadas() {
    let listadoTareas;
    if (estadoLista === 0) {
      listadoTareas = tareas.filter((tarea) => tarea.estado === false);
      setTareas([...listadoTareas]);
      setEstadoLista(2);
    }
    if (estadoLista === 1) {
      listadoTareas = tareasTemp.filter((tarea) => tarea.estado === false);
      setTareas([...listadoTareas]);
      setEstadoLista(2);
    }
    if (estadoLista === 2) {
      setTareas([...tareasTemp]);
      setEstadoLista(0);
    }
  }

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider theme={{ colorScheme }} withGlobalStyles>
          <CambiarTema />

          <div className="container text-center">
            <h1 className="m-3">Tareas</h1>

            <div className="row mt-5 mb-3">
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
                      <Plus size={25} />
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-1"></div>
            </div>
            <hr />

            <div className="row">
              <div className="col-1"> </div>
              <div className="col-10 d-flex justify-content-evenly">
                <button
                  className="btn btn-outline-primary align-self-center"
                  onClick={() => {
                    listarTareas();
                  }}
                >
                  <List className="me-2" size={25} strokeWidth={1} />
                  Todas
                </button>
                <button
                  className="btn btn-outline-success align-self-center"
                  onClick={() => {
                    listarTareasCompletadas();
                  }}
                >
                  <ListCheck className="me-2" size={25} strokeWidth={1} />
                  Completadas
                </button>
                <button
                  className="btn btn-outline-danger align-self-center"
                  onClick={() => {
                    listarTareasPendientes();
                  }}
                >
                  <ListDetails className="me-2" size={25} strokeWidth={1} />
                  Pendientes
                </button>
              </div>
              <div className="col-1"> </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-1"></div>
              <div className="col-10">
                <ul className="list-group" id="listadoTareas">
                  {tareas.map((item) => (
                    <>
                      <div className="d-flex">
                        <div
                          className="flex-fill"
                          onClick={() => {
                            completarTarea(item.id);
                          }}
                        >
                          <Tarea tarea={item} />
                        </div>
                        {/* <button
                      className="btn btn-outline-success"
                      onClick={() => {
                        completarTarea(item.id);
                      }}
                    >
                      <Check size={25} />
                    </button> */}
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => {
                            eliminarTarea(item.id);
                          }}
                        >
                          {" "}
                          <X size={25} strokeWidth={1} />
                        </button>
                      </div>
                    </>
                  ))}
                </ul>
              </div>
              <div className="col-1"></div>
            </div>

            <div className="row mt-5">
              <div className="col-1"></div>
              <div className="col-10 d-flex justify-content-evenly">
                <button
                  className="btn btn-outline-info align-self-center"
                  onClick={() => {
                    marcarTodasCompletas();
                  }}
                >
                  <SquareCheck className="me-2" size={25} strokeWidth={1} />
                  Marcar Todas
                </button>
                <button
                  className="btn btn-outline-secondary align-self-center"
                  onClick={() => {
                    marcarTodasPendientes();
                  }}
                >
                  <Square className="me-2" size={25} strokeWidth={1} />
                  Desmarcar Todas
                </button>
              </div>
              <div className="col-1"></div>
            </div>
          </div>

          <footer className="footer mt-5 py-3">
            <div className="row flex-fill text-center align-self-baseline">
              <div className="col">
                <h4>
                  Tareas Totales:
                  {tareas.length > 0 ? (
                    <span className="text-danger fw-bold">{tareas.length}</span>
                  ) : (
                    <span className="text-success fw-bold">
                      {tareas.length}
                    </span>
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
          </footer>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default App;
