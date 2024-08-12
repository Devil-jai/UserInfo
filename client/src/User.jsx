import axios from 'axios'
import React, { useEffect, useState } from 'react'
const url = "http://localhost:4000"

function User() {
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [user,setUser] = useState([])
    const [users,setUsers] = useState([])
    const [editingUser,setEditingUser] = useState(null)
    const AddUser = ()=>{
        axios.post(`${url}/add`,{
                        name:name,
                        email:email,
                        passoword:password
                    })
                    .then(result=>{
                        window.location.reload()
                    }).catch(err=>console.log(err))
    }
    const getUser = () =>{
        axios.get(`${url}/get`)
        .then((result)=> {setUser(result.data.users)
            // console.log(result.data.users);
        })
        .catch((err)=>console.log(err))

    }
    const deleteuser = (id) =>{
        axios.delete(`${url}/delete/`+id)
        .then(result=>{
            window.location.reload()
        })
        .catch(err=>console.log(err))
    }

    const startEditing = (user) =>{
        setEditingUser(user);
        setName(user.name)
        setEmail(user.email)
        setPassword(user.passoword)
    }
    const updateuser = (id) =>{
        axios.put(`${url}/update/`+editingUser._id,{
            name:name,
            email:email,
            password:password
        })
        .then(result =>{
           setUsers(
            users.map((person)=>
                person._id === editingUser._id ? result.data.person : person
        )
           )
           window.location.reload()
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        getUser()
    },[])
  return (
    <div className="container mt-4">
        <div className="items-center flex flex-col ">
            <h1 className="text-3xl font-bold ">
                Person Detail App
            </h1>
            <div className="w-1/4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        onChange={(e)=>setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" value={name} type="text" placeholder="Username"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="email" placeholder="Email"/>
                </div>
               
                {editingUser?(<button type="button" onClick={updateuser} className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >Update User</button>
                ):(<>
                 <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="Password"/>

                </div>
                <button type="button" onClick={AddUser} className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >Add User</button>
                </>
               
                )}
                
            </div>
            
            <div>
                {
                    user.map((data)=>{
                        return(
                            <div className="flex mt-12">
                    <div className='flex-auto w-32'>{data.name}</div>
                    <div className='flex-auto w-32'>{data.email}</div>
                    <button type="button" onClick={()=>startEditing(data)}  className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >Update</button>
                    <button type="button" onClick={()=>deleteuser(data._id)}  className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >delete</button>
                    
                </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default User
