import React from "react";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import DownArrow from "../logo/DownArrow";
import { AddSolWallet } from "../utils/Sol";
import { validateMnemonic } from "bip39";
import Wallet from "./Wallet";



const WalletContainer: React.FC = () => {
    const { chain } = useParams();
    const [wallets, setWallets] = useState<Array<{ public_key: string, private_key: string }>>([]);
    const [activeWallet, setActiveWallet] = useState<{ public_key: string, private_key: string }>();
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [searchParams] = useSearchParams();

    return (
        <div className="w-full min-h-[85%] pt-2">
            <div className="w-full">
                <div className="w-[80%] md:w-[60%] relative bg-white border-2 dark:border-0 mx-auto flex justify-between items-center p-2 rounded-lg">
                    <div className="w-[80%] text-black">
                        {
                            activeWallet === undefined ? (
                                "No wallet found"
                            ) : (
                                `${activeWallet.public_key}`
                            )
                        }

                    </div>
                    <button className={`${isMenuActive ? "rotate-180" : ""} transition-all text-black`} onClick={(e) => {
                        setIsMenuActive((prev) => !prev);
                    }}>
                        <DownArrow />
                    </button>
                    {
                        isMenuActive ? (
                            <div className="absolute shadow-lg text-black h-fit flex flex-col justify-between bg-white left-0 top-16 w-[100%] rounded-lg gap-4">

                                <div className=" flex flex-col gap-4 w-[100%] p-4 h-fit max-h-[16rem] overflow-auto">
                                    {
                                        wallets.length == 0 ? (
                                            <h1 className="text-xl text-center font-thin">No Wallets found</h1>
                                        ) : (
                                            wallets.map((wallet, index) => {
                                                return <Wallet index={index} wallet={wallet}/>
                                            })
                                        )
                                    }
                                </div>

                                <div className="flex justify-center pb-2">
                                    <button onClick={() => {
                                        if (chain == "sol") {
                                            if (searchParams.get('mnemonics') == undefined || !validateMnemonic(searchParams.get('mnemonics') as string)) {
                                                alert('not a valid mnemonic');
                                            }
                                            const wallet = AddSolWallet(wallets.length, searchParams.get('mnemonics') as string);

                                            setWallets((prev) => {
                                                return [...prev, wallet];
                                            });

                                            console.log(wallet);
                                        }
                                    }} className="bg-green-600 p-2 text-white font-bold rounded-lg">Add {chain} wallet</button>
                                </div>
                            </div>
                        ) : ""
                    }

                </div>
            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
    )
}

export default WalletContainer