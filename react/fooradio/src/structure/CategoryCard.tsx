import './category-card.css';
import { Link } from 'react-router-dom';

interface CategoryCardInt {
  name: string,
  count: number,
  category: string,
}

export default function CategoryCard(props: CategoryCardInt) {
  return (
    <Link to={'/' + props.category + '/' + props.name.replaceAll(' ', '%20').replaceAll('#', '%23')} className='category-link'>
      <div className='category-card'>
        <span>{props.name}</span><span>{props.count}</span>
      </div>
    </Link>
  );
}
