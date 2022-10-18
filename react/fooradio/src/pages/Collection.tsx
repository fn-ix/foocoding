import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './filter-search-collection.css';
import StationCard from '../structure/StationCard';
import cross from '../assets/cross.svg';

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

export default function Collection() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stations, setStations] = useState<Array<StationsInt>>();
  const [removeToggle, setRemoveToggle] = useState(false);
  const [renaming, setRenaming] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const storeString = localStorage.getItem('collections');
    if (storeString !== null) {
      const storeArray = JSON.parse(storeString);

      const collectionArray = storeArray.filter((collection: [string, StationsInt]) => collection[0] === id);

      const collectionsArray = storeArray.filter((collection: [string, StationsInt]) => collection[0] !== id);

      collectionArray[0][0] = (event.currentTarget[0] as HTMLInputElement).value;
      collectionsArray.unshift(collectionArray[0]);

      localStorage.setItem('collections', JSON.stringify(collectionsArray));

      setRenaming(false);
      navigate('/library/' + (event.currentTarget[0] as HTMLInputElement).value.replace(' ', '%20').replace('#', '%23'));
    }
  }

  useEffect(() => {
    const storeString = localStorage.getItem('collections');

    if (storeString !== null) {
      const storeArray = JSON.parse(storeString);

      const collectionArray = storeArray.filter((collection: [string, StationsInt]) => collection[0] === id);

      setStations(collectionArray[0][1]);
    }
  }, [removeToggle, id]);

  return (
    <main className='collection'>
      <section className='collection-section'>
        {renaming ? <div className='collection-title'>
          <form className='collection-form' onSubmit={handleSubmit}>
            <input type='text' placeholder={id} className='collection-input' />
            <button className='collection-close-button' type='reset' onClick={() => setRenaming(false)}><img src={cross} alt='Close' />
            </button>
          </form>
        </div> : <div className='collection-title' onClick={() => setRenaming(true)}><span className='title-text'>{id?.toUpperCase()}</span> (Click title to rename)</div>}
        {stations && stations.map((station) => (
          <StationCard key={station.stationuuid} stationuuid={station.stationuuid} name={station.name} location={station.country} logo={station.favicon} tags={station.tags} url={station.url_resolved} bitrate={station.bitrate} codec={station.codec} type='collection' removeToggle={() => setRemoveToggle(!removeToggle)} id={id} />
        ))}
      </section>
    </main>
  );
}
