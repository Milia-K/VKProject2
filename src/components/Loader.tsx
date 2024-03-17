import React from 'react';
import { Spinner, Header } from '@vkontakte/vkui';

const Loader: React.FC = () => {
  return (
    <div className='loader'>
        <div style={{textAlign: 'center'}}> 
            <Header mode='primary'>Loading...</ Header>
            <Spinner size="large" />
        </div>
    </div>
  );
}

export default Loader;
