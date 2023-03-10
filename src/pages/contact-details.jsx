import { Component } from 'react'
import { contactService } from '../services/contact.service'
import { userService } from '../services/user.service'

import { TransferList } from '../cmps/transfer-list'
import { Transfer } from '../cmps/transfer.jsx'
export class ContactDetails extends Component {
    state = {
        contact: null,
        avatar: null
    }
    async componentDidMount() {
        const contactId = this.props.match.params.id
        const contact = await contactService.getById(contactId)
        this.setState({ contact }, () => { this.setAvatar() })

    }
    get transferList() {
        const allTransactions = userService.getLoggedInUser().transactions
        const contactId = this.state.contact._id
        return allTransactions.filter(transaction => transaction.toId === contactId)
    }
    setAvatar() {
        const { name } = this.state.contact
        this.setState({ avatar: `https://avatars.dicebear.com/api/adventurer/${name}.svg?width=300` })
    }
    onBack = async () => {
        this.props.history.push('/contact')
    }
    render() {
        const { contact, avatar } = this.state
        if (!contact) return <h1>Loading Contact Info...</h1>
        return (
            <main className="contact-details-container flex align-center justify-center">
                <section className="contact-details">
                    <Transfer contact={contact} />
                    <h1>Details:</h1>
                    <img src={avatar} alt="" />
                    <h3>Name: {contact.name}</h3>
                    <h3>Phpne: {contact.phone}</h3>
                    <h3>Email: {contact.email}</h3>
                    <button className="btn neutral" onClick={this.onBack}>Back</button>
                </section>
                <TransferList list={this.transferList} />
            </main>
        )
    }
}
