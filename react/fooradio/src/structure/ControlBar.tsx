import './control-bar.css';
import Button from './Button';
import logo from '../assets/logo.svg';
import sound from '../assets/volume.svg';
import silent from '../assets/silent.svg';
import stationPlaceholder from '../assets/station.svg';
import React, { useContext, useState, useRef } from 'react';
import { GlobalContext } from '../App';
import { useLocation, useNavigate } from 'react-router-dom';

interface ControlBarInt {
  position: 'bottom' | 'top',
}

export default function ControlBar(props: ControlBarInt) {
  const path = useLocation().pathname;
  const navigate = useNavigate();

  const context = useContext(GlobalContext);
  const audio = context.audio.current;

  const input = useRef<HTMLInputElement>(null);

  const [previousVolume, setPreviousVolume] = useState(0);
  const [volumeIcon, setVolumeIcon] = useState(sound);
  const [initialRender, setInitialRender] = useState(true);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInitialRender(false);
    if (audio) {
      audio.volume = Number(event.currentTarget.value) / 100;
      audio.volume > 0 ? setVolumeIcon(sound) : setVolumeIcon(silent);
      audio.volume === 0 && setPreviousVolume(0);
    }
  }

  function handleClick() {
    if (audio && audio.volume > 0) {
      setPreviousVolume(audio.volume);
      audio.volume = 0;
      setVolumeIcon(silent);
    } else if (audio && previousVolume !== 0) {
      audio.volume = previousVolume;
      setVolumeIcon(sound);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (input.current !== null && input.current.value !== '') navigate('/search/' + input.current.value.replace(' ', '%20').replace('#', '%23'));
  }

  if (props.position === 'top') {
    const currentMain = (path.slice(0, 8) === '/library') ? 'library' : 'explore';
    return (
      <div className='control-bar bar-top'>
        <a href="/" className='logo-link'><img className='logo' src={logo} alt='logo' /></a>
        <div className='spacer' />
        <nav className='main-nav'>
          <Button name='explore' type='main' current={currentMain} />
          <Button name='library' type='main' current={currentMain} />
        </nav>
        <div className='spacer' />
        <form className='search-form' onSubmit={handleSubmit}>
          <input type='text' placeholder='Search by name...' name='search' className='search-field' ref={input} />
          <Button type='search' name='search' />
        </form>
      </div>
    );
  } else {
    return (
      <div className='control-bar bar-bottom'>
        <Button type='player' name='play-pause' />
        <img src={context.station.icon || stationPlaceholder} alt='Station logo' className='playing-logo' />
        <div>
          <p>{context.station.name}</p>
          <p>{context.station.codec + ' ' + context.station.bitrate + ' kbps'}</p>
        </div>
        <div className='spacer' />
        <div>
          <img src={volumeIcon} alt='Volume slider' className='volume-icon' onClick={handleClick} /> <input type='range' onChange={handleChange} value={initialRender ? '100' : undefined} />
        </div>
      </div>
    );
  }
}
