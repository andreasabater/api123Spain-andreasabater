import React from 'react';  // 0.- Importamos React
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

//. Creo el componente
export const Navbar = () => {

  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleRegistro = () => {
    navigate('/signup')
  }

  const handleLogin = () => {

    if (store.isLogged) {
      //Estoy logueado
      // 1. Borrar el token en el localStorage
      localStorage.removeItem('token')
      // 2. Borrar el token en el store 
      dispatch({ type: 'handle_token', payload: '' })
      // 3. Borrar los datos del usuario en el stora / opcional localStorage
      dispatch({ type: 'handle_user', payload: {} })
      // 4. Setar en false el isLoggen en el store
      dispatch({ type: 'handle_isLogged', payload: false })
      navigate('/')  // Si nos estamos desloguiando vamos al Home
    } else {
      // estoy deslogueado
      // 1. que ponga el Alert en d-none
      dispatch({
        type: 'handle_alert',
        payload: {
          text: '',
          color: '',
          display: false
        }
      })
      // 2. que navege al componente Login
      navigate('/login')
    }
  }

  const removeFavorite = (uid) => {
    dispatch({ type: "remove_favorite", payload: uid });
  };

  return (
    <nav className="navbar navbar-expand-sm starwars-navbar ">
      <div className="container-fluid">

        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254"
            alt="Star Wars Logo"
            className="sw-logo"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {store.isLogged ?    // Para hacer invisible la opciones del menu antes de logiarse
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/characters">Characters</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/starships">Starships</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/planets">Planets</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">Contacts</Link>
                </li>
              </>
              : ''
            }
          </ul>

          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favorites ({store.favorites.length})
            </button>

            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">

              {store.favorites.length === 0 && (
                <li className="dropdown-item text-muted">No favorites yet</li>
              )}

              {store.favorites.map((favorit) => (
                <li
                  key={favorit.uid}
                  className="dropdown-item d-flex justify-content-between align-items-center"
                >
                  {favorit.name}

                  <i
                    className="fas fa-trash text-danger "
                    style={{ cursor: "pointer" }}
                    onClick={() => removeFavorite(favorit.uid)}
                  ></i>
                </li>
              ))}

            </ul>
            <span onClick={handleLogin} className='btn btn-warning ms-2'>{store.isLogged ? 'Logout' : 'Login'}</span>
            {!store.isLogged && (
              <span onClick={handleRegistro} className='btn btn-warning ms-2'>Registro</span>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};
