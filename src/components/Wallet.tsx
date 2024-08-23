import React from "react";

const Wallet:React.FC<{index:number, wallet:{public_key:string, private_key:string}}> = ({index, wallet}) => {
    return <div onClick={() => {
        console.log(wallet);
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
                <input id={`wallet-${index}`} disabled={true} className="w-[80%] p-2 rounded-lg bg-transparent" type="text" value={wallet.public_key} />
                <button className="w-[20%]">copy</button>
            </div>
        </div>
        <div className="w-full">
            <label htmlFor={`wallet-${index}`}>
                Private key:
            </label>
            <div>
                <input type="password" disabled={true} className="w-[80%] p-2 rounded-lg bg-transparent" value={wallet.private_key} />
                <button onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
                    console.log('clicked');
                    e.stopPropagation();
                }}className="w-[20%]">copy</button>
            </div>
        </div>
        
    </div>
</div>
}

export default Wallet;