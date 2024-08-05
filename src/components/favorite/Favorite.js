import React, { useState } from 'react';
import axios from 'axios';

const AddFavoriteSongComponent = ({ customerId }) => {
    const [newFavoriteSong, setNewFavoriteSong] = useState('');

    const handleAddFavoriteSong = async () => {
        try {
            await axios.put(`/api/customers/${customerId}/favorite-songs`, {
                favoriteSong: newFavoriteSong
            });
            // Optionally, you can fetch updated data or perform other actions after successful addition
            setNewFavoriteSong(''); // Clear input after successful addition
        } catch (error) {
            console.error('Error adding favorite song:', error);
        }
    };

    return (
        <div>
            <h2>Add Favorite Songs</h2>
            <input
                type="text"
                value={newFavoriteSong}
                onChange={(e) => setNewFavoriteSong(e.target.value)}
            />
            <button onClick={handleAddFavoriteSong}>Add</button>
        </div>
    );
};

export default AddFavoriteSongComponent;
