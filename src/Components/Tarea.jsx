import React from "react";
import {Square, SquareCheck} from 'tabler-icons-react';

function Tarea(props) {

    const {tarea} = props;
  return (
    <>
      <li
        className="list-group-item list-group-item-action d-flex rounded"
      >
        {tarea.estado === true ? (
          <Square className="align-self-center" size={25} />
        ) : (
          <SquareCheck className="align-self-center" size={25} />
        )}
        <div
          className="align-self-center text-start ms-5 flex-fill"
          style={{ userSelect: "none" }}
          onClick={() => {
            console.log(tarea.id)
            //completarTarea(tarea.id);
          }}
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
      </li>
    </>
  );
}

export default Tarea;
