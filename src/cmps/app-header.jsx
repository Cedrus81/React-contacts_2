import { NavLink, withRouter } from 'react-router-dom'

function _AppHeader(props) {
    return (
        <header className="app-header flex align-center justify-between">
            <h1 className="logo">Kontakt</h1>
            <nav className="flex">
                <NavLink to="/contact/edit" >New Contact</NavLink>
                <NavLink to="/contact" >Contact List</NavLink>
                <NavLink to="/" >Home</NavLink>
            </nav>
        </header>
    )
}

export const AppHeader = withRouter(_AppHeader)