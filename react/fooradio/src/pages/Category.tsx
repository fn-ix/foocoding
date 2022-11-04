import './category-collection-search.css';
import CategoryCard from '../structure/CategoryCard';
import { useParams } from 'react-router-dom';
import StationCard from '../structure/StationCard';
import useRadioBrowser from '../dev/useRadioBrowser';
import loader from '../assets/loading.svg';
import { useRef, useEffect } from 'react';
import { CategoryInt } from '../dev/interfaces';

export default function Category(props: CategoryInt) {
  const title = props.type.toUpperCase();

  const { id } = useParams();

  const { stations, categories, setAmount, loading, error, amount, remoteAmount } = useRadioBrowser(props.type, 28, id);

  const sect = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sect.current && sect.current.scrollHeight === sect.current.clientHeight && amount < remoteAmount) {
      setAmount((prev) => prev + 28);
    }
  }, [stations, setAmount, amount, remoteAmount]);

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
      <main className='category'>
        <section className='category-section'>
          <div className='category-title'>{title}</div>
          {error && <div>Something went wrong ...</div>}
          {categories && categories.map((category) => (
            <CategoryCard key={category.name} name={category.name} stationcount={category.stationcount} category={props.type} />
          ))}
          {loading && <img src={loader} alt='Loading...' className='loader' />}
        </section>
      </main>
    );
  } else {
    return (
      <main className='category'>
        <section className='category-section' onScroll={handleScroll} ref={sect}>
          <div className='category-title'>{id?.toUpperCase()}</div>
          {error && <div>Something went wrong ...</div>}
          {stations && stations.map((station) => (
            <StationCard key={station.stationuuid} stationuuid={station.stationuuid} name={station.name} country={station.country} favicon={station.favicon} tags={station.tags} url_resolved={station.url_resolved} bitrate={station.bitrate} codec={station.codec} type='category' />
          ))}
          {loading && <img src={loader} alt='Loading...' className='loader' />}
        </section>
      </main>
    );
  }
}
