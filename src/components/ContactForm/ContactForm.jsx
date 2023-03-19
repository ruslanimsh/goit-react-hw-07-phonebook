import propTypes from 'prop-types';
import React, { useState } from 'react';
import css from './ContactForm.module.css';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   useGetContactsQuery,
//   useAddContactMutation,
// } from 'redux/contactsSlice';


export const ContactForm = () => {
  
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');

  // const { data: contacts } = useGetContactsQuery();
  // const [addContact] = useAddContactMutation();
  const items = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      
      case 'number':
        setNumber(value);
        break;
      
      default:
        return;
    }
  };

 const handleSubmit = event => {
   event.preventDefault();
   //  const form = event.currentTarget;
   const contactsLists = [...items];
   if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
     alert(`${name} is already in contacts.`);
   } else {
     dispatch(addContact({  name, phone }));
   }

   setName('');
   setNumber('');
 };
  //  const contact = {
  //    name,
  //    phone,
  //  };

//    const enterContacts = contacts.some(
//      contact =>
//        (contact.name === name.toLowerCase() && contact.phone === phone) ||
//        contact.number === phone
//    );
//    enterContacts
//      ? alert(`${name} or ${phone} is already in contacts`)
//      : addContact(contact);

//    setName('');
//    setNumber('');
//  };
 

    return (
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.formLabel}>Name </label>
        <input
          className={css.formName}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Enter name"
          value={name}
          onChange={handleChange}
        />
        <label className={css.formLabel}>Number </label>
        <input
          className={css.formNumber}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Enter phone number"
          value={phone}
          onChange={handleChange}
        />
        <button className={css.formBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }


ContactForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
};
