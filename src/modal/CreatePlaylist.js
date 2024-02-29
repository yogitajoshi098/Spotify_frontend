import React, { useContext, useState } from 'react'
import { makeAuthenticatedPOSTRequest } from '../Utils/helper';
import { useNavigate } from 'react-router-dom';
import { alertContext } from '../App';
import CloudSongImage from '../Components/Shared/CloudSongImage';



export default function CreatePlaylist({ closeModal }) {
    const { setAlert, setAlertMessage } = useContext(alertContext)
    const [playlistName, setPlaylistName] = useState("");
    const [playlistImage, setPlaylistImage] = useState("");
    const [playlistImageStatus, setPlaylistImageStatus] = useState();
    const navigate = useNavigate()

    const createPlaylist = async () => {
        const response = await makeAuthenticatedPOSTRequest(
            "/playlist/create",
            { name: playlistName, thumbnail: playlistImage, songs: [] }
        );
        if (response.err) {
            setAlertMessage("Could not create Playlist ❌");
            setAlert(true)
            return;
        }
        else {
            setPlaylistImage('')
            setPlaylistName('')
            closeModal()
            setAlertMessage("Playlist Created ✅")
            setAlert(true)
        }
    };




    return (
        <div className="absolute flex items-center justify-center w-screen h-screen bg-black bg-opacity-70"
            onClick={closeModal}
            style={{ zIndex: 1000 }}>


            <div
                className="p-8 rounded-lg md:w-1/3 w-[85%] bg-app-black"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="mb-2 text-lg font-semibold text-white">
                    Create Playlist
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <input
                        label="Name"
                        placeholder="Playlist Name"
                        value={playlistName}
                        onChange={(e) => { setPlaylistName(e.target.value) }}
                        className="w-full py-3 text-center placeholder-gray-500 border border-gray-400 border-solid rounded hover:border-blue-500 hover:bg-blue-100 focus:outline-none focus:ring focus:ring-blue-200"
                    />

                    <div >
                        {playlistImageStatus ? (
                            <div className="text-center text-white">
                                Uploaded {playlistImageStatus}fully ✅
                            </div>
                        ) : (<div className='flex flex-col items-center justify-center'>
                            <CloudSongImage setThumbnail={setPlaylistImage} setUploadedImageStatus={setPlaylistImageStatus} />
                            <p className='w-full mt-1 text-sm text-center text-white'>(Please upload in JPG or AVIF format only.)</p>
                        </div>
                        )}
                    </div>

                    <button
                        className="flex items-center justify-center w-1/2 py-3 mt-4 font-semibold bg-white rounded cursor-pointer disabled:bg-gray-500"
                        onClick={createPlaylist}
                        disabled={playlistName === "" || playlistImage === ""}
                    >
                        Create
                    </button>
                </div>



            </div>
        </div>

    )
}
