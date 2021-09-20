import React from 'react';
import {View, Button, Text, StyleSheet, Pressable} from 'react-native';
import {Container} from './Container';

export const Details = ({navigation, route}) => {
  // console.log('Route from details ', route);
  return (
    <Container>
      <Text style={styles.text}>
        Details with params
        {/* {route.params.id_kvhc} and {route.params.name} */}
      </Text>
      <Button
        color="blue"
        title="Go to Details again Screen...Details"
        onPress={() => navigation.push('Details')}
      />
      <Button
        color="red"
        title="go to home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        color="violet"
        title="go Back"
        onPress={() => navigation.goBack()}
      />
      <Button
        color="orange"
        title="go to the first screen"
        onPress={() => navigation.popToTop()}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Lobster-Regular',
    fontSize: 30,
    color: '#009388',
  },
  btn: {
    backgroundColor: '#009388',
    color: 'red',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
});
