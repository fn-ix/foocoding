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
import { StationInt, ContextInt } from './dev/interfaces';

export const GlobalContext = createContext({} as ContextInt);

export default function App() {
  const [isPlaying, setPlaying] = useState(false);
  const [refresh, doRefresh] = useState(false);
  const [station, setStation] = useState({ name: 'No station', bitrate: 0, codec: '' } as StationInt);

  const audio = useRef(new Audio());

  useEffect(() => {
    if (audio && station.url_resolved) {
      audio.current.src = station.url_resolved;
      audio.current.play();
      station && setPlaying(true);
    }
  }, [station]);

  return (
    <div className='App'>
      <GlobalContext.Provider value={{ isPlaying, setPlaying, refresh, doRefresh, station, setStation, audio }}>
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
