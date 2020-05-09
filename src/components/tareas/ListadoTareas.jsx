import React,{Fragment,useContext} from 'react';
import Tarea from '../tareas/Tarea';
import proyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import { CSSTransition,TransitionGroup } from "react-transition-group";


const ListadoTareas = () => {

        //obtener el state del formulario
        const proyectosContext=useContext(proyectoContext);
        const {proyecto,eliminarProyecto}=proyectosContext;//tenemos el state de false


        //tareas del context del proyecto id
        const tareasContex=useContext(TareaContext);
        const {tareasproyecto}=tareasContex


        //valido si hay o no proyectos:
        if(!proyecto){
            return <h1>Selecciona un proyecto</h1>
        }

    //destructuring para el proyecto actual
    const [proyectoActual]=proyecto;

    

    const onClickDelete=()=>{
        eliminarProyecto(proyectoActual._id)
    }
    return ( 
        <Fragment>
        <h2>Proyecto: {proyectoActual.nombre}</h2>

        <ul className="listado-tareas">
            {tareasproyecto.length===0 
                ? <li className="tarea"><p className="text-center">No hay tareas</p></li>
                : 
                <TransitionGroup>
                    {tareasproyecto.map(tarea=>(
                    <CSSTransition
                        key={tarea._id}
                        timeout={200}
                        classNames="tarea"
                    >
                        <Tarea
                        tarea={tarea}
                        />
                    </CSSTransition>
                ))    }
                </TransitionGroup>
            }
        </ul>

        <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickDelete}
        >Eliminar Proyecto &times;</button>

        </Fragment>
     );
}
 
export default ListadoTareas;