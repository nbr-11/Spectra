import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import  { Keypair, PublicKey, clusterApiUrl, Connection, LAMPORTS_PER_SOL, Transaction, SystemProgram, sendAndConfirmTransaction, Signer} from "@solana/web3.js";
import bs58 from "bs58";
import axios from "axios";


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

export async function getSolBalance(public_key:string){
    const response = await axios.post("https://api.devnet.solana.com",
        {
            "jsonrpc": "2.0", "id": 1,
            "method": "getBalance",
            "params": [
             public_key
            ]
          }
    )

    return response.data.result.value * 0.000000001;
}


export async function getAirdrop(public_key:string) {
    
    const connection = new Connection(clusterApiUrl('devnet'),"confirmed");

    const airDropSignature = await connection.requestAirdrop(
        new PublicKey(public_key),
        5*LAMPORTS_PER_SOL
    )

    await connection.confirmTransaction(airDropSignature,"confirmed");

}


export async function transferSol(from_publicKey:string, to_publicKey:string, private_key:string, amount:number){
    let transaction = new Transaction();
    const connection = new Connection(clusterApiUrl('devnet'),"confirmed");
    
    const signer = Keypair.fromSecretKey(bs58.decode(private_key));
    
    amount = amount * 1000000000;

    transaction.add(
        SystemProgram.transfer({
            fromPubkey: signer.publicKey,
            toPubkey: new PublicKey(to_publicKey),
            lamports:amount,
        }),
    );

    
    return await sendAndConfirmTransaction(connection, transaction, [signer]);

}