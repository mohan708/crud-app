import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserForm = ({addData,data=[],updateUser}) => {
    const navigate = useNavigate();

     const { id  } = useParams();
     
     const existUser = id ? data.find(data=> data.id === parseInt(id) ) : null;

     console.log(existUser)

    const [name,setName] =useState(existUser ? existUser.name : '');
    const [email,setEmail] =useState(existUser ? existUser.email : '');
    const [phone,setPhone] =useState(existUser ? existUser.phone : '');
    const [error, setError] = useState(null);

    useEffect(()=>{
      if(existUser){
        setName(existUser.name);
        setEmail(existUser.email);
        setPhone(existUser.phone);
      }
    },[existUser]);

    const handleSubmit =  (e)=>{
        e.preventDefault();
        const userData = {name,email,phone}

         
        if(existUser){



          if(existUser.id > 10){
                updateUser({...existUser, ...userData,})
                navigate('/')
          }

           else{
            axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,userData)
            .then((response)=>{
               
              console.log('update',response)
             updateUser( {...response.data, id :existUser.id})
          
            navigate('/')
  
            }).catch(()=>{
              setError('faield to update user')
            })
           }
       
          

        }

  
        else{
          axios.post('https://jsonplaceholder.typicode.com/users',userData )
          .then((response)=>{
              const newUser = {...response.data, id:data.length+1}
           addData(newUser)
           navigate('/')

          })
          .catch(()=>{
               setError('failed to be create user')  
          })
        }
 
       
           
    }


  return (
   
    <div>
         <h2 className='font-bold text-2xl'>Add User cursor-pointer</h2>
          <h1>{error}</h1>
           <form action="" onSubmit={handleSubmit} >
              <div>
                <p className='py-2'>Name</p>
                <input 
                type="text"
             
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className='border-2 rounded-md w-[40%] h-10 p-2' 
                />
              </div>
              <div>
                <p className='py-2'>Email</p>
                <input
                type="Email" 
                value={email}
                className='border-2 rounded-md w-[40%] h-10 p-2' 
                onChange={(e)=>setEmail(e.target.value)}
                required/>
              </div>
              <div>
                <p className='py-2'>Phone</p>
                <input 
                type="tel" 
                id="phone" 
                name="phone" 
                
                minlength="10" 
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
               
                required className=' rounded-md w-[40%] h-10 p-2'/>
            </div>  
            <button type='submit' className=' px-4 bg-orange-400 text-white py-2 my-4 rounded-md'>
            {existUser ? 'Update' : 'Create User'}
           </button>
                   
           </form>
    

    </div>
  )
}

export default UserForm