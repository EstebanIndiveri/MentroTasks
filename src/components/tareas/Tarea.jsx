import React,{useContext} from 'react';
import proyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {

    //obtener si el proyecto esta activo
    const proyectosContext=useContext(proyectoContext);
    const {proyecto}=proyectosContext;//tenemos el state de false

    //extraer el proyecto con destructuring
    const [proyectoActual]=proyecto

   //funcion del context de tarea
   const tareasContex=useContext(TareaContext);
   const {eliminarTarea, obtenerTareas,actualizarTarea,guardarTareaActual}=tareasContex
   
   //funcion que se ejecuta al BTN eliminar
   const tareaEliminar=id=>{
    eliminarTarea(id,proyectoActual._id);
    obtenerTareas(proyectoActual.id);
   }

   //function modifica el state tareas:
   const cambiarEstado=tarea=>{
        if(tarea.estado){
            tarea.estado=false;
        }else{
            tarea.estado=true;
        }
        actualizarTarea(tarea);
   }
   
   //selecciono la tarea:
   const seleccionarTarea=tarea=>{
       guardarTareaActual(tarea);
   }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado
                ?
                    (
                        <button
                        type="button"
                        className="completo"
                        onClick={()=>cambiarEstado(tarea)}
                        >Completo</button>
                    )
                :
                (
                    <button
                    type="button"
                    className="incompleto"
                    onClick={()=>cambiarEstado(tarea)}
                    >incompleto</button>
                )
                }
            </div>

            <div className="acciones">
                <button
                type="button"
                className="btn btn-primario"
                onClick={()=>seleccionarTarea(tarea)}
                >Editar</button>

                <button
                type="button"
                className="btn btn-secundario"
                onClick={()=>tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;