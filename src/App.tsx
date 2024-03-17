import React from 'react';
import { Provider } from 'mobx-react';
import myStore from './store/MyStore';
import Container from './components/Container';
import './App.css'

const App: React.FC = () => {
    return (
        <Provider myStore={myStore}>
            <Container />
        </Provider>
    );
};

export default App;
