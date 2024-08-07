import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { Message } from "../../libs/redux/slices/chat-slice";
import { addNewMessage } from "../../libs/redux/slices/chat-slice";
import debounce from "lodash.debounce";

const Chaos: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const websiteTheme = useAppSelector(state => state.theme.current.styles);
  const [messages, setMessages] = useState<Message[]>([]);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [lastPosition, setLastPosition] = useState<'left' | 'right' | 'center'>('right');
  const newMessage = useAppSelector(state => state.chat.newMessage);
  const dispatch = useAppDispatch();
  const maxItems = 7;
  const messageWidth = 200;
  const messageHeight = 100;

  const updateDimensions = debounce(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, 100);

  const isSmallScreen = dimensions.width < 1024;

  /**
   * 
   * @description what is up dev? it is hard to do this -> don`t touch anything 😥
   */
  const getNextPosition = () => {
    const columnWidth = dimensions.width / 3;
    const variation = 10; // Variations in pixel

    let newPosition;

    if (isSmallScreen) {
      // Two-line positioning for small screens with slight overlap in the center
      if (lastPosition === 'left') {
        newPosition = {
          x: -variation + Math.random() * (variation * 2), // Slight horizontal variation for left
          y: Math.random() * (dimensions.height - messageHeight)
        };
        setLastPosition('right');
      } else {
        newPosition = {
          x: dimensions.width - messageWidth + variation - Math.random() * (variation * 2), // Slight horizontal variation for right
          y: Math.random() * (dimensions.height - messageHeight)
        };
        setLastPosition('left');
      }
    } else {
      // Three-column positioning for larger screens
      switch (lastPosition) {
        case 'left':
          newPosition = {
            x: columnWidth + (columnWidth - messageWidth) / 3 + Math.random() * (variation * 2) - variation, // Centered with variation for left
            y: Math.random() * (dimensions.height - messageHeight)
          };
          setLastPosition('center');
          break;
        case 'center':
          newPosition = {
            x: 2 * columnWidth + (columnWidth - messageWidth) / 6, // Center position for larger screens
            y: Math.random() * (dimensions.height - messageHeight)
          };
          setLastPosition('right');
          break;
        case 'right':
        default:
          newPosition = {
            x: ((columnWidth - messageWidth) / 2) - (columnWidth - messageWidth) / 2 + Math.random() * (variation * 2) - variation, // Centered with variation for right
            y: Math.random() * (dimensions.height - messageHeight)
          };
          setLastPosition('left');
          break;
      }
    }

    // Ensure new position is within view
    newPosition.x = Math.max(0, Math.min(newPosition.x, dimensions.width - messageWidth));
    newPosition.y = Math.max(0, Math.min(newPosition.y, dimensions.height - messageHeight));

    return newPosition;
  };



  const checkOverlap = (newPosition: { x: number; y: number }) => {
    if (newPosition.x < 0 || newPosition.x + messageWidth > dimensions.width || newPosition.y < 0 || newPosition.y + messageHeight > dimensions.height) {
      return true;
    }

    return messages.some(message => {
      const dx = newPosition.x - message.position.x;
      const dy = newPosition.y - message.position.y;
      return Math.abs(dx) < messageWidth && Math.abs(dy) < messageHeight;
    });
  };

  const updateMessageList = (newMessage: Message | Message[]) => {
    const messageLimit = isSmallScreen ? 5 : maxItems; // Modified
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
    }, 1000);

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
            <motion.div
              className=" mx-auto flex flex-col gap-[15px] lg:gap-[20px] max-w-[25vw] max-md:w-[45vw]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="flex w-full gap-3 items-center">
                <p className="text-[11px] lg:text-[13px] xl:text-[16px] text-right  sm:w-[70%] text-ellipsis overflow-hidden text-nowrap line-clamp-2"
                  style={{ color: websiteTheme.text_color }}  >
                  {message?.username}
                </p>
                <img src={message?.profilePic} className="object-cover rounded-full w-[30px] h-[30px]  aspect-square" alt={message?.username} />
                <p className="text-[10px] lg:text-[12px] line-clamp-2"
                  style={{ color: websiteTheme.text_color }}  >
                  {message?.message}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Chaos;
