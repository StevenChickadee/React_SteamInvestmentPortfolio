import './NavBar.css'

import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <nav>
            <Link className="navBarLink" to="/">Home</Link>
            <Link className="navBarLink" to="/portfolio">Portfolio</Link>
        </nav>
    )
}

export default NavBar