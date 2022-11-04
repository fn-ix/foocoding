import './sidebar.css';
import Button from './Button';
import { useLocation } from 'react-router-dom';

export default function Sidebar() {
  const path = useLocation().pathname;

  const currentPage = (path === '/' || path === '/library') ? 'home' : path.slice(path.indexOf('/') + 1, (path.lastIndexOf('/') !== 0) ? path.lastIndexOf('/') : undefined);

  return (
    <nav className='sidebar'>
      <Button name='countries' type='category-top' current={currentPage} />
      <Button name='languages' type='category-top' current={currentPage} />
      <Button name='tags' type='category-top' current={currentPage} />
      <div className='sidebar-spacer' />
      <Button name='reload' type='category-bottom' />
      <Button name='home' type='category-bottom' current={currentPage} />
    </nav>
  );
}
