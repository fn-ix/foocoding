import './button.css';
import reloadVector from '../assets/reload.svg';
import homeVector from '../assets/home.svg';
import playVector from '../assets/play.svg';
import pauseVector from '../assets/pause.svg';
import searchVector from '../assets/search.svg';
import { GlobalContext } from '../App';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface ButtonInt {
  type: 'main' | 'category-top' | 'category-bottom' | 'player' | 'search',
  name: string,
  current?: string,
  station?: any,
}

export default function Button(props: ButtonInt) {
  const context = useContext(GlobalContext);
  const path = useLocation().pathname;

  function handlePlay() {
    const audio = context.audio.current;
    if (audio && audio.src) {
      if (audio.paused || audio.ended) {
        audio.play();
        context.setPlaying(true);
      } else {
        audio.pause();
        context.setPlaying(false);
      }
    }
  }

  switch (props.type) {
    case 'main':
      return (
        <Link to={`${(props.name === 'explore') ? '/' : '/library'}`} className={`${props.type}-link`}>
          <button className={`${props.type}-button ${(props.name === props.current) ? 'active' : 'inactive'}-button`} name={props.name}>
            {props.name.toUpperCase()}
          </button>
        </Link>
      );
    case 'category-top':
      return (
        <Link to={'/' + props.name} className={`${props.type}-link`}>
          <button className={`${props.type}-button ${(props.name === props.current) ? 'active' : 'inactive'}-button`} name={props.name}>
            <p>{props.name.toUpperCase()}</p>
          </button>
        </Link>
      );
    case 'category-bottom':
      if (props.name === 'reload') {
        return (
          <div className={`${props.type}-link`}>
            <button className={`${props.type}-button `} name={props.name} onClick={() => context.doRefresh(!context.refresh)}>
              <img src={reloadVector} alt={props.name} />
            </button>
          </div>
        );
      } else {
        return (
          <Link to={(path.slice(0, 8) === '/library') ? '/library' : '/'} className={`${props.type}-link`}>
            <button className={`${props.type}-button ${(props.name === props.current) ? 'active' : 'inactive'}-button`} name={props.name}>
              <img src={homeVector} alt={props.name} />
            </button>
          </Link>
        );
      }
    case 'player':
      return (
        <button className={`${props.type}-button`} name={props.name} onClick={handlePlay}>
          <img src={(context.isPlaying) ? pauseVector : playVector} alt={(context.isPlaying) ? 'Playing' : 'Paused'} />
        </button>
      );
    case 'search':
      return (
        <button className={`${props.type}-button`} name={props.name}>
          <img src={searchVector} alt='Search' />
        </button>
      );
  }
}
