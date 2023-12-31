import ContactItem from './ContactItem';

const ContactList = ({ contacts, onDeleteContact }) => {
    return (
        <ul>
            {contacts.map(contact => (
                <ContactItem
                    key={contact.id}
                    id={contact.id}
                    name={contact.name}
                    number={contact.number}
                    onDelete={onDeleteContact}
                />
            ))}
        </ul>
    );
};

export default ContactList;
