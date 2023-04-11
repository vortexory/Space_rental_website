'use client'
import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex place-items-center gap-2 font-bold tracking-widest'>
    <Image 
    alt='logo'
    className='hidden md:block cursor-pointer'
    height={50}
    width={50}
    src='/images/logo.png'
    />
    SPACE
    </div>
  )
}

export default Logo