import stationPlaceholder from '../assets/station.svg';
import './station-card.css';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../App';
import arrow from '../assets/arrow.svg';
import heart from '../assets/heart.svg';
import collection from '../assets/collection.svg';
import play from '../assets/play.svg';
import vote from '../assets/up.svg';
// import eventual shared button css

interface StationCardInt {
  logo: string,
  name: string,
  stationuuid: string,
  location: string,
  tags: string,
  url: string,
  bitrate: number,
  codec: string,
  type: 'explore' | 'library' | 'filter',
}

interface StationsInt {
  name: string,
  country: string,
  tags: string,
  favicon: string,
  stationuuid: string,
  url_resolved: string,
  bitrate: number,
  codec: string,
}

export default function StationCard(props: StationCardInt) {
  const context = useContext(GlobalContext);

  const [favorite, setFavorite] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  function handleClick() {
    context.changeStation({ name: props.name, url: props.url, icon: props.logo, bitrate: props.bitrate, codec: props.codec, stationuuid: props.stationuuid });
  }

  function handleFavorite() {
    const storeString = localStorage.getItem('favorites');

    if (storeString !== null) {
      const storeArray = JSON.parse(storeString);

      const overlap = storeArray.filter((station: StationsInt) => station.stationuuid === props.stationuuid);

      if (overlap.length >= 1) {
        localStorage.setItem('favorites', JSON.stringify(storeArray.filter((station: StationsInt) => station.stationuuid !== props.stationuuid)));
        setFavorite(false);
      } else {
        storeArray.push({ name: props.name, stationuuid: props.stationuuid, country: props.location, favicon: props.logo, tags: props.tags, url_resolved: props.url, bitrate: props.bitrate, codec: props.codec });
        localStorage.setItem('favorites', JSON.stringify(storeArray));
        setFavorite(true);
      }
    } else {
      const storeArray = [{ name: props.name, stationuuid: props.stationuuid, country: props.location, favicon: props.logo, tags: props.tags, url_resolved: props.url, bitrate: props.bitrate, codec: props.codec }];
      localStorage.setItem('favorites', JSON.stringify(storeArray));
      setFavorite(true);
    }
  }

  useEffect(() => {
    const storeString = localStorage.getItem('favorites');

    if (storeString !== null) {
      const storeArray = JSON.parse(storeString);

      const overlap = storeArray.filter((station: StationsInt) => station.stationuuid === props.stationuuid);

      if (overlap.length >= 1) setFavorite(true);
    }
  }, [favorite, props.stationuuid]);

  useEffect(() => {
    if (context.station.stationuuid === props.stationuuid && context.playingState) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [context.playingState, props.stationuuid, context.station.stationuuid]);

  if (props.type !== 'library') {
    return (
      <div className={`station-card ${props.type}-station-card`}>
        <div className='card-content' onClick={handleClick}>
          <img src={props.logo ? props.logo : stationPlaceholder} alt='Station logo' />
          <p>{props.name}</p>
          <p>{props.location}</p>
          <p>{props.tags.replaceAll(',', ', ')}</p>
        </div>
        <div className='card-controls'>
          <div className='info-box'>
            {favorite && <img src={heart} alt='Favorite station' className='info-box-favorite' />}
            <img src={arrow} alt='Show controls' className='info-box-arrow' />
            {isPlaying && <img src={play} alt='Currently playing' className='info-box-playing' />}
          </div>
          <button className='card-control-button' name='favorite-button' onClick={handleFavorite}>
            <img src={heart} alt='Add to favorites' />
          </button>
          <button className='card-control-button' name='collection-button'>
            <img src={collection} alt='Add to collection' />
          </button>
          <button className='card-control-button' name='vote-button'>
            <img src={vote} alt='Vote for station' />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={props.type + '-station-card'}>
        <img src={props.logo ? props.logo : stationPlaceholder} alt='Station logo' />
        <p>{props.name}</p>
      </div>
    );
  }
}
