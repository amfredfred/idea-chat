import Navbar from "./components/Navbar";
import { AiOutlineSend } from "react-icons/ai";
import io from "socket.io-client";
import SettingsIcon from "./components/SettingsIcon";
import SettingsClosed from "./components/SettingsClosed";
const socket = io(import.meta.env.VITE_BASE_URI);
import { motion, AnimatePresence } from "framer-motion";
import messageNotification from "./assets/message_notification.mp3";
import Focused from "./components/message-animations/Focused";
import synthIcon from "./assets/synth.svg";
import audioIcon from "./assets/audio.svg";
import slideIcon from "./assets/slide.svg";
import onIcon from "./assets/on.svg";
import ambientIcon from "./assets/ambient.svg";
import winIcon from "./assets/win.svg";
import winMusic from "./assets/win.mp3";
import onMusic from "./assets/on.mp3";
import slideMusic from "./assets/slide.mp3";
import synthMusic from "./assets/synth.mp3";
import ambientMusic from "./assets/ambient.mp3";
import EquatorTest from "./components/message-animations/EquatorTest";
import { Link } from "react-router-dom";
import MobileNav from "./components/MobileNav";
import Footer from "./components/Footer";
import Pump from "./components/Pump";
import Alpha from "./components/Alpha";
import Chaos from "./components/message-animations/Chaos";
import useChat from "./hooks/useChat";

