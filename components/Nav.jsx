"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import {signIn,useSession,getProviders, signOut} from 'next-auth/react'

const Nav = () => {
  const {data:session} = useSession()

  const [providers,setProviders] = useState(null);
  const [toogleDropDown,setToggleDropDown] = useState(false);

  useEffect(() => {
    const setupProvider = async() => {
      const response = await getProviders();
      setProviders(response);
    }

    setupProvider()
  },[])

  return (
    <nav className='flex-between w-full mb-16 pt-3 '>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src='/images/logo.svg' alt="Logo" width={30} height={30}/>
        <p className='logo_text'>Promptopia</p>
      </Link>

      {console.log(session)}

      {/* Desktop navigation */}
      <div className='sm:flex hidden'>
        {session?.user  ?
        (<div className='flex gap-3 md:gap-5'>
          <Link href={'/create-prompt'} className='black_btn'>Create Post</Link>
          <button type='button' onClick={signOut} className='outline_btn'>
            Sign Out
          </button>

          <Link href={'/profile'}>
            <Image src={session?.user.image} width={37} height={37}
            className='rounded-full'/>
          </Link>
        </div>):
        (<>
        {
          providers && 
          Object.values(providers).map((provider) => {
            return (
              <button type='button' key={provider.name}
              onClick={() => {signIn(provider.id)}}
              className='black_btn'>Sign In</button>
            )
          })
        }
        </>)
        }
      </div>

      {/* Mobile naviation */}
      <div className='sm:hidden flex relative'>
        {
          session?.user ?
          (
            <div className='flex'>
            <Image src={'/images/logo.svg'} width={37} height={37}
            className='rounded-full' onClick={() => {setToggleDropDown((prev) => !prev)}}/>

            {toogleDropDown && (
              <div className='dropdown'>
                <Link href={'/profile'}
                className='dropdown_link'
                onClick={() => setToggleDropDown(false)}>
                  My Profile
                </Link>
                <Link href={'/create-prompt'}
                className='dropdown_link'
                onClick={() => setToggleDropDown(false)}>
                  Create Prompt
                </Link>
                <button type='button'
                className='mt-5 black_btn w-full'
                onClick={() => {
                  setToggleDropDown(false)
                  signOut()
                  }}>
                    Sign Out
                </button>
              </div>
            )}
            </div>
          ):(
            <>
                    {
          providers && 
          Object.values(providers).map((provider) => {
            return (
              <button type='button' key={provider.name}
              onClick={() => {signIn(provider.id)}}
              className='black_btn'>Sign In</button>
            )
          })
        }
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Nav