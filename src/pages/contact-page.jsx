import { Component } from 'react'
import { ContactList } from '../cmps/contact-list'
import { ContactFilter } from '../cmps/contact-filter'

import { contactService } from '../services/contact.service'
export class ContactPage extends Component {
  state = {
    contacts: null,
    filterBy: { name: '', phone: '', email: '' }
  }
  onChangeFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadContacts)
  }

  async loadContacts() {
    try {
      const contacts = await contactService.getContacts(this.state.filterBy)
      this.setState({ contacts })
    } catch (err) {
      console.log('err:', err)
    }
  }

  async componentDidMount() {
    this.loadContacts()
  }

  onEdit = async (ev, contactId) => {
    ev.preventDefault()
    this.props.history.push(`/contact/edit/${contactId}`)
  }
  onRemoveContact = async (ev, contactId) => {
    ev.preventDefault()
    try {
      await contactService.remove(contactId)
      this.setState(({ contacts }) => ({
        contacts: contacts.filter(contact => contact._id !== contactId)
      }))
    } catch (err) {
      console.log('err:', err)
    }
  }

  render() {
    const { contacts, filterBy } = this.state
    if (!contacts) return <h1>Loading Contacts....</h1>
    return (
      <main>
        <ContactFilter filterBy={filterBy} onChangeFilter={this.onChangeFilter} />
        <ContactList contacts={contacts} onRemoveContact={this.onRemoveContact} onEdit={this.onEdit} />
      </main>
    )
  }
}
