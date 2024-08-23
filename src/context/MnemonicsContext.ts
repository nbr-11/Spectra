import React, { createContext, useContext, useState } from "react";


export const mnemonicsContext = createContext<{mnemonics:string, setMnemonics:any}>({
    mnemonics:"",
    setMnemonics:()=>{
        return;
    }
});


export const useMnemonicsContext= () => {
    return useContext(mnemonicsContext);
}