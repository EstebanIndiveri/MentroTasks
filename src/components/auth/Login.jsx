import React,{useState,useContext,useEffect} from 'react';
import { Link} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertasContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {
        //extraer los validadores del context

        const alertaContext=useContext(AlertaContext);
        const {alerta,mostrarAlerta}=alertaContext;
        const authContext=useContext(AuthContext);
        const {mensaje, autenticado, iniciarSesion}=authContext;
        
        //pass o user no existe
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
        email:'',
        password:''
    })

    //extraigo del user con destructuring
    const{email,password}=usuario;

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
        if(email.trim()==='' || password.trim()===''){
            mostrarAlerta('Todos los campos son obligatorios','alerta-error');
        }
        //pasarlo al action(reducer)
        iniciarSesion({email,password});
    }


    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark ">
                <h1>Iniciar Sesión</h1>
                <form
                onSubmit={onSubmit}
                >
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
                        <label htmlFor="email">Contraseña</label>
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
                        <input
                        type="submit" 
                        className="btn btn-primario btn-block"
                        value="Iniciar Sesión"
                        />

                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
        );
}
 
export default Login;