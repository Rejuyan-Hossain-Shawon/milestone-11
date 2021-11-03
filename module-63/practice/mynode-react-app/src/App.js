import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  // handle submit
  const handleSubmit = (e) => {
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
        const newUsers = [...users, data];
        setUsers(newUsers);
      })
    nameRef.current.value = "";
    emailRef.current.value = "";
  }
  return (
    <div className="App">
      <h2>Getting data from my own api node express</h2>
      <form onSubmit={handleSubmit}>

        <input type="text" ref={nameRef} placeholder="your name" />
        <input type="email" ref={emailRef} placeholder="your email" />
        <input type="submit" value="Submit" />
      </form>
      <h1>Length {users.length}</h1>
      {
        users.map(user => <li key={user.id}>{user.id} {user.name} {user.email}</li>)
      }
    </div>
  );
}

export default App;
