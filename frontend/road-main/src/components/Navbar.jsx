import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='h-[70px] w-full border-b-2  bg-darkSkin flex items-center justify-between px-4'>
      {/* Logo */}
      <div className='text-2xl font-bold'>
        <Link to="/">SIH</Link>
      </div>
      
      {/* Navigation Links */}
      <div className='space-x-4'>
        <Link to="/" className= ' text-orange-800 text-xl font-medium '>Home</Link>
        <a href="#about" className= ' text-orange-800  text-xl font-medium'>About Us</a>
        <a href="#contact" className= ' text-orange-800 text-xl font-medium '>Contact</a>
      </div>

      {/* Login and Signup */}
      <div className='space-x-4 border-1 bg-blue-600 rounded shadow-md p-3'>
        <Link to="/login" className='text-white'>Login/Signup</Link>
        
      </div>
    </div>
  );
}

export default Navbar;
