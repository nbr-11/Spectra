
import { mnemonicToSeedSync } from "bip39";
import { HDNodeWallet } from "ethers";

export function AddEthWallets(index:number, mnemonics:string){
const seed = mnemonicToSeedSync(mnemonics);
const derivationPath = `m/44/61'/0'/0'/${index}'`;
const  hdNode= HDNodeWallet.fromSeed(seed);
const child = hdNode.derivePath(derivationPath);
const publicKey = child.address;
const secretKey = child.privateKey;


return {
    public_key:publicKey,
    private_key:secretKey
}

}