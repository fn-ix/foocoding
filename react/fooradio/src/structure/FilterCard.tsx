import './filter-card.css';
import { Link } from 'react-router-dom';

interface FilterCardInt {
  name: string,
  count: number,
  category: string,
}

export default function FilterCard(props: FilterCardInt) {
  return (
    <Link to={'/' + props.category + '/' + props.name.replaceAll(' ', '%20').replaceAll('#', '%23')} className='filter-link'>
      <div className='filter-card'>
        <span>{props.name}</span><span>{props.count}</span>
      </div>
    </Link>
  );
}
