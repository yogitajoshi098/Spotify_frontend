import { useEffect, useState } from "react";
import { makeAuthenticatedGetRequest } from "../Utils/helper";
import { Icon } from "@iconify/react";

const AddPlaylist = ({ closeModal, addSongToPlaylist }) => {
    const [myPlaylists, setMyPlaylists] = useState([]);
    const [loading, setLoading] = useState(true)
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
        <div
            className="absolute flex items-center justify-center w-screen h-screen bg-black bg-opacity-70"
            onClick={closeModal}
            style={{ zIndex: 1000 }}
        >
            <div
                className="md:w-1/3 max-h-[50%] overflow-y-auto w-[85%] p-8 rounded-md bg-app-black"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="mb-5 text-lg font-semibold text-white">
                    Select Playlist
                </div>
                <div className="flex flex-col items-center justify-center space-y-4">
                    {loading ? <div className='flex items-center justify-center animate-spin'> <Icon icon="teenyicons:loader-outline" width="20" height="20" color="white" /></div> : <>
                        {myPlaylists.map((item, index) => {
                            return (
                                <PlaylistComponent
                                    info={item}
                                    key={index}
                                    addSongToPlaylist={addSongToPlaylist}
                                />
                            )
                        })}
                    </>}

                </div>

            </div>
        </div>
    );
};
const PlaylistComponent = ({ info, addSongToPlaylist }) => {
    return (
        <div className="flex items-center w-full p-3 space-x-4 cursor-pointer bg-app-black hover:bg-gray-400 hover:bg-opacity-40" onClick={() => {
            addSongToPlaylist(info._id)
        }}>
            <div>
                <img
                    src={info.thumbnail}
                    className="w-10 h-10 rounded"
                    alt="thumbnail"
                />
            </div>
            <div className="text-sm font-semibold text-white">{info.name}</div>
        </div>
    );
};

export default AddPlaylist;