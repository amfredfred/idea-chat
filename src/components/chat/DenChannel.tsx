import { Box } from '@mui/material'
import Focused from '../message-animations/Focused'
import Chaos from '../message-animations/Chaos'
import EquatorTest from '../message-animations/EquatorTest'
import ChatSettings from './ChatSettings'
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks'
import { Close, Send, Settings } from '@mui/icons-material'
import { setChatSettingsOpen } from '../../libs/redux/slices/chat-slice'


export default function DenChannel() {

  const totalWidth = window.innerWidth;
  const totalHeight = window.innerHeight;
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme.current.styles)
  const settingsModal = useAppSelector(state => state.chat.settingsModal.motion)
  const initialMessages = useAppSelector(state => state.chat.initialMessages)
  const isChatSettingsOpen = useAppSelector(state => state.chat.isChatSettingsOpen)
  const currentUserMessage = useAppSelector(state => state.chat.newMessages)

  const clickAnimation = {
    scale: 0.9,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };

  const handleSendMessage = () => {
    console.log("SEND MESSAGE")
  }

  return (
    <Box width='100%' >
      <div className="relative   overflow-y-auto  w-full">
        {settingsModal === "focused" ? (
          initialMessages.length > 0 && (
            <Focused />
          )
        ) : settingsModal === "chaos" ? (
          <Chaos
            newMessage={currentUserMessage?.[0]}
            width={totalWidth}
            height={totalHeight}
          />
        ) : (
          initialMessages.length > 0 && (
            <EquatorTest
              initialMessages={initialMessages}
              newMessage={currentUserMessage}
            />
          )
        )}
      </div>
      {/* -------------------------------------- */}

      <Box alignItems='center' className="flex items-start  justify-center  relative gap-2 lg:gap-4 w-full " >
        <AnimatePresence>
          <Box className="w-[60%]  xl:w-[566px] " maxWidth='100%' display='flex'>
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
              value={''}
              className={`bg-white ${theme.bgColor === "#ffffff"
                ? "border border-black"
                : "border-none"
                } text-[#121212] uppercase p-3 lg:p-5 text-[13px] lg:text-[18px] mx-auto rounded-[4px] lg:rounded-[8px] w-full outline-none resize-none`}
              // onChange={() => null} //chat.setCurrentUserMessage(e.target.value)
              // onKeyDown={chat.handleKeyDown}
              rows={1}
            />
          </Box>
        </AnimatePresence>

        <Box>
          <motion.button
            whileTap={clickAnimation}
            className={`p-[10px] lg:p-[15px] ${theme.bgColor === "#ffffff"
              ? "border border-black"
              : "border-none"
              } bg-white rounded-[4px] lg:rounded-[8px] hidden lg:block`}
            onClick={handleSendMessage}
          >
            <Send style={{ color: theme.buttonColor }} />
          </motion.button>
        </Box>

        <Box >
          <motion.button
            whileTap={clickAnimation}
            className={`p-[10px] lg:p-[15px] ${theme.bgColor === "#ffffff"
              ? "border border-black"
              : "border-none"
              } bg-white rounded-[4px] lg:rounded-[8px] hidden lg:block`}
            onClick={() => dispatch(setChatSettingsOpen(!isChatSettingsOpen))}
          >
            {isChatSettingsOpen ? <Close style={{ color: theme.buttonColor }} /> : <Settings style={{ color: theme.buttonColor }} />}
          </motion.button>
        </Box>

        <ChatSettings />
      </Box>
    </Box>
  )
}
