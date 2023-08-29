import { Label, Div, Button } from './MyForm.styled'
import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import Notification from './Notification';

export class MyForm extends Component {
    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
        name: '',
        number: '',
    };

    handleSubmit = (values, { resetForm }) => {
        const newContact = {
            id: uuidv4(),
            name: values.name,
            number: values.number,
        };
        this.setState(prevState => ({
            contacts: [...prevState.contacts, newContact],
        }));
        resetForm();
    };

    handleFilterChange = event => {
        this.setState({ filter: event.target.value });
    };

    validateName = value => {
        let errorMessage;
        if (!value) {
            errorMessage = 'Required';
        } else if (!/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/.test(value)) {
            errorMessage = 'Name may contain only letters, apostrophe, dash and spaces.';
        }
        return errorMessage;
    };

    validateNumber = value => {
        let errorMessage;
        if (!value) {
            errorMessage = 'Required';
        } else if (!/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(value)) {
            errorMessage = 'Invalid phone number format XXX-XX-XX';
        }
        return errorMessage;
    };

    render() {
        const { contacts, filter } = this.state;
        const filteredContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        );

        return (
            <Div>
                <h1>Phonebook</h1>

                <Formik
                    initialValues={{ name: '', number: '' }}
                    onSubmit={this.handleSubmit}
                >
                    <Form>
                        <div>
                            <Label htmlFor="name">Name:</Label>
                            <Field
                                type="text"
                                name="name"
                                id="name"
                                validate={this.validateName}
                            />
                            <ErrorMessage name="name" component="div" />
                        </div>

                        <div>
                            <Label htmlFor="number">Phone Number:</Label>
                            <Field
                                type="tel"
                                name="number"
                                id="number"
                                validate={this.validateNumber}
                            />
                            <ErrorMessage name="number" component="div" />
                        </div>

                        <Button type="submit">Add contact</Button>
                    </Form>
                </Formik>

                <h2>Contacts</h2>
                <div>
                    <Label htmlFor="filter">Search by name:</Label>
                    <input
                        type="text"
                        name="filter"
                        id="filter"
                        value={filter}
                        onChange={this.handleFilterChange}
                    />
                </div>
                {filteredContacts.length === 0 ? (
                    <Notification message="No contacts found." />
                ) : (
                    <ul>
                        {filteredContacts.map(contact => (
                            <li key={contact.id}>
                                {contact.name}: {contact.number}
                            </li>
                        ))}
                    </ul>
                )}
            </Div>
        );
    }
}

export default MyForm;
