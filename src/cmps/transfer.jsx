import { Component } from 'react'
import { userService } from '../services/user.service'
export class Transfer extends Component {
    state = {
        amount: 0,
    }

    handleChange = ({ target }) => {
        const amount = +target.value
        this.setState({ amount })
        console.log(this.state.amount)
    }

    onAddTransaction(ev) {
        ev.preventDefault()
        const { amount } = this.state
        const { contact } = this.props
        try {
            userService.addTransaction(contact, amount)
        } catch (err) {
            console.log('Could not comptete transaction: ', err)
        }
        finally {
            this.setState({ amount: 0 })
        }

    }
    render() {
        const { name } = this.props.contact
        return (
            <article className="transfer-send flex column">
                <h1>Make a transaction to {name}:</h1>
                <form onSubmit={(ev) => this.onAddTransaction(ev)} className="flex column">
                    <label className="flex align-center">
                        Amount:
                        <input type="number" name="amount" onChange={this.handleChange} />
                        <button className="btn neutral" >Send</button>
                    </label>
                </form>
            </article>
        )
    }
}
