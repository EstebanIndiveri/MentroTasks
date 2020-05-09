import React,{Fragment, useState, useContext} from 'react';
import proyectoContext from '../../context/proyectos/ProyectoContext';

const NuevoProyecto = () => {

    //obtener el state del formulario
    const proyectosContext=useContext(proyectoContext);
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto,mostrarError}=proyectosContext;//tenemos el state de false

        //state para proyecto
        const[proyecto, guardarProyecto]=useState({
            nombre:''
        });

        //saco nombre de proyecto
        const {nombre}=proyecto


        //cuando cambie
        const onChangeProyecto=e=>{
            guardarProyecto({
                ...proyecto,
                [e.target.name]:e.target.value

            })
        }

        //al submit del form
        const onSubmitProyecto=e=>{
            e.preventDefault();

            //valido el proyecto
            if(nombre===''){
                mostrarError();
                return;
             }
            //agrego al state
            agregarProyecto(proyecto)
           // console.log(proyecto);

            //reinicio el form
            guardarProyecto({
                nombre:''
            })
        }

        //mostrar el form 
        const onClickEnForm=()=>{
            mostrarFormulario();
        }

    return ( 
        <Fragment>
        <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClickEnForm}
        >Nuevo Proyecto</button>

       {
           formulario ?
           ( <form
            onSubmit={onSubmitProyecto}
            className="formulario-nuevo-proyecto"
            >
                <input 
                type="text"
                className="input-text"
                placeholder="Nombre del proyecto"
                name="nombre"
                value={nombre}
                onChange={onChangeProyecto}
                />
                
                <input 
                type="submit"
                className="btn btn-primario btn-block"
                value="Agregar Proyecto"
                />
            </form>)
            :
            null}

            {errorformulario? <p className="mensaje error">El nombre del proyecto es obligatorio</p> :null}
        </Fragment>
     );
}
 
export default NuevoProyecto;