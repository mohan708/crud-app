import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = ({ data, deletes }) => {
    return (
        <div className='p-4 max ' >
            <h1 className='text-center mb-7 font-bold text-2xl'>User List</h1>
            <Link to={"/form"} className='bg-cyan-500 text-white py-3 px-4 rounded-md cursor-pointer'>Add User</Link>

            <table className='border border-gray-300 w-full  table-auto border-collapse my-4' >
                <thead className='bg-gray-100 border-b border-gray-300 '>
                    <tr>
                        <th className="px-4 py-2 text-left border-1">Username</th>
                        <th className="px-4 py-2 text-left border-2">Name</th>
                        <th className="px-4 py-2 text-left border-2">Email</th>
                        <th className="px-4 py-2 text-left border-2">Phone</th>
                        <th className="px-4 py-2 text-left border-2">Address</th>
                        <th className="px-4 py-2 text-left border-2 w-[10%]">Action</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        data.map((data, index) => {
                            return (
                                <tr key={index} className=''>
                                    <td className="px-4 py-2 border-2">{data.username}</td>
                                    <td className="px-4 py-2 border-2" >{data.name}</td>
                                    <td className="px-4 py-2 border-2">{data.email}</td>
                                    <td className="px-4 py-2 border-2">{data.phone}</td>
                                    <td className="px-4 py-2 border-2">{data.address.street} , {data.address.city}</td>
                                    <td className="px-4 py-2  border-b-2 flex flex-col gap-2 ">
                                    <Link to={`/edit/${data.id}`} className='py-1 px-2  bg-green-500 text-white rounded-md text-center'>Edit</Link>
                                     <button className=' py-1 px-2  lg:mt-0 bg-red-500  text-white rounded-md' onClick={() => deletes(data.id)} >Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Home