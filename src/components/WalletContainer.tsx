import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DownArrow from "../logo/DownArrow";
import { AddSolWallet, getAirdrop, transferSol } from "../utils/Sol";
import { validateMnemonic } from "bip39";
import Wallet from "./Wallet";
import { AddEthWallets } from "../utils/Eth";
import { useMnemonicsContext } from "../context/MnemonicsContext";
import { useNavigate } from "react-router-dom";
import { getSolBalance } from "../utils/Sol";
import Airdrop from "../logo/Airdrop";
import Close from "../logo/Close";
import { toast } from "react-toastify";




const WalletContainer: React.FC = () => {
    const { chain } = useParams();
    const [wallets, setWallets] = useState<Array<{ public_key: string, private_key: string }>>([]);
    const [activeWallet, setActiveWallet] = useState<{ public_key: string, private_key: string, name: string }>();
    const [isMenuActive, setIsMenuActive] = useState(false);
    const { mnemonics } = useMnemonicsContext();
    const [balance, setBalance] = useState<number>(0);
    const [isSendActive, setIsSendActive] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        getSolBalance(activeWallet?.public_key as string)
            .then((value) => {
                setBalance(Number(value));
            })

    }, [activeWallet]);
    return (
        <div className="w-full pt-2 relative">
            <div className="w-full">
                <div className="w-[80%] md:w-[60%] relative bg-white border-2 dark:border-0 mx-auto flex justify-between items-center p-2 rounded-lg">
                    <div className="w-[80%] text-black">
                        {
                            activeWallet === undefined ? (
                                "No wallet found"
                            ) : (
                                `${activeWallet.name} ${activeWallet.public_key.substring(0, 3)}...${activeWallet.public_key.substring(activeWallet.public_key.length - 3)}`
                            )
                        }

                    </div>
                    <button className={`${isMenuActive ? "rotate-180" : ""} transition-all text-black`} onClick={() => {
                        setIsMenuActive((prev) => !prev);
                    }}>
                        <DownArrow />
                    </button>
                    {
                        isMenuActive ? (
                            <div className="absolute z-20 shadow-lg text-black h-fit flex flex-col justify-between bg-white left-0 top-16 w-[100%] rounded-lg gap-4 dark:bg-black  dark:shadow-lg dark:shadow-gray-800 p-2">

                                <div className=" flex flex-col gap-4 w-[100%] p-4 h-fit max-h-[16rem] overflow-auto">
                                    {
                                        wallets.length == 0 ? (
                                            <h1 className="text-xl text-center font-thin">No Wallets found</h1>
                                        ) : (
                                            wallets.map((wallet, index) => {
                                                return <Wallet key={index} activeWallet={activeWallet} setActiveWallet={setActiveWallet} index={index} wallet={wallet} />
                                            })
                                        )
                                    }
                                </div>

                                <div className="flex justify-center pb-2">
                                    <button onClick={() => {
                                        if (chain == "sol") {
                                            if (mnemonics == undefined || !validateMnemonic(mnemonics as string)) {
                                                alert('not a valid mnemonic');
                                                navigate('/');
                                                return;
                                            }
                                            const wallet = AddSolWallet(wallets.length, mnemonics as string);

                                            setWallets((prev) => {
                                                return [...prev, wallet];
                                            });

                                            console.log(wallet);
                                        }
                                        else if (chain == "eth") {
                                            if (mnemonics == undefined || !validateMnemonic(mnemonics as string)) {
                                                alert('not a valid mnemonic');
                                            }
                                            const wallet = AddEthWallets(wallets.length, mnemonics as string);

                                            setWallets((prev) => {
                                                return [...prev, wallet];
                                            });

                                        }
                                    }} className="dark:bg-white dark:text-black p-2 text-white  text-xl bg-slate-950 font-bold rounded-lg">Add {chain} wallet</button>
                                </div>
                            </div>
                        ) : ""
                    }

                </div>
            </div>

            <div className="w-full h-[18rem] mt-10 flex flex-col justify-between items-center ">
                <div className="text-3xl font-bold">

                    {
                        activeWallet != undefined ? (
                            <>
                                <h2 className="text-center">Balance</h2>
                                <p className="text-center">{`${(balance)}`}</p>
                            </>
                        ) : "No Active wallet selected"
                    }

                </div>

                {
                    activeWallet !== undefined ? (
                        <div className="w-full p-4 flex justify-center">
                            <button onClick={async () => {
                                await getAirdrop(activeWallet?.public_key as string);
                                setBalance(await getSolBalance(activeWallet?.public_key as string));
                            }} className="p-4 rounded-lg text-white bg-black dark:text-black dark:bg-white flex justify-center items-center gap-2">
                                <Airdrop /> <span className="font-bold text-xl">Airdrop</span>
                            </button>
                        </div>
                    ) : ""
                }

                {
                    activeWallet !== undefined ? (
                        <div className="w-full p-4 flex justify-center">
                            <button onClick={async () => {
                                setIsSendActive((prev) => !prev);
                            }} className="p-4 rounded-lg text-white bg-black dark:text-black dark:bg-white flex justify-center items-center gap-2">
                                <span className="font-bold text-xl">Send Token</span>
                            </button>
                        </div>
                    ) : ""
                }

            </div>
            {
                isSendActive == true?(
                    <div className="h-[30rem] w-full bg-white flex justify-center items-center absolute top-0 text-black dark:bg-black">
                    
                    <button onClick={() => {
                        setIsSendActive(false);
                    }} className="text-white absolute top-0 right-0 bg-red-600 p-4 rounded-lg"><Close/></button>

                    <form onSubmit={async (e:React.FormEvent) => {
                        e.preventDefault();
                        const to_public_key = e.currentTarget.getElementsByTagName("input")[0].value as string;
                        const amount = e.currentTarget.getElementsByTagName("input")[2].value as string;

                        const transactionHash = transferSol(activeWallet?.private_key as string, to_public_key, activeWallet?.private_key as string, Number(amount));
                        
                        toast.success("Transaction Successfull"+transactionHash);

                        e.currentTarget.getElementsByTagName("input")[0].value = "";
                        e.currentTarget.getElementsByTagName("input")[2].value = "";
                        
                        const balance_temp = await getSolBalance(activeWallet?.public_key as string);
                        setBalance(balance_temp);
                        
                        setIsSendActive(false);


                    }} action="" className="flex flex-col gap-5  p-3 rounded-lg bg-white shadow-lg w-[20rem]">

                        <div className="w-full flex flex-col gap-4">

                            <h1 className="text-center text-3xl font-bold">Transfer</h1>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="to-address" className="font-bold text-sm">To</label>
                                <input id={"to-address"} type="text" className="p-3 text-xl rounded-lg text-black border-2"/>
                            </div>
                        
                            <div className="flex flex-col  gap-1">
                                <label htmlFor="private-key" className="font-bold text-sm">Private Key</label>
                                <input id={"private-key"} type="password" value={activeWallet?.private_key} disabled={true} className="p-4 text-xl rounded-lg text-black"/>
                            </div>

                            <div className="flex flex-col  gap-1">
                                <label htmlFor="token_no" className="font-bold text-sm">Amount of Token</label>
                                <input id={"token_no"} type="text" className="p-3 text-xl rounded-lg text-black border-2"/>
                            </div>
                        

                        
                        </div>
                        

                        <button onClick={() => {
                            // transferSol(activeWallet?.public_key as string, ,activeWallet?.private_key as string);
                        }} type="submit" className="p-4 bg-slate-900  text-white rounded-lg text-2xl font-bold">Send</button>
                    </form>
            </div>
                ):""
            }
              


        </div>
    )
}

export default WalletContainer