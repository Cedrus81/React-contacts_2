import { Component } from 'react'
import { contactService } from '../services/contact.service'
export class ContactEdit extends Component {

    state = {
        contact: null,
        avatar: null,
    }

    async componentDidMount() {
        const contactId = this.props.match.params.id
        if (contactId) {
            const contact = await contactService.getById(contactId)
            this.setState({ contact }, () => {
                this.setAvatar()
            })
        }
        else this.setState({ contact: contactService.getEmptyContact() }, () => {
            this.setAvatar()
        })
    }

    setAvatar() {
        const { name } = this.state.contact
        this.setState({ avatar: `https://avatars.dicebear.com/api/adventurer/${name}.svg?width=300` })
    }
    onAddContact = async (ev) => {
        ev.preventDefault()
        try {
            await contactService.save({ ...this.state.contact })
            this.props.history.push('/contact')
        } catch (err) {
            console.log('err:', err)
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        if (field === 'name') this.setAvatar()
        this.setState(prevState => ({ contact: { ...prevState.contact, [field]: value } }))

    }
    onRemoveContact = async () => {
        const contactId = this.state.contact._id
        if (!contactId) return this.props.history.push('/')
        try {
            await contactService.remove(contactId)
            this.setState(({ contacts }) => ({
                contacts: contacts.filter(contact => contact._id !== contactId)
            }))
            this.props.history.push('/contact')
        } catch (err) {
            console.log('err:', err)
        }
    }
    onBack = async () => {
        this.props.history.push('/contact')
    }

    render() {
        if (!this.state.contact) return <h1>Loading data...</h1>
        const { name, email, phone } = this.state.contact
        return (
            <main className="flex justify-center align-center">
                <section className="contact-edit flex wrap justify-center">
                    <div className="avatar-prev">
                        <h2>Avatar Preview:</h2>
                        <img src={this.state.avatar} alt="" />
                    </div>
                    <form onSubmit={this.onAddContact} className="flex column justify-center">
                        <label htmlFor="name" className="flex column">Name
                            <input onChange={this.handleChange} value={name} type="text" name="name" id="name" />
                        </label>

                        <label htmlFor="phone" className="flex column">Phone number
                            <input onChange={this.handleChange} value={phone} type="text" name="phone" id="phone" />
                        </label>

                        <label htmlFor="email" className="flex column">Email
                            <input onChange={this.handleChange} value={email} type="text" name="email" id="email" />
                        </label>

                        <button className="btn neutral">Save</button>
                    </form>
                    <div className="options flex justify-center">
                        {this.state.contact._id && <button className="btn err" onClick={this.onRemoveContact}>Delete this contact</button>}
                        <button className="btn neutral" onClick={this.onBack}>Back</button>
                    </div>

                </section>
            </main>
        )
    }
}
