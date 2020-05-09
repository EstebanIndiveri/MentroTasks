import React,{useReducer} from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';


import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_ACTUAL,
    LIMPIAR_TAREA
    } from "../../types";


const TareaState=props=>{
    const initialState={

        tareasproyecto:[],
        errortarea:false,
        tareaseleccionada:null
    }

    //creamos dispatch y state
    const [state,dispatch]=useReducer(TareaReducer,initialState);

    //creacion de funciones

    //obtener tareas de un proyecto por id

    const obtenerTareas=async proyecto=>{
        try {
            const resultado=await clienteAxios.get('/api/tareas',{params:{proyecto}});
            dispatch({
                type:TAREAS_PROYECTO,
                payload:resultado.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
    }

    //agregar tareas a proyecto
    const agregarTarea=async tarea=>{
      try {
          const resultado=await clienteAxios.post('/api/tareas',tarea);
          console.log(resultado);
          dispatch({
            type:AGREGAR_TAREA,
            payload:tarea
        })
      } catch (error) {
          console.log(error)
      }
    }

    //valida y muestra error necesario
    const validarTarea=()=>{
        dispatch({
            type:VALIDAR_TAREA
        })
    }

    //eliminar tarea por id:
    const eliminarTarea=async(id,proyecto)=>{
        try {
            await clienteAxios.delete(`/api/tareas/${id}`,{params:{proyecto}});
            dispatch({
                type:ELIMINAR_TAREA,
                payload:id
            })

        } catch (error) {
            console.log(error);
        }
    }
    //edita una tarea
    const actualizarTarea=async tarea=>{
        try {
            const resultado= await clienteAxios.put(`/api/tareas/${tarea._id}`,tarea);
            console.log(resultado);
            dispatch({
                type:ACTUALIZAR_ACTUAL,
                payload:resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    //extrae una tarea para edit:
    const guardarTareaActual=tarea=>{
        dispatch({
            type:TAREA_ACTUAL,
            payload:tarea
        })
    }

 
    //elimina la tarea seleccionada:
    const limpiarTarea=()=>{
        dispatch({
            type:LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto:state.tareasproyecto,
                errortarea:state.errortarea,
                tareaseleccionada:state.tareaseleccionada,

                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;