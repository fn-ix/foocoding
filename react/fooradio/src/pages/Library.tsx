import './library.css';
import { useState, useEffect } from 'react';
import StationCard from '../structure/StationCard';

interface SectionInt {
  type: 'favorites' | 'collections',
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

function Section(props: SectionInt) {
  const title = props.type.toUpperCase().replace('-', ' ');

  const [favorites, setFavorites] = useState<Array<StationsInt>>();
  const [collections, setCollections] = useState();

  useEffect(() => {
    const localData = localStorage.getItem('favorites');
    if (localData !== null) setFavorites(JSON.parse(localData));
  }, []);

  if (props.type === 'favorites') {
    return (
      <section className={'library-section section-favorites'}>
        <div className='library-section-title'>{title}</div>
        {(favorites && favorites.length >= 1) ? favorites.map((station) => (
          <StationCard key={station.stationuuid} stationuuid={station.stationuuid} name={station.name} location={station.country} logo={station.favicon} tags={station.tags} url={station.url_resolved} bitrate={station.bitrate} codec={station.codec} type='library' />
        )) : <p>Add some favorites...</p>}
      </section>
    );
  } else {
    return (
      <section className={'library-section section-collections'}>
        <div className='library-section-title'>{title}</div>
        {/* {collections && collections.map((station) => (
          <StationCard key={station.stationuuid} stationuuid={station.stationuuid} name={station.name} location={station.country} logo={station.favicon} tags={station.tags} url={station.url_resolved} bitrate={station.bitrate} codec={station.codec} type='library' />
        ))} */}
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
