import React, { useEffect, useState } from 'react'
import { Menu } from "lucide-react";

function Navbar() {
    const [open,setOpen] = useState(false);
    useEffect(()=>{
        setOpen(true);
    },[]);
    return (
        <div 
            className='w-full border-2 md:rounded-full md:mt-4 md:h-17 md:flex md:justify-between md:items-center grid grid-cols-2 p-3'>
            <div className='ml-4'>
                <p className='hover:underline duration-200 text-xl font-light'>Logo</p>
            </div>
            <Menu 
                className='md:hidden'
                onClick={()=>setOpen(!open)}
            />
            <div 
                className={ 
                    `${open ? "md:flex mr-8 md:gap-10": "hidden"} flex flex-col  p-3 md:flex-row`
                }>
                <p className='hover:underline duration-200 text-xl font-light'>Home</p>
                <p className='hover:underline duration-200 text-xl font-light'>About me</p>
                <p className='hover:underline duration-200 text-xl font-light'>Games</p>
            </div>
        </div>
    )
}

export default Navbar
