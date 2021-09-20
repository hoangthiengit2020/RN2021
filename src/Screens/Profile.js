import React from 'react';
import {Container} from './Container';
import {Text} from 'react-native';

export const Profile = ({route}) => {
  console.log(route);
  return (
    <Container>
      <Text>Profile </Text>
    </Container>
  );
};
