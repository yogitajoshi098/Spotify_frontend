import React, { useContext, useState } from 'react'
import { makeAuthenticatedPUTRequest } from '../Utils/helper';
import IconWithoutText from '../Components/Shared/IconWithoutText';
import LoginContainer from '../LoginContainer';
import { alertContext, userContext } from '../App';
import Loader from '../Components/Shared/Loader';



export default function MyProfile() {
    const { user, setUser } = useContext(userContext)
    const { setAlert, setAlertMessage } = useContext(alertContext)
    const [isDisabledF, setIsDisabledF] = useState(true)
    const [isDisabledL, setIsDisabledL] = useState(true)
    const [fname, setFname] = useState(user.firstName)
    const [lname, setLname] = useState(user.lastName)
    const [loading, setLoading] = useState(false)


    const handleFClick = () => {
        setIsDisabledF(false)
    }
    const handleLClick = () => {
        setIsDisabledL(false)
    }

    const updateDetails = async () => {
        setLoading(true)
        const updatedFields = {};

        if (fname !== user.firstName) {
            updatedFields.firstName = fname;
        }

        if (lname !== user.lastName) {
            updatedFields.lastName = lname;
        }
        if (Object.keys(updatedFields).length === 0) {

            setAlertMessage("No fields Changed");
            setAlert(true)
            setIsDisabledF(true);
            setIsDisabledL(true);
            setLoading(false)
            return;
        }
        const data = updatedFields
        const response = await makeAuthenticatedPUTRequest(
            "/user/updateDetails",
            data
        );
        if (response.success) {

            const updatedUser = { ...user, ...response.user };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setLoading(false)

            setAlertMessage("Details updated successfully ✅")
            setAlert(true)
            setFname(updatedUser.firstName);
            setLname(updatedUser.lastName);
            setIsDisabledF(true);
            setIsDisabledL(true);
            setUser(updatedUser)
        } else {
            console.error("User details update failed:", response.error);
            setLoading(false)
            setAlertMessage("User details update failed ❌")
            setAlert(true)
        }
    };



    return (
        <LoginContainer ActiveScreen="profile">

            <div className='flex flex-col justify-between w-full h-full'>
                {loading ? <Loader /> : <>
                    <div className='flex py-4'>
                        <div className='text-2xl font-semibold text-white '>Welcome {user.firstName},</div>

                    </div>

                    <div className='flex flex-col mt-10 space-y-2'>
                        <label htmlFor="Song name" className='font-semibold text-white'>
                            First Name
                        </label>
                        <div className='flex justify-between gap-1 md:gap-0'>
                            <input className='w-[80%]  h-10 px-2 font-semibold bg-white border-2 border-gray-600 font-poppins' onChange={(e) => { setFname(e.target.value) }} value={fname} disabled={isDisabledF} />
                            {isDisabledF ? (<button className='px-3 py-1 font-semibold text-black bg-gray-200 rounded-lg hover:bg-white' onClick={handleFClick}>Edit</button>) : (<div className='flex gap-1'> <button className='px-2 py-1 font-semibold text-black bg-gray-200 rounded-lg hover:bg-white' onClick={updateDetails}>Save</button>
                                <button className='px-2 py-1 font-semibold text-black bg-gray-200 rounded-lg hover:bg-white' onClick={() => { setIsDisabledF(true); setFname(user.firstName) }} >Cancel</button></div>)}


                        </div>


                    </div>
                    <div className='flex flex-col mt-10 space-y-2 '>
                        <label htmlFor="Song name" className='font-semibold text-white'>
                            Last Name
                        </label>
                        <div className='flex justify-between gap-1 md:gap-0 '>
                            <input className='w-[80%] h-10 px-2 font-semibold bg-white border-2 border-gray-600 font-poppins' onChange={(e) => { setLname(e.target.value) }} value={lname} disabled={isDisabledL} />
                            {isDisabledL ? (<button className='px-3 py-1 font-semibold text-black bg-gray-200 rounded-lg hover:bg-white' onClick={handleLClick}>Edit</button>) : (<div className='flex gap-1'> <button className='px-2 py-1 font-semibold text-black bg-gray-200 rounded-lg hover:bg-white' onClick={updateDetails} >Save</button>
                                <button className='px-2 py-1 font-semibold text-black bg-gray-200 rounded-lg hover:bg-white' onClick={() => { setIsDisabledL(true); setLname(user.lastName) }} >Cancel</button></div>)}
                        </div>

                    </div>
                    <div className='flex flex-col mt-10 space-y-2'>
                        <label htmlFor="Song name" className='font-semibold text-white'>
                            email
                        </label>
                        <input className='h-10 px-2 font-semibold bg-white border-2 border-gray-600 font-poppins' value={user.email} disabled />


                    </div>

                    <div className='flex flex-col mt-10 space-y-2'>
                        <label htmlFor="Song name" className='font-semibold text-white'>
                            username
                        </label>
                        <input className='h-10 px-2 font-semibold bg-white border-2 border-gray-600 font-poppins' value={user.username} disabled />


                    </div>
                    <div className='flex flex-col mt-10 space-y-2'>
                        <label htmlFor="Song name" className='font-semibold text-white'>
                            Date of Birth
                        </label>
                        <div className='flex justify-between w-full'>
                            <input className='h-10 w-[30%] bg-white font-semibold px-2 border-gray-600 border-2 font-poppins' value={user.year} disabled />
                            <input className='h-10 w-[30%] bg-white font-semibold px-2 border-gray-600 border-2 font-poppins' value={user.month} disabled />
                            <input className='h-10 w-[30%] bg-white font-semibold px-2 border-gray-600 border-2 font-poppins' value={user.day} disabled />
                        </div>



                    </div>

                </>}
            </div>


        </LoginContainer>
    )
}
