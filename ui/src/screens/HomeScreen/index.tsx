import { useRef, useState, useEffect } from "react";
import bgVideo from "@src/assets/bg1.mp4";
import bottle from "@src/assets/bottle.png";
import winMusic from "@src/assets/win.mp3";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { VscUnmute } from "react-icons/vsc";
import { motion } from "framer-motion";
import { walletAddressState } from "@src/atoms/wallet";
import { useRecoilState } from "recoil";
import { SolanaConnect } from "@src/components/ConnectButton";
import { useNavigate } from "react-router-dom";
import { TransactionsCountErrorIcon } from "@src/components/Icons";
import { useWallet } from "@solana/wallet-adapter-react";

export default function HomeScreen() {

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [walletAddress, setWalletAddressState] = useRecoilState(walletAddressState);
    const [showWalletTransactionsError, setShowWalletTransactionsError] = useState(false);
    const [showVerifying, setShowVerifying] = useState(false);

    const wallet = useWallet();
    // const navigate = useNavigate();
    const handleConnectButtonClicked = async () => wallet.connected ? console.log('navigate("/chat")') : await wallet.connect()

    useEffect(() => {
        // audioRef.current!.play();

        console.log({ walletAddress })

        const walletAddressFromLocalStorage = localStorage.getItem("walletAddress");
        if (walletAddressFromLocalStorage) {
            {
                setWalletAddressState(walletAddressFromLocalStorage);
            }
        }
    }, []);

    const handlePlayForSmallerDevices = () => {
        setIsPlaying(false);
        if (audioRef.current) {
            {
                isPlaying ? audioRef.current.pause() : audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    const handlePlay = () => {
        if (audioRef.current) {
            {
                isPlaying ? audioRef.current.pause() : audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };


    const connectedWalletComponent = (<></>
        // <motion.div
        //     initial={{ y: "100%" }}
        //     animate={{ y: 0 }}
        //     exit={{ y: "100%" }}
        //     transition={{ type: "spring", stiffness: 300, damping: 30 }}
        //     className={`bg-white ${showVerifying ? "opacity-100" : "opacity-100"
        //         } coming-soon-shadow text-[#0000FF]  uppercase font-jbm text-[15px] lg:text-[24px] p-2 lg:p-4 w-[90%] mx-auto mt-5 sm:w-full flex flex-col gap-2 ${showWalletTransactionsError &&
        //         "bg-opacity-0 anti-coming-soon-shadow opacity-100"
        //         }`}  >
        //     <div className=" mx-auto">
        //         {showVerifying ? (
        //             <>
        //                 {showWalletTransactionsError ? (
        //                     <div className=" text-white text-center mt-[-10px] flex flex-col gap-[10px] ">
        //                         <div className=" flex justify-center">
        //                             <TransactionsCountErrorIcon />
        //                         </div>
        //                         <p>access denied</p>
        //                         <p className=" lg:w-[1000px]">
        //                             wallet must have at least 69 transactions in the past
        //                             to access this universe
        //                         </p>
        //                     </div>
        //                 ) : (
        //                     <p>verifying...</p>
        //                 )}
        //             </>
        //         ) : (
        //             <SolanaConnect
        //                 setShowVerifying={setShowVerifying}
        //                 setShowWalletTransactionsError={
        //                     setShowWalletTransactionsError
        //                 }
        //             />
        //         )}
        //     </div>
        // </motion.div>
    )

    return (
        <div className="relative w-full h-screen ">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover object-center "
                src={bgVideo}
                autoPlay
                loop
                muted
            />
            <div>
                <audio ref={audioRef} loop>
                    <source src={winMusic} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>

            <div className=" hidden lg:block relative top-[50px]">
                <button
                    onClick={handlePlay}
                    className=" hidden lg:flex lg:absolute lg:top-0 lg:left-[-50px] lg:w-full lg:h-full  lg:justify-end lg:text-white lg:text-[20px] lg:font-bold"
                    style={{ zIndex: 1000 }}
                >
                    {isPlaying ? (
                        <VscUnmute className=" " />
                    ) : (
                        <IoVolumeMuteOutline className=" " />
                    )}
                </button>
            </div>

            <div className=" lg:hidden relative top-[50px]">
                <button
                    onClick={handlePlayForSmallerDevices}
                    className="  flex absolute top-0 left-[-50px] w-full h-full  justify-end text-white text-[20px] font-bold"
                    style={{ zIndex: 1000 }}
                >
                    {isPlaying ? (
                        <IoVolumeMuteOutline className=" " />
                    ) : (
                        <VscUnmute className=" " />
                    )}
                </button>
            </div>

            <div className="relative z-10 flex items-center justify-center h-full top-[-100px] lg:top-[-50px]">
                <div className="text-white text-center flex flex-col justify-between">
                    <img src={bottle} className="mx-auto w-[100px] h-auto" alt="bottle" />
                    <h1 className="text-[40px] lg:text-[80px] font-bold font-jbm uppercase">
                        chat
                    </h1>
                    <p className="text-[15px] lg:text-[24px] uppercase font-jbm">
                        autism friendly chat interface from the future
                    </p>
                    {wallet.connected ? connectedWalletComponent : showWalletTransactionsError && showVerifying ? (
                        <></>
                    ) : (
                        <button
                            className="bg-white coming-soon-shadow text-[#0000FF] uppercase font-jbm text-[15px] lg:text-[24px] p-2 lg:p-4 w-[90%] mx-auto mt-5 sm:w-full"
                            onClick={handleConnectButtonClicked}>
                            connect n chat
                        </button>
                    )}
                    <SolanaConnect setShowVerifying={setShowVerifying} setShowWalletTransactionsError={(setShowWalletTransactionsError)} />
                </div>
            </div>
            <div className="lg:hidden absolute top-0 left-0 w-full h-full bg-black opacity-30 z-0"></div>
        </div>
    );
}