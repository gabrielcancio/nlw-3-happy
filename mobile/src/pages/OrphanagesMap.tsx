import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { RectButton } from 'react-native-gesture-handler'; // Botão que faz o efeito de riple mas com botões com borda
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import mapMarker from '../assets/map-marker.png';
import api from '../services/api';

interface Orphanage {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const navigation = useNavigation();

  useFocusEffect(() => {
    api.get('orphanages').then(response => setOrphanages(response.data));
  });

  function handleNavigateToOrphanageDetails(id: string) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView
        toolbarEnabled={false}  // Remove a barrinha de icones (rotas e abrir no maps)
        provider={PROVIDER_GOOGLE} // Pegando o provider do google maps para usar o google maps em todas as plataformas
        style={styles.map} 
        initialRegion={{ // Posição ao abrir o app
          latitude: -2.5446915,
          longitude: -44.1752552,
          latitudeDelta: 0.010, // Zoom
          longitudeDelta: 0.010 // Zoom 
        }} 
      >
        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id} 
            icon={mapMarker}
            calloutAnchor={{ // Propriedade para posicionar o callout em relação ao marker
              x: 1.75,
              y: 0.6
            }}
            coordinate={{
              latitude: orphanage.latitude, 
              longitude: orphanage.longitude
            }}
          >
          <Callout onPress={() => handleNavigateToOrphanageDetails(orphanage.id)} tooltip> 
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>{orphanage.name}</Text>
            </View>
          </Callout>
        </Marker>
        ))}
        
      </MapView>

       <View style={styles.footer}>
        <Text style={styles.textFooter}>{orphanages.length} Orfanatos encontrados</Text>

        <RectButton 
          style={styles.createOrphanageButton} 
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#FFF"/>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  map: {
    // width: Dimensions.get('window').width, // Utilizando o Dimensions do React Native conseguimos pegar as dimensões da tela
    // height: Dimensions.get('window').height,
    flex: 1
  },

  calloutContainer: { // Setando tooltip como true para habilitar a estilização pelo StyleSheet e poder estilizar livremente com "css"
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    elevation: 3
  },

  calloutText: {
    color: '#0089A5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold'
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 46,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3 // Sombremento de uma view para Android, para iOS existem outras maneiras de se aplicar sombra
  },

  textFooter: {
    color: '#8FA7B3',
    fontFamily: 'Nunito_700Bold'
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15C3E6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  }
});
