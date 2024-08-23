
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import ThemeProvider from './context/ThemeProvider'
import Home from './page/Home'
import WalletContainer from './components/WalletContainer'

export interface wallet {
  public_key:string,
  private_key:string,
}

export type wallets  = [
  Array<wallet>
  ,
  Array<wallet>
]
  


function App() {
  
  

  return (
  <ThemeProvider>
   <div className='w-screen h-screen overflow-auto dark:bg-black dark:text-white bg-white text-slate-950'>
      <div className='w-[90%] md:w-[70%] mx-auto pt-4 h-screen'>
            <NavBar/>
            <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/wallet/:chain" element={<WalletContainer/>} />
              </Routes>
            </BrowserRouter>
      </div>

      
   </div>
  </ThemeProvider>
  )
}

export default App
