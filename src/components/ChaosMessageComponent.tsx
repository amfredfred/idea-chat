import { useAppSelector } from "../libs/redux/hooks";
import { motion } from 'framer-motion'

interface MessageProps {
    message: string;
    username: string;
    profilePic: string;
}

const ChaosMessageComponent: React.FC<MessageProps> = ({ username, message, profilePic }) => {
    const websiteTheme = useAppSelector(state => state.theme.current.styles);

    return (
        <motion.div
            className=" mx-auto flex flex-col gap-[15px] lg:gap-[20px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            <div className="flex  w-max max-w-[calc(30vw_-_2rem)] max-sm:max-w-[calc(50vw_-_2rem)]">
                <p className="text-[11px] lg:text-[13px] xl:text-[16px] text-right  sm:w-[70%] text-ellipsis overflow-hidden"
                    style={{ color: websiteTheme.textColor }}  >
                    {username}
                </p>
                <img src={profilePic} className="object-cover rounded-full w-[30px] h-[30px]  aspect-square" alt={username} />
                <p className="text-[10px] lg:text-[12px]">
                    {message}
                </p>
            </div>
        </motion.div>
    );
};

export default ChaosMessageComponent