import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoginContainer from '../LoginContainer'
import IconWithoutText from '../Components/Shared/IconWithoutText'
import { makeAuthenticatedGetRequest } from '../Utils/helper'
import SingleSongCard from '../Components/Shared/SingleSongCard'
import Loader from '../Components/Shared/Loader'

export default function MyPlaylist() {
    const { playlistId } = useParams()
    const [playlistDetails, setPlaylistDetais] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGetRequest('/playlist/get/playlist/' + playlistId)
            console.log(response, "res")
            setPlaylistDetais(response)
            setLoading(false)
        }
        getData()
    })
    return (
        <LoginContainer ActiveScreen="library">
            {loading ? <Loader /> :

                <>{
                    playlistDetails._id && <>
                        <div>
                            <div className='flex py-4'>
                                <div className='text-2xl font-semibold text-white '>{playlistDetails.name}</div>
                            </div>
                            <div className='flex flex-col overflow-y-auto'>
                                {playlistDetails.songs.length === 0 &&
                                    <div className='flex justify-center'>
                                        <p className='text-lg text-white'>No songs in this playlist</p>

                                    </div>}

                                {playlistDetails.songs?.map((song, index) => {
                                    return <SingleSongCard key={index} info={song} />
                                })}
                            </div>


                        </div></>
                }</>
            }




        </LoginContainer>
    )
}
