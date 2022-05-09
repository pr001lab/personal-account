import Spinner from 'react-spinner-material';
import './loader.css';

function Loader(): JSX.Element {
  return (
    <div className='loader'>
      <Spinner radius={220} color={'gray'} stroke={10} visible />
    </div>
  );
}

export default Loader;
