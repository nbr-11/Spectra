import React,{Dispatch} from "react";

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
    }} className="w-full hover:bg-blue-600 hover:text-white bg-red-100 pt-4 p-2 rounded-lg flex flex-col ">
    <p className="text-center font-bold">
        Wallet{" " + index}
    </p>
    <div className="flex flex-col gap-2">
        <div className="w-full">
            <label htmlFor={`wallet-${index}`}>
                Public key:
            </label>
            <div>
                <input id={`wallet-${index}`}  className="w-[80%] p-2 rounded-lg bg-transparent outline-none" type="text" value={wallet.public_key} />
                <button onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                    window.navigator.clipboard.writeText(wallet.public_key);
                    e.stopPropagation();
                }} className="w-[20%]">copy</button>
            </div>
        </div>
        <div className="w-full">
            <label htmlFor={`wallet-${index}`}>
                Private key:
            </label>
            <div>
                <input type="password" className="w-[80%] p-2 rounded-lg bg-transparent outline-none" value={wallet.private_key} />
                <button onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
                    window.navigator.clipboard.writeText(wallet.private_key);
                    e.stopPropagation();
                }}className="w-[20%]">copy</button>
            </div>
        </div>
        
    </div>
</div>
}

export default Wallet;