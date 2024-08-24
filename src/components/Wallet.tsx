import React,{Dispatch} from "react";
import Copy from "../logo/Copy";
import { toast } from "react-toastify";

interface props{
    index:number
    wallet:{public_key:string, private_key:string}
    activeWallet:{public_key:string, private_key:string, name:string} | undefined
    setActiveWallet:Dispatch<React.SetStateAction<{
        public_key: string;
        private_key: string;
        name:string,
    } | undefined>>
}

const Wallet:React.FC<props> = ({index, wallet, setActiveWallet}) => {

    return <div onClick={() => {
        setActiveWallet({
            ...wallet,
            name:`Wallet ${index}`,
        });
    }} className="w-full hover:bg-blue-600 dark:hover:bg-blue-800 hover:text-white pt-4 p-2 rounded-lg flex flex-col dark:bg-gray-900 dark:text-white bg-gray-100">
    <p className="text-center font-bold text-2xl">
        Wallet{" " + index}
    </p>
    <div className="flex flex-col gap-2 mt-4">
        <div className="w-full">
            <label htmlFor={`wallet-${index}`} className="text-xl font-bold">
                Public key:
            </label>
            <div className="flex">
                <input id={`wallet-${index}`}  className="w-[80%] p-2 rounded-lg bg-transparent outline-none" type="text" value={wallet.public_key} />
                <button onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                    window.navigator.clipboard.writeText(wallet.public_key);
                    toast.success("key copied!");
                    e.stopPropagation();
                }} className="w-[18%] flex justify-center items-center"><Copy/></button>
            </div>
        </div>
        <div className="w-full">
            <label htmlFor={`wallet-${index}`}  className="text-xl font-bold">
                Private key:
            </label>
            <div className="flex mt-2">
                <input type="password" className="w-[80%] p-2 rounded-lg bg-transparent outline-none" value={wallet.private_key} />
                <button onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
                    window.navigator.clipboard.writeText(wallet.private_key);
                    toast.success("key copied!");
                    e.stopPropagation();
                }}className="w-[20%]  flex justify-center items-center"><Copy/></button>
            </div>
        </div>
        
    </div>
</div>
}

export default Wallet;