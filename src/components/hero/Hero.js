import './Hero.css';
import React, { useState, useRef, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { Button, Card } from 'react-bootstrap';
import Greeting from '../greeting/Greeting';


const Hero = ({ songs }) => {

    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('carousel');
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const carouselRef = useRef(null);
    const gridRefs = useRef([]);


    function reviews(trackName) {
        navigate(`/Reviews/${trackName}`);
    }

    function favorites(trackName) {
        navigate(`/Favorite/${trackName}`);
    }

    const toggleViewMode = () => {
        setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel');
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const songIndex = songs.findIndex(song =>
                song.trackName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                song.artist_names.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (songIndex !== -1) {
                if (viewMode === 'carousel') {
                    carouselRef.current.scrollToItem(songIndex);
                } else {
                    gridRefs.current[songIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    gridRefs.current[songIndex].style.border = '2px solid red'; // Highlight the song
                }
            }
        }
    };

    const filteredSongs = songs?.filter(song =>
        song.trackName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist_names.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        gridRefs.current = gridRefs.current.slice(0, filteredSongs.length);
    }, [filteredSongs]);

    return (
        <div>
            <Button variant='primary' onClick={toggleViewMode}>
                Switch to {viewMode === 'carousel' ? 'Grid' : 'Carousel'} View
            </Button>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <TextField
                    className="custom-text-field"

                    label="Search Songs"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                    InputLabelProps={{ shrink: isFocused || searchQuery !== '', style: { textAlign: 'center', width: '100%' } }}
                    style={{ margin: '20px 0', width: '800px' }}
                />
            </div>

            {viewMode === 'carousel' ? (
                <div>
                    <Greeting />
                    <br />
                    <div className='song-carousel-container'>
                        <Carousel indicators={false} navButtonsAlwaysVisible ref={carouselRef}>
                            {filteredSongs?.map((song, index) => (
                                <Paper key={song.trackName}>
                                    <div className='song-card-container song-card-container centered-container vevo-background'>
                                        <div className="song-card">
                                            <div className="song-detail">
                                                <div className="song-poster">
                                                    <img src={song.poster} alt="poster" />
                                                </div>
                                                <div className="song-title" style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <h4>{song.trackName}</h4>
                                                    <h5>{song.artist_names}</h5>
                                                </div>

                                                <div className="song-buttons-container">
                                                    <Link to={`/Trailer/${song.link.substring(song.link.length - 11)}`}>
                                                        <div className="play-button-icon-container">
                                                            <FontAwesomeIcon className="play-button-icon"
                                                                icon={faCirclePlay}
                                                            />
                                                        </div>
                                                    </Link>

                                                    <div className="song-review-button-container">
                                                        <Button variant="info" onClick={() => reviews(song.trackName)} >Reviews</Button>
                                                    </div>

                                                    <div className="song-review-button-container">
                                                        <Button variant="info" onClick={() => favorites(song.trackName)} >Favorites</Button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Paper>

                            ))}
                        </Carousel>
                    </div>
                </div>
            ) : (
                <div>
                    <Greeting />

                    <div className='song-grid-container vevo-background' style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {filteredSongs?.map((song, index) => (
                            <Card key={song.trackName} style={{ width: '18rem', margin: '10px' }} ref={el => gridRefs.current[index] = el}>                                <Card.Img variant="top" src={song.poster} alt="poster" />
                                <Card.Body style={{ backgroundColor: '#D0D9CD' }}>
                                    <Card.Title style={{ fontWeight: 'bold' }}>{song.trackName}</Card.Title>
                                    <Card.Text style={{ fontWeight: 'bold' }}>{song.artist_names}</Card.Text>
                                    <div className='gridButtons'>
                                        <Link to={`/Trailer/${song.link.substring(song.link.length - 11)}`}>
                                            <Button variant="primary" style={{ marginRight: '10px', color: 'gold' }}>
                                                <FontAwesomeIcon icon={faCirclePlay} /> Play
                                            </Button>
                                        </Link>
                                        <Button variant="info" onClick={() => reviews(song.trackName)} style={{ marginRight: '10px', fontWeight: 'bold' }}>Reviews</Button>
                                        {/* <Button variant="info" onClick={() => favorites(song.trackName)}>Favorites</Button> */}
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;
