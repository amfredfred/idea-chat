import { Box } from '@mui/material'
import Focused from '../message-animations/Focused'
import Chaos from '../message-animations/Chaos'
import EquatorTest from '../message-animations/EquatorTest'

export default function Den() {
  return (
    <Box width='100%'>
      <div className="relative  lg:h-[75%] overflow-y-auto mb-[10px]  w-full">
        {chat.settingsModal.motion === "focused" ? (
          chat.initialMessages.length > 0 && (
            <Focused />
          )
        ) : chat.settingsModal.motion === "chaos" ? (
          <Chaos
            newMessage={chat.newMessage}
            width={totalWidth}
            height={totalHeight}
          />
        ) : (
          chat.initialMessages.length > 0 && (
            <EquatorTest
              initialMessages={chat.initialMessages}
              newMessage={chat.newMessage}
            />
          )
        )}
      </div>
      {/* -------------------------------------- */}

      <div className="flex items-start  justify-center gap-2 lg:gap-4 h-[7%] w-full ">
        <AnimatePresence>
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
              value={chat.currentUserMessage}
              className={`bg-white ${theme.styles.bgColor === "#ffffff"
                ? "border border-black"
                : "border-none"
                } text-[#121212] uppercase p-3 lg:p-5 text-[13px] lg:text-[18px] mx-auto rounded-[4px] lg:rounded-[8px] w-full outline-none resize-none`}
              onChange={(e) => chat.setCurrentUserMessage(e.target.value)}
              onKeyDown={chat.handleKeyDown}
              rows={1}
            />
          </div>
        </AnimatePresence>

        <motion.button
          whileTap={chat.clickAnimation}
          className={`p-[10px] lg:p-[15px] ${theme.styles.bgColor === "#ffffff"
            ? "border border-black"
            : "border-none"
            } bg-white rounded-[4px] lg:rounded-[8px] hidden lg:block`}
          onClick={chat.handleSendMessage}
        >
          <AiOutlineSend
            className={`w-[22px] lg:w-[35px] h-auto `}
            style={{
              color: theme.styles.buttonColor,
            }}
          />
        </motion.button>
        {!chat.isSettingsOpen && (
          <motion.button
            whileTap={chat.clickAnimation}
            className={`p-[10px] lg:p-[15px] ${theme.styles.bgColor === "#ffffff"
              ? "border border-black"
              : "border-none"
              } bg-white rounded-[4px] lg:rounded-[8px] lg:hidden`}
            onClick={chat.handleSendMessage}
          >
            <AiOutlineSend
              className={`w-[22px] lg:w-[35px] h-auto `}
              style={{
                color: theme.styles.buttonColor,
              }}
            />
          </motion.button>
        )}

        <Box ref={chat.modalRef} className="relative isolate">
          <motion.button
            whileTap={chat.clickAnimation}
            className={`p-[10px] lg:p-[15px] ${theme.styles.bgColor === "#ffffff"
              ? "border border-black"
              : "border-none"
              } bg-white rounded-[4px] lg:rounded-[8px] hidden lg:block`}
            onClick={() => chat.setIsSettingsOpen(state => !state)}>
            {chat.isSettingsOpen ? <SettingsClosed color={theme.styles.buttonColor} /> : <SettingsIcon color={theme.styles.buttonColor} />}
          </motion.button>
        </Box>


        {SettingsPartial}
      </div>
    </Box>
  )
}
