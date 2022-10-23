import './filter-search-collection.css';
import FilterCard from '../structure/FilterCard';
import { useParams } from 'react-router-dom';
import StationCard from '../structure/StationCard';
import useRadioBrowser from '../dev/useRadioBrowser';
import loader from '../assets/loading.svg';
import { useRef, useEffect } from 'react';

interface FilterInt {
  type: 'countries' | 'languages' | 'tags' | 'countries-stations' | 'languages-stations' | 'tags-stations';
}

export default function Filter(props: FilterInt) {
  const title = props.type.toUpperCase();

  const { id } = useParams();

  const { stations, filters, setAmount, loading, error, amount, remoteAmount } = useRadioBrowser(props.type, 28, id);

  const sect = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sect.current !== null) {
      if (sect.current.scrollHeight === sect.current.clientHeight) setAmount((prev) => prev + 28);
    }
  }, [stations, setAmount]);

  function handleScroll(event: React.UIEvent<HTMLElement>) {
    if (amount < remoteAmount) {
      const bottom = event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight;
      if (bottom) {
        setAmount((prev) => prev + 28);
      }
    }
  }

  if (!props.type.includes('stations')) {
    return (
      <main className='filter'>
        <section className='filter-section'>
          <div className='filter-title'>{title}</div>
          {error && <div>Something went wrong ...</div>}
          {filters && filters.map((filter) => (
            <FilterCard key={filter.name} name={filter.name} count={filter.stationcount} category={props.type} />
          ))}
          {loading && <img src={loader} alt='Loading...' className='loader' />}
        </section>
      </main>
    );
  } else {
    return (
      <main className='filter'>
        <section className='filter-section' onScroll={handleScroll} ref={sect}>
          <div className='filter-title'>{id?.toUpperCase()}</div>
          {error && <div>Something went wrong ...</div>}
          {stations && stations.map((station) => (
            <StationCard key={station.stationuuid} stationuuid={station.stationuuid} name={station.name} location={station.country} logo={station.favicon} tags={station.tags} url={station.url_resolved} bitrate={station.bitrate} codec={station.codec} type='filter' />
          ))}
          {loading && <img src={loader} alt='Loading...' className='loader' />}
        </section>
      </main>
    );
  }
}
