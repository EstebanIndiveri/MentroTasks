import React,{useContext} from 'react';
import proyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/tareaContext';



const Proyecto = ({proyecto}) => {

    //obtener el state del formulario
    const proyectosContext=useContext(proyectoContext);
    const {proyectoActual}=proyectosContext;//tenemos el state de false

    
    //funcion del context de tarea
    const tareasContex=useContext(TareaContext);
    const {obtenerTareas}=tareasContex

    //funcion para agregar el proyecto actual:
    const seleccionarProyecto=id=>{
       proyectoActual(id);//fijar un proyecto actual
       obtenerTareas(id); // filtro las tareas la click
    }

    return ( 
        <li>
            <button
            type="button"
            className="btn btn-blank"
            onClick={()=>seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;