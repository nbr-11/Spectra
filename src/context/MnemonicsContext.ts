import { createContext, useContext } from "react";


export const mnemonicsContext = createContext<{mnemonics:string, setMnemonics:any}>({
    mnemonics:"",
    setMnemonics:()=>{
        return;
    }
});


export const useMnemonicsContext= () => {
    return useContext(mnemonicsContext);
}