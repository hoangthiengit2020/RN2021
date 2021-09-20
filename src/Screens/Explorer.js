import React from 'react';
import {Button, Text} from 'react-native-paper';
import {Container} from './Container';

const Explorer = ({route}) => {
  console.log('Explorer ', route);
  return (
    <Container>
      <Text>Explorer</Text>
      <Button title="" onPress={() => alert('onclick')} />
    </Container>
  );
};

export default Explorer;
