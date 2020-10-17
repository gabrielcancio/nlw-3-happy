import React from 'react';
import Routes from './routes';

import './styles/global.css';
import 'leaflet/dist/leaflet.css'; // Como esta importação está senod usada em mais de tres lugares deve ficar no App.tsx

function App() {
  return (
    <Routes/>
  );
}

export default App;
