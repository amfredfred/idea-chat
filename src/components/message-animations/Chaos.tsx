import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@mui/material';
import { addNewMessage, Message } from '../../libs/redux/slices/chat-slice';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';

interface MessageItem extends Message {
  _id: string;
  message: string;
  username: string;
  profilePic: string;
  timestamp: string;
  marginClass?: string;
  textClampClass?: string;
}

const Chaos: React.FC = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1200px)');
  const isMediumScreen = useMediaQuery('(min-width: 600px) and (max-width: 1199px)');
  const numColumns = isLargeScreen ? 5 : (isMediumScreen ? 3 : 2);
  const numRowsPerColumn = isLargeScreen ? 4 : (isMediumScreen ? 3 : 2);

  const newMessage = useAppSelector(state => state.chat.newMessage);
  const dispatch = useAppDispatch();

  const generateRandomStyles = () => {
    return {
      marginClass: `m-${Math.floor(Math.random() * 5) + 1}`,
      textClampClass: ['line-clamp-3', 'line-clamp-5', 'line-clamp-2', 'line-clamp-4'][Math.floor(Math.random() * 3)],
    };
  };

  const [gridData, setGridData] = useState<MessageItem[]>(() => {
    const data = [];
    for (let colIndex = 0; colIndex < numColumns; colIndex++) {
      for (let rowIndex = 0; rowIndex < numRowsPerColumn; rowIndex++) {
        const { marginClass, textClampClass } = generateRandomStyles();
        data.push({
          _id: `${colIndex}-${rowIndex}`,
          message: "",
          username: `User_${Math.floor(Math.random() * 10)}`,
          profilePic: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`,
          timestamp: new Date().toISOString(),
          marginClass,
          textClampClass,
        });
      }
    }
    return data;
  });

  const getEmptyRows = () => gridData.filter(item => item.message === "");
  const getOldestMessage = (messages: MessageItem[]) => {
    return messages.reduce((oldest, message) =>
      new Date(message.timestamp) < new Date(oldest.timestamp) ? message : oldest
    );
  };

  const updateGridWithNewMessage = useCallback((message: MessageItem) => {
    setGridData(prevData => {
      const emptyRows = getEmptyRows();

      if (emptyRows.length > 0) {
        const randomEmptyRow = emptyRows[Math.floor(Math.random() * emptyRows.length)];
        return prevData.map(item => item._id === randomEmptyRow._id
          ? { ...item, ...message }
          : item
        );
      } else {
        const oldestMessage = getOldestMessage(prevData);
        return prevData.map(item => item._id === oldestMessage._id
          ? { ...item, ...message }
          : item
        );
      }
    });
  }, []);

  useEffect(() => {
    if (newMessage)
      updateGridWithNewMessage(newMessage);
  }, [updateGridWithNewMessage, newMessage]);


  useEffect(() => {
    const intervalId = setInterval(() => {
      const { marginClass, textClampClass } = generateRandomStyles();
      const newMsg = {
        _id: `${Math.random().toString()}`,
        message: `In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available`,
        username: `User_${Math.floor(Math.random() * 10)}`,
        profilePic: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`,
        timestamp: new Date().toISOString(),
        marginClass,
        textClampClass
      };
      dispatch(addNewMessage(newMsg));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const renderMessageItem = useCallback((message: MessageItem) => {
    const { _id, message: msg, username, profilePic, timestamp, marginClass, textClampClass } = message;
    const compositeKey = `${_id}-${timestamp}`;

    return (
      <motion.div
        key={compositeKey}
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`flex items-center ${marginClass} ${textClampClass}`}
      >
        {msg ? (
          <div className="flex flex-col">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="flex items-center gap-2">
                <img src={profilePic} alt={username} className="w-6 h-6 rounded-full" />
                <p className="font-bold text-xs">{username}</p>
              </div>
              <div className="flex-1">
                <p className={`${textClampClass} text-xs`}>{msg}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className=""></div>
        )}
      </motion.div>
    );
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      <div className={`grid grid-cols-${numColumns} gap-4 flex-1`}>
        {gridData.map(message => renderMessageItem(message))}
      </div>
    </div>
  );
};

export default Chaos;