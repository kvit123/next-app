'use client'

import React from 'react'

export default function page() {

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event.target.fname.value)
        const data = {
            "fname" : event.target.fname.value,
            "lname" : event.target.lname.value,
            "username" :event.target.username.value,
            "passowrd" : "1234",
            "email" : "test@demo.com",
            "avatar" : "https://www.melivecode.com/users/cat.png"
        }
        //console.log(data)
        fetch('https://www.melivecode.com/api/users/create', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(data)
        })
        .then((res)=> res.json())
        .then(result => {
            console.log(result)
            alert(result.message)
            if(result.status === 'ok') {
                window.location.href='/user'
            }
        })
    }
  return (
    <div><h2>create user</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <input 
                    type='text'
                    placeholder='Firstname'
                    id='fname'
                    name='fname'
                />
            </div>
            <div>
                <input 
                    type='text'
                    placeholder='Lastname'
                    id='lname'
                    name='lname'
                />
            </div>
            <div>
                <input 
                    type='text'
                    placeholder='Username'
                    id='username'
                    name='username'
                />
            </div>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}
