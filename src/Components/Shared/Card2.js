import { Icon } from "@iconify/react";
import { useContext } from "react";
import songContext from "../../SongContext";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Card2 = (item) => {
    const { currentSong, setCurrentSong } = useContext(songContext);
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate()

    const handleClick = () => {
        if (cookie.token) {
            setCurrentSong(item.item);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="flex flex-col w-full h-48 p-4 bg-black rounded-lg cursor-pointer" onClick={handleClick}>
            <div className="h-3/5">
                <img
                    className="object-cover w-full h-full rounded-md"
                    src={item.item.thumbnail}
                    alt="label"
                />
            </div>
            <div className="overflow-hidden font-semibold text-white">{item.item.name}</div>
            <Icon icon="octicon:play-24" width="30" height="30" color="white" onClick={() => setCurrentSong(item.item)} />

        </div>
    );
};

export default Card2;
