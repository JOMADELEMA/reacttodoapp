import "./App.css";
import { useState } from "react";
import {
  X,
  Check,
  Plus,
  Notes,
  List as IconoLista,
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
  Container,
  Input,
  Paper,
  Button,
  Text,
  Group,
  Center,
  Grid,
  InputWrapper,
  List,
  ActionIcon,
} from "@mantine/core";

function App() {
  //const tareaPruebas = [{ id: 1, nombre: "tarea de prueba", estado: true }];

  //Estado para almacenar todas las tareas y mostrarlas
  //la tarea es un array de objetos que almacena id, nombre y estado
  //el estado es true para pendiente y false para completada
  const [tareas, setTareas] = useState([]);
  const [tareasTemp, setTareasTemp] = useState([]);

  const [estadoLista, setEstadoLista] = useState(0); //se pondrán 3 valores 0 = todos, 1 = pendientes y 2 = completados
  //let estadoLista = 0;

  const [colorScheme, setColorScheme] = useState("dark");

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  //contador de tareas para el listado todal de tareas
  const [contador, setContador] = useState(0);
  const [pendientes, setPendientes] = useState(0); //contador de tareas pendientes para el listado de pendientes
  var temp = contador;


  /**Obtiene el valor del formulario y agrega la tarea al listado.
   *
   * @param {string} e
   */

  const agregarTarea = () => {
    const formTarea = document.querySelector(
      "input[name='inputAgregarTarea']"
    ).value; //valor obtenido del Input

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
      document.querySelector("input[name='inputAgregarTarea']").value = "";
      //document.getElementById("inputAgregar").value = "";
      actualizarPendientes(true);
      // calcularPendientes();
    }
  };

  // const calcularPendientes = () => {
  //   var listado = tareas.filter((tarea) => tarea.estado === true);
  //  setPendientes(listado.length);
  //   //console.log(listado.length);
  // };

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
      actualizarPendientes(true)
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
          //calcularPendientes();
          actualizarPendientes(false);
        } else {
          item.estado = true;
          //calcularPendientes();
            actualizarPendientes(true);
        }
      }
    });
  }

  function marcarTodasCompletas() {
    let tareasTemporal = tareas;

    tareasTemporal.map((item) => {
      if (item.estado === true) {
        item.estado = false;
        setPendientes(0);
       // calcularPendientes();
        //actualizarPendientes(false);
      }
      // else {
      //   item.estado = true;
      //   //actualizarPendientes(true);
      //   setPendientes(tareasTemporal.length);
      // }
    });
  }

  function marcarTodasPendientes() {
    let tareasTemporal = tareas;
    //setTareas(tareasSinCompletada);
    //console.log(idTarea);

    tareasTemporal.map((item) =>{
      if (item.estado === false) {
        item.estado = true;
        setPendientes(tareasTemporal.length)
        //actualizarPendientes(true);
      }
      // else {
      //   item.estado = false;
      //   setPendientes(0);
      //   //actualizarPendientes(false);
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
          <Container>
            <Text>
              <Center>
                <h1 className="m-3">React Todo App </h1> <CambiarTema />
              </Center>
            </Text>

            <Grid gutter="xs">
              <Grid.Col span={1} justify="center" align="center"></Grid.Col>

              <Grid.Col span={10} justify="center" align="center">
                <InputWrapper>
                  <Input
                    placeholder="Ingrese una Tarea"
                    size="md"
                    name="inputAgregarTarea"
                    id="inputAgregar"
                    className="needs-validation"
                  ></Input>
                </InputWrapper>
              </Grid.Col>

              <Grid.Col span={1} justify="center" align="center">
                <Button
                  size="md"
                  color="green"
                  onClick={() => {
                    agregarTarea();
                  }}
                >
                  <Plus size={30} />
                </Button>
              </Grid.Col>
            </Grid>
          </Container>

          <div className="container text-center">
            <hr />

            <Grid>
              <Grid.Col span={1}> </Grid.Col>
              <Grid.Col span={10}>
                <Group position="center">
                  <Button
                    size="md"
                    onClick={() => {
                      listarTareas();
                    }}
                  >
                    <IconoLista size={25} /> Todas
                  </Button>
                  <Button
                    color="green"
                    size="md"
                    onClick={() => {
                      listarTareasCompletadas();
                    }}
                  >
                    <ListCheck size={25} /> Completadas
                  </Button>
                  <Button
                    color="red"
                    size="md"
                    onClick={() => {
                      listarTareasPendientes();
                    }}
                  >
                    <ListDetails size={25} /> Pendientes
                  </Button>
                </Group>
              </Grid.Col>
              <Grid.Col span={1}> </Grid.Col>
            </Grid>

            <hr />

            <Grid>
              <Grid.Col span={1}></Grid.Col>
              <Grid.Col span={10}>
                <List listStyleType="none">
                  {tareas.map((item) => (
                    <div className="d-flex align-items-center">
                      <div
                        className="flex-fill"
                        onClick={() => {
                          completarTarea(item.id);
                        }}
                      >
                        <Tarea tarea={item} />
                      </div>
                      <ActionIcon
                        color="red"
                        size="xl"
                        radius="md"
                        className="ms-2"
                        onClick={() => {
                          eliminarTarea(item.id);
                        }}
                      >
                        <X size={25} />
                      </ActionIcon>
                    </div>
                  ))}
                </List>
              </Grid.Col>
              <Grid.Col span={1}></Grid.Col>
            </Grid>

            <Grid gutter="xs" className="mt-2">
              <Grid.Col span={1}></Grid.Col>
              <Grid.Col span={10}>
                <Group position="center">
                  <Button
                    color="lime"
                    size="md"
                    onClick={() => {
                      marcarTodasCompletas();
                    }}
                  >
                    <SquareCheck size={25} />
                    Marcar Todas
                  </Button>
                  <Button
                    color="gray"
                    size="md"
                    onClick={() => {
                      marcarTodasPendientes();
                    }}
                  >
                    <Square size={25} />
                    Desmarcar Todas
                  </Button>
                </Group>
              </Grid.Col>
              <Grid.Col span={1}></Grid.Col>
            </Grid>
          </div>

          <Grid className="mt-3">
            <Grid.Col span={6} align="center">
              <Text size="lg" weight={500}>
                Tareas Totales:
              </Text>
              <Text>
                {tareas.length > 0 ? (
                  <span
                    className="ms-3 text-danger fw-bold"
                    style={{ fontSize: 35 }}
                  >
                    {tareas.length}
                  </span>
                ) : (
                  <span
                    className="ms-3 text-success fw-bold"
                    style={{ fontSize: 35 }}
                  >
                    {tareas.length}
                  </span>
                )}
              </Text>
            </Grid.Col>
            <Grid.Col span={6} align="center">
              <Text size="lg" weight={500}>
                Tareas Pendientes:
              </Text>
              <Text className="">
                {pendientes > 0 ? (
                  <Text
                    className="ms-3 text-danger fw-bold"
                    style={{ fontSize: 35 }}
                  >
                    {pendientes}
                  </Text>
                ) : (
                  <Text
                    className="ms-3 text-success fw-bold"
                    style={{ fontSize: 35 }}
                  >
                    {pendientes}
                  </Text>
                )}
              </Text>
            </Grid.Col>
          </Grid>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default App;
