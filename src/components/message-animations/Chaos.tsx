import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { Message } from "../../libs/redux/slices/chat-slice";
import { addNewMessage } from "../../libs/redux/slices/chat-slice";

interface MessageProps {
  message: string;
  username: string;
  profilePic: string;
}

const MessageComponent: React.FC<MessageProps> = ({ username, message, profilePic }) => {
  const websiteTheme = useAppSelector(state => state.theme.current.styles);

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
            style={{ color: websiteTheme.textColor }}
          >
            {username}
          </p>
          <div className="rounded-full lg:h-[50px] lg:w-[50px] w-[35px] h-[35px] overflow-hidden">
            <img src={profilePic} className="object-cover w-full h-full" />
          </div>
        </div>
        <div className="w-[70%] lg:w-[60%]">
          <p className="text-[13px] lg:text-[18px] xl:text-[20px]">
            {message}
          </p>
        </div>
      </div>
      <div className="lg:hidden flex gap-[10px]">
        <div className="rounded-full lg:h-[50px] lg:w-[50px] w-[30px] h-[30px] overflow-hidden">
          <img src={profilePic} className="object-cover w-full h-full" />
        </div>
        <div>
          <p className="text-[12px] lg:text-[14px] xl:text-[16px]" style={{ color: websiteTheme.textColor }}>
            {username}
          </p>
          <div className="lg:w-[60%]">
            <p className="text-[15px] lg:text-[18px] xl:text-[20px]" style={{ color: websiteTheme.textColor }}>
              {message}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Chaos: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const newMessage = useAppSelector(state => state.chat.newMessage);
  const dispatch = useAppDispatch();

  // Handle container dimension updates
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  useEffect(() => {
    if (newMessage && containerRef.current) {
      const messageHeight = 100;
      const messageWidth = 200;

      let latestMessage;
      if (Array.isArray(newMessage)) {
        latestMessage = newMessage[newMessage.length - 1];
      } else {
        latestMessage = newMessage;
      }

      if (latestMessage) {
        const messageWithPosition = {
          ...latestMessage,
          position: {
            x: Math.random() * (dimensions.width - messageWidth),
            y: Math.random() * (dimensions.height - messageHeight),
          },
        };


        setMessages((prevMessages) => {
          let updatedMessages = [...prevMessages, messageWithPosition];
          // Enforce message limit
          const messageLimit = window.innerWidth >= 1024 ? 20 : 7; // 20 for desktop, 5-7 for mobile
          if (updatedMessages.length > messageLimit) {
            updatedMessages = updatedMessages.slice(-messageLimit);
          }
          return updatedMessages;
        });

        setTimeout(() => {
          setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg._id !== latestMessage._id)
          );
        }, 3000 + Math.random() * 1000);
      }
    }
  }, [newMessage, dimensions, messages]);

  // Simulate new message creation
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newMsg: Message = {
        _id: `${Date.now()}`,
        username: "User-" + Math.floor(Math.random() * 1000),
        message: "This is a test message",
        profilePic: "https://via.placeholder.com/50",
        position: { x: 0, y: 0 } // placeholder
      };
      dispatch(addNewMessage(newMsg));
    }, 2000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div
      ref={containerRef}
      className="relative bg-red-950 rounded-2xl  w-full h-full overflow-hidden"
    >
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message._id}
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className="absolute text-white p-2 rounded-lg max-w-xs"
            style={{
              left: message.position.x,
              top: message.position.y,
            }}
          >
            <MessageComponent
              message={message.message}
              profilePic={message.profilePic}
              username={message.username}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Chaos;
