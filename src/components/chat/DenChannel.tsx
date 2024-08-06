import { Box, useMediaQuery } from '@mui/material'
import Focused from '../message-animations/Focused'
import Chaos from '../message-animations/Chaos'
import EquatorTest from '../message-animations/EquatorTest'
import ChatSettings from './ChatSettings'
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks'
import { Close, Send, Settings } from '@mui/icons-material'
import { loadInitialMessages, setChatSettingsOpen, setTypedMessage } from '../../libs/redux/slices/chat-slice'
import { useCallback, useEffect } from 'react'
import { emitChatEvent } from '../../libs/redux/slices/chat-socket-slice'


export default function DenChannel({ handleMusicPlayPause }: { handleMusicPlayPause: () => void }) {

  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme.current.styles)
  const settingsModal = useAppSelector(state => state.chat.settingsModal.motion)
  const isChatSettingsOpen = useAppSelector(state => state.chat.isChatSettingsOpen)
  const typedMessage = useAppSelector(state => state.chat.typedMessage)
  const isMobile = useMediaQuery("(max-width:768px)")

  const clickAnimation = {
    scale: 0.9,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };

  const loadMessages = useCallback(async () => dispatch(loadInitialMessages()), [dispatch])
  const handleSendMessage = useCallback(() => dispatch(emitChatEvent('sendMessage', typedMessage)), [typedMessage, dispatch])

  useEffect(() => {
    loadMessages()
  }, [loadMessages])

  return (
    <Box className='flex flex-col justify-center h-full overflow-hidden' >

      <Box className="relative overflow-y-auto w-full  bg-green-900 no-scrollbar">
        {settingsModal === "focused" ? <Focused /> : settingsModal === "chaos" ? <Chaos /> : <EquatorTest />}
      </Box>

      {/* -------------------------------------- */}

      <Box alignItems='flex-end' className="flex justify-between relative gap-2 lg:gap-4 m-auto" >
        {!(isChatSettingsOpen && !isMobile) && <AnimatePresence>
          <Box className="w-[60%] max-sm:flex-grow  sm:w-[566px] " maxWidth='100%' display='flex'>
            <motion.textarea
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              placeholder="type something retarded..."
              value={typedMessage}
              className={`bg-white ${theme.bgColor === "#ffffff"
                ? "border border-black"
                : "border-none"
                } text-[#121212] uppercase p-3 sm:p-5 text-[13px] lg:text-[18px] mx-auto rounded-[4px] lg:rounded-[8px] w-full outline-none resize-none`}
              onChange={({ target: { value } }) => dispatch(setTypedMessage(value))} //chat.setCurrentUserMessage(e.target.value)
              // onKeyDown={chat.handleKeyDown}
              rows={1}
            />
          </Box>

          <Box className={`p-[10px] sm:p-[15px] ${theme.bgColor === "#ffffff"
            ? "border border-black"
            : "border-none"
            } bg-white rounded-[4px] lg:rounded-[8px]  sm:block`}>
            <motion.button
              whileTap={clickAnimation}
              onClick={handleSendMessage}    >
              <Send style={{ color: theme.buttonColor }} />
            </motion.button>
          </Box>
        </AnimatePresence>}

        <ChatSettings handleMusicPlayPause={handleMusicPlayPause} />

        <Box className={`p-[10px] sm:p-[15px] ${theme.bgColor === "#ffffff"
          ? "border border-black"
          : "border-none"
          } bg-white rounded-[4px] sm:rounded-[8px] hidden md:block`}>
          <motion.button
            whileTap={clickAnimation}
            onClick={() => dispatch(setChatSettingsOpen(!isChatSettingsOpen))}
          >
            {isChatSettingsOpen ? <Close style={{ color: theme.buttonColor }} /> : <Settings style={{ color: theme.buttonColor }} />}
          </motion.button>
        </Box>
      </Box>
    </Box>
  )
}
