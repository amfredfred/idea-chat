import { useRecoilState } from "recoil";
import { useState } from "react";
import errorIcon from "../assets/error.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { userProfilePicState } from "../atoms/users";
import { MdDriveFolderUpload } from "react-icons/md";
import ContainedLayout from "../layouts/ContainedLayout";
import { Box, Button, Input } from "@mui/material";
import { useAppSelector } from "../libs/redux/hooks";
import { useWallet } from "@solana/wallet-adapter-react";

const BASE_URI = "https://prithvikr.live";

const Profile = () => {
    const websiteTheme = useAppSelector(state => state.theme.current.styles);
    const [userName, setUserName] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [, setShowProfilePicError] = useState(false);
    const [showFileUploadSuccess, setShowFileUploadSuccess] = useState(false);
    const [profilePicFromS3, setProfilePicFromS3] =
        useRecoilState(userProfilePicState);

    const walletAddress = localStorage.getItem("walletAddress");
    const wallet = useWallet()


    const handleFileChange = (event: any) => {
        setShowProfilePicError(false);
        const file = event.target.files[0];
        if (file && file.size <= 10 * 1024 * 1024) {
            setProfilePic(file);
        } else {
            setShowProfilePicError(true);
        }
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!profilePic) {
            return;
        }

        const formData = new FormData();
        formData.append("profilePic", profilePic);

        try {
            const response = await axios.post(
                `${BASE_URI}/api/profile-pic?walletAddress=${walletAddress}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            const data = response.data;
            setProfilePicFromS3(data.data.Location);
            setShowFileUploadSuccess(true);

            setProfilePic(data.data.Location);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const renderProfilePic = () => {
        if (profilePic) {
            try {
                return URL.createObjectURL(profilePic);
            } catch {
                return profilePic;
            }
        } else {
            return profilePicFromS3;
        }
    };
    return (
        <ContainedLayout>
            <Box className="uppercase h-screen max-h-screen w-full font-jbm"  >
                <div className="flex flex-col items-center justify-center relative  gap-5 lg:gap-10 w-full ">

                    <Box className='flex flex-col gap-4  max-w-[100%]'>
                        <Box className='w-full  max-md:flex-row-reverse flex justify-between  items-center'>
                            <Box className=' flex-grow h-auto '>
                                {false && (
                                    <div className=" flex gap-2 items-center justify-center ">
                                        <img src={errorIcon} />
                                        <p>name taken try something else</p>
                                    </div>
                                )}
                                {false && (
                                    <div className=" flex gap-2 items-center justify-center ">
                                        <p>username added successfully</p>
                                    </div>
                                )}
                                {showFileUploadSuccess && (
                                    <div className=" flex gap-2 items-center justify-center ">
                                        <p>Profile Picture updated successfully</p>
                                    </div>
                                )}
                            </Box>

                            <div className=" relative group  border border-white h-[100px] w-[100px] lg:h-[200px] lg:w-[200px] rounded-[100%] flex items-center justify-center ">
                                <div className=" rounded-full h-full w-full overflow-hidden ">
                                    <img
                                        src={renderProfilePic()}
                                        className=" object-cover w-full h-full"
                                    />
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="   absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full h-full"    >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id="fileInput"
                                        onChange={handleFileChange}
                                    />
                                    <label
                                        htmlFor="fileInput"
                                        className="flex items-center justify-center cursor-pointer w-full h-full"
                                    >
                                        <MdDriveFolderUpload className=" w-full h-auto opacity-0" />
                                    </label>
                                </form>
                            </div>
                        </Box>

                        <Box className='grid grid-cols-3 gap-2 '>
                            <Box
                                sx={{ borderColor: websiteTheme.text_color, color: websiteTheme.text_color }}
                                className={` center col-span-1 uppercase flex items-center justify-center  border  px-4 py-2 text-[15px] lg:text-[20px] outline-none `} >
                                username
                            </Box>
                            <Box
                                sx={{ borderColor: websiteTheme.text_color }}
                                className={`max-sm:col-span-3 col-span-2 uppercase  border  px-4 py-2 text-[15px] lg:text-[20px] outline-none `} >
                                <Input
                                    inputProps={{ style: { textTransform: 'uppercase', color: websiteTheme.text_color } }}
                                    placeholder="type here"
                                    value={userName}
                                    disableUnderline
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </Box>
                        </Box>

                        <Box className='m-auto flex justify-center max-w-[640px]  w-full ' alignItems='center'>
                            <Button
                                disableElevation
                                disableTouchRipple
                                sx={{ padding: '.7rem', color: websiteTheme.bgColor, background: websiteTheme.text_color }}
                                className="flex h-full  align-middle gap-2 justify-center  w-full  whitespace-nowrap overflow-hidden text-ellipsis "   >
                                save
                            </Button>
                        </Box>

                        <Link to="/chat" style={{ color: websiteTheme.text_color }} className="mx-auto">
                            <p className=" uppercase text-[15px] lg:text-[20px]">Back to chat</p>
                        </Link>

                        <Box className='m-auto flex justify-center max-w-[100%] h-[56px] mt-12' alignItems='center'>
                            <Button
                                sx={{ borderColor: websiteTheme.text_color, color: websiteTheme.text_color }}
                                variant="outlined" className="flex h-full align-middle gap-2 justify-center  w-full  whitespace-nowrap overflow-hidden text-ellipsis"   >
                                <span>connected with </span>
                                <strong className=" whitespace-nowrap overflow-hidden text-ellipsis">
                                    {wallet.publicKey?.toString()}
                                </strong>
                            </Button>
                        </Box>
                    </Box>
                </div>
            </Box>
        </ContainedLayout>
    );
};

export default Profile;
