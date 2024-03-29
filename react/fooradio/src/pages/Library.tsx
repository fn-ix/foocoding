import './library.css';
import { useState, useEffect } from 'react';
import StationCard from '../structure/StationCard';
import CollectionCard from '../structure/CollectionCard';
import { LibraryInt, StationInt } from '../dev/interfaces';

function Section(props: LibraryInt) {
  const title = props.type.toUpperCase();

  const [favorites, setFavorites] = useState<Array<StationInt>>();
  const [removeToggle, setRemoveToggle] = useState(false);
  const [collectionNames, setCollectionNames] = useState<Array<string>>();


  function customToggle() {
    setRemoveToggle(!removeToggle);
  }

  useEffect(() => {
    const localData = localStorage.getItem('favorites');
    if (localData) setFavorites(JSON.parse(localData));
  }, [removeToggle]);

  useEffect(() => {
    const storeString = localStorage.getItem('collections');

    if (storeString) {
      const storeArr = JSON.parse(storeString);
      const storeNames = storeArr.map((collection: [string, StationInt]) => collection[0]);
      setCollectionNames(storeNames);
    }
  }, []);

  if (props.type === 'favorites') {
    return (
      <section className={'library-section section-favorites'}>
        <div className='library-section-title'>{title}</div>
        {(favorites && favorites.length >= 1) ? favorites.map((station) => (
          <StationCard key={station.stationuuid} stationuuid={station.stationuuid} name={station.name} country={station.country} favicon={station.favicon} tags={station.tags} url_resolved={station.url_resolved} bitrate={station.bitrate} codec={station.codec} type='library' removeToggle={customToggle} />
        )) : <p>Add some favorites...</p>}
      </section>
    );
  } else {
    return (
      <section className={'library-section section-collections'}>
        <div className='library-section-title'>{title}</div>
        {(collectionNames && collectionNames.length >= 1) ? collectionNames.map((name) => (
          <CollectionCard key={name} name={name} />
        )) : <p>Create some collections...</p>}
      </section>
    );
  }
}

export default function Library() {
  return (
    <main className='library'>
      <Section type='favorites' />
      <Section type='collections' />
    </main>
  );
}
