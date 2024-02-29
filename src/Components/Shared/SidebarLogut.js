import React from 'react';
import { Icon } from '@iconify/react';
import { useCookies } from 'react-cookie';
import Button from './Button';
import TextWithHover from './TextWithHover';

const SidebarLogut = ({ onClose, handleLoginClick, handleSignupClick }) => {
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
    return (
        <div className={' w-full h-full py-12 md:hidden px-4 bg-black flex'}>
            <button className="absolute top-4 right-2" onClick={onClose}>
                <Icon icon="clarity:close-line" width="40" height="40" color='white' />
            </button>
            <div className='flex flex-col justify-around'>

                <button className={"font-semibold text-2xl text-gray-200 hover:text-white"} onClick={handleLoginClick} >{"Log In"}</button>
                <button className='text-2xl font-semibold text-gray-200 hover:text-white' onClick={handleSignupClick}>Sign up</button>
                <div className='border border-t-white'></div>
                <TextWithHover displayText={"Premium"} className={"text-xl"} />
                <TextWithHover displayText={"Support"} className={"text-xl"} />
                <TextWithHover displayText={"Download"} className={"text-xl"} />

                <p className='text-sm text-gray-200 hover:text-white md:text-lg'>copyright@ Yogita Joshi</p>

            </div>



        </div>
    );
};

export default SidebarLogut;
