import loaderStyles from './loader.module.css';
import logo from '../../images/logo.png';

const Loader = () => {
  return (
    <div className={loaderStyles.loader}>
      <img src={logo} alt="" title="" className={loaderStyles.spinner} />
    </div>
  );
};

export default Loader;
