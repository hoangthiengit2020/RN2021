import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import {useTheme} from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
  // const {colors} = useTheme();
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      // navigation.replace('SignIn');
    }, 3000);
  }, []);

  return (
    <LinearGradient colors={['#8B40E8', '#6000D2']} style={styles.container}>
      <StatusBar backgroundColor="#8B40E8" barStyle="light-content" />
      <View style={styles.imgLogo}>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={require('../assets/images/logoBH.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Animatable.View animation="pulse">
          <Text style={styles.text}>QUY HOẠCH XÂY DỰNG BIÊN HÒA</Text>
        </Animatable.View>
      </View>
    </LinearGradient>
  );
};

export default SplashScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6000D2',
  },
  imgLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 25,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
