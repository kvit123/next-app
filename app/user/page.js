'use client'

import React, {useState, useEffect} from 'react'
import Link from 'next/link'

export default function page() {
 
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('https://www.melivecode.com/api/users')
        .then(response => response.json())
        .then(result => {
            console.log(result)
            setUsers(result)
        })  
    },[])

    const handleDelete = (id) => {
        fetch('https://www.melivecode/api/users/delete', {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                id: id
            })
        })
        .then((res) => res.json())
        .then(result => {
            alert(result.message)
            window.location.reload();
        })
    }

  return (
    <div>
        <Link href='user/create'>Create user</Link>
        <ul>
         {
            users.map(user => (
                <li key={user.id}>
                    <img src={user.avatar} height={75}></img> 
                    {user.fname}
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                    <Link href={'/user/edit/'+user.id}>Edit</Link>
                </li>
            ))
         }
        </ul>
    </div>
  )
}
