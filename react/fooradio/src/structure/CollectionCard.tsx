import './collection-card.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
  const [stationImages, setStationImages] = useState<Array<string>>();

  useEffect(() => {
    const storeString = localStorage.getItem('collections');

    if (storeString !== null) {
      const storeArr = JSON.parse(storeString);

      const collectionArr = storeArr.filter((collection: [string, StationsInt]) => collection[0] === props.name);

      const images = collectionArr[0][1].filter((station: StationsInt) => station.favicon !== '').map((station: StationsInt) => station.favicon);

      setStationImages(images);
    }
  }, [props.name]);

  return (
    <Link to={'/library/' + props.name.replace(' ', '%20').replace('#', '%23')} className='collection-link'>
      <div className='collection-card-logos'>
        {stationImages && stationImages.slice(0, 4).map((img) => <img src={img} alt='Station logo' className='collection-card-logo' />)}
      </div>
      <p>{props.name}</p>
    </Link>
  );
}
