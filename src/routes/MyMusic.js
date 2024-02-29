import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { makeAuthenticatedGetRequest } from '../Utils/helper';
import IconWithoutText from '../Components/Shared/IconWithoutText';
import SingleSongCard from '../Components/Shared/SingleSongCard';
import LoginContainer from '../../src/LoginContainer';
import Loader from '../Components/Shared/Loader';
import { Link } from 'react-router-dom';



export default function UploadSong() {
    const [songData, setSongData] = useState([])
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
    const [loading, setLoading] = useState(true)




    useEffect(() => {
        const getSongs = async () => {
            const response = await makeAuthenticatedGetRequest('/song/get/mysongs')
            setSongData(response.data)
            setLoading(false)
        }
        getSongs()
    }, [])




    return (
        <LoginContainer ActiveScreen="myMusic">
            <div>
                <div className='flex py-4'>
                    <div className='text-2xl font-semibold text-white '>My Music</div>

                </div>
                {loading ? <Loader /> : <div >
                    {songData.length === 0 &&
                        <div className='flex flex-col items-center'>
                            <p className='text-lg text-white'>Please upload songs first.</p>
                            <Link className='text-sm text-white underline' to="/uploadSong" >Upload Song</Link>
                        </div>}

                    {songData?.map((song, index) => {
                        return <SingleSongCard key={index} info={song} />
                    })}
                </div>}



            </div>
        </LoginContainer>
    )
}
