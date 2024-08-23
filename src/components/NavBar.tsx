import React from "react";
import Logo from '../logo/Logo'
import Moon from '../logo/Moon';
import Sun from '../logo/Sun';
import { useTheme } from '../context/context';
import { useEffect } from 'react'

const NavBar:React.FC  = () => {
 
    const {isDark, toggleTheme} = useTheme();

  useEffect(()=>{

       if(isDark){
        document.documentElement.classList.add('dark');  
       } else{
        document.documentElement.classList.remove('dark');
       }
       
  },[isDark]);


    return <nav className='py-4 flex justify-between items-center'>
    <div className='flex'>
        <h1 className='text-5xl '>Spectra</h1>
        <div className='animate-bounce '><Logo/></div>
        
    </div>
    
    <div className='text-4xl'>
      <button onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
         toggleTheme((prev:boolean) => !prev);
      }}>
      {
          isDark?<Sun/>:<Moon/>
        }
      </button>
        
    </div>
 </nav>
}

export default NavBar;