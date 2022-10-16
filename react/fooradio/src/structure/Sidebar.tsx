import './sidebar.css';
import Button from './Button';
import { useLocation } from 'react-router-dom';

export default function Sidebar() {
  const path = useLocation().pathname;

  const currentPage = (path === '/' || path === '/library') ? 'home' : path.slice(path.indexOf('/') + 1, (path.lastIndexOf('/') !== 0) ? path.lastIndexOf('/') : undefined);

  return (
    <nav className='sidebar'>
      <Button name='countries' type='filter-top' current={currentPage} />
      <Button name='languages' type='filter-top' current={currentPage} />
      <Button name='tags' type='filter-top' current={currentPage} />
      <div className='spacer' />
      <Button name='reload' type='filter-bottom' />
      <Button name='home' type='filter-bottom' current={currentPage} />
    </nav>
  );
}
