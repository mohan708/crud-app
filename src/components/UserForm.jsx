
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserForm = ({ addData, data = [], updateUser }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const existUser = id ? data.find(data => data.id === parseInt(id)) : null;

  // Separate address fields (initial state)
  const [username, setUsername] = useState(existUser ? existUser.username : '');
  const [name, setName] = useState(existUser ? existUser.name : '');
  const [email, setEmail] = useState(existUser ? existUser.email : '');
  const [phone, setPhone] = useState(existUser ? existUser.phone : '');

  const [street, setStreet] = useState(existUser && existUser.address ? existUser.address.street : '');
  const [city, setCity] = useState(existUser && existUser.address ? existUser.address.city : '');
  const [zipcode, setZipcode] = useState(existUser && existUser.address ? existUser.address.zipcode : '');

  const [error, setError] = useState(null);

  useEffect(() => {
    if (existUser) {
      setUsername(existUser.username);
      setName(existUser.name);
      setEmail(existUser.email);
      setPhone(existUser.phone);

      // Update address fields
      if (existUser.address) {
        setStreet(existUser.address.street || '');
        setCity(existUser.address.city || '');
        setZipcode(existUser.address.zipcode || '');
      }
    }
  }, [existUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username, name, email, phone,
      address: { street, city, zipcode }  // Combine address into an object
    };

    if (existUser) {
      axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, userData)
        .then((response) => {
          updateUser({ ...response.data, id: existUser.id });
          navigate('/');
        })
        .catch(() => {
          setError('Failed to update user');
        });
    } else {
      axios.post('https://jsonplaceholder.typicode.com/users', userData)
        .then((response) => {
          const newUser = { ...response.data, id: data.length + 1 };
          addData(newUser);
          navigate('/');
        })
        .catch(() => {
          setError('Failed to create user');
        });
    }
  };

  return (
    <div>
      <h2 className='font-bold text-2xl'>{existUser ? 'Edit User' : 'Add User'}</h2>
      <h1>{error}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p className='py-2'>Username</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='border-2 rounded-md w-[40%] h-10 p-2'
            readOnly={!!existUser}  // Make readOnly if editing
          />
        </div>
        <div>
          <p className='py-2'>Name</p>
          <input
            type="text"
            minlength="3"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className='border-2 rounded-md w-[40%] h-10 p-2'
          />
        </div>
        <div>
          <p className='py-2'>Email</p>
          <input
            type="email"
            value={email}
            className='border-2 rounded-md w-[40%] h-10 p-2'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <p className='py-2'>Phone</p>
          <input
            type="tel"
            id="phone"
            name="phone"
            className='border-2 rounded-md w-[40%] h-10 p-2'
            minlength="10"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Address fields */}
        <div>
          <p className='py-2'>Street</p>
          <input
            type="text"
            value={street}
            className='border-2 rounded-md w-[40%] h-10 p-2'
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>
        <div>
          <p className='py-2'>City</p>
          <input
            type="text"
            value={city}
            className='border-2 rounded-md w-[40%] h-10 p-2'
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='px-4 bg-orange-400 text-white py-2 my-4 rounded-md'>
          {existUser ? 'Update User' : 'Create User'}
        </button>
      </form>
    </div>
  );
};
export default UserForm;

