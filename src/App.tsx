
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import ThemeProvider from './context/ThemeProvider'
import MnemonicsProvider from './context/MnemonicsProvider'
import Home from './page/Home'
import WalletContainer from './components/WalletContainer'
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from './context/ThemeContext'

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
  
  const {isDark} = useTheme();

  return (
  <MnemonicsProvider>
  
  <ToastContainer
    position="bottom-left"
    autoClose={5000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme={`${isDark?"dark":"light"}`}
/>
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
  
  </MnemonicsProvider>
  )
}

export default App
