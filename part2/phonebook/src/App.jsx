import { useEffect, useState } from "react";
import personService from "./services/person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import "./index.css";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchName, setSearchName] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
    if (searchName === "") {
      setShowAll(true);
    } else {
      setShowAll(false);
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    };

    if (persons.some((person) => person.name === personObject.name)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const person = persons.find((p) => p.name === personObject.name);
        const changedPerson = { ...person, number: newPhone };

        personService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedPerson)),
            );
            setNewName("");
            setNewPhone("");
            setMessageType("success");
            setMessage(`Updated ${returnedPerson.name}'s number`);
            setTimeout(() => setMessage(null), 5000);
          })
          .catch((error) => {
            setMessageType("error");
            setMessage(
              `Information of ${person.name} has already been removed from server`,
            );
            setTimeout(() => setMessage(null), 5000);
            setPersons(persons.filter((p) => p.id !== person.id));
          });
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewPhone("");
          setMessageType("success");
          setMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => setMessage(null), 5000);
        })
        .catch((error) => {
          setMessageType("error");
          setMessage(error.response.data.error);
          console.log(error.response.data.error);
        });
    }
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService.deletePerson(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchName),
      );

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter value={searchName} onChange={handleSearchNameChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onChangeName={handleNameChange}
        numberValue={newPhone}
        onChangeNumber={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <div>
        {personsToShow.map((person) => (
          <Persons
            key={person.id}
            name={person.name}
            phone={person.number}
            onClick={() => deletePerson(person)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
