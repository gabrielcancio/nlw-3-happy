import React from 'react';
import { useFonts } from 'expo-font';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({ // Recebe um objeto com as fontes e retorna uma variável do tipo boolean que informa se as fontes ja foram carregadas ou não
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  });

  if(!fontsLoaded) { // Se as fontes ainda não foram carregadas a tela vai ficar branca até carregar
    return null;
  }

  return <Routes />
}