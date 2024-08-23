import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

export function AddSolWallet(index:number, mnemonics:string){

    const seed = mnemonicToSeedSync(mnemonics);
    const derivationPath = `m/44'/501'/${index}'/0'`;

    const derivedSeedPhrase = derivePath(derivationPath, seed.toString('hex')).key;
    // const secretKey = nacl.sign.keyPair.fromSeed(derivedSeedPhrase).secretKey;
    const secretKey = Keypair.fromSeed(derivedSeedPhrase).secretKey;
    const publicKey = Keypair.fromSecretKey(secretKey).publicKey.toBase58();

    return {
        public_key:publicKey,
        private_key:bs58.encode(secretKey)
    }
}