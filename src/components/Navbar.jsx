import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-slate-900 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-2xl mx-9 font-serif' >iTask</span>
        </div>
        <ul className="flex mx-12 ">
            <li className=' font-serif w-20 cursor-pointer hover:font-bold transition-all duration-100'>Home</li>
            <li className=' font-serif w-20 cursor-pointer hover:font-bold transition-all duration-100'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
