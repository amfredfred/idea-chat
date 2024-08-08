import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@mui/material';
import { addNewMessage, Message } from '../../libs/redux/slices/chat-slice';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { generateRandomHex } from '../../utils';

interface MessageItem extends Message {
  _id: string;
  message: string;
  username: string;
  profilePic: string;
  timestamp: number;
  marginClass?: string;
  textClampClass?: string;
  isEmpty: boolean
}

const Chaos: React.FC = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1200px)');
  const isMediumScreen = useMediaQuery('(min-width: 600px) and (max-width: 1199px)');
  const numColumns = isLargeScreen ? 5 : (isMediumScreen ? 3 : 2);
  const numRowsPerColumn = isLargeScreen ? 4 : (isMediumScreen ? 3 : 4);
  const newMessage = useAppSelector(state => state.chat.newMessage);
  const dispatch = useAppDispatch();

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
      username: `User_${Math.floor(Math.random() * 10)}`,
      profilePic: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`,
      timestamp: Date.now(),
      isEmpty,
      textClampClass
    }
    return newMsg
  }

  const [gridData, setGridData] = useState<MessageItem[]>(() => {
    const data = [] as MessageItem[];
    for (let colIndex = 0; colIndex < numColumns; colIndex++) {
      for (let rowIndex = 0; rowIndex < numRowsPerColumn; rowIndex++) {
        const { marginClass, textClampClass } = generateRandomStyles();
        data.push({ ...makeMessage(true), message: '', marginClass, textClampClass });
      }
    }
    return data
  });

  const getEmptyRows = () => gridData.filter(item => item.isEmpty);
  const getRandomNonRecentMessage = (messages: MessageItem[]) => {
    const sortedMessages = [...messages].sort((a, b) => b.timestamp - a.timestamp);
    const mostRecentMessage = sortedMessages[0];
    const nonRecentMessages = sortedMessages.slice(1);
    if (nonRecentMessages.length === 0) return mostRecentMessage;
    return nonRecentMessages[Math.floor(Math.random() * nonRecentMessages.length)];
  };

  const updateGridWithNewMessage = () => {
    setGridData(prevData => {
      const emptyRows = getEmptyRows();
      if (emptyRows.length > 0) {
        const randomEmptyRow = emptyRows[Math.floor(Math.random() * emptyRows.length)];
        return prevData.map(item => item._id == randomEmptyRow._id ? { ...item, ...newMessage } : item);
      } else {
        const randomNonRecentMessage = getRandomNonRecentMessage(prevData);
        return prevData.map(item => item._id == randomNonRecentMessage._id ? { ...item, ...newMessage } : item);
      }
    });
  };

  useEffect(() => {
    if (newMessage)
      updateGridWithNewMessage();
  }, [newMessage]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(addNewMessage(makeMessage()));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      <h1>messages count: {gridData.length} with message {gridData.filter(msg => msg.message !== '').length}</h1>
      <div className={`grid grid-cols-${numColumns} gap-4 flex-1`}>
        {gridData.map(({ _id, message: msg, username, profilePic, marginClass, textClampClass }) => (
          <motion.div
            key={_id}
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className={`flex items-center`}
          >
            {msg ? (<div className={`flex flex-col  ${marginClass}`}>
              <div className="flex items-center gap-2 overflow-hidden max-sm:items-start">
                <div className="flex items-center gap-2">
                  <img src={profilePic} alt={username} className="w-6 h-6 rounded-full" />
                  <p className="font-bold text-xs max-sm:hidden">{username}</p>
                </div>
                <div className="flex-1 flex flex-col justify-start">
                  <p className="font-bold text-xs max-sm:block">{username}</p>
                  <p className={`${textClampClass} text-xs`}>{msg}</p>
                </div>
              </div>
            </div>) : (
              <p className={`${textClampClass}`}>&nbsp;</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Chaos;