const Chat = () => {
  
  const { currentUserMessage,
    setCurrentUserMessage,
    isSettingsOpen,
    setIsSettingsOpen,
    // isMusicPlaying,
    // setMusicIsPlaying,
    settingsModal,
    setSettingsModal,
    websiteTheme,
    setWebsiteTheme,
    initialMessages,
    // setInitialMessages,
    newMessage,
    // setNewMessage,
    chatState,
    setChatState,
    // userName,
    // setUserName,
    // profilePicState,
    // setProfilePicState,
    notificationRef,
    audioRef,
    websiteAudio,
    setWebsiteAudio,
    navigate,
    modalRef,
    handleSendMessage,
    handleKeyDown,
    handleMusicPlayPause,
    clickAnimation,
    totalWidth,
    totalHeight } = useChat()

  const RenderComponent = () => {
    switch (chatState) {
      case "DEN":
        return (
          <>
            <div>
              <audio ref={notificationRef}>
                <source src={messageNotification} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>

            {/* -------------------------------------- */}
            <div className="relative h-[70%] lg:h-[75%] overflow-y-auto mb-[10px]  w-full">
              {settingsModal.motion === "focused" ? (
                initialMessages.length > 0 && (
                  <Focused
                    initialMessages={initialMessages}
                    newMessage={newMessage}
                  />
                )
              ) : settingsModal.motion === "chaos" ? (
                <Chaos
                  newMessage={newMessage}
                  width={totalWidth}
                  height={totalHeight}
                />
              ) : (
                initialMessages.length > 0 && (
                  <EquatorTest
                    initialMessages={initialMessages}
                    newMessage={newMessage}
                  />
                )
              )}
            </div>
            {/* -------------------------------------- */}
            <div className="flex items-start lg:items-center justify-center gap-2 lg:gap-4 h-[7%] w-full ">
              <AnimatePresence>
                {isSettingsOpen ? (
                  <motion.div
                    ref={modalRef}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-[90%]  lg:w-[50%] xl:w-[35%] 2xl:w-[35%] relative top-[-450px] lg:top-[-100px] text-black z-10 flex flex-col gap-[10px]  "
                  >
                    <div
                      className={`${websiteTheme.bgColor === "#ffffff"
                        ? "border border-black"
                        : "border-none"
                        } bg-white  p-5 rounded-[8px] flex flex-col gap-[20px] lg:gap-[5px] `}
                    >
                      <div className=" flex lg:items-center rounded-[8px] flex-col lg:flex-row ">
                        <div className=" w-[15%]  ">
                          <p className=" text-[12px] lg:text-[16px]">visual</p>
                        </div>
                        <div className=" flex items-center justify-between w-full mt-[10px] lg:mt-[0px]">
                          <div className="  w-full flex justify-between lg:justify-around">
                            <div
                              className=" flex flex-col items-center "
                              onClick={() => {
                                setWebsiteTheme({
                                  ...websiteTheme,
                                  bgColor: "#0000FF",
                                  textColor: "#ffffff",
                                  buttonColor: "#0000FF",
                                });
                              }}
                            >
                              <div className=" bg-[#0000FF] text-white p-[5px] lg:p-2 rounded-[3px] text-[8px] lg:text-[10px] cursor-pointer ">
                                <p>dont sin</p>
                                <p>dont sin</p>
                                <p>dont sin</p>
                              </div>
                              <p
                                className={`text-[10px] lg:text-[16px] ${settingsModal.visual === "rem"
                                  ? "text-[#0000FF]"
                                  : "text-black"
                                  }  lg:border-none lg:p-0`}
                              >
                                rem
                              </p>
                            </div>

                            <div
                              className=" flex flex-col items-center"
                              onClick={() => {
                                setWebsiteTheme({
                                  ...websiteTheme,
                                  bgColor: "#000000",
                                  textColor: "#00FF00",
                                  buttonColor: "#000000",
                                });
                              }}
                            >
                              <div className=" bg-[#000000] text-[#00FF00] text-[8px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] cursor-pointer ">
                                <p>dont sin</p>
                                <p>dont sin</p>
                                <p>dont sin</p>
                              </div>
                              <p
                                className={`text-[10px] lg:text-[16px] ${settingsModal.visual === "neo"
                                  ? "text-[#0000FF]"
                                  : "text-black"
                                  }  rounded-[2px] p-[4px] lg:border-none lg:p-0`}
                              >
                                neo
                              </p>
                            </div>

                            <div
                              className=" flex flex-col items-center"
                              onClick={() => {
                                setWebsiteTheme({
                                  ...websiteTheme,
                                  bgColor: "#00FF00",
                                  textColor: "#000000",
                                  buttonColor: "#00FF00",
                                });
                              }}
                            >
                              <div className=" bg-[#00FF00] text-[#000000] text-[8px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] cursor-pointer ">
                                <p>dont sin</p>
                                <p>dont sin</p>
                                <p>dont sin</p>
                              </div>
                              <p
                                className={`text-[10px] lg:text-[16px] ${settingsModal.visual === "oen"
                                  ? "text-[#0000FF]"
                                  : "text-black"
                                  }   rounded-[2px] p-[4px] lg:border-none lg:p-0`}
                              >
                                oen
                              </p>
                            </div>

                            <div
                              className=" flex flex-col items-center"
                              onClick={() => {
                                setWebsiteTheme({
                                  ...websiteTheme,
                                  bgColor: "#FF5959",
                                  textColor: "#ffffff",
                                  buttonColor: "#000000",
                                });
                              }}
                            >
                              <div className=" bg-[#FF5959] text-[#3D3D3D] text-[8px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] cursor-pointer">
                                <p>dont sin</p>
                                <p>dont sin</p>
                                <p>dont sin</p>
                              </div>
                              <p
                                className={`text-[10px] lg:text-[16px] ${settingsModal.visual === "hmmm"
                                  ? "text-[#0000FF]"
                                  : "text-black"
                                  }  rounded-[2px] p-[4px] lg:border-none lg:p-0`}
                              >
                                hmmm
                              </p>
                            </div>

                            <div
                              className=" flex flex-col items-center"
                              onClick={() => {
                                setWebsiteTheme({
                                  ...websiteTheme,
                                  bgColor: "#ffffff",
                                  textColor: "#000000",
                                  buttonColor: "#000000",
                                });
                              }}
                            >
                              <div className=" bg-[#ffffff] text-[#000000] text-[8px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] border border-black cursor-pointer ">
                                <p>dont sin</p>
                                <p>dont sin</p>
                                <p>dont sin</p>
                              </div>
                              <p
                                className={`text-[10px] lg:text-[16px] ${settingsModal.visual === "b/w"
                                  ? "text-[#0000FF]"
                                  : "text-black"
                                  }   rounded-[2px] p-[4px] lg:border-none lg:p-0`}
                              >
                                b/w
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" w-[100%] h-[1px] bg-gradient-to-r from-[#0000FF] to-transparent lg:hidden " />

                      {/* --------------------------------------------- */}
                      <div className=" flex lg:items-center flex-col lg:flex-row   rounded-[8px]">
                        <div
                          className=" flex items-center gap-[10px] cursor-pointer mr-[5px] "
                          onClick={handleMusicPlayPause}
                        >
                          <p className="  text-[12px] lg:text-[16px]">audio</p>
                          <img src={audioIcon} className=" mt-[-3px]" />
                        </div>
                        <div className=" w-full flex lg:justify-around justify-between mt-[10px] lg:mt-[0px]">
                          <div
                            className=" flex flex-col items-center justify-center"
                            onClick={() => setWebsiteAudio(winMusic)}
                          >
                            <div
                              className={`  bg-[#ffffff] text-white text-[10px] p-2 border ${websiteAudio === winMusic
                                ? "border-[#0000FF]"
                                : "border-black"
                                }  h-[45px] w-[45px] lg:h-[65px] lg:w-[65px] rounded-[3px] cursor-pointer flex items-center justify-center`}
                            >
                              <img src={winIcon} className=" w-[100%] h-auto" />
                            </div>
                            <p
                              className={`text-[10px] lg:text-[16px] ${websiteAudio === winMusic
                                ? "text-[#0000FF]"
                                : "text-black"
                                } p-[4px] rounded-[2px] lg:border-none`}
                            >
                              win
                            </p>
                          </div>

                          <div
                            className=" flex flex-col items-center "
                            onClick={() => setWebsiteAudio(slideMusic)}
                          >
                            <div
                              className={`  bg-[#ffffff] text-white text-[10px] p-2 border ${websiteAudio === slideMusic
                                ? "border-[#0000FF]"
                                : "border-black"
                                } h-[45px] w-[45px] lg:h-[65px] lg:w-[65px] rounded-[3px] cursor-pointer flex items-center justify-center`}
                            >
                              <img
                                src={slideIcon}
                                className=" w-[100%] h-auto"
                              />
                            </div>

                            <p
                              className={` text-[10px] lg:text-[16px]  ${websiteAudio === slideMusic
                                ? "text-[#0000FF]"
                                : "text-black"
                                }  p-[4px] rounded-[2px] lg:border-none`}
                            >
                              slide
                            </p>
                          </div>

                          <div
                            className=" flex flex-col items-center"
                            onClick={() => setWebsiteAudio(onMusic)}
                          >
                            <div
                              className={` bg-[#ffffff] text-white text-[10px] p-2 border ${websiteAudio === onMusic
                                ? "border-[#0000FF]"
                                : "border-black"
                                } h-[45px] w-[45px] lg:h-[65px] lg:w-[65px] rounded-[3px] cursor-pointer flex items-center justify-center`}
                            >
                              <img
                                src={onIcon}
                                className=" w-[100%] h-auto mt-[7px] "
                              />
                            </div>

                            <p
                              className={` text-[10px] lg:text-[16px]  ${websiteAudio === onMusic
                                ? "text-[#0000FF]"
                                : "text-black"
                                } p-[4px] rounded-[2px] lg:border-none`}
                            >
                              on
                            </p>
                          </div>

                          <div
                            className=" flex flex-col items-center"
                            onClick={() => setWebsiteAudio(synthMusic)}
                          >
                            <div
                              className={` bg-[#ffffff] text-white text-[10px] p-2 border ${websiteAudio === synthMusic
                                ? "border-[#0000FF]"
                                : "border-black"
                                } h-[45px] w-[45px] lg:h-[65px] lg:w-[65px] rounded-[3px] cursor-pointer flex items-center justify-center`}
                            >
                              <img
                                src={synthIcon}
                                className=" w-[100%] h-auto"
                              />
                            </div>

                            <p
                              className={` text-[10px] lg:text-[16px] ${websiteAudio === synthMusic
                                ? "text-[#0000FF]"
                                : "text-black"
                                }  p-[4px] rounded-[2px] lg:border-none`}
                            >
                              synth
                            </p>
                          </div>

                          <div
                            className=" flex flex-col items-center"
                            onClick={() => setWebsiteAudio(ambientMusic)}
                          >
                            <div
                              className={` bg-[#ffffff] text-white text-[10px] p-2 border ${websiteAudio === ambientMusic
                                ? "border-[#0000FF]"
                                : "border-black"
                                } h-[45px] w-[45px] lg:h-[65px] lg:w-[65px] rounded-[3px] cursor-pointer flex items-center justify-center`}
                            >
                              <img
                                src={ambientIcon}
                                className=" w-[100%] h-auto"
                              />
                            </div>

                            <p
                              className={` text-[10px] lg:text-[16px] ${websiteAudio === ambientMusic
                                ? "text-[#0000FF]"
                                : "text-black"
                                }  p-[4px] rounded-[2px] lg:border-none`}
                            >
                              ambient
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className=" w-[100%] h-[1px] bg-gradient-to-r from-[#0000FF] to-transparent lg:hidden" />
                      {/* ------------------------------- */}
                      <div className=" flex flex-col lg:flex-row lg:items-center  rounded-[8px]">
                        <p className=" w-[18%] text-[12px] lg:text-[16px]">
                          motion
                        </p>
                        <div className=" flex w-full lg:justify-around gap-[20px] sm:gap-[40px] lg:gap-0 mt-[10px] lg:mt-[0px]">
                          <div
                            className=" flex flex-col items-center"
                            onClick={() =>
                              setSettingsModal({
                                ...settingsModal,
                                motion: "chaos",
                              })
                            }
                          >
                            <div
                              className={` bg-[#white] ${settingsModal.motion === "chaos"
                                ? "text-[#0000FF] border border-[#0000FF]"
                                : "text-black border border-black"
                                }  lg:text-[10px] p-[5px] lg:p-2 rounded-[3px] text-[8px] cursor-pointer`}
                            >
                              <p>dont sin</p>
                              <p>dont sin</p>
                              <p>dont sin</p>
                            </div>
                            <p className=" text-[10px] lg:text-[16px] p-[4px] rounded-[2px] lg:border-none">
                              chaos
                            </p>
                          </div>
                          <div
                            className=" flex flex-col items-center"
                            onClick={() =>
                              setSettingsModal({
                                ...settingsModal,
                                motion: "focused",
                              })
                            }
                          >
                            <div
                              className={` bg-[#white] ${settingsModal.motion === "focused"
                                ? "text-[#0000FF] border border-[#0000FF]"
                                : "text-black border border-black"
                                }  lg:text-[10px] p-[5px] lg:p-2 rounded-[3px] text-[8px] cursor-pointer `}
                            >
                              <p>dont sin</p>
                              <p>dont sin</p>
                              <p>dont sin</p>
                            </div>
                            <p className=" text-[10px] lg:text-[16px]  p-[4px] rounded-[2px] lg:border-none">
                              focused
                            </p>
                          </div>
                          <div
                            className=" flex flex-col items-center"
                            onClick={() =>
                              setSettingsModal({
                                ...settingsModal,
                                motion: "equator",
                              })
                            }
                          >
                            <div
                              className={` bg-[#white] ${settingsModal.motion === "equator"
                                ? "text-[#0000FF] border border-[#0000FF]"
                                : "text-black border border-black"
                                } lg:text-[10px] p-[5px] lg:p-2 rounded-[3px] text-[8px] cursor-pointer`}
                            >
                              <p>dont sin</p>
                              <p>dont sin</p>
                              <p>dont sin</p>
                            </div>
                            <p className=" text-[10px] lg:text-[16px]  p-[4px] rounded-[2px] lg:border-none">
                              equator
                            </p>
                          </div>
                        </div>
                        <div className="lg:hidden flex flex-col gap-[15px] mt-[15px] w-full">
                          <button
                            onClick={() => navigate("/profile")}
                            className=" uppercase font-jbm  p-[5px]   "
                            style={{
                              background:
                                websiteTheme.bgColor === "#ffffff"
                                  ? "black"
                                  : websiteTheme.bgColor,
                              color:
                                websiteTheme.bgColor === "#ffffff"
                                  ? "white"
                                  : websiteTheme.textColor,
                            }}
                          >
                            profile
                          </button>
                          <button
                            className={`  uppercase font-jbm  
                     `}
                            style={{
                              color:
                                websiteTheme.bgColor === "#ffffff"
                                  ? "#000000"
                                  : websiteTheme.bgColor,
                            }}
                          >
                            <Link to={"/"}>exit</Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="w-[60%] lg:w-[40%] xl:w-[35%]   ">
                    <motion.textarea
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      placeholder="type something retarded..."
                      value={currentUserMessage}
                      className={`bg-white ${websiteTheme.bgColor === "#ffffff"
                        ? "border border-black"
                        : "border-none"
                        } text-[#121212] uppercase p-3 lg:p-5 text-[13px] lg:text-[18px] mx-auto rounded-[4px] lg:rounded-[8px] w-full outline-none resize-none`}
                      onChange={(e) => setCurrentUserMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      rows={1}
                    />
                  </div>
                )}
              </AnimatePresence>
              <motion.button
                whileTap={clickAnimation}
                className={`p-[10px] lg:p-[15px] ${websiteTheme.bgColor === "#ffffff"
                  ? "border border-black"
                  : "border-none"
                  } bg-white rounded-[4px] lg:rounded-[8px] hidden lg:block`}
                onClick={handleSendMessage}
              >
                <AiOutlineSend
                  className={`w-[22px] lg:w-[35px] h-auto `}
                  style={{
                    color: websiteTheme.buttonColor,
                  }}
                />
              </motion.button>
              {!isSettingsOpen && (
                <motion.button
                  whileTap={clickAnimation}
                  className={`p-[10px] lg:p-[15px] ${websiteTheme.bgColor === "#ffffff"
                    ? "border border-black"
                    : "border-none"
                    } bg-white rounded-[4px] lg:rounded-[8px] lg:hidden`}
                  onClick={handleSendMessage}
                >
                  <AiOutlineSend
                    className={`w-[22px] lg:w-[35px] h-auto `}
                    style={{
                      color: websiteTheme.buttonColor,
                    }}
                  />
                </motion.button>
              )}
              <motion.button
                whileTap={clickAnimation}
                className={`p-[10px] lg:p-[15px] ${websiteTheme.bgColor === "#ffffff"
                  ? "border border-black"
                  : "border-none"
                  } bg-white rounded-[4px] lg:rounded-[8px] hidden lg:block`}
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              >
                {isSettingsOpen ? (
                  <SettingsClosed color={websiteTheme.buttonColor} />
                ) : (
                  <SettingsIcon color={websiteTheme.buttonColor} />
                )}
              </motion.button>
            </div>
          </>
        );

      case "ALPHA":
        return <Alpha />;

      case "PUMP":
        return <Pump />;
    }
  };

  return (
    <div
      style={{
        backgroundColor: websiteTheme.bgColor,
        color: websiteTheme.textColor,
      }}
      className={`transition-colors duration-1000 w-full   relative font-jbm uppercase h-screen lg:h-screen overflow-hidden`}
    >
      <div>
        <audio ref={audioRef} loop>
          <source src={websiteAudio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      <div className="h-[5%] lg:h-[10%]">
        <div className="w-[90%] lg:flex justify-end hidden">
          <Navbar websiteTheme />
        </div>
        <MobileNav
          isSettingsOpen={isSettingsOpen}
          setIsSettingsOpen={setIsSettingsOpen}
          socket={socket}
        />
      </div>
      {RenderComponent()}

      <Footer setChatState={setChatState} chatState={chatState} />
    </div>
  );
};

export default Chat;
