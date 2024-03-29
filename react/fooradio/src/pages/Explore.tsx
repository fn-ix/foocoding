import './explore.css';
import StationCard from '../structure/StationCard';
import loader from '../assets/loading.svg';
import useRadioBrowser from '../dev/useRadioBrowser';
import { useEffect, useRef } from 'react';
import { ExploreInt } from '../dev/interfaces';

function Section(props: ExploreInt) {
  const title = props.type.toUpperCase().replace('-', ' ');

  const { stations, setAmount, loading, error } = useRadioBrowser(props.type, 14);

  function handleScroll(event: React.UIEvent<HTMLElement>) {
    const bottom = event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight;
    if (bottom) {
      setAmount((prev) => prev + 14);
    }
  }

  const sect = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sect.current && stations && sect.current.scrollHeight === sect.current.clientHeight) {
      setAmount((prev) => prev + 14);
    }
  }, [stations, setAmount]);

  return (
    <section className='explore-home-section' id={`section-${props.type}`} onScroll={handleScroll} ref={sect}>
      <div className='explore-section-title'>{title}</div>
      {error && <div>Something went wrong ...</div>}
      {stations && stations.map((station) => (
        <StationCard key={station.stationuuid} stationuuid={station.stationuuid} name={station.name} country={station.country} favicon={station.favicon} tags={station.tags} url_resolved={station.url_resolved} bitrate={station.bitrate} codec={station.codec} type='explore' />
      ))}
      {loading && <img src={loader} alt='Loading...' className='loader' />}
    </section>
  );
}

export default function Explore() {
  return (
    <main className='explore'>
      <Section type='most-popular' />
      <Section type='recently-played' />
    </main>
  );
}
