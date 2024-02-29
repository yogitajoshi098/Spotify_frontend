import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { makeAuthenticatedGetRequest } from "../Utils/helper";
import LoginContaier from "../LoginContainer";
import SingleSongCard from "../Components/Shared/SingleSongCard";
import Loader from "../Components/Shared/Loader";

const Search = () => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [songData, setSongData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showNoResults, setShowNoResults] = useState(false);

    useEffect(() => {
        let timeoutId;

        const searchSong = async () => {
            setLoading(true);
            const response = await makeAuthenticatedGetRequest(
                "/song/get/songname/" + searchText
            );
            setLoading(false);

            if (response.data.length === 0) {
                setShowNoResults(true);
            } else {
                setShowNoResults(false);
            }

            setSongData(response.data);
        };

        if (searchText) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(searchSong, 1000);
        } else {
            setSongData([]);
            setShowNoResults(false);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchText]);

    return (
        <LoginContaier ActiveScreen="search">
            <div className="w-full">
                <div className='flex py-4'>
                    <div className='text-2xl font-semibold text-white '>Search Song</div>

                </div>
                <div
                    className={`md:w-1/3 w-full p-3 text-sm rounded-full bg-gray-600 px-5 flex text-white space-x-3 items-center ${isInputFocused ? "border border-white" : ""
                        }`}
                >
                    <Icon icon="ic:outline-search" fontSize={25} />
                    <input
                        type="text"
                        placeholder="What do you want to listen to?"
                        className="w-full bg-gray-600 focus:outline-none"
                        onFocus={() => {
                            setIsInputFocused(true);
                        }}
                        onBlur={() => {
                            setIsInputFocused(false);
                        }}
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                </div>
                {loading ? <Loader /> : (
                    <div className="mt-5">
                        {showNoResults ? (
                            <p className="text-center text-white">Sorry, no results found.</p>
                        ) : (

                            <>
                                {songData.length !== 0 && <div className="text-white">
                                    Showing search results for
                                    <span className="font-bold"> {searchText}</span>
                                </div>}
                                {songData.map((song, index) => (
                                    <SingleSongCard key={index} info={song} />
                                ))}

                            </>
                        )}
                    </div>
                )}
            </div>
        </LoginContaier>
    );
};

export default Search;
