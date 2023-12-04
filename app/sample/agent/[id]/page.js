import React from 'react'
import Image from 'next/image'

async function getData(id) {
    const res = await fetch('https://www.melivecode.com/api/attractions/'+id)
    return res.json()
}

export default async function page( {params}) {

  const data = await getData(params.id)
  return (
    <div>
        <div>{data.attraction.name}</div>
        <Image 
            src={data.attraction.coverimage}
            alt={data.attraction.name}
            width={500}
            height={333}
        />
        <div>{data.attraction.detail}</div>
    </div>
  )
}
