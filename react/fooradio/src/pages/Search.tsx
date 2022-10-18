import './filter-search-collection.css';
import StationCard from '../structure/StationCard';
import loader from '../assets/loading.svg';
import useRadioBrowser from '../dev/useRadioBrowser';
import { useParams } from 'react-router-dom';

export default function Search() {
  const { id } = useParams();

  const title = ('Search results for: ' + id).toUpperCase();

  const { stations, setAmount, loading, error } = useRadioBrowser('search', 28, id);

  function handleScroll(event: React.UIEvent<HTMLElement>) {
    const bottom = event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight;
    if (bottom) {
      setAmount((prev) => prev + 28);
    }
  }

  return (
    <main className='search'>
      <section className='search-section' onScroll={handleScroll}>
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
