import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoCard from "./VideoCard";

const VideoContainer = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        getVideos();

    }, []);

    const getVideos = async () => {
        const data = await fetch(YOUTUBE_VIDEOS_API);

        const json = await data.json();

        setVideos(json.items);
    }

    if (videos.length === 0) return <div>Loading...</div>;
    return (
        <div className="flex flex-wrap  ">
            {videos.map(video =>
                <Link to={'/watch?v=' + video.id} key={video.id}><VideoCard key={video.id} info={video} /></Link>
            )}
        </div>
    )
}

export default VideoContainer;