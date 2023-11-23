'use client'

import React from 'react'
import { useState, useEffect } from 'react'

export default function Page({params}) {

    const [ user, setUser ] = useState({
            "id": "",
            "fname": "",
            "lname": "",
            "username": "",
            "password": "",
            "email": "",
            "avatar": ""
    })

    useEffect(() => {
        fetch('https://www.melivecode.com/api/users/'+params.id)
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            setUser(result.user)
        })

    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch('https://www.melivecode.com/api/users/update', {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(user)
        })
        .then((response) => response.json())
        .then(result => {
            alert(result.message)
        })
    }

  return (
    <div>
        <h1>Edit</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <input 
                    type='text'
                    placeholder='Firstname'
                    id='fname'
                    name='fname'
                    value={user.fname}
                    onChange={(event) => {
                        setUser(() => ({
                            ...user,
                            fname: event.target.value
                        }))
                    }}
                />
            </div>
            <div>
                <input 
                    type='text'
                    placeholder='Lastname'
                    id='lname'
                    name='lname'
                    value={user.lname}
                    onChange={(event) => {
                        setUser(() => ({
                            ...user,
                            lname: event.target.value
                        }))
                    }}
                />
            </div>
            <div>
                <input 
                    type='text'
                    placeholder='Username'
                    id='username'
                    name='username'
                    value={user.username}
                    onChange={(event) => {
                        setUser(() => ({
                            ...user,
                            username: event.target.value
                        }))
                    }}
                />
            </div>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}
