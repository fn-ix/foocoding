import './filter-search-collection.css';
import StationCard from '../structure/StationCard';
import loader from '../assets/loading.svg';
import useRadioBrowser from '../dev/useRadioBrowser';
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function Search() {
  const { id } = useParams();

  const title = ('Search results for: ' + id).toUpperCase();

  const { stations, amount, setAmount, loading, error } = useRadioBrowser('search', 28, id);

  const sect = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sect.current !== null && stations?.length === amount && sect.current.scrollHeight === sect.current.clientHeight) {
      setAmount((prev) => prev + 28);
    }
  }, [stations, setAmount, amount]);

  function handleScroll(event: React.UIEvent<HTMLElement>) {
    if (stations?.length === amount) {
      const bottom = event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight;
      if (bottom) {
        setAmount((prev) => prev + 28);
      }
    }
  }

  return (
    <main className='search'>
      <section className='search-section' onScroll={handleScroll} ref={sect}>
        <div className='search-title'>{title}</div>
        {error && <div>Something went wrong ...</div>}
        {stations && stations.map((station) => (
          <StationCard key={station.stationuuid} stationuuid={station.stationuuid} name={station.name} location={station.country} logo={station.favicon} tags={station.tags} url={station.url_resolved} bitrate={station.bitrate} codec={station.codec} type='filter' />
        ))}
        {loading && <img src={loader} alt='Loading...' className='loader' />}
      </section>
    </main>
  );
}
