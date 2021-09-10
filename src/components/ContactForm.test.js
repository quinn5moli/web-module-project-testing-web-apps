import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    
    render(<ContactForm />);

    const value = screen.getByText('Contact Form')

    expect(value).toBeTruthy();

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    
    render(<ContactForm />);

    const nameInput = screen.getByLabelText('First Name*')

    userEvent.type(nameInput, 'Q');

    const checkError = screen.getAllByText(/Error/i);

    expect(checkError).toHaveLength(1);

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    
    render(<ContactForm />);

    const firstNameText = screen.getByLabelText('First Name*')
    const lastNameText = screen.getByLabelText('Last Name*')
    const emailText = screen.getByLabelText('Email*')
    const submitBtn = screen.getByRole('button')

    userEvent.type(firstNameText,'')
    userEvent.type(lastNameText, '');
    userEvent.type(emailText, '')
    userEvent.click(submitBtn)    

    const checkErrors = await screen.getAllByText(/Error/i);

    expect(checkErrors).toHaveLength(3);

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    
    render(<ContactForm />);

    const firstNameText = screen.getByLabelText('First Name*')
    const lastNameText = screen.getByLabelText('Last Name*')
    const emailText = screen.getByLabelText('Email*')
    const submitBtn = screen.getByRole('button')

    userEvent.type(firstNameText,'Firstname')
    userEvent.type(lastNameText, 'Lastname');
    userEvent.type(emailText, '')
    userEvent.click(submitBtn)    

    const checkErrors = await screen.getAllByText(/Error/i);

    expect(checkErrors).toHaveLength(1);

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
    render(<ContactForm />);

    const firstNameText = screen.getByLabelText('First Name*')
    const lastNameText = screen.getByLabelText('Last Name*')
    const emailText = screen.getByLabelText('Email*')
    const submitBtn = screen.getByRole('button')

    userEvent.type(firstNameText,'Firstname')
    userEvent.type(lastNameText, 'Lastname');
    userEvent.type(emailText, 'firstname@')
    userEvent.click(submitBtn)    

    const checkErrors = await screen.getAllByText(/email must be a valid email address/i);

    expect(checkErrors).toHaveLength(1);

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
    render(<ContactForm />);

    const firstNameText = screen.getByLabelText('First Name*')
    const lastNameText = screen.getByLabelText('Last Name*')
    const emailText = screen.getByLabelText('Email*')
    const submitBtn = screen.getByRole('button')

    userEvent.type(firstNameText,'Firstname')
    userEvent.type(lastNameText, '');
    userEvent.type(emailText, 'firstname@gmail.com')
    userEvent.click(submitBtn)    

    const checkErrors = await screen.getAllByText(/lastName is a required field/i);

    expect(checkErrors).toHaveLength(1);

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
    render(<ContactForm />);

    const firstNameText = screen.getByLabelText('First Name*')
    const lastNameText = screen.getByLabelText('Last Name*')
    const emailText = screen.getByLabelText('Email*')
    const submitBtn = screen.getByRole('button')

    userEvent.type(firstNameText,'Firstname')
    userEvent.type(lastNameText, 'Lastname');
    userEvent.type(emailText, 'firstname@gmail.com')
    userEvent.click(submitBtn)

    const checkForFirstName = screen.getByTestId('firstnameDisplay')
    const checkForLastName = screen.getByTestId('lastnameDisplay')
    const checkForEmail = screen.getByTestId('emailDisplay')
    const checkForMessage = screen.queryByTestId('messageDisplay')

    expect(checkForFirstName).toHaveTextContent('Firstname')
    expect(checkForLastName).toBeInTheDocument('Lastname');
    expect(checkForEmail).toBeInTheDocument('firstname@gmail.com');
    expect(checkForMessage).not.toBeInTheDocument();

});

test('renders all fields text when all fields are submitted.', async () => {
   
    render(<ContactForm />);

    const firstNameText = screen.getByLabelText('First Name*')
    const lastNameText = screen.getByLabelText('Last Name*')
    const emailText = screen.getByLabelText('Email*')
    const messageText = screen.getByLabelText('Message')
    const submitBtn = screen.getByRole('button')

    userEvent.type(firstNameText,'Firstname');
    userEvent.type(lastNameText, 'Lastname');
    userEvent.type(emailText, 'firstname@gmail.com');
    userEvent.type(messageText, "What's up?");
    userEvent.click(submitBtn)

    const checkForFirstName = screen.getByTestId('firstnameDisplay')
    const checkForLastName = screen.getByTestId('lastnameDisplay')
    const checkForEmail = screen.getByTestId('emailDisplay')
    const checkForMessage = screen.getByTestId('messageDisplay')

    expect(checkForFirstName).toHaveTextContent('Firstname')
    expect(checkForLastName).toHaveTextContent('Lastname');
    expect(checkForEmail).toHaveTextContent('firstname@gmail.com');
    expect(checkForMessage).toHaveTextContent("What's up?");

});