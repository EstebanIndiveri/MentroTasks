import React,{useState,useContext,useEffect} from 'react';
import { Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertasContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    //extraer los validadores del context

    const alertaContext=useContext(AlertaContext);
    const {alerta,mostrarAlerta}=alertaContext;
    const authContext=useContext(AuthContext);
    const {mensaje, autenticado, registrarUsuario}=authContext;

    //en caso del usuario atuenticado o un registro duplicado:
    useEffect(()=>{
        if(autenticado){
            props.history.push('/proyectos');
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg,mensaje.categoria);
        }
        // eslint-disable-next-line
    },[mensaje,autenticado,props.history]);

    //cramos el state
    const [usuario, guardarUsuario]=useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    })

    //extraigo del user con destructuring
    const{nombre,email,password,confirmar}=usuario;

    const onChangeLog=e=>{
        //validar
        guardarUsuario({
            ...usuario,
            [e.target.name]:e.target.value
        })
    }

    //inicio de sesión:
    const onSubmit=e=>{
        e.preventDefault();

        //valido que no haya campos vacios
        if(nombre.trim()==='' || email.trim()==='' || password.trim()===''|| confirmar.trim()===''){
            mostrarAlerta('Todos los campos son obligatorios','alerta-error');
            return;
        }

        //password minimo de 6 char
        if(password.length<6){
            mostrarAlerta('La contraseña debe tener al menos 6 caracteres','alerta-error');
            return;
        }

        //passwords iguales
        if(password!==confirmar){
            mostrarAlerta('Las contraseñas deben ser iguales','alerta-error');
            return;
        }

        //pasarlo al action(reducer)
        registrarUsuario({
            nombre,
            email,
            password
        });
    }


    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark ">
                <h1>Crea una cuenta</h1>
                <form
                onSubmit={onSubmit}
                >
                    
                    <div className="campo-form">
                        <label htmlFor="name">Nombre</label>
                        <input
                        type="text"
                        id="name"
                        name="nombre"
                        placeholder="Tu Nombre"
                        value={nombre}
                        onChange={onChangeLog}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Tu Email"
                        value={email}
                        onChange={onChangeLog}
                        />
                    </div>


                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Tu Contraseña"
                        value={password}
                        onChange={onChangeLog}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Contraseña</label>
                        <input
                        type="password"
                        id="confirmar"
                        name="confirmar"
                        placeholder="Repite tu contraseña"
                        value={confirmar}
                        onChange={onChangeLog}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                        type="submit" 
                        className="btn btn-primario btn-block"
                        value="Registrar"
                        />

                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Volver a Iniciar Sesión
                </Link>
            </div>
        </div>
        );
}
 
export default NuevaCuenta;


/*
import React from 'react'

const NuevaCuenta = () => {
    return ( 
        <h1>desde Nueva Cuenta</h1>
     );
}
 
export default NuevaCuenta;
*/ 