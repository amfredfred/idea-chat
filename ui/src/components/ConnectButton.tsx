import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useNavigate } from "react-router-dom";
import { Connection, PublicKey } from "@solana/web3.js";
import { ArrowIcon, PhantomIcon } from "./Icons";

import("@solana/wallet-adapter-react-ui/styles.css");

const RPC_URL = import.meta.env.VITE_RPC_URL;

interface SolanaConnectProps {
  setShowVerifying: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWalletTransactionsError: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SolanaConnect: React.FC<SolanaConnectProps> = ({
  setShowVerifying,
  setShowWalletTransactionsError,
}) => {
  const connection = new Connection(RPC_URL);
  const navigate = useNavigate();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) {
      setShowVerifying(true);
      const getTransactionCount = async (walletAddress: string) => {
        try {
          const publicKey = new PublicKey(walletAddress);
          const confirmedSignatures = await connection.getSignaturesForAddress(
            publicKey
          );
          const transactionsCount = confirmedSignatures.length;

          if (transactionsCount >= 0) {
            localStorage.setItem("walletAddress", publicKey.toString());

            return navigate("/chat");
          } else {
            setShowWalletTransactionsError(true);
          }
        } catch (error) {
          console.error("Error fetching transaction count:", error);
          return 0;
        }
      };
      getTransactionCount(publicKey.toString());
    }
  }, [publicKey]);

  return (
    <WalletModalProvider>
      <WalletMultiButton
        style={{ backgroundColor: "#ffffff", color: "#0000ff" }}
      >
        <div className=" flex items-center w-full gap-[10px] lg:gap-[20px] xl:gap-[25px] 2xl:gap-[30px]">
          <PhantomIcon />
          <p className=" uppercase font-jbm  text-[15px] lg:text-[24px]">
            connect your wallet
          </p>
          <ArrowIcon />
        </div>
      </WalletMultiButton>
    </WalletModalProvider>
  );
};
