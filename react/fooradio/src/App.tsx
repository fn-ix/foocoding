import './App.css';
import ControlBar from './structure/ControlBar';
import Sidebar from './structure/Sidebar';
import Explore from './pages/Explore';
import Library from './pages/Library';
import Search from './pages/Search';
import Collection from './pages/Collection';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState, useRef, createContext } from 'react';
import Category from './pages/Category';

interface StationInt {
  name: string,
  url?: string,
  icon?: string,
  bitrate: number,
  codec: string,
  stationuuid?: string,
}

interface ContextInt {
  playingState: boolean,
  changePlaying: Function,
  station: StationInt,
  changeStation: Function;
  refresh: boolean,
  doRefresh?: React.MouseEventHandler,
  audio: React.RefObject<HTMLAudioElement>,
}

export const GlobalContext = createContext({} as ContextInt);

export default function App() {
  const [isPlaying, setPlaying] = useState(false);
  const [refresh, doRefresh] = useState(false);
  const [station, setStation] = useState<StationInt>({ name: 'No station', bitrate: 0, codec: '' });

  const audio = useRef(new Audio());

  useEffect(() => {
    if (audio && station.url) {
      audio.current.src = station.url;
      audio.current.play();
      station && setPlaying(true);
    }
  }, [station]);

  return (
    <div className='App'>
      <GlobalContext.Provider value={{
        playingState: isPlaying,
        changePlaying: (audioState: boolean) => setPlaying(audioState),
        refresh: refresh,
        doRefresh: () => doRefresh(!refresh),
        station: station,
        changeStation: (stat: StationInt) => setStation(stat),
        audio: audio
      }}>
        <ControlBar position='top' />
        <div className='view'>
          <Sidebar />
          <Routes>
            <Route path='/' element={<Explore />} />
            <Route path='/library' element={<Library />} />
            <Route path='/library/:id' element={<Collection />} />
            <Route path='/countries' element={<Category type='countries' />} />
            <Route path='/languages' element={<Category type='languages' />} />
            <Route path='/tags' element={<Category type='tags' />} />
            <Route path='/countries/:id' element={<Category type='countries-stations' />} />
            <Route path='/languages/:id' element={<Category type='languages-stations' />} />
            <Route path='/tags/:id' element={<Category type='tags-stations' />} />
            <Route path='/search/:id' element={<Search />} />
          </Routes>
        </div>
        <ControlBar position='bottom' />
      </GlobalContext.Provider>
    </div >
  );
}
