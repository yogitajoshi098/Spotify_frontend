import React from 'react'
import IconWithoutText from './IconWithoutText'

export default function Bottombar({ onPlaylist }) {
    return (

        <div className='flex justify-around pt-4'>
            <IconWithoutText iconName={"material-symbols:home"} targetLink={"/"} size={40} />
            <IconWithoutText iconName={"material-symbols:search-rounded"} targetLink={"/search"} size={40} />
            <IconWithoutText iconName={"material-symbols:upload"} targetLink={"/uploadSong"} size={40} />

            <IconWithoutText iconName={"material-symbols:library-music-sharp"} targetLink={"/myMusic"} size={40}
            />
            <IconWithoutText iconName={"material-symbols:add-box"} size={40} onClick={onPlaylist} />
            <IconWithoutText iconName={"clarity:library-line"} targetLink={"/myPlaylist"} size={40} />

        </div>

    )
}
