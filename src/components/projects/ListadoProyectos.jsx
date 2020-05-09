import React,{useContext,useEffect} from 'react';
import Proyecto from './Proyecto';
import AlertaContext from '../../context/alertas/alertasContext';
//import Proyecto from './Proyect';
import proyectoContext from '../../context/proyectos/ProyectoContext';
import { TransitionGroup,CSSTransition } from "react-transition-group";



const ListadoProyectos = () => {

    //utilizamos  proyectos del usecontext
    const proyectosContext=useContext(proyectoContext);
    const {mensaje, proyectos,obtenerProyectos}=proyectosContext;//tenemos el state de false

    const alertasContext=useContext(AlertaContext);
    const {alerta, mostrarAlerta}=alertasContext;

    useEffect(() => {
        //si hay un error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        obtenerProyectos();
        //eslint-disable-next-line
    }, [mensaje]);

    if(proyectos.length===0) return <p className="text-center">No hay proyectos, ¡Crea tu primer Proyecto!<br/><br/><i className="fas fa-tasks text-center"></i></p>;

  
     
    return ( 
        <ul className="listado-proyectos">
            {alerta? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <TransitionGroup>
            {proyectos.map(proyecto =>(
                <CSSTransition
                key={proyecto._id }
                timeout={200}
                classNames="proyecto"
                >
                    <Proyecto
                    proyecto={proyecto}
                    />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;