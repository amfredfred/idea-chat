import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { Message } from "../../libs/redux/slices/chat-slice";
import { addNewMessage } from "../../libs/redux/slices/chat-slice";
import ChaosMessageComponent from "../ChaosMessageComponent";
import debounce from "lodash.debounce";

const Chaos: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [lastPosition, setLastPosition] = useState<'left' | 'center' | 'right'>('right');
  const newMessage = useAppSelector(state => state.chat.newMessage);
  const dispatch = useAppDispatch();
  const maxItems = 10;
  const messageWidth = 200;
  const messageHeight = 100;

  const updateDimensions = debounce(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, 100);

  const getNextPosition = () => {
    const columnWidth = dimensions.width / 3;
    let newPosition;

    switch (lastPosition) {
      case 'left':
        newPosition = { x: columnWidth + (columnWidth - messageWidth) / 3, y: Math.random() * (dimensions.height - messageHeight) };
        setLastPosition('center');
        break;
      case 'center':
        newPosition = { x: 2 * columnWidth + ((columnWidth - messageWidth) / 6), y: Math.random() * (dimensions.height - messageHeight) };
        setLastPosition('right');
        break;
      case 'right':
      default:
        newPosition = { x: ((columnWidth - messageWidth) / 2) - (columnWidth - messageWidth) / 2, y: Math.random() * (dimensions.height - messageHeight) };
        setLastPosition('left');
        break;
    }
    return newPosition;
  };

  const checkOverlap = (newPosition: { x: number; y: number }) => {
    if (newPosition.x < 0 || newPosition.x + messageWidth > dimensions.width || newPosition.y < 0 || newPosition.y + messageHeight > dimensions.height) {
      return true;
    }

    return messages.some(message => {
      const dx = newPosition.x - message.position.x;
      const dy = newPosition.y - message.position.y ;
      return Math.abs(dx) < messageWidth && Math.abs(dy) < messageHeight;
    });
  };

  const updateMessageList = (newMessage: Message | Message[]) => {
    const messageLimit = window.innerWidth >= 1024 ? maxItems : 7;
    const latestMessage = Array.isArray(newMessage) ? newMessage[newMessage.length - 1] : newMessage;

    if (latestMessage) {
      let newPosition = getNextPosition();
      let retries = 0;
      const maxRetries = 10;

      while (checkOverlap(newPosition) && retries < maxRetries) {
        newPosition = getNextPosition();
        retries++;
      }

      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, { ...latestMessage, position: newPosition }];
        return updatedMessages.length > messageLimit ? updatedMessages.slice(-messageLimit) : updatedMessages;
      });
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (newMessage) {
      updateMessageList(newMessage);
    }
  }, [newMessage]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newMsg: Message = {
        _id: `${Date.now()}`,
        username: "User-" + Math.floor(Math.random() * 1000),
        message: `Submit your own private work, something you haven't shown to anyone. Omit your name from the submission if you like. Let us set it free. It wants to be free.`,
        profilePic: "https://via.placeholder.com/50",
        position: { x: 0, y: 0 }
      };
      dispatch(addNewMessage(newMsg));
    }, 100);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl w-full h-full overflow-hidden"
    >
      <AnimatePresence>
        {messages.map(message => (
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
            <ChaosMessageComponent
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
