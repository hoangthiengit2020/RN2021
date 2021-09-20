import React, {useContext, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import WavyHeader from './WavyHeader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../components/context';
import Users_ from '../model/users';
//https://github.com/lucasferreira/react-native-flash-message
import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';
const {height} = Dimensions.get('screen');
// const height_logo = height * 0.18;

const SignIn = () => {
  const [data, setData] = useState({
    userName: '',
    passWord: '',
    check_textInputChange: false,
    check_textInputChangePass: false,
    secureTextEntry: true,
    // validation
    isValidUser: true,
    isValidPassword: true,
  });
  const {signIn} = useContext(AuthContext);
  const textInputChange = val => {
    console.log(val.length);
    if (val.trim().length >= 4) {
      setData({
        ...data,
        userName: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        userName: val,
        check_textInputChande: false,
        isValidUser: false,
      });
    }
  };
  const textInputChangePass = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        passWord: val,
        check_textInputChangePass: true,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        passWord: val,
        check_textInputChangePass: false,
        isValidPassword: false,
      });
    }
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };
  const handleLogin = (userName, passWord) => {
    const foundUser = Users_.filter(item => {
      return userName == item.username && passWord == item.password;
    });
    console.log('foundUser', foundUser);
    if (data.userName.length == 0 || data.passWord.length == 0) {
      // Alert.alert('Lỗi', 'Tên đăng nhập hoặc mật khẩu không được để trống', [
      //   {
      //     text: 'Ok',
      //   },
      // ]);
      showMessage({
        message: 'Lỗi',
        description: 'Tên đăng nhập hoặc mật khẩu không được để trống',
        type: 'danger',
        icon: {icon: 'danger', position: 'right'},
        backgroundColor: 'red',
        color: 'white',
        floating: 'true',
        position: 'bottom',
      });
      return;
    }
    if (foundUser.length == 0) {
      // Alert.alert('Lỗi', 'Tên đăng nhập hoặc mật khẩu không đúng', [
      //   {
      //     text: 'Ok',
      //   },
      // ]);
      // return;
      showMessage({
        message: 'Lỗi',
        description: 'Tên đăng nhập hoặc mật khẩu không đúng',
        type: 'danger',
        icon: {icon: 'danger', position: 'right'},
        backgroundColor: 'red',
        color: 'white',
        floating: 'true',
        position: 'bottom',
      });
      return;
    }

    signIn(foundUser);
  };
  return (
    <View style={styles.container}>
      <FlashMessage position="top" />
      <StatusBar backgroundColor="#8B40E8" barStyle="light-content" />

      <WavyHeader customStyles={styles.svgCurve} />
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/logoBH.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>QUY HOẠCH XÂY DỰNG</Text>
      </View>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={250}>
        <Animatable.View name="fadeIn" duration={1500} style={styles.footer}>
          <Text style={styles.text_footer}>Tên đăng nhập</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#8B40E8" size={20} />
            <TextInput
              placeholder="Tên đăng nhập"
              n
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
              onEndEditing={e => {
                handleValidUser(e.nativeEvent.text);
              }}
            />
            {data.check_textInputChange ? (
              <Feather name="check-circle" size={20} color="blue" />
            ) : null}
          </View>
          {data.isValidUser ? null : (
            <Animatable.View name="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                {' '}
                Tên đăng nhập ít nhất 4 ký tự
              </Text>
            </Animatable.View>
          )}

          <Text style={[styles.text_footer, {marginTop: 20}]}>Mật khẩu</Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#8B40E8" size={20} />
            <TextInput
              placeholder="Mật khẩu"
              n
              style={styles.textInput}
              autoCapitalize="none"
              secureTextEntry={data.secureTextEntry ? true : false}
              onChangeText={val => textInputChangePass(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.check_textInputChangePass ? (
                <Feather
                  name={data.secureTextEntry ? 'eye-off' : 'eye'}
                  size={20}
                  color="blue"
                />
              ) : null}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View name="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}> Mật khẩu ít nhất 4 ký tự</Text>
            </Animatable.View>
          )}
        </Animatable.View>
        <TouchableOpacity
          onPress={() => {
            handleLogin(data.userName, data.passWord);
          }}>
          <View style={styles.button}>
            <LinearGradient
              colors={['#8B40E8', '#6000D2']}
              style={styles.signIn}>
              <Text style={[styles.textSign, {color: '#fff'}]}>ĐĂNG NHẬP</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  headerContainer: {
    flex: 2,
    marginTop: 20,
    marginHorizontal: 10,
    alignContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  logo: {
    width: 60,
    height: 60,
  },

  footer: {
    flex: 1,
    backgroundColor: '#fff',

    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#8B40E8',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
