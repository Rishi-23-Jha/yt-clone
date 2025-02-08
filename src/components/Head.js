import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { cacheResults } from "../utils/searchSlice";
const YOUTUBE_SEARCH_API = "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";


const Head = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const dispatch = useDispatch();

    const searchCache = useSelector(store => store.search)

    useEffect(() => {
        const timer = setTimeout(() => {
            // if (searchQuery?.length > 0) {
            //     getSearchSuggestions();
            // } else {
            //     setSuggestions([]);
            // }
            if (searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            }
            else {
                getSearchSuggestions()
            }


        }, 200);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const getSearchSuggestions = async () => {
        const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
        const json = await data.json();
        setSuggestions(json[1]);

        dispatch(cacheResults({
            [searchQuery]: json[1],
        }))

    };

    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
    };

    return (
        <div className="grid grid-flow-col p-2 m-2 shadow-xl">
            <div className="flex col-span-1">
                <img
                    className="h-8 cursor-pointer"
                    onClick={toggleMenuHandler}
                    src="https://cdn.iconscout.com/icon/free/png-256/free-hamburger-menu-icon-download-in-svg-png-gif-file-formats--crispy-user-interface-pack-icons-462145.png?f=webp&w=256"
                    alt="hamburger-logo"
                />
                <img
                    className="h-6 mx-2"
                    src="https://t4.ftcdn.net/jpg/07/37/98/99/360_F_737989984_yqhTN9GhvLeuUiLjUp9MSe1IacGNXlsl.jpg"
                    alt="youtube-logo"
                />
            </div>
            <div className="col-span-10 px-10 relative">
                <div>
                    <input
                        className="w-1/2 px-5 border border-gray-400 p-2 rounded-l-full"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => {

                            setTimeout(() => setShowSuggestions(false), 200);
                        }}
                    />
                    <button className="border border-gray-400 p-2 rounded-r-full bg-gray-200">
                        Search
                    </button>
                </div>
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-14 py-2 px-5 bg-white shadow-lg rounded-lg border border-gray-100 w-[37rem]">
                        <ul>
                            {suggestions.map((s) => (
                                <li
                                    key={s}
                                    className="py-2 px-3 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSuggestionClick(s)}
                                >
                                    🔍 {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="col-span-2">
                <img
                    style={{ height: "32px" }}
                    className="cursor-pointer"
                    src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                    alt="user-icon-logo"
                />
            </div>
        </div>
    );
};

export default Head;