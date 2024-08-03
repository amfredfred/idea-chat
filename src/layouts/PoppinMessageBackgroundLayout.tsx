import { ReactNode, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';
import { Backdrop, Box } from '@mui/material';
import { checkOverlap } from '../utils';
import { useAppSelector } from '../libs/redux/hooks';

const BgMessage = [
    { message: 'Just bought the dip!', username: 'CryptoFan', image: 'https://via.placeholder.com/50' },
    { message: 'HODL for dear life!', username: 'HODLer', image: 'https://via.placeholder.com/50' },
    { message: 'When moon?', username: 'MoonLover', image: 'https://via.placeholder.com/50' },
    { message: 'Pump it up!', username: 'PumpMaster', image: 'https://via.placeholder.com/50' },
    { message: 'To the moon and beyond!', username: 'RocketMan', image: 'https://via.placeholder.com/50' },
    { message: 'Bag holding since 2017.', username: 'OldTimer', image: 'https://via.placeholder.com/50' },
    { message: 'There is a world out there that’s calling my name, and it’s calling yours too :)', username: 'Dreamer', image: 'https://via.placeholder.com/50' },
    { message: 'Bought high, selling low.', username: 'FOMOer', image: 'https://via.placeholder.com/50' },
    { message: 'Crypto millionaire in the making.', username: 'FutureRich', image: 'https://via.placeholder.com/50' },
    { message: 'Lambo incoming!', username: 'LamboHunter', image: 'https://via.placeholder.com/50' },
    { message: 'Next stop, Mars!', username: 'SpaceTraveler', image: 'https://via.placeholder.com/50' },
    { message: 'Bought the dip, now it dipped even more.', username: 'DipBuyer', image: 'https://via.placeholder.com/50' },
    { message: 'Just another day in the crypto world.', username: 'CryptoNerd', image: 'https://via.placeholder.com/50' },
    { message: 'Who needs sleep when you have crypto?', username: 'NoSleep', image: 'https://via.placeholder.com/50' },
    { message: 'Just another pump and dump.', username: 'PumpDumper', image: 'https://via.placeholder.com/50' },
    { message: 'When in doubt, zoom out.', username: 'ZoomOut', image: 'https://via.placeholder.com/50' },
    { message: 'Crypto is life.', username: 'CryptoLife', image: 'https://via.placeholder.com/50' },
    { message: 'Holding on for that sweet 10x.', username: '10xHunter', image: 'https://via.placeholder.com/50' },
    { message: 'To the moon, then back to reality.', username: 'MoonBack', image: 'https://via.placeholder.com/50' },
    { message: 'Pump fun all day!', username: 'FunLover', image: 'https://via.placeholder.com/50' }
];

interface Bubble {
    id: string;
    message: string;
    username: string;
    image: string;
    position: { top: string; left: string };
}

const getRandomPosition = (existingBubbles: Bubble[], bubbleSize: { width: number; height: number }) => {
    const getRandomPos = () => ({
        top: Math.random() * (window.innerHeight - bubbleSize.height),
        left: Math.random() * (window.innerWidth - bubbleSize.width)
    });

    let position: any = {};
    let tries = 0;

    do {
        const randomPos = getRandomPos();
        position = {
            top: `${randomPos.top}px`,
            left: `${randomPos.left}px`
        };

        tries++;
    } while (
        existingBubbles.some((bubble) => {
            const bubbleRect = {
                top: parseFloat(bubble.position.top),
                left: parseFloat(bubble.position.left),
                bottom: parseFloat(bubble.position.top) + bubbleSize.height,
                right: parseFloat(bubble.position.left) + bubbleSize.width
            };
            const positionRect = {
                top: parseFloat(position.top),
                left: parseFloat(position.left),
                bottom: parseFloat(position.top) + bubbleSize.height,
                right: parseFloat(position.left) + bubbleSize.width
            };

            return checkOverlap(bubbleRect as DOMRect, positionRect as DOMRect);
        }) && tries < 100
    );

    return position;
};

interface ChatBubbleProps {
    message: string;
    username: string;
    image: string;
    position: { top: string; left: string };
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, username, image, position }) => {
    return (
        <motion.div
            className="absolute  text-white p-2  flex items-center space-x-2"
            style={{ ...position, transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <Box className="flex gap-2 align-middle" alignItems='center'>
                <span className="font-bold">{username}</span>
                <img src={image} alt="Chat" className="w-8 h-8 rounded-full" />
                <span>{message}</span>
            </Box>
        </motion.div>
    );
};

const PoppinMessageBackgroundLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [bubbles, setBubbles] = useState<Bubble[]>([]);
    const bubbleSize = { width: 200, height: 100 };
    const theme = useAppSelector(state => state.theme.current.styles)

    useEffect(() => {
        const interval = setInterval(() => {
            const randomMessage = BgMessage[Math.floor(Math.random() * BgMessage.length)];
            const newBubble: Bubble = {
                id: uuidv4(),
                message: randomMessage.message,
                username: randomMessage.username,
                image: randomMessage.image,
                position: getRandomPosition(bubbles, bubbleSize)
            };

            setBubbles((prevBubbles) => [...prevBubbles, newBubble]);

            setTimeout(() => {
                setBubbles((prevBubbles) => prevBubbles.filter((bubble) => bubble.id !== newBubble.id));
            }, 5000);
        }, 200);

        return () => clearInterval(interval);
    }, [bubbles]);

    return (
        <Box className="relative w-full h-screen overflow-hidden " sx={{ background: theme.bgColor }} >
            <AnimatePresence>
                {bubbles.map((bubble) => (
                    <ChatBubble key={bubble.id} message={bubble.message} username={bubble.username} image={bubble.image} position={bubble.position} />
                ))}
            </AnimatePresence>
            <Backdrop open sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Box className="relative w-full h-full">{children}</Box>
            </Backdrop>
        </Box>
    );
};

export default PoppinMessageBackgroundLayout;
