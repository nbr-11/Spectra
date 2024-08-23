import React from "react";
import { useState } from "react";
import { generateMnemonic } from "bip39";
import { validateMnemonic } from "bip39";
import { useNavigate } from "react-router-dom";

const Home:React.FC = () => {
    

    const [mnemonics, setMnemonics] = useState<string>("");
    const navigate = useNavigate();
    
    return <div className=" min-h-[60%] flex justify-center items-center w-ful ">

        <div className="flex flex-col gap-4 w-full items-center">
        <h2 className="text-3xl mb-6 text-center"><span className="text-4xl font-bold">W</span>elcome to <span className="text-3xl font-bold">Spectra</span></h2>

        <div className="flex w-[100%] justify-center gap-4 flex-wrap">
            <input value={mnemonics} type="text" className="w-[80%] border-2  rounded-lg p-2 dark:bg-black dark:text-white dark:border-2 dark:border-white" placeholder="Enter the secret phrase or leave blank to generate"
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                setMnemonics(e.target.value);
            }}/>
            <button onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                if(mnemonics.length == 0){
                    setMnemonics(generateMnemonic());
                } else{
                    const isValid = validateMnemonic(mnemonics);

                    if(!isValid){
                        alert('Mnemonics not valid');
                        return;
                    } else{

                        //code to generate one eth wallet and one solana wallet
                    }
                }
            }} className="bg-black w-[80%] text-white dark:bg-white dark:text-black text-xl p-2 md:text-xl font-bold rounded-lg">Generate Wallets</button>
        </div>
        
        
            {
                mnemonics.length === 0 || !validateMnemonic(mnemonics)?"":(
                    <div className="w-[80%] flex  justify-center md:justify-start gap-4">
                        <button onClick={()=>{
                            navigate(`/wallet/sol?mnemonics=${mnemonics}`);
                        }}className="bg-slate-950 w-[150px] text-white dark:bg-white text-xl p-2 md:text-xl font-bold dark:text-black rounded-lg">Solana</button>
                        <button onClick={() => {
                            navigate(`/wallet/eth?mnemonics=${mnemonics}`);
                        }} className="bg-slate-950 w-[150px] text-white dark:bg-white text-xl p-2 md:text-xl font-bold dark:text-black rounded-lg">Etherium</button>
                    </div>
                )
            }
        
        </div>
        
    </div>
}

export default Home;