import React, { useEffect, useState } from 'react'
import IconWithoutText from '../Components/Shared/IconWithoutText';
import LoginContainer from '../LoginContainer';
import Card from '../Components/Shared/Card';
import { makeAuthenticatedGetRequest } from '../Utils/helper';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Components/Shared/Loader';




export default function Library() {
    const [myPlaylists, setMyPlaylists] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()


    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGetRequest(
                "/playlist/get/me"
            );
            setMyPlaylists(response.data);
            setLoading(false)
        };
        getData();
    }, []);

    return (
        <LoginContainer ActiveScreen="library">

            <div>
                <div className='flex py-4'>
                    <div className='text-2xl font-semibold text-white '>My Playlist</div>

                </div>
                {loading ? <Loader /> : <div >
                    {myPlaylists.length === 0 &&
                        <div className='flex flex-col items-center '>
                            <p className='text-lg text-white'>No Playlist Available </p>
                        </div>

                    }

                    {<div className="grid grid-cols-2 gap-5 py-5 overflow-y-auto md:grid-cols-3">
                        {myPlaylists.map((item, index) => {
                            return (
                                <Card
                                    key={index}
                                    onClick={() => { navigate('/playlist/' + item._id) }}
                                    title={item.name}
                                    imgUrl={item.thumbnail}
                                    playlistId={item._id}
                                />
                            );
                        })}
                    </div>}

                </div>}
            </div>


        </LoginContainer>
    )
}
