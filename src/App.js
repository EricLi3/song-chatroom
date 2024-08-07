import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import ChatRoom from './components/chatRoom/ChatRoom';

// import Favorite from './components/favorite/Favorite';
// import Playlist from './components/playlist/Playlist'; // import the Playlist component


function App() {

  //useState returns array with current state element and Function to update it as an array.
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Get all Songs. Populates the songs state with the data from the API
  const getSongs = async () => {

    try
    {
      const response = await api.get("/api/v1/songs");
      console.log(response.data);
      setSongs(response.data);
    }
    catch (error)
    {
      console.error(error);
    }
  }

  //Get a Song with the trackName identifier

  const getSongData = async (trackName) => {

    try
    {
      const response = await api.get(`/api/v1/songs/${trackName}`);
      const singleSong = response.data;
      console.log(response.data);
      setSong(singleSong);
      setSongs(singleSong.reviews);
    }
    catch (error)
    {
      console.error(error);
    }
  }


  // so getSongs compoent is called when the component is loaded
  useEffect(() => {
    getSongs();
  }, []);

  return (
    <div className="App">
      <Header/>
      {/* ////////////////////////////////////////////////////////////////////////////////////////// */}

      {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
      <Routes>
      <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home songs={songs} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path ="/Reviews/:trackName" element={<Reviews getSongData = {getSongData} song = {song} reviews = {reviews} setReviews = {setReviews}  />}></Route>
          <Route path="/chat" element={<ChatRoom/>} />
          {/* <Route path="/playlist"> element={<Playlist songs={songs} />}</Route> */}
          {/* <Route path="*" element = {<NotFound/>}></Route> */}
      </Route>
      </Routes>
    </div>
  );
}

export default App;
