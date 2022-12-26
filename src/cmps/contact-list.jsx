import { ContactPreview } from './contact-preview'

export function ContactList({ contacts, onRemoveContact, onEdit }) {
    return (
        <section className="contact-list">
            {contacts.map(contact =>
                <ContactPreview
                    key={contact._id}
                    contact={contact}
                    onEdit={onEdit}
                    onRemoveContact={onRemoveContact}
                />
            )}
        </section>
    )
}
