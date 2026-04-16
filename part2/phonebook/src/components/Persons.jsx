const Persons = ({ name, phone, onClick }) => {
  return (
    <div>
      {name} {phone}
      <button onClick={onClick}>delete</button>
    </div>
  );
};

export default Persons;
