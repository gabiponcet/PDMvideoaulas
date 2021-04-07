import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MyButton from '../components/MyButton';

const Home = props => {
  const [contador, setContador] = useState(0);

  console.log(props);
  /*
    //1. componentDidMount
    useEffect(() => {
      console.log('Montou o componente');
    }, []);

    //2.componentDidUpdate
    useEffect(() => {
      console.log('Fez um update');
    });

    //3.componentDidUpdate before run rules (second argument)
    useEffect(() => {
      console.log('Update após Contador atualizado');
    }, [contador]); */

  const contar = () => {
    setContador(contador + 1);
  };

  const reset = () => {
    setContador(0);
  };

  return (
    <View>
      <Text style={styles.text}>Olá, mundo!</Text>
      <Text style={styles.text}>Contador = {contador}</Text>
      <MyButton text="count" onClick={contar} />
      <MyButton text="reset" onClick={reset} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
