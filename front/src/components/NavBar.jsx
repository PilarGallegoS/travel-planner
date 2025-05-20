function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Planificador</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNav" aria-controls="navbarNav"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">Iniciar sesión</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/register">Registrarse</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
