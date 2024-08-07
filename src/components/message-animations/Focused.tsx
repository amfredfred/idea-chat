import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useAppSelector } from "../../libs/redux/hooks";
import { MessageModal } from "../MessageModal";

interface Message {
  message: string;
  username: string;
  profilePic: string;
}

const MessageComponent: React.FC<Message> = ({
  username,
  message,
  profilePic,
}) => {
  const websiteTheme = useAppSelector(state => state.theme.current.styles);

  const formatMessage = (text: string) => {
    let formattedText = text.replace(/\\n/g, "\n");

    formattedText = formattedText.replace(/\n{5,}/g, "\n\n\n\n");

    return formattedText.split("\n").map((line, index, array) => (
      <React.Fragment key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <motion.div
      className="w-[90%] lg:w-[80%] mx-auto flex flex-col gap-[15px] lg:gap-[20px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="hidden lg:flex gap-2 lg:gap-5 xl:gap-10 items-center mt-2 lg:mt-5 xl:mt-5">
        <div className="flex items-center gap-[10px] w-[30%] lg:w-[20%] justify-end">
          <p
            className="text-[12px] lg:text-[14px] xl:text-[16px] text-right text-wrap w-[50px] sm:w-[70%]"
            style={{
              color: websiteTheme.text_color,
              wordBreak: "break-word",
              whiteSpace: "normal",
            }}
          >
            {username}
          </p>
          <div className="rounded-full lg:h-[50px] lg:w-[50px] w-[35px] h-[35px] overflow-hidden">
            <img src={profilePic} className="object-cover w-full h-full" />
          </div>
        </div>
        <div className="w-[70%] lg:w-[60%]">
          <p className="text-[13px] lg:text-[18px] xl:text-[20px]">
            {message.length > 300 ? message.slice(0, 300) : message}
          </p>
        </div>
      </div>
      <div className="lg:hidden flex gap-[10px] items-center">
        <div className="rounded-full lg:h-[50px] lg:w-[50px] w-[30px] h-[30px] overflow-hidden">
          <img src={profilePic} className="object-cover w-full h-full" />
        </div>
        <div>
          <p
            className="text-[12px] lg:text-[14px] xl:text-[16px]"
            style={{
              color: websiteTheme.text_color,
              wordBreak: "break-word",
              whiteSpace: "normal",
            }}
          >
            {username}
          </p>
          <div className="lg:w-[60%]">
            <p
              className="text-[11px] lg:text-[13px] xl:text-[16px]"
              style={{
                color: websiteTheme.text_color,
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
            >
              {formatMessage(message)}
            </p>
          </div>
        </div>
      </div>
      <div
        className="w-[100%] mx-auto h-[1px]"
        style={{
          backgroundImage: `linear-gradient(to right, ${websiteTheme.bgColor}, ${websiteTheme.text_color}, ${websiteTheme.bgColor})`,
        }}
      />
    </motion.div>
  );
};

const Focused = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalUsername, setModalUsername] = useState<string | null>(null);
  const [modalPfp, setModalPfp] = useState<string | undefined>();

  const initialMessages = useAppSelector((state) => state.chat.initialMessages);
  const newMessage = useAppSelector((state) => state.chat.newMessage);
  const websiteTheme = useAppSelector((state) => state.theme.current.styles);

  useEffect(() => {
    scrollToBottom();
  }, [newMessage, initialMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatMessage = (text: string) => {
    let formattedText = text.replace(/\\n/g, "\n");

    formattedText = formattedText.replace(/\n{5,}/g, "\n\n\n\n");

    return formattedText.split("\n").map((line, index, array) => (
      <React.Fragment key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <>
      <div className="w-[90%] lg:w-[80%] mx-auto flex flex-col gap-[15px] lg:gap-[20px] relative">
        {modalMessage && (
          <MessageModal
            message={modalMessage}
            onClose={() => setModalMessage(null)}
            username={modalUsername}
            profilePic={modalPfp}
          />
        )}
        {initialMessages?.map?.((msg, index: number) => (
          <React.Fragment key={index}>
            <div className="flex gap-2 lg:gap-5 xl:gap-10 items-center overflow-y-auto">
              <div className="w-full hidden lg:flex gap-2 lg:gap-5 xl:gap-10 items-center mt-2 lg:mt-5 xl:mt-5">
                <div className="flex items-center gap-[10px] w-[30%] lg:w-[20%] justify-end">
                  <p
                    className="text-[12px] lg:text-[14px] xl:text-[16px] text-right text-wrap w-[50px] sm:w-[70%]"
                    style={{
                      color: websiteTheme.text_color,
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {msg.username}
                  </p>
                  <div className="rounded-full lg:h-[50px] lg:w-[50px] w-[35px] h-[35px] overflow-hidden flex-shrink-0">
                    <img
                      src={msg.profilePic}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="w-[70%] lg:w-[60%]">
                  <p className="text-[13px] lg:text-[18px] xl:text-[20px]">
                    {msg.message}
                  </p>
                </div>
              </div>
              <div className="lg:hidden flex gap-[10px] items-center">
                <div className="rounded-full lg:h-[50px] lg:w-[50px] w-[30px] h-[30px] overflow-hidden flex-shrink-0">
                  <img
                    src={msg.profilePic}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p
                    className="text-[12px] lg:text-[14px] xl:text-[16px]"
                    style={{
                      color: websiteTheme.text_color,
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {msg.username}
                  </p>
                  <div className="lg:w-[60%]">
                    <p
                      onClick={() => {
                        if (msg.message.length > 300) {
                          setModalMessage(msg.message);
                          setModalPfp(msg.profilePic);
                          setModalUsername(msg.username);
                        }
                      }}
                      className="text-[15px] lg:text-[18px] xl:text-[20px]"
                      style={{
                        color: websiteTheme.text_color,
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      {formatMessage(
                        msg.message.length > 300
                          ? `${msg.message.slice(0, 100)}...`
                          : msg.message
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-[100%] mx-auto h-[1px]"
              style={{
                backgroundImage: `linear-gradient(to right , ${websiteTheme.bgColor} , ${websiteTheme.text_color} , ${websiteTheme.bgColor})`,
              }}
            />
          </React.Fragment>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <AnimatePresence initial={false}>
        {initialMessages.map((msg) => (
          <MessageComponent
            message={msg.message}
            username={msg.username}
            profilePic={msg.profilePic}
            key={msg._id}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default Focused;