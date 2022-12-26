import { Component } from 'react'
import { Link } from "react-router-dom"

export class ContactPreview extends Component {

    get avatar() {
        return `https://avatars.dicebear.com/api/adventurer/${this.props.contact.name}.svg?`
    }
    render() {
        const { contact, onRemoveContact, onEdit } = this.props
        return (
            <Link to={`/contact/${contact._id}`}>
                <section className="contact-preview flex column align-center">
                    <button className="delete-contact btn err" onClick={(ev) => onRemoveContact(ev, contact._id)}>X</button>
                    <img src={this.avatar} alt="" />
                    <span> {contact.name}</span>
                    <span> {contact.email}</span>
                    <span> {contact.phone}</span>
                    <button className="btn neutral" onClick={(ev) => onEdit(ev, contact._id)}>Edit</button>
                </section>
            </Link>
        )
    }
}
