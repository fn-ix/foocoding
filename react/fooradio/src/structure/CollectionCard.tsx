import './collection-card.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import placeholder from '../assets/station.svg';

type CollectionCardType = { name: string; };

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

export default function CollectionCard(props: CollectionCardType) {
  const [stationImages, setStationImages] = useState<Array<[string, string]>>();
  const [imageError, setImageError] = useState(false);

  function handleImageError(event: React.SyntheticEvent<HTMLImageElement>) {
    if (!imageError) {
      setImageError(true);
      event.currentTarget.src = placeholder;
    }
  }

  useEffect(() => {
    const storeString = localStorage.getItem('collections');

    if (storeString) {
      const storeArr = JSON.parse(storeString);

      const collectionArr = storeArr.filter((collection: [string, StationsInt]) => collection[0] === props.name);

      const stationsWithImages = collectionArr[0][1].filter((station: StationsInt) => station.favicon !== '').map((station: StationsInt) => [station.stationuuid, station.favicon]);

      const stationsWithoutImages = collectionArr[0][1].filter((station: StationsInt) => station.favicon === '').map((station: StationsInt) => [station.stationuuid, placeholder]);

      setStationImages(stationsWithImages.concat(stationsWithoutImages));
    }
  }, [props.name]);

  return (
    <Link to={'/library/' + props.name.replaceAll(' ', '%20').replaceAll('#', '%23')} className='collection-link'>
      <div className='collection-card-logos'>
        {stationImages && stationImages.slice(0, 4).map((station) => <img key={station[0]} src={station[1]} alt='Station logo' className='collection-card-logo' onError={handleImageError} />)}
      </div>
      <p>{props.name}</p>
    </Link>
  );
}
