import './category-card.css';
import { Link } from 'react-router-dom';
import { CategoryCardInt } from '../dev/interfaces';

export default function CategoryCard(props: CategoryCardInt) {
  return (
    <Link to={'/' + props.category + '/' + props.name.replaceAll(' ', '%20').replaceAll('#', '%23')} className='category-link'>
      <div className='category-card'>
        <span>{props.name}</span><span>{props.stationcount}</span>
      </div>
    </Link>
  );
}
