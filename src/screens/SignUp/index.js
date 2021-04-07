import React, {useState} from 'react';
import {Alert} from 'react-native';
import MyButton from '../../components/MyButton';
import {Body, TextInput} from './styles';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

const SignUp = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirPass, setConfirPass] = useState('');

  const cadastrar = () => {
    if (nome !== '' && email !== '' && pass !== '' && confirPass !== '') {
      auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(() => {
          Alert.alert('Informação', 'Usuário cadastrado com sucesso');
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Home'}],
            }),
          );
        })
        .catch(e => {
          console.log('SignIn: erro!!' + e);
          switch (e.code) {
            case 'auth/email-already-in-use':
              Alert.alert('Erro', 'email já em uso');
              break;
            case 'auth/opperation-not-allowed':
              Alert.alert('Erro', 'Problemas ao fazer o cadastro');
              break;
            case 'auth/invalid-email':
              Alert.alert('Erro', 'Email inválido');
              break;
            case 'auth/weak-password':
              Alert.alert('Erro', 'Senha fraca. Digite uma senha forte.');
              break;
          }
        });
    } else {
      Alert.alert('Erro', 'Por favor, não deixe nenhum campo em branco.');
    }
  };
  return (
    <Body>
      <TextInput
        placeholder="Nome Completo"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setNome(t)}
        onEndEditing={() => this.emailTextInput.focus()}
      />
      <TextInput
        ref={ref => {
          this.emailTextInput = ref;
        }}
        placeholder="Email"
        keyboardType="email.adress"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
        onEndEditing={() => this.passTextInput.focus()}
      />
      <TextInput
        ref={ref => {
          this.passTextInput = ref;
        }}
        secureTextEntry={true}
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setPass(t)}
        onEndEditing={() => this.confirmPassTextInput.focus()}
      />
      <TextInput
        ref={ref => {
          this.confirmPassTextInput = ref;
        }}
        secureTextEntry={true}
        placeholder="Confirmar Senha"
        keyboardType="default"
        returnKeyType="send"
        onChangeText={t => setConfirPass(t)}
        onEndEditing={() => cadastrar()}
      />
      <MyButton text="Cadastrar" onClick={cadastrar} />
    </Body>
  );
};

export default SignUp;
