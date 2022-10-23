import stationPlaceholder from '../assets/station.svg';
import './station-card.css';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../App';
import { useNavigate } from 'react-router-dom';
import arrow from '../assets/arrow.svg';
import heart from '../assets/heart.svg';
import collection from '../assets/collection.svg';
import play from '../assets/play.svg';
import cross from '../assets/cross.svg';
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
  type: 'explore' | 'library' | 'filter' | 'collection',
  removeToggle?: Function,
  id?: string,
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
  const [collectionControls, setCollectionControls] = useState(false);
  const [collections, setCollections] = useState<Array<string>>();
  const [imageError, setImageError] = useState(false);

  const navigate = useNavigate();

  function handleClick() {
    context.changeStation({ name: props.name, url: props.url, icon: props.logo, bitrate: props.bitrate, codec: props.codec, stationuuid: props.stationuuid });
  }

  function handleImageError(event: React.SyntheticEvent<HTMLImageElement>) {
    if (!imageError) {
      setImageError(true);
      event.currentTarget.src = stationPlaceholder;
    }
  }

  function handleFavorite() {
    const storeString = localStorage.getItem('favorites');

    if (storeString) {
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

  function handleRemove() {
    if (props.type === 'library') {
      const storeString = localStorage.getItem('favorites');
      if (storeString) {
        const storeArray = JSON.parse(storeString);
        localStorage.setItem('favorites', JSON.stringify(storeArray.filter((station: StationsInt) => station.stationuuid !== props.stationuuid)));
        props.removeToggle && props.removeToggle();
      }
    } else {
      const storeString = localStorage.getItem('collections');
      if (storeString) {
        const storeArray = JSON.parse(storeString);

        const collectionArray = storeArray.filter((collection: [string, StationsInt]) => collection[0] === props.id);

        const collectionsArray = storeArray.filter((collection: [string, StationsInt]) => collection[0] !== props.id);

        if (collectionArray[0][1].length === 1) {
          localStorage.setItem('collections', JSON.stringify(collectionsArray));
          navigate('/library');
        } else {
          const newCollectionArray = collectionArray[0][1].filter((station: StationsInt) => station.name !== props.name);

          collectionsArray.unshift([props.id, newCollectionArray]);

          localStorage.setItem('collections', JSON.stringify(collectionsArray));
        }
        props.removeToggle && props.removeToggle();
      }
    }
  }

  function handleCollection(event: React.MouseEvent<HTMLLIElement>) {
    const storeString = localStorage.getItem('collections');

    if (storeString) {
      const storeArray = JSON.parse(storeString);

      if (event.currentTarget.className === 'create-collection') {
        const newCollections = storeArray.filter((collection: [string, StationsInt]) => collection[0].includes('New collection'));

        let collectionName;
        (newCollections.length > 0) ? collectionName = `New collection #${newCollections.length + 1}` : collectionName = 'New collection';

        storeArray.unshift([collectionName, [{ name: props.name, stationuuid: props.stationuuid, country: props.location, favicon: props.logo, tags: props.tags, url_resolved: props.url, bitrate: props.bitrate, codec: props.codec }]]);
        localStorage.setItem('collections', JSON.stringify(storeArray));
      } else {
        const collectionArray = storeArray.filter((collection: [string, StationsInt]) => collection[0] === event.currentTarget.id);

        if (collectionArray[0][1].filter((station: StationsInt) => station.stationuuid === props.stationuuid).length < 1) {
          collectionArray[0][1].push({ name: props.name, stationuuid: props.stationuuid, country: props.location, favicon: props.logo, tags: props.tags, url_resolved: props.url, bitrate: props.bitrate, codec: props.codec });

          const newStoreArray = storeArray.filter((collection: [string, StationsInt]) => collection[0] !== event.currentTarget.id);

          newStoreArray.unshift(collectionArray[0]);

          localStorage.setItem('collections', JSON.stringify(newStoreArray));
        }
      }
    } else {
      const storeArray = ([['New collection', [{ name: props.name, stationuuid: props.stationuuid, country: props.location, favicon: props.logo, tags: props.tags, url_resolved: props.url, bitrate: props.bitrate, codec: props.codec }]]]);
      localStorage.setItem('collections', JSON.stringify(storeArray));
    }
    setCollectionControls(!collectionControls);
  }

  useEffect(() => {
    const storeString = localStorage.getItem('favorites');
    if (storeString) {
      const storeArray = JSON.parse(storeString);

      const overlap = storeArray.filter((station: StationsInt) => station.stationuuid === props.stationuuid);

      if (overlap.length >= 1) setFavorite(true);
    }
  }, [favorite, props.stationuuid]);

  useEffect(() => {
    const storeString = localStorage.getItem('collections');
    if (storeString) {
      const storeArray = JSON.parse(storeString);
      setCollections(storeArray.map((collection: [string, StationsInt]) => collection[0]));
    }
  }, [collectionControls]);

  useEffect(() => {
    if (context.station.stationuuid === props.stationuuid && context.playingState) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [context.playingState, props.stationuuid, context.station.stationuuid]);

  if (props.type === 'explore' || props.type === 'filter') {
    return (
      <div className={`station-card ${props.type}-station-card`}>
        <div className='card-content' onClick={handleClick}>
          <img src={props.logo ? props.logo : stationPlaceholder} alt='Station logo' onError={handleImageError} />
          <p>{props.name}</p>
          <p>{props.location}</p>
          <p>{props.tags.replaceAll(',', ', ')}</p>
        </div>
        <div className={`card-controls ${collectionControls && 'collection-controls-shown'}`}>
          <div className={`info-box ${collectionControls && 'info-box-below'}`} onClick={collectionControls ? () => setCollectionControls(!collectionControls) : undefined}>
            {favorite && <img src={heart} alt='Favorite station' className='info-box-favorite' />}
            <img src={arrow} alt='Show controls' className='info-box-arrow' />
            {isPlaying && <img src={play} alt='Currently playing' className='info-box-playing' />}
          </div>
          <div className='control-buttons'>
            <button className='card-control-button' name='favorite-button' onClick={handleFavorite}>
              <img src={heart} alt='Add to favorites' />
            </button>
            <button className='card-control-button' name='collection-button' onClick={() => setCollectionControls(!collectionControls)}>
              <img src={collection} alt='Add to collection' />
            </button>
          </div>
          <ul className='collection-control'>
            {collections && collections.map((collection) =>
              <li key={collection} id={collection} onClick={handleCollection}>Add to {collection}</li>
            )}
            <li className='create-collection' onClick={handleCollection}>Create new collection</li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className='library-station-card'>
        <button className='library-card-button' name='remove-button' onClick={handleRemove}>
          <img src={cross} alt='Remove station' />
        </button>
        <div className='library-station-card-content' onClick={handleClick}>
          <img src={props.logo ? props.logo : stationPlaceholder} alt='Station logo' className='library-station-logo' onError={handleImageError} />
          <p>{props.name}</p>
        </div>
      </div>
    );
  }
}
