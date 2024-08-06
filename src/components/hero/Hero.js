import './Hero.css';
import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { Button, Card } from 'react-bootstrap';
import Greeting from '../greeting/Greeting';


const Hero = ({ songs }) => {

    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('carousel');

    function reviews(trackName) {
        navigate(`/Reviews/${trackName}`);
    }

    function favorites(trackName) {
        navigate(`/Favorite/${trackName}`);
    }

    const toggleViewMode = () => {
        setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel');
    };
    return (
        <div>
            <Button variant='primary' onClick={toggleViewMode}>
                Switch to {viewMode === 'carousel' ? 'Grid' : 'Carousel'} View
            </Button>
            {viewMode === 'carousel' ? (
                <div>
                    <Greeting />
                    <br />
                    <div className='song-carousel-container'>
                        <Carousel indicators={false} navButtonsAlwaysVisible>
                            {songs?.map((song) => (
                                <Paper key={song.trackName}>
                                    <div className='song-card-container'>
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
                    {/* <Select
                        value={selectedSong}
                        onChange={handleSongChange}
                        options={songOptions}
                        placeholder="Search for a song..."
                        isClearable
                    /> */}
                    <div className='song-grid-container' style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {songs?.map((song) => (
                            <Card key={song.trackName} style={{ width: '18rem', margin: '10px' }}>
                                <Card.Img variant="top" src={song.poster} alt="poster" />
                                <Card.Body style={{ backgroundColor: '#D0D9CD' }}>
                                    <Card.Title style={{ fontWeight: 'bold' }}>{song.trackName}</Card.Title>
                                    <Card.Text style={{ fontWeight: 'bold' }}>{song.artist_names}</Card.Text>
                                    <Link to={`/Trailer/${song.link.substring(song.link.length - 11)}`}>
                                        <Button variant="primary" style={{ marginRight: '10px', color: 'gold' }}>
                                            <FontAwesomeIcon icon={faCirclePlay} /> Play
                                        </Button>
                                    </Link>
                                    <Button variant="info" onClick={() => reviews(song.trackName)} style={{ marginRight: '10px', fontWeight: 'bold' }}>Reviews</Button>
                                    {/* <Button variant="info" onClick={() => favorites(song.trackName)}>Favorites</Button> */}
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
