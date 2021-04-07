import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Alert} from 'react-native';
import {COLORS} from '../assets/colors';
import MyButton from '../components/MyButton';
import auth from '@react-native-firebase/auth';

// import { Container } from './styles';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const recover = () => {
    if (email !== ' ') {
      console.log(email);
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert(
            'Atenção',
            'Enviamos um email de recuperação de senha para o seguinte endereço' +
              email,
            [{text: 'ok', onPress: () => navigation.goBack()}],
          );
        })
        .catch(e => {
          console.log('ForgotPassword: erro!!' + e);
          switch (e.code) {
            case 'auth/user-not-found':
              Alert.alert('Erro', 'Usuário não cadastrado');
              break;
            case 'auth/wrong-password':
              Alert.alert('Erro', 'Senha incorreta');
              break;
            case 'auth/invalid-email':
              Alert.alert('Erro', 'Email inválido');
              break;
            case 'auth/user-disabled':
              Alert.alert('Erro', 'Usuário desabilitado');
              break;
          }
        });
    } else {
      Alert.alert('Erro', 'Por favor, não deixe nenhum campo em branco.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email.adress"
        returnKeyType="go"
        onChangeText={t => setEmail(t)}
        autoFocus={true}
      />
      <MyButton text="Recuperar senha" onClick={recover} />
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
    marginTop: 40,
  },
});
