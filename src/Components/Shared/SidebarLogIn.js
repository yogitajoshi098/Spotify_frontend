import React, { useContext } from 'react';
import { Icon } from '@iconify/react';
import { useCookies } from 'react-cookie';
import Button from './Button';
import TextWithHover from './TextWithHover';
import { userContext } from '../../App';

const SidebarLogin = ({ onClose, handleLoginClick, handleProfileClick }) => {
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
    const { user } = useContext(userContext)

    const { firstName, lastName } = user

    const f = firstName.substring(0, 1).toUpperCase();
    const l = lastName.substring(0, 1).toUpperCase();

    return (
        <div className={' w-full h-full py-12 md:hidden px-4 bg-black flex'}>
            <button className="absolute top-4 right-2" onClick={onClose}>
                <Icon icon="clarity:close-line" width="40" height="40" color='white' />
            </button>
            <TextWithHover displayText={`${f}${l}`} className={"px-2 py-2 rounded-full font-semibold mt-2 bg-white hover:bg-white transition-transform transform hover:scale-105 absolute top-4 left-8"} />
            <div className='flex flex-col justify-around'>
                <button className={"font-semibold text-2xl text-gray-200 hover:text-white"} onClick={handleProfileClick} >{"Profile"}</button>
                <button className={"font-semibold text-2xl text-gray-200 hover:text-white"} onClick={handleLoginClick} >{"Log Out"}</button>
                <div className='border border-t-white'></div>
                <TextWithHover displayText={"Premium"} className={"text-xl"} />
                <TextWithHover displayText={"Support"} className={"text-xl"} />
                <TextWithHover displayText={"Download"} className={"text-xl"} />
                <p className='text-sm text-gray-200 hover:text-white md:text-lg'>copyright@ Yogita Joshi</p>
            </div>

        </div>
    );
};

export default SidebarLogin;
