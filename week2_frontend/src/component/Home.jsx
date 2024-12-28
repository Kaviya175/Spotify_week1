//  import React,{useEffect,useState} from "react";
//  import { useNavigate } from 'react-router-dom';
//  import { handleSuccess } from "./Util";
// // // import { handleSuccess } from "./Util";
// import { ToastContainer } from "react-toastify";
// const Home=()=>{
//     const navigate=useNavigate();
//     const[loogged,setLoggeduser]=useState('');
//     useEffect(()=>{
//         setLoggeduser(localStorage.getItem('loogged'));
//         },[])
//         const handlelogOut=(e)=>{
//             localStorage.removeItem('loogged');
//             localStorage.removeItem('jwtToken');
//             handleSuccess('Logged out successfully');
//             setTimeout(()=>{
//                 navigate('/login');
//             },1000);
//         }
//     return (
//         <div>
//             <h1>Welcome to Home Page</h1>
//             <h2>{loogged}</h2>
//             <button onClick={handlelogOut}>logout</button>
//             <ToastContainer></ToastContainer>
//         </div>
//     )
// }
// export default Home


// import { useContext, useEffect, useState, useRef } from 'react';
// import Navbar from './Navbar';
// import { MusicContext } from '../Context';
// import "./Home.css";
// function Home() {
//   const [keyword, setKeyword] = useState('');
//   const [message, setMessage] = useState('');
//   const [tracks, setTracks] = useState([]);  
//   const [token, setToken] = useState(null);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [currentTrack, setCurrentTrack] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(new Audio());
//   const navigate=useNavigate();
//   const[loogged,setLoggeduser]=useState('');
//      useEffect(()=>{
//        setLoggeduser(localStorage.getItem('loogged'));
//          },[])
//   const handlelogOut=(e)=>{
//             localStorage.removeItem('loogged');
//             localStorage.removeItem('jwtToken');
//             handleSuccess('Logged out successfully');
//             setTimeout(()=>{
//                 navigate('/login');
//             },1000);
//         }
//   const { isLoading, setIsLoading, resultOffset, setResultOffset } = useContext(MusicContext);
//   const fetchMusicData = async (query = '', offset = 0) => {
//     if (!token) {
//       console.error('No token available');
//       return;
//     }
//     setTracks([]);
//     setMessage('');
//     window.scrollTo(0, 0);
//     setIsLoading(true);
//     try {
//       const searchQuery = query || keyword;
//       const response = await fetch(
//         `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&offset=${offset}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error(`Failed to fetch music data: ${response.statusText}`);
//       }
//       const jsonData = await response.json();
//       setTracks(jsonData.tracks.items.slice(0, 10));
//       setHasSearched(true);
//     } catch (error) {
//       setMessage('We couldn’t retrieve the music data. Please try again.');
//       console.error('Error fetching music data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       setResultOffset(0);
//       fetchMusicData(keyword, 0);
//     }
//   };
//   const handleSearchClick = () => {
//     setResultOffset(0);
//     fetchMusicData(keyword, 0);
//   };
//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch('https://accounts.spotify.com/api/token', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: 'grant_type=client_credentials&client_id=4f8f1cff29d549b4bf73ed2c72678cff&client_secret=15dec2d3b36c4e5ea3e64811783466c3',
//         });
//         if (!response.ok) {
//           throw new Error(`Failed to fetch token: ${response.statusText}`);
//         }
//         const jsonData = await response.json();
//         setToken(jsonData.access_token);
//       } catch (error) {
//         setMessage('We couldn’t retrieve the token. Please try again.');
//         console.error('Error fetching token:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchToken();
//   }, [setIsLoading]);
//   const playSong = (track) => {
//     if (currentTrack && currentTrack.id === track.id && isPlaying) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     } else {
//       audioRef.current.src = track.preview_url || ''; // Use preview URL
//       audioRef.current.play();
//       setCurrentTrack(track);
//       setIsPlaying(true);
//     }
//   };
//   useEffect(() => {
//     return () => {
//       audioRef.current.pause();
//     };
//   }, []);
//   return (
//     <>
//       <Navbar
//         keyword={keyword}
//         setKeyword={setKeyword}
//         handleKeyPress={handleKeyPress}
//         fetchMusicData={handleSearchClick}
//       />
//       <div className="container">
//         <div className={`row ${isLoading ? '' : 'd-none'}`}>
//           <div className="col-12 py-5 text-center">
//             <div
//               className="spinner-border"
//               style={{ width: '3rem', height: '3rem' }}
//               role="status"
//             >
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         </div>
//         <div className={`row ${message ? '' : 'd-none'}`}>
//           <div className="col-12 py-2 text-center">
//             <h4 className="text-center text-danger">{message}</h4>
//           </div>
//         </div>
//         <div className="row">
//           {hasSearched && tracks.length > 0 ? (
//             tracks.map((track) => (
//               <div key={track.id} className="col-12 mb-3">
//                 <div className="track-info p-3 border rounded">
//                   <h5>{track.name}</h5>
//                   <p>{track.artists[0].name}</p>
//                   <button onClick={() => playSong(track)} className="btn btn-primary mt-2">
//                     {currentTrack && currentTrack.id === track.id && isPlaying ? 'Pause' : 'Play'}
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             !hasSearched && (
//               <div className="col-12 py-5 text-center">
//                 <h3 className="animated-text py-5">Please search for your favorite song</h3>
//                 <br />
//                 <img
//                   src="https://w0.peakpx.com/wallpaper/43/709/HD-wallpaper-hip-hop-hip-collage-music-hop.jpg"
//                   alt="Hip Hop Music Collage"
//                   className="img-fluid artistic-img"
//                 />
//               </div>
//             )
//           )}
//         </div>
//         {hasSearched && tracks.length > 0 && (
//           <div className="row">
//             <div className="col">
//               <button
//                 onClick={() => {
//                   setResultOffset((previous) => Math.max(previous - 20, 0));
//                   fetchMusicData(keyword, resultOffset - 20);
//                 }}
//                 className="btn btn-outline-success w-100"
//                 disabled={resultOffset === 0}
//               >
//                 Previous Page: {resultOffset / 20}
//               </button>
//             </div>
//             <div className="col">
//               <button
//                 onClick={() => {
//                   setResultOffset((previous) => previous + 20);
//                   fetchMusicData(keyword, resultOffset + 20);
//                 }}
//                 className="btn btn-outline-success w-100"
//               >
//                 Next Page: {resultOffset / 20 + 2}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
// export default Home;



import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import "./Home.css";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const audioRef = useRef(new Audio());

  // Fetch Spotify token on mount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: "4f8f1cff29d549b4bf73ed2c72678cff", 
            client_secret: "15dec2d3b36c4e5ea3e64811783466c3",
          }),
        });

        const data = await response.json();
        setToken(data.access_token);
      } catch (error) {
        setMessage("Failed to fetch token. Please try again.");
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  // Fetch tracks based on the keyword
  const fetchMusicData = async () => {
    if (!token) {
      setMessage("Token is not available. Please try again later.");
      return;
    }

    setIsLoading(true);
    setTracks([]);
    setMessage("");

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${keyword}&type=track&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.tracks.items.length > 0) {
        setTracks(data.tracks.items);
        setHasSearched(true);
      } else {
        setMessage("No tracks found for your search. Try another keyword.");
      }
    } catch (error) {
      setMessage("Failed to fetch tracks. Please try again.");
      console.error("Error fetching tracks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar
        keyword={keyword}
        setKeyword={setKeyword}
        handleKeyPress={(event) => {
          if (event.key === "Enter") fetchMusicData();
        }}
        fetchMusicData={fetchMusicData}
      />

      <div className="container mt-4">
        {isLoading && <div className="text-center">Loading...</div>}
        {message && <div className="text-danger text-center">{message}</div>}

        <div className="row">
          {tracks.map((track) => (
            <div key={track.id} className="col-md-4">
              <div className="card mb-3">
                <img
                  src={track.album.images[0]?.url}
                  className="card-img-top"
                  alt={track.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{track.name}</h5>
                  <p className="card-text">{track.artists[0].name}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      audioRef.current.src = track.preview_url || "";
                      audioRef.current.play();
                    }}
                  >
                    Play Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
