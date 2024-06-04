import React from 'react';

const Playlist = ({ songs }) => {
    return (
        <div>
            <h2>Playlist</h2>
            {songs.map((song, index) => (
                <div key={index}>
                    <h3>{song.trackName}</h3>
                    <p>{song.artist_names}</p>
                </div>
            ))}
        </div>
    );
};

export default Playlist;