'use client'
import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className='hidden md:flex md:place-items-center gap-2 font-bold tracking-widest cursor-pointer'>
    <Image 
    alt='logo'
    className=''
    height={40}
    width={40}
    src='/images/logo.png'
    />
    SPACE
    </div>
  )
}

export default Logo