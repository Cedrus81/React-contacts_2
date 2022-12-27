import { NavLink, withRouter } from 'react-router-dom'
import { userService } from '../services/user.service'
// function _AppHeader(props) {
//     return (
//         <header className="app-header flex align-center justify-between">
//             <h1 className="logo">Kontakt</h1>
//             <nav className="flex row-reverse">
//                 <NavLink to="/contact/edit" >New Contact</NavLink>
//                 <NavLink to="/contact" >Contact List</NavLink>
//                 {userService.getLoggedInUser() ? <button onClick={userService.logout}>Logout</button> : <NavLink to="/signup" >Login</NavLink>}
//                 <NavLink to="/" >Home</NavLink>
//             </nav>
//         </header>
//     )
// }

import React, { Component } from 'react'

export class _AppHeader extends Component {
    state = {
        user: null
    }
    componentDidMount() {
        this.setState({ user: userService.getLoggedInUser() || null })
    }
    onLogout() {
        userService.logout()
        this.setState({ user: null })
    }
    render() {
        const { user } = this.state
        console.log(user)
        return (
            <header className="app-header flex align-center justify-between">
                <h1 className="logo">Kontakt</h1>
                <nav className="flex row-reverse">
                    <NavLink to="/contact/edit" >New Contact</NavLink>
                    <NavLink to="/contact" >Contact List</NavLink>
                    {user ? <button onClick={this.onLogout()}>Logout</button> : <NavLink to="/signup">Login</NavLink>}
                    <NavLink to="/" >Home</NavLink>
                </nav>
            </header>
        )
    }
}


export const AppHeader = withRouter(_AppHeader)