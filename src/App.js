import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./routes/Login";
import SignupComponent from "./routes/Signup";
import LoggedOutHome from './routes/LoggedOutHome';
import UploadSong from './routes/UploadSong';
import MyMusic from './routes/MyMusic';
import { useCookies } from "react-cookie";
import LoggedInHome from "./routes/LoggedInHome";
import songContext from "../src/SongContext"
import { createContext, useEffect, useState } from "react";
import MyProfile from "./routes/MyProfile";
import Search from "./routes/Search";
import Library from "./routes/Library";
import MyPlaylist from "./routes/MyPlaylist";

export const userContext = createContext()
export const alertContext = createContext()

function App() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [cookie, setCookie] = useCookies(["token"]);
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [user, setUser] = useState(storedUser)
  const [Alert, setAlert] = useState(false)
  const [AlertMessage, setAlertMessage] = useState('')
  const [LoginSignupalert, setLoginSignupalert] = useState(false)
  const [LoginSignupalertMessage, setLoginSignupAlertMessage] = useState('')

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);


  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>


        {cookie.token ? (
          // logged in routes
          <songContext.Provider
            value={{
              currentSong,
              setCurrentSong,
              soundPlayed,
              setSoundPlayed,
              isPaused,
              setIsPaused,
            }}
          >
            <userContext.Provider value={{ user, setUser }}>
              <alertContext.Provider value={{ Alert, setAlert, AlertMessage, setAlertMessage, LoginSignupalert, setLoginSignupAlertMessage, setLoginSignupalert, LoginSignupalertMessage }}>


                <Routes>
                  <Route path="/" element={<LoggedInHome />} />
                  <Route path="/uploadSong" element={<UploadSong />} />
                  <Route path="/myMusic" element={<MyMusic />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/myPlaylist" element={<Library />} />
                  <Route path="/playlist/:playlistId" element={<MyPlaylist />} />
                  <Route path="/myProfile" element={<MyProfile />} />
                  <Route path="*" element={<Navigate to="/" />} />

                </Routes>
              </alertContext.Provider>
            </userContext.Provider>
          </songContext.Provider>

        ) : (
          <userContext.Provider value={{ user, setUser }}>
            <alertContext.Provider value={{ Alert, setAlert, AlertMessage, setAlertMessage, LoginSignupalert, setLoginSignupAlertMessage, setLoginSignupalert, LoginSignupalertMessage }}>

              <Routes>
                <Route path="/" element={<LoggedOutHome />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/signup" element={<SignupComponent />} />
                <Route path="*" element={<Navigate to="/login" />} />

              </Routes>
            </alertContext.Provider>
          </userContext.Provider>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
