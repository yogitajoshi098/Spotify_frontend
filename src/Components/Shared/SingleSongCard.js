import { useContext } from "react";
import songContext from '../../SongContext'

const SingleSongCard = ({ info }) => {
    const { currentSong, setCurrentSong } = useContext(songContext);

    return (
        <div
            className="flex p-2 rounded-sm hover:bg-gray-400 hover:bg-opacity-20"
            onClick={() => {
                setCurrentSong(info);
            }}

        >
            <div
                className="w-12 h-12 bg-center bg-cover"
                style={{
                    backgroundImage: `url("${info.thumbnail}")`,
                }}
            ></div>
            <div className="flex w-full">
                <div className="flex flex-col justify-center w-5/6 pl-4 text-white">
                    <div className="cursor-pointer hover:underline">
                        {info.name}
                    </div>
                    <div className="text-xs text-gray-400 cursor-pointer hover:underline">
                        {info.artist.firstName + " " + info.artist.lastName}
                    </div>
                </div>
                <div className="flex items-center justify-center w-1/6 text-sm text-gray-400">
                    <div>3:44</div>
                </div>
            </div>
        </div>
    );
};

export default SingleSongCard;