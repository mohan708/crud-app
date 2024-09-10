import Home from './components/Home'
import './App.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import UserForm from './components/UserForm';
import { BrowserRouter, Route, Routes, } from "react-router-dom";


function App() {

  const [data, setData] = useState([])
  const [error,setError] =useState('');

  // api fetch using axios  
  const crudData = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users')
      // console.log(res.data)
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    crudData()
  }, [])


  // add data 
  const addData = (newuser) =>{
    setData([...data,newuser])
  }
// update data
  const updateUser = (updatedUser) =>{
    const updateUsers = data.map(user=>  user.id === updatedUser.id ? updatedUser : user
    );
    setData(updateUsers)
  }





  const deletes = (id)=>{ 
   
  axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
  .then(()=>{
    
     setData( data.filter((e)=> e.id != id))  
    

  }).catch((e)=>{
    setError('failed to load user');
  })
}



  return (
    <>
      <BrowserRouter>
        <div className='container mx-auto p-4'>
            <h1>{error}</h1>
          <Routes>
            <Route path='/' element={<Home data= {data}  deletes={deletes}/>} />
            <Route path ='/form' element= {<UserForm addData={addData} data={data} /> } />
            <Route path ={`/edit/:id`} element= {<UserForm data={data} updateUser= {updateUser}/> } />
          </Routes>
        </div>
      </BrowserRouter>
    </>

  )
}

export default App
