import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  // handle form submit 
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const addedUser = { name, email };


    fetch("http://localhost:5000/users", {

      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addedUser)

    })
      .then(res => res.json())
      .then(data => {
        const addedUser = data;
        const newUsers = [...users, addedUser]
        setUsers(newUsers);
      })
    nameRef.current.value = "";
    emailRef.current.value = "";





  }
  return (
    <div className="App">
      <h2>Loading data from my second node via my api personal api</h2>
      <h1>the length of my personal api data:{users.length}</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" ref={nameRef} placeholder="name" />
        <input type="email" ref={emailRef} placeholder="email" />
        <input type="submit" value="Submit" />
      </form>

      {
        users.map(user => <li key={user.id}>{user.id} Name:{user.name} <br /> {user.address}</li>)
      }
    </div>
  );
}

export default App;
