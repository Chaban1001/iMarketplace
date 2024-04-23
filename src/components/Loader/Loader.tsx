import { FC, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import './loader.scss';
import { App } from '../../App';
import { Comment } from 'react-loader-spinner';
import { MainTitle } from '../UI Components/MainTitle/MainTitle';
import { Apple } from '@mui/icons-material';

type TypeLoader = {
  children: ReactNode;
};

const Loader: FC<TypeLoader> = () => {
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    const changeLoading = async () => {
      const loading = await setTimeout(() => {
        setLoader(true);
      }, 1800);
      return loading;
    };
    changeLoading();
  }, []);

  if (!loader) {
    return (
      <div className='blocks__loader'>
        <MainTitle className='block__title'>
          Welcome to iMarketplace!
          <Apple style={{ fontSize: 60, color: '#89939a' }} />
        </MainTitle>
        <Comment
          visible={true}
          height='80'
          width='80'
          ariaLabel='comment-loading'
          wrapperStyle={{}}
          wrapperClass='comment-wrapper'
          color='#fff'
          backgroundColor='#313131'
        />
      </div>
    );
  }

  return <App />;
};

export { Loader };