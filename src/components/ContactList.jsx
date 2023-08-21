import { useState, useEffect } from "react";
import ContactRow from "./ContactRow";


export default function ContactList({setSelectedContactId}) {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  console.table("Contacts: ", contacts);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch(
          `https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users`
        );
        const result = await response.json();
        setContacts(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchContacts();
  }, []);

  return (
    <table border="1">
      <thead>
        <tr>
          <th colSpan={3}>Contact List</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Phone</td>
        </tr>
        {error && <tr><td colSpan={3}>{error}</td></tr>}
        {contacts.map((contact) => {
          return <ContactRow key={contact.id} contact={contact} 
          setSelectedContactId={setContacts}/>;
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>Business</td>
        </tr>
      </tfoot>
    </table>
  );
}
