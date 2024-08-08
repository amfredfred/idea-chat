import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { addNewMessage, Message } from '../../libs/redux/slices/chat-slice';
import { generateRandomHex } from '../../utils';
import debounce from 'lodash/debounce';

interface MessageItem extends Message {
  _id: string;
  message: string;
  username: string;
  profilePic: string;
  timestamp: number;
  marginClass?: string;
  textClampClass?: string;
  isEmpty: boolean;
}

const getRandomRotation = (min: number = 0, max: number = 20) => {
  const rotation = Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.random() > 0.5 ? rotation : -rotation;
};

const Chaos: React.FC = () => {
  const dispatch = useAppDispatch();
  const newMessage = useAppSelector((state) => state.chat.newMessage);

  const getGridDimensions = () => {
    if (window.innerWidth >= 1200) {
      return { numColumns: 5, numRowsPerColumn: 4, totalSlots: 20 };
    } else if (window.innerWidth >= 600) {
      return { numColumns: 3, numRowsPerColumn: 3, totalSlots: 9 };
    } else {
      return { numColumns: 2, numRowsPerColumn: 4, totalSlots: 8 };
    }
  };



  const [gridConfig, setGridConfig] = useState(getGridDimensions);

  const generateRandomStyles = () => {
    return {
      marginClass: `m-${Math.floor(Math.random() * 10) + 1}`,
      textClampClass: ['line-clamp-3', 'line-clamp-5', 'line-clamp-2', 'line-clamp-4'][Math.floor(Math.random() * 3)],
    };
  };

  const makeMessage = (isEmpty: boolean = false) => {
    const { textClampClass } = generateRandomStyles();
    const newMsg: MessageItem = {
      _id: generateRandomHex(),
      message: `In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available`,
      username: `User_${generateRandomHex(10)}`,
      profilePic: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`,
      timestamp: Date.now(),
      isEmpty,
      textClampClass
    };
    return newMsg;
  };

  const [gridData, setGridData] = useState<MessageItem[]>(() => {
    const data = [] as MessageItem[];
    const { totalSlots } = getGridDimensions();
    for (let i = 0; i < totalSlots; i++) {
      const { marginClass, textClampClass } = generateRandomStyles();
      data.push({ ...makeMessage(true), message: '', marginClass, textClampClass });
    }
    return data;
  });

  const adjustGridData = (newTotalSlots: number) => {
    setGridData((prevData) => {
      const currentTotalSlots = prevData.length;
      if (newTotalSlots > currentTotalSlots) {
        const slotsToAdd = newTotalSlots - currentTotalSlots;
        const newItems = Array.from({ length: slotsToAdd }, () => makeMessage(true));
        return [...prevData, ...newItems];
      } else if (newTotalSlots < currentTotalSlots) {
        const slotsToRemove = currentTotalSlots - newTotalSlots;
        return prevData.slice(0, currentTotalSlots - slotsToRemove);
      }
      return prevData;
    });
  };

  const updateGridWithNewMessage = () => {
    setGridData((prevData) => {
      const emptyRows = prevData.filter((item) => item.isEmpty);
      if (emptyRows.length > 0) {
        const randomEmptyRow = emptyRows[Math.floor(Math.random() * emptyRows.length)];
        return prevData.map((item) =>
          item._id === randomEmptyRow._id ? { ...item, ...newMessage, isEmpty: false } : item
        );
      } else {
        const randomNonRecentMessage = getRandomNonRecentMessage(prevData);
        return prevData.map((item) =>
          item._id === randomNonRecentMessage._id ? { ...item, ...newMessage, isEmpty: false } : item
        );
      }
    });
  };

  const getRandomNonRecentMessage = (messages: MessageItem[]) => {
    const sortedMessages = [...messages].sort((a, b) => b.timestamp - a.timestamp);
    const mostRecentMessage = sortedMessages[0];
    const nonRecentMessages = sortedMessages.slice(1);
    if (nonRecentMessages.length === 0) return mostRecentMessage;
    return nonRecentMessages[Math.floor(Math.random() * nonRecentMessages.length)];
  };

  const handleResize = useCallback(() => {
    const newConfig = getGridDimensions();
    adjustGridData(newConfig.totalSlots);
    setGridConfig(newConfig);
  }, []);

  const debouncedHandleResize = useCallback(debounce(handleResize, 300), [handleResize]);

  useEffect(() => {
    if (newMessage) updateGridWithNewMessage();
  }, [newMessage]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(addNewMessage(makeMessage()));
    }, 200);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [debouncedHandleResize, dispatch]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className={`grid grid-cols-${gridConfig.numColumns} gap-4 flex-1 overflow-hidden`}>
        {gridData.map(({ _id, message: msg, username, profilePic, marginClass, textClampClass }) => (
          <motion.div
            key={_id}
            initial={{ opacity: 0, scale: 0.5, rotate: getRandomRotation(), y: getRandomRotation(), x: getRandomRotation() }}
            animate={{ opacity: 1, scale: 1, rotate: getRandomRotation(), y: getRandomRotation(), x: getRandomRotation() }}
            exit={{ opacity: 0, scale: 0.5, rotate: getRandomRotation(), y: getRandomRotation(), x: getRandomRotation() }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className={`flex items-center`}
          >
            {msg ? (
              <div className={`flex flex-col ${marginClass}`}>
                <div className="flex items-center gap-2 overflow-hidden max-sm:items-start">
                  <img src={profilePic} alt={username} className="w-6 h-6 rounded-full" />
                  <p className="font-bold text-xs max-sm:hidden text-ellipsis overflow-hidden max-w-10 ">{username}</p>
                  <div className="flex-1 flex flex-col justify-start ">
                    <p className="font-bold text-xs max-sm:block">{username}</p>
                    <p className={`${textClampClass} text-xs`}>{msg}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className={`${textClampClass}`}>&nbsp;</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Chaos;
