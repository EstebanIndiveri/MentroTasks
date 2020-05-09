import React,{useContext,useState,useEffect} from 'react';
import proyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/tareaContext';


const FormTarea = () => {

    //extrar
    //obtener si el proyecto esta activo
    const proyectosContext=useContext(proyectoContext);
    const {proyecto}=proyectosContext;//tenemos el state de false

    //funcion del context de agregar tarea
    const tareasContex=useContext(TareaContext);
    const {tareaseleccionada,errortarea, agregarTarea, validarTarea, obtenerTareas,actualizarTarea,limpiarTarea}=tareasContex

    //definimos el effect cuando algo cambie:
    useEffect(()=>{
            if(tareaseleccionada!==null){
                guardarTarea(tareaseleccionada)
            }else{
                guardarTarea({
                    nombre:''
                })
            }
    },[tareaseleccionada])

    //state del form:
    const [tarea,guardarTarea]=useState({
        nombre:'',
    })

    //extraer nombre del proyecto:
    const {nombre}=tarea;

        //valido si hay o no proyectos:
        if(!proyecto){
            return null;
        }
    //destructuring para el proyecto actual
    const [proyectoActual]=proyecto;
    
        //leer valores del form:
    const handleChange=e=>{
        guardarTarea({
            ...tarea,
            [e.target.name]:e.target.value
        })
    }

    //submit del form
    const onSubForm=e=>{
        e.preventDefault();

        //validar
        if(nombre.trim()===''){
            validarTarea();
            return
        }

        //revisa si es edicion o es nueva tarea:
        if(tareaseleccionada===null){
            //agreagar la nueva tarea al state
            tarea.proyecto=proyectoActual._id;
            agregarTarea(tarea);
        }else{
            //actualiza tarea existente
            actualizarTarea(tarea);

            //elimina tarea seleccionada del state:
            limpiarTarea();
        }
        //pasar validacion ES ENVIADA POR REDUCER cambio state de errortarea a FALSE


        

        //obtengo y filtro las tareas del proyecto actual:
        obtenerTareas(proyectoActual.id)

        //reinicio el form
        guardarTarea({
            nombre:''
        })
    }


    return ( 
        <div className="formulario">
            <form
            onSubmit={onSubForm}
            >
                <div className="contenedor-input">
                    <input
                    type="text"
                    className="input-text"
                    placeholder="Nombre tarea..."
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                    />
                </div>
            
                <div className="contenedor-input">
                    <input 
                    type="submit"
                    className="btn btn-primario btn-submit btn-block"
                    value={tareaseleccionada?'Editar Tarea':'Agregar Tarea'}
                    />
                </div>

            </form>
            {errortarea? <p className="mensaje error"> El nombre de la tarea es obligatorio</p> : null}
        </div>
     );
}
 
export default FormTarea;