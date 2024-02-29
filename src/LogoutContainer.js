import React, { useContext, useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import IconText from './Components/Shared/IconText';
import TextWithHover from './Components/Shared/TextWithHover'
import Button from './Components/Shared/Button';
import { useCookies } from 'react-cookie';
import SidebarLogout from './Components/Shared/SidebarLogut';
import { useNavigate } from 'react-router-dom';
import Bottombar from './Components/Shared/Bottombar';
import { alertContext } from './App';
import AlertModal from './modal/Alert';



export default function LogoutContaier({ children }) {
    const [sideOpen, setSideOpen] = useState(false)
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
    const { Alert } = useContext(alertContext)
    const navigate = useNavigate()



    const handleLoginClick = () => {
        navigate("/login")
    }

    const handleSignupClick = () => {
        navigate("/signup")
    }

    const openSideBar = () => {
        setSideOpen(true)
    }
    const closeSideBar = () => {
        setSideOpen(false)
    }

    return (<div className='w-full h-full bg-app-black'>
        {Alert && (
            <AlertModal
            />
        )}

        <div className='hidden w-full h-full md:flex'>
            <div className='flex flex-col justify-between w-1/5 h-full bg-black '>
                <div>
                    <div className='flex items-center mt-5 space-x-1 h-fit' >
                        <Icon icon="logos:spotify-icon" width="50" />
                        <p className='text-3xl text-white'>Spotify</p>
                    </div>
                    <div className="py-5">
                        <IconText
                            iconName={"material-symbols:home"}
                            displayText={"Home"}
                            targetLink={"/"}
                            active
                        />
                        <IconText
                            iconName={"material-symbols:search-rounded"}
                            displayText={"Search"}
                            targetLink={'/search'}
                        />

                        <IconText
                            iconName={"icomoon-free:books"}
                            displayText={"Library"}
                            targetLink={'/myPlaylist'}

                        />
                        <IconText
                            iconName={
                                "material-symbols:library-music-sharp"
                            }
                            displayText={"My Music"}
                            targetLink="/myMusic"
                        />


                    </div>
                    <div className="pt-5">

                        <IconText
                            iconName={"material-symbols:upload"}
                            displayText={"Upload Song"}
                            targetLink={"/uploadSong"}
                        />

                        <IconText
                            iconName={"material-symbols:add-box"}
                            displayText={"Create Playlist"}
                            targetLink={"/uploadSong"}
                        />
                        <IconText
                            iconName={"mdi:cards-heart"}
                            displayText={"Liked Songs"}
                            targetLink={"/uploadSong"}
                        />



                    </div>
                </div>
                <div className="px-5 pb-10">
                    <div className="flex items-center justify-center w-2/5 px-2 py-1 text-white border border-gray-400 rounded-full cursor-pointer hover:border-white">
                        <Icon icon="carbon:earth-europe-africa" />
                        <div className="ml-2 text-sm font-semibold">
                            English
                        </div>
                    </div>
                </div>
                <div className='py-1 text-xs text-center text-white'>Copyright@ Yogita Joshi</div>
            </div>
            <div className='w-full h-full md:w-4/5'>
                <div className='w-full bg-black  h-[10%] md:flex hidden bg-opacity-90 justify-end items-center '>
                    <div className='flex justify-around w-3/5'>
                        <TextWithHover displayText={"Premium"} />
                        <TextWithHover displayText={"Support"} />
                        <TextWithHover displayText={"Download"} />
                        <div className='border border-white'></div>
                        <button className='font-semibold text-gray-500 hover:text-white' onClick={handleSignupClick}>{"Sign up"}</button>
                        <Button bText={"Log In"} className={"px-6 py-2 font-semibold mt-2 bg-gray-200 hover:bg-white transition-transform transform hover:scale-105"} onClick={handleLoginClick} />
                    </div>
                </div>
                <div className='w-full h-[90%] overflow-y-auto bg-app-black'>

                    <div className="p-8 pt-0 ">
                        {children}
                    </div>

                </div>

            </div>


        </div>

        {sideOpen ? <SidebarLogout onClose={closeSideBar} handleLoginClick={handleLoginClick} handleSignupClick={handleSignupClick} /> : (
            <>
                <div className='w-full bg-black  h-[10%] md:hidden bg-opacity-100 '>
                    <div className='flex justify-between px-4 py-3'>
                        <Icon icon="logos:spotify" width="150" height="40" />
                        <button onClick={openSideBar}>
                            <Icon icon="ci:hamburger-md" width="50" height="40" color='white' />
                        </button>


                    </div>

                </div>
                <div className='md:hidden h-[80%]'>

                    <div className="h-full p-8 pt-0 overflow-y-auto bg-app-black">
                        {children}
                    </div>


                </div>

            </>)}


        {!sideOpen && <div className='w-full bg-black h-[10%] md:hidden bg-opacity-100 items-center ' style={{ position: 'fixed', bottom: '0', left: '0', width: '100%', zIndex: 999 }}>

            <Bottombar />

        </div>}
    </div>

    )
}
