import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { delContact } from 'redux/operations';
// import { getFilter } from '../../redux/filterSlice';
// import {
//   useGetContactsQuery,
//   useDeleteContactMutation,
// } from '../../redux/contactsSlice';
import propTypes from 'prop-types';
import css from './ContactList.module.css';


// const getVisibleContacts = (contacts, filter) => {
//   if (!filter) {
//     return contacts;
//   } else {
//     return contacts.filter(contact => {
//       return contact.name.toLowerCase().includes(filter.toLowerCase());
//     });
//   }
// };

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const findContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    if (contacts) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  };

  const filteredContacts = findContacts();
  // const visibleContacts = getVisibleContacts(contacts, filter);

  const dispatch = useDispatch();
  const handleDelete = id => dispatch(delContact(id));

  return (
    <div className={css.wraperContactList}>
      <ul className={css.contactList}>
        {/* {visibleContacts.map((contact, id) => ( */}
        {filteredContacts.map(({ id, name, phone }) => {
          return (
            <li key={id} className={css.contactListItem}>
              {name}: {phone}
              <button
                type="button"
                className={css.contactListItemBtn}
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
            </li>
          );
          // ))}
        })}
      </ul>
    </div>
  );
};
  // const filter = useSelector(getFilter);
  // const { data: contacts, isFetching } = useGetContactsQuery();
  // const [deleteContact, { isLoading }] = useDeleteContactMutation();

  // const findContacts = () => {
  //   const normalizedFilter = filter.toLowerCase();
  //   if (contacts) {
  //     return contacts.filter(contact =>
  //       contact.name.toLowerCase().includes(normalizedFilter)
  //     );
  //   }
  // };

  // const filteredContacts = findContacts();

//   return (
//     <div className={css.wraperContactList}>
//       {isFetching && <p>Loading...</p>}
//       {contacts && (
//         <ul className={css.contactList}>
//           {filteredContacts.map(({ id, name, phone }) => {
//             return (
//               <li key={id} className={css.contactListItem}>
//                 <div>
//                   <h3>{name}:</h3>
//                   <p>{phone}</p>
//                 </div>
//                 <button
//                   type="button"
//                   className={css.contactListItemBtn}
//                   onClick={() => {
//                     deleteContact(id);
//                   }}
//                 >
//                   {isLoading ? '...' : 'Delete'}
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   );
// };

////////////

// export const ContactList = ({ contacts, handleDelete }) => (
//   <div className={css.wraperContactList}>
//     <ul className={css.contactList}>
//       {contacts.map((contact, id) => (
//         <li key={id} className={css.contactListItem}>
//           {contact.name}: {contact.number}
//           <button
//             type="button"
//             className={css.contactListItemBtn}
//             onClick={() => handleDelete(contact.id)}
//           >
//             Delete
//           </button>
//         </li>
//       ))}
//     </ul>
//   </div>
// );

ContactList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.exact({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ),
  handleDelete: propTypes.func.isRequired,
};
