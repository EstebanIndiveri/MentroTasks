import React,{useContext,useEffect} from 'react'
import AuthContext from '../../context/autenticacion/authContext';

const Barra = () => {

    const authContext=useContext(AuthContext);
    //traigo el user name y sigo verificando el token
    const {usuario,usuarioAutenticado,cerrarSesion}= authContext;

    useEffect(() => {

        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])


    return ( 
        <header className="app-header">
            {usuario?<p className="nombre-usuario">Bienvenido <span>{usuario.nombre}</span> </p>:null}
            

            <nav className="nav-principal">
                <button
                className="btn btn-blank cerrar-sesion"
                onClick={()=>cerrarSesion()}
                >Cerrar Sesión</button>
            </nav>
        </header>
     );
}
 
export default Barra;