import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler'; // Botão importado diretamente do gesture handler que faz o efeito de riple para botões sem borda(Ícones, textos)
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

interface Props {
  title: string;
  showCancel: boolean; // Propriedade para mostrar o botão de cancelar
}

const Header: React.FC<Props> = ({ title, showCancel = true }) => { // Caso o showCancel não seja passado ele tem valor padrão como true
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleGoBackToHomePage() {
    navigation.navigate('Orphanages');
  }

  return(
    <View style={styles.container}>
      <BorderlessButton onPress={handleGoBack}>
        <Feather name="arrow-left" size={24} color="#16B5D6"/>
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>
      
      {showCancel ? (
        <BorderlessButton onPress={handleGoBackToHomePage}>
          <Feather name="x" size={24} color="#FF669D"/>
        </BorderlessButton>
      ) : (
        <View/>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F9FAFC',
    borderBottomWidth: 1,
    borderColor: '#DDE3F0',
    paddingTop: 44,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  title: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    color: '#8FA7B3'
  }
});

export default Header;