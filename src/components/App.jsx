import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

export class App extends Component {
    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
    };

    handleContactSubmit = newContact => {
        this.setState(prevState => ({
            contacts: [...prevState.contacts, newContact],
        }));
    };

    handleContactDelete = contactId => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== contactId),
        }));
    };

    handleFilterChange = event => {
        this.setState({ filter: event.target.value });
    };

    render() {
        const { contacts, filter } = this.state;
        const filteredContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        );

        return (
            <div>
                <h1>Phonebook</h1>
                <ContactForm contacts={contacts} onSubmit={this.handleContactSubmit} />

                <h2>Contacts</h2>
                <Filter value={filter} onChange={this.handleFilterChange} />
                <ContactList
                    contacts={filteredContacts}
                    onDeleteContact={this.handleContactDelete}
                />
            </div>
        );
    }
}

export default App;
