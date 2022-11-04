import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../App';
import { countryCodes } from './countryCodes';

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

interface CategoryInt {
  name: string,
  stationcount: number,
}

export default function useRadioBrowser(type: string, initialAmount: number, id?: string) {
  const context = useContext(GlobalContext);

  const [stations, setStations] = useState<Array<StationsInt>>();
  const [amount, setAmount] = useState<number>(initialAmount);
  const [remoteAmount, setRemoteAmount] = useState(0);
  const [categories, setCategories] = useState<Array<CategoryInt>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setStations(undefined);
    setAmount(initialAmount);
  }, [context.refresh, initialAmount, setAmount, setStations]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(false);

      const linkBase = 'https://nl1.api.radio-browser.info/json';
      const headers = new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json",
        "User-Agent": "FooRadio (fooradio.onrender.com)/1.0"
      });

      try {
        let data;
        const fixedId = id?.replaceAll(' ', '%20').replaceAll('#', '%23');
        switch (type) {
          case 'most-popular':
            data = await fetch(linkBase + '/stations/topvote?hidebroken=true&limit=' + amount, { headers: headers });
            setStations(await data.json());
            setLoading(false);
            break;
          case 'recently-played':
            data = await fetch(linkBase + '/stations/lastclick?hidebroken=true&limit=' + amount, { headers: headers });
            setStations(await data.json());
            setLoading(false);
            break;
          case 'countries':
            data = await fetch(linkBase + '/countries?hidebroken=true', { headers: headers });
            const countries = await data.json();
            const uniqueCountries = [] as Array<CategoryInt>;
            countries.forEach((country: CategoryInt) => {
              if (uniqueCountries.filter((uniqueCountry) => uniqueCountry.name === country.name).length === 0) {
                uniqueCountries.push(country);
              }
            });
            setCategories(uniqueCountries);
            setStations(undefined);
            setAmount(initialAmount);
            setLoading(false);
            break;
          case 'languages':
            data = await fetch(linkBase + '/languages?hidebroken=true', { headers: headers });
            setCategories(await data.json());
            setStations(undefined);
            setAmount(initialAmount);
            setLoading(false);
            break;
          case 'tags':
            data = await fetch(linkBase + '/tags?hidebroken=true', { headers: headers });
            setCategories(await data.json());
            setStations(undefined);
            setAmount(initialAmount);
            setLoading(false);
            break;
          case 'countries-stations':
            data = await fetch(`${linkBase}/stations/bycountryexact/${id}?hidebroken=true&limit=${amount}`, { headers: headers });
            setStations(await data.json());
            setLoading(false);
            if (id) {
              const stationProp = await fetch(`${linkBase}/countries/${countryCodes[id]}?hidebroken=true`, { headers: headers });
              setRemoteAmount((await stationProp.json())[0].stationcount);
            }
            break;
          case 'languages-stations':
            data = await fetch(`${linkBase}/stations/bylanguageexact/${id}?hidebroken=true&limit=${amount}`, { headers: headers });
            setStations(await data.json());
            setLoading(false);
            if (id) {
              const stationProp = await fetch(`${linkBase}/languages/${id}?hidebroken=true`, { headers: headers });
              setRemoteAmount((await stationProp.json())[0].stationcount);
            }
            break;
          case 'tags-stations':
            data = await fetch(`${linkBase}/stations/bytagexact/${fixedId}?hidebroken=true&limit=${amount}`, { headers: headers });
            setStations(await data.json());
            setLoading(false);
            if (id) {
              const stationProp = await fetch(`${linkBase}/tags/${fixedId}?hidebroken=true`, { headers: headers });
              setRemoteAmount((await stationProp.json())[0].stationcount);
            }
            break;
          case 'search':
            data = await fetch(`${linkBase}/stations/byname/${fixedId}?hidebroken=true&limit=${amount}`, { headers: headers });
            setStations(await data.json());
            setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        setError(true);
        console.error(err);
      }
    }
    fetchData();

    if (type !== 'most-popular' && type !== 'recently-played' && !type.includes('stations')) {
      return () => {
        setCategories(undefined);
      };
    }

  }, [type, amount, context.refresh, id, initialAmount]);

  return { stations, categories, loading, error, remoteAmount, amount, setAmount };
}
