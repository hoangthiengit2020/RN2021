import React, {useContext} from 'react';
import {View, StyleSheet, Linking, ImageBackground} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container} from './Container';
import {color} from 'react-native-reanimated';
import img from '../assets/images/wave.jpg';
import API_KVHC from '../API/API_KVHC';
import {AuthContext} from '../components/context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
export const DrawerContents = props => {
  console.log('this is prop of drawer', props);
  // console.log('props is:  ', props.activeTintColor);
  // const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const paperTheme = useTheme();
  const [dataKVHCCha, setDataKVHCCha] = React.useState([]);
  const [dataKVHCCapXa, setDataKVHCCapXa] = React.useState([]);
  const {signOut, toggleTheme} = useContext(AuthContext);
  React.useEffect(() => {
    API_KVHC.GetKHVC_Cha()
      .then(res => {
        setDataKVHCCha(res.data);
      })
      .catch(err => {
        return err;
      });
    API_KVHC.GetKVHC_Con(731)
      .then(res => {
        console.log('kvhcon', res.data);
        setDataKVHCCapXa(res.data);
      })
      .catch(err => {
        return err;
      });
  }, []);
  // const toggleTheme = () => {
  //   setIsDarkTheme(!isDarkTheme);
  // };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <ImageBackground
              source={img}
              style={{
                width: '100%',
                // transform: [{rotateY: '45deg'}, {translateX: -30}],
              }}
              resizeMode="cover">
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <Avatar.Image
                  source={{
                    uri: 'https://thiepmung.com/images/frame/frame_icon/in-hinh-len-huy-hieu-4005780582177111.jpg',
                  }}
                  size={50}
                />
                <View style={{marginLeft: 15, flexDirection: 'column'}}>
                  <Title style={styles.title}>
                    {props.loginState.userName !== undefined
                      ? props.loginState.userName
                      : props.loginState.userToken}
                  </Title>
                  <Caption style={styles.caption}>Nodemon</Caption>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.section}>
                  <Caption style={styles.caption}>Phiên bản: </Caption>
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    V1
                  </Paragraph>
                </View>
                <View style={styles.section}>
                  <Caption style={styles.caption}>Cập nhật: </Caption>
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    09/2021
                  </Paragraph>
                </View>
              </View>
            </ImageBackground>
          </View>

          <Drawer.Section
            title="Khu vực hành chính"
            style={[styles.drawerSection, styles.title]}>
            {dataKVHCCapXa &&
              dataKVHCCapXa.map((item, key) => {
                return (
                  <DrawerItem
                    key={key}
                    // activeTintColor="green"
                    icon={({activeTintColor, size}) => (
                      <MaterialCommunityIcons
                        name="map"
                        color={'#8B40E8'}
                        size={size}
                      />
                    )}
                    label={item.ten}
                    labelStyle={{fontWeight: 'bold'}}
                    onPress={() => {
                      // alert(item.maKvhc);
                      // props.navigation.navigate('Home', {
                      //   screen: 'Details',
                      //   params: {
                      //     id: item.maKvhc,
                      //     name: 'name from drawerScreen',
                      //   },
                      // });

                      props.navigation.navigate('Home', {
                        id_kvhc: item.maKvhc,
                      });
                    }}
                  />
                );
              })}
          </Drawer.Section>
          {/* switch dark theme  */}
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} color="red" />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
          {/* end switch dark theme */}
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Đăng xuất"
          labelStyle={{color: 'red'}}
          onPress={signOut}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    // paddingLeft: 20,
    backgroundColor: '#009388',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#d02860',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: 'black',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    color: 'red',
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
