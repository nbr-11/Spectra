import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DownArrow from "../logo/DownArrow";
import { AddSolWallet, getAirdrop } from "../utils/Sol";
import { validateMnemonic } from "bip39";
import Wallet from "./Wallet";
import { AddEthWallets } from "../utils/Eth";
import { useMnemonicsContext } from "../context/MnemonicsContext";
import { useNavigate } from "react-router-dom";
import { getSolBalance } from "../utils/Sol";
import Airdrop from "../logo/Airdrop";




const WalletContainer: React.FC = () => {
    const { chain } = useParams();
    const [wallets, setWallets] = useState<Array<{ public_key: string, private_key: string }>>([]);
    const [activeWallet, setActiveWallet] = useState<{ public_key: string, private_key: string, name: string }>();
    const [isMenuActive, setIsMenuActive] = useState(false);
    const { mnemonics } = useMnemonicsContext();
    const [balance, setBalance] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        getSolBalance(activeWallet?.public_key as string)
            .then((value) => {
                setBalance(Number(value));
            })

    }, [activeWallet]);
    return (
        <div className="w-full pt-2">
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

            <div className="w-full h-[10rem] mt-10 flex flex-col justify-between items-center">
                <div className="text-3xl font-bold">
                    
                        {
                            activeWallet != undefined ? (
                                <>
                                     <h2 className="text-center">Balance</h2>
                                     <p className="text-center">{`${(balance)}`}</p>
                                </>
                           ): "No Active wallet selected"
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

            </div>


        </div>
    )
}

export default WalletContainer