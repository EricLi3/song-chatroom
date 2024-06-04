import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';


const Hero = ({ songs }) => {

    const navigate = useNavigate();

    function reviews(trackName)
    {
        navigate(`/Reviews/${trackName}`);
    }

    return (
        <div className='song-carousel-container'>
            <Carousel indicators={false} navButtonsAlwaysVisible  >
                {
                    songs?.map((song) => {
                        //console.log(song)
                        return (
                            // Makes it so the song is identifiable by its title
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
                                                    icon = {faCirclePlay}
                                                />
                                            </div>
                                        </Link>
                                        
                                        <div className="song-review-button-container">
                                            <Button variant ="info" onClick={() => reviews(song.trackName)} >Reviews</Button>
                                        </div>
                                    </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default Hero