import React,{useReducer} from 'react';
import proyectoContext from './ProyectoContext';
import proyectoReducer from './ProyectoReducer';
import clienteAxios from '../../config/axios';
import {
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
    } from '../../types';



const ProyectoState=props=>{

    const initialState={
        proyectos:[],
        formulario:false,
        errorformulario:false,
        proyecto:null,
        mensaje:null
    }
    //dispatch para ejecutar las acciones

    
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    //funciones para el crud

    //muestra formulario
    const mostrarFormulario=()=>{
        dispatch({
            type:FORMULARIO_PROYECTO
        })
    }

    //agregar nuevoProyecto=
    const agregarProyecto=async proyecto=>{
        //agregamos el id
        try {
            const resultado=await clienteAxios.post('/api/proyectos',proyecto);
            console.log(resultado);
            //lo mando a la base
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: resultado.data
        })

        } catch (error) {
            const alerta={
                msg:'hubo un error',
                categoria:'alerta-error'
            }
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            });
        }
   
    }


    //obtener proyectos
    const obtenerProyectos=async()=>{
        try {
            const resultado=await clienteAxios.get('/api/proyectos');
            dispatch({
                type:OBTENER_PROYECTOS,
                payload:resultado.data.proyectos
            })   
            
        } catch (error) {
            const alerta={
                msg:'hubo un error',
                categoria:'alerta-error'
            }
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            });
        }
    }

    //validar formularios:
    const mostrarError=()=>{
        dispatch({
            type:VALIDAR_FORMULARIO
        })
    }

    //selecciona el proyecto selecconado
    const proyectoActual=proyectoId=>{
        dispatch({
            type:PROYECTO_ACTUAL,
            payload:proyectoId
        })
    }

    //elimina un proyecto
    const eliminarProyecto=async proyectoId=>{
       try {
           await clienteAxios.delete(`api/proyectos/${proyectoId}`);
           dispatch({
            type:ELIMINAR_PROYECTO,
            payload:proyectoId
        });
       } catch (error) {
           const alerta={
               msg:'hubo un error',
               categoria:'alerta-error'
           }
           dispatch({
               type:PROYECTO_ERROR,
               payload:alerta
           });
       }
    }

    return(
        <proyectoContext.Provider
        value={{
            proyectos:state.proyectos,
            formulario:state.formulario,
            errorformulario:state.errorformulario,
            proyecto:state.proyecto,
            mensaje:state.mensaje,

            mostrarFormulario,
            obtenerProyectos,
            agregarProyecto,
            mostrarError,
            proyectoActual,
            eliminarProyecto
        }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;