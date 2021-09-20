/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  Provider as PapeProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';

import GlobalFont from 'react-native-global-font';
import {Profile} from './src/Screens/Profile';
import MainTabScreens from './src/Screens/MainTabScreens';

import {DrawerContents} from './src/Screens/DrawerContents';
import RootStackScreen from './src/Screens/RootStackScreen';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/Screens/SplashScreen';
import {AuthContext} from './src/components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initialLoginState, loginReducer} from './src/Hook/userReducer';
import {LOGIN, REGISTER, SIGNIN, SIGNOUT} from './src/Hook/type';

/**
 * Library third
 */

// const DetailsStack = createStackNavigator();
// const DetailStackScreen = () => {
//   return (
//     <DetailsStack.Navigator
//       screenOptions={{
//         headerTintColor: 'white',
//         headerStyle: {
//           backgroundColor: '#009388',
//         },
//         headerTitleStyle: {
//           fontWeight: 'bold',
//           flexDirection: 'row',
//           justifyContent: 'center',
//         },
//       }}>
//       <DetailsStack.Screen
//         name="Details"
//         component={Details}
//         initialParams={{id: 44477, name: 'default name'}}
//       />
//     </DetailsStack.Navigator>
//   );
// };

const Drawer = createDrawerNavigator();
const App = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);
  const authContext = useMemo(
    () => ({
      signIn: async foundUser => {
        // setUserToken('aThien');
        // setIsLoading(false);
        console.log(foundUser);
        let userToken = null;
        userToken = String(foundUser[0].userToken);
        userName = foundUser[0].username;

        try {
          // userToken = 'aThien';
          await AsyncStorage.setItem('userToken', userToken);
        } catch (err) {
          console.log(err);
        }

        dispatch({type: LOGIN, id: userName, token: userToken});
        // console.log('login state', loginState);
        // console.log('login email,pass', userName, passWord);
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        await AsyncStorage.removeItem('userToken');
        dispatch({type: SIGNOUT});
        console.log(loginState);
      },
      toggleTheme: () => {
        setIsDarkTheme(isDarkTheme => !isDarkTheme);
      },
    }),
    [],
  );
  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (err) {
        console.log(err);
      }
      dispatch({type: REGISTER, token: userToken});
      // console.log('loginState useEffect', loginState.userToken);
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      // <View
      //   style={{
      //     flex: 1,
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //     backgroundColor: 'transparent',
      //   }}>
      //   <MaterialIndicator color="#8B40E8" size={50} count={8} />
      // </View>
      <SplashScreen />
    );
  }
  return (
    <PapeProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken !== null ? (
            <Drawer.Navigator
              // drawerStyle={{
              //   width: 250,
              // }}
              // drawerContentOptions={{
              // activeTintColor: 'blue',

              //   itemStyle: {marginVertical: 8, marginHorizontal: 8},
              // }}
              drawerContent={props => (
                <DrawerContents {...props} loginState={loginState} />
              )}>
              <Drawer.Screen name="HomeDrawer" component={MainTabScreens} />
              <Drawer.Screen name="Profile" component={Profile} />
            </Drawer.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PapeProvider>
  );
};

export default App;
