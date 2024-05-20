import { useRouter, useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  Button,
  ScrollView, KeyboardAvoidingView, TouchableOpacity, Platform
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Input from './Input';





const Login = (props) => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const localSearchParams = useLocalSearchParams();

  const [toastVisible, setToastVisible] = useState(false);

  const showToast = () =>
  {
      setToastVisible(true);
  }

  useEffect(() => {
    handleLoggedin();
  });
  
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const handleLoggedin = async () => {
    try {
      let cookie = null;
      if (Platform.OS !== 'web')
      {
        cookie = await AsyncStorage.getItem('cookie');
      }
      else
      {
        cookie = getCookie('connect.sid');
      }
      if (cookie) {
        router.push('/home');
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (localSearchParams.deleted) {
      showToast();
    }
  }, [localSearchParams]);
  

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    password2: '',
  });

  const loginURL  = 'https://asitestapp.azurewebsites.net/users/login';
  const logoutURL = 'https://asitestapp.azurewebsites.net/users/logout';

  const handleSignin = async () => {
    if (validate()) 
    {
      try {
        const response = await axios.post(loginURL, {
          email: inputs.email,
          password: inputs.password
        }, {withCredentials: true});
        
        global.globalProfileIcon = response.data.profile_picture;
        if (Platform.OS !== 'web')
        {
          const setCookieHeader = response.headers['set-cookie'];
          let connectSid = null;
          
          setCookieHeader.forEach(cookie => {
            if (cookie.startsWith('connect.sid')) {
              connectSid = cookie.split(';')[0].split('=')[1];
            }});
            console.log(connectSid)
          AsyncStorage.setItem('cookie', connectSid);
        }
        alert ("Login Successful");
        //router.push('/home');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const logout = async () => {
    try {
      if (Platform.OS != 'web') 
      {
        await AsyncStorage.removeItem('cookie');
      }
      const response = await axios.post(logoutURL, {});
      alert ("Logout Successful");
    }
    catch(error) {
      console.error(error);
    }
  }

  const emailValidate = () => {
    let valid = true;
    if (!inputs.email) {
      handleError('Please enter an email', 'email');
      return false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      return false;
    }
    return true
  };

  const passwordValidate = () => {
    if (!inputs.password) {
      handleError('Please enter a password', 'password');
      return false;
    } else if (!inputs.password.match(/.{8,}/)) {
      handleError('Please enter a password with at least 8 characters.', 'password');
      return false;
    }
    return true
  }

  const validate = () => {
    if (emailValidate() && passwordValidate())
      {
        setValid(true)
        return true
      }
    else
      setValid(false)
    return false
  }

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }))
  }

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }))
  };
  
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}style={{ flex: 1 }}> 
    <ScrollView keyboardShouldPersistTaps="never">
      <View style={styles.container}>
      <Image
        style={styles.logoStyle}
        resizeMode="contain"
      />

      <View style={styles.inputContainer}>
      <Input
          onSubmitEditing={() => passwordRef.current.focus()}
          ref={emailRef}
          error={errors.email}
          placeholder=""
          label="Email"
          hint="next"
          value={inputs.email}
          onFocus={() => { handleError(null, 'email') }}
          onBlur={() => {emailValidate();}}
          onChangeText={(text) => { handleOnChange(text, 'email') }}
          blurOnSubmit={false}
          returnKeyType="next"
          keyboardType="email-address"
          />

        <Input
          ref={passwordRef}
          onSubmitEditing={() => handleSignin()}
          error={errors.password}
          placeholder=""
          label="Password"
          iconName="eye-outline"
          password
          value={inputs.password}
          onFocus={() => { handleError(null, 'password');}}
          onBlur={() => {passwordValidate()}}
          onChangeText={(text) => { handleOnChange(text, 'password') }} 
          blurOnSubmit={false}
          returnKeyType="go"
          
          />

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleSignin}
        >
          <Text style={styles.buttonTextStyle}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
      <View style={styles.line}></View>
        <Text style={styles.signupText}>OR</Text>
        <View style={styles.line}></View>
      </View>

      <View style={{paddingTop: 20,flexDirection: "row",alignItems: "center"}}>
      <Text style={{fontSize:16}}> Don't have an account? </Text> 
        <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text style={{alignSelf:"center", color: '#106256', fontWeight: 'bold'}}> Sign up </Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
          style={[styles.buttonStyle, {backgroundColor: 'red'}]}
          onPress={logout}
        >
          <Text style={styles.buttonTextStyle}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
   </KeyboardAvoidingView> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    padding: 16,
  },
  buttonStyle: {
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#106256',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoStyle: {
    width: 200,
    height: 200,
  },
  line: {
    width: "40vw",
    height: 0,
    borderColor: "#000000",
    borderWidth: 1,
    alignSelf: "center",
    margin: 5,
    paddingHorizontal: "15%"
  },
  inputContainer: {
    padding: 20,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  signupContainer: {
    padding: 20,
    flexDirection: 'column',
    width:  '100%',
  },
  signupText: {
    padding: 5,
    alignSelf: 'center',
  },
  buttonTextStyle: {
    color: 'white',
  },
});

export default Login;
