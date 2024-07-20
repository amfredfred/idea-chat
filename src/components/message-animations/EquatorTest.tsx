import { useState, useEffect, useCallback ,useMemo} from "react";
import Marquee from "react-fast-marquee";
import { websiteThemeState } from "../../atoms/website-theme";
import { useRecoilValue } from "recoil";
import React from "react";
interface Message {
  _id: any;
  message: string;
  username: string;
  profilePic: string;
}


const Slider = React.memo(
  ({
    messages,
    scrollDirection,
  }: {
    messages: Message[];
    scrollDirection: "left" | "right";
  }) => {
    const websiteTheme = useRecoilValue(websiteThemeState);
    return (
      <Marquee
        className=""
        speed={40}
        delay={0}
        autoFill
        direction={scrollDirection}
        key={messages.map((msg) => msg._id).join()}
        
      >
        <div className="flex gap-[30px] w-full overflow-auto ">
          {messages.map((msg: Message) => (
            <>
              <div className=" flex items-center gap-[5px]  ">
                <p
                  className=" text-[12px] lg:text-[14px] xl:text-[16px] "
                  style={{
                    color: websiteTheme.textColor,
                  }}
                >
                  {msg.username}
                </p>
                <div
                  //  style={{borderColor:websiteTheme.textColor}}
                  className=" rounded-full lg:h-[50px] lg:w-[50px] w-[35px] h-[35px] overflow-hidden  border-[0.5px]"
                >
                  <img
                    src={msg.profilePic}
                    className=" object-cover w-full h-full"
                  />
                </div>
                <p className="  text-[13px] lg:text-[18px] xl:text-[20px] max-w-[550px]  my-auto">
                  {msg.message}
                </p>
              </div>
              <div
                className="w-[1px] lg:w-[1px] mx-auto h-[50px] my-auto lg:h-[70px]"
                style={{
                  backgroundImage: `linear-gradient(to bottom , ${websiteTheme.bgColor} , ${websiteTheme.textColor} , ${websiteTheme.bgColor} )`,
                }}
              />
            </>
          ))}
          {messages.map((msg: Message) => (
            <>
              <div className=" flex items-center gap-[10px] ">
                <p
                  className=" text-[12px] lg:text-[14px] xl:text-[16px]  mr-[10px] ml-[10px] "
                  style={{
                    color: websiteTheme.textColor,
                  }}
                >
                  {msg.username}
                </p>
                <div
                  style={{ borderColor: websiteTheme.textColor }}
                  className=" rounded-full lg:h-[50px] lg:w-[50px] w-[35px] h-[35px] overflow-hidden border"
                >
                  <img
                    src={msg.profilePic}
                    className=" object-cover w-full h-full"
                  />
                </div>
                <p className="  text-[13px] lg:text-[18px] xl:text-[20px] sm:max-w-[500px] max-w-[80%]  ">
                  {msg.message}
                </p>
              </div>
              <div
                className="w-[1px] lg:w-[1px] mx-auto my-auto my- h-[50px] lg:h-[90px] "
                style={{
                  backgroundImage: `linear-gradient(to bottom , ${websiteTheme.bgColor} , ${websiteTheme.textColor} , ${websiteTheme.bgColor} )`,
                }}
              />
            </>
          ))}
        </div>
      </Marquee>
    );
  }
);

const EquatorTest = ({
  initialMessages,
  newMessage,
}: {
  initialMessages: Message[];
  newMessage: Message[];
}) => {
  const websiteTheme = useRecoilValue(websiteThemeState);
  const [firstRowMessages, setFirstRowMessages] = useState<Message[]>([]);
  const [secondRowMessages, setSecondRowMessages] = useState<Message[]>([]);
  const [thirdRowMessages, setThirdRowMessages] = useState<Message[]>([]);
  const [fourthRowMessages, setFourthRowMessages] = useState<Message[]>([]);

  const updateFourthRow = useCallback(
    (message: Message) => {
      setFourthRowMessages((prev) => {
        const updated = [...prev, message];
        if (updated.length <= 20) return updated;

        // Shift messages when fourth row exceeds 20
        setFirstRowMessages(secondRowMessages);
        setSecondRowMessages(thirdRowMessages);
        setThirdRowMessages(prev.slice(0, 16));
        return updated.slice(-4);
      });
    },
    [secondRowMessages, thirdRowMessages]
  );

  useEffect(() => {
    if (newMessage.length > 0) {
      updateFourthRow(newMessage[newMessage.length - 1]);
    }
  }, [newMessage, updateFourthRow]);

  useEffect(() => {
    setFirstRowMessages(initialMessages.slice(0, 16));
    setSecondRowMessages(initialMessages.slice(16, 32));
    setThirdRowMessages(initialMessages.slice(32, 48));
    setFourthRowMessages(initialMessages.slice(48));
  }, [initialMessages]);

  const memoizedFirstSlider = useMemo(
    () => <Slider messages={firstRowMessages} scrollDirection="left" />,
    [firstRowMessages]
  );
  const memoizedSecondSlider = useMemo(
    () => <Slider messages={secondRowMessages} scrollDirection="right" />,
    [secondRowMessages]
  );
  const memoizedThirdSlider = useMemo(
    () => <Slider messages={thirdRowMessages} scrollDirection="left" />,
    [thirdRowMessages]
  );

  return (
    <div className="w-full flex flex-col justify-end h-full lg:gap-[40px] gap-[60px] ">
      {memoizedFirstSlider}
      <div className="w-[50%] h-[1px]" style={{ backgroundImage: `linear-gradient(to right , ${websiteTheme.bgColor} , ${websiteTheme.textColor} , ${websiteTheme.bgColor} )` }} />
      {memoizedSecondSlider}
      <div className="w-[50%] mx-auto h-[1px]" style={{ backgroundImage: `linear-gradient(to right , ${websiteTheme.bgColor} , ${websiteTheme.textColor} , ${websiteTheme.bgColor} )` }} />
      {memoizedThirdSlider}
      <div className=" flex flex-col items-end">
        <div className="w-[50%] h-[1px]" style={{ backgroundImage: `linear-gradient(to right , ${websiteTheme.bgColor} , ${websiteTheme.textColor} , ${websiteTheme.bgColor} )` }} />
      </div>
      <Slider messages={fourthRowMessages} scrollDirection="right" />
    </div>
  );
};

export default EquatorTest;
