import React from 'react';
import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import {Container} from './Container';
import {useTheme} from '@react-navigation/native';
export const Home = props => {
  let {navigation, route} = props;
  // console.log('route nagigation from home====== :', route);
  const {colors} = useTheme();
  return (
    <Container>
      <Text style={{color: colors.text}}>Home</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', {
            // id: route.params.id_kvhc,
            name: 'from screen home1',
          })
        }
      />
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Lobster-Regular',
    fontSize: 30,
    color: 'red',
  },
});
