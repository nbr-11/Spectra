import React,{useState} from "react";
import { mnemonicsContext } from "./MnemonicsContext";


const MnemonicsProvider:React.FC<{children:React.ReactNode}> = ({children}) => {
    const [mnemonics , setMnemonics] = useState<string>('');
    return <mnemonicsContext.Provider value={{mnemonics:mnemonics, setMnemonics:setMnemonics}}>
        {children}
    </mnemonicsContext.Provider>
}

export default MnemonicsProvider;