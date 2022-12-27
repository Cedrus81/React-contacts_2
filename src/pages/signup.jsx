import { Component } from 'react'
import { userService } from '../services/user.service'
export class Signup extends Component {
    onLogin(ev, action) {
        ev.preventDefault()
        const name = ev.target.children[0].value
        try {
            userService[action](name)
            this.props.history.push('/')
        } catch (err) {
            console.log(`couldn't login:`, err)
        }
    }
    onBack() {
        this.props.history.push('/')
    }
    render() {
        return (
            <main className="flex align-center justify-center">
                <article className="signup-container flex column align-center">
                    <img src={require('../assets/bitcoin.png')} alt="" />
                    <h1>Connect to Kontakt! <br /> No ragrets!</h1>
                    <form onSubmit={(ev) => this.onLogin(ev, 'login')} className="flex">
                        <input type="text" name="name" />
                        <button className="btn neutral">Login</button>
                    </form>
                    <h2>OR sign up:</h2>
                    <form onSubmit={(ev) => this.onLogin(ev, 'signup')} className="flex">
                        <input type="text" name="name" />
                        <button className="btn neutral">Sign up!</button>
                    </form>
                    <button className="btn neutral" onClick={this.onBack}>Back to Home Page</button>
                </article>
            </main>
        )
    }
}
