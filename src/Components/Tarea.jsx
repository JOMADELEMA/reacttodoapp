import React from "react";
import { ListItem, Paper } from "@mantine/core";
import { Square, SquareCheck } from "tabler-icons-react";

function Tarea(props) {
  const { tarea } = props;
  console.log(tarea);
  return (
    <>
      <ListItem className="flex-fill">
        <Paper shadow="sm" radius="md" withBorder style={{height: 45}} className="d-flex align-items-center">
          <div
            className=" text-start ms-2 flex-fill"
            style={{ userSelect: "none" }}
          >
            {tarea.estado === true ? (
              <Square className="align-self-center" size={30} strokeWidth={1} />
            ) : (
              <SquareCheck
                className="align-self-center"
                size={30}
                strokeWidth={1}
              />
            )}

            {tarea.estado === true ? (
              <span className="ms-3 align-self-center">{tarea.nombre}</span>
            ) : (
              <span className="ms-3 align-self-center text-decoration-line-through">
                {tarea.nombre}
              </span>
            )}
          </div>
        </Paper>
      </ListItem>
      {/* <button
          className="btn btn-outline-success"
          onClick={() => {
              console.log(tarea.id)
            //completarTarea(tarea.id);
          }}
        >
          Completada
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
              console.log(tarea.id)
            // eliminarTarea(tarea.id);
          }}
        >
          Eliminar
        </button> */}

      {/* <li
        className="list-group-item list-group-item-action d-flex rounded"
      >
        {tarea.estado === true ? (
          <Square className="align-self-center" size={30} strokeWidth={1} color={'#191c4d'} />
        ) : (
          <SquareCheck className="align-self-center" size={30} strokeWidth={1} color={'#191c4d'}/>
        )}
        <div
          className="align-self-center text-start ms-5 flex-fill"
          style={{ userSelect: "none" }}
          // onClick={() => {
          //   console.log(tarea.id)
          //   //completarTarea(tarea.id);
          // }}
        >
          {tarea.estado === true ? (
            <span className="">{tarea.nombre}</span>
          ) : (
            <span className="text-decoration-line-through">{tarea.nombre}</span>
          )}
        </div>
        {/* <button
          className="btn btn-outline-success"
          onClick={() => {
              console.log(tarea.id)
            //completarTarea(tarea.id);
          }}
        >
          Completada
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
              console.log(tarea.id)
            // eliminarTarea(tarea.id);
          }}
        >
          Eliminar
        </button> */}
      {/* </li> */}
    </>
  );
}

export default Tarea;
