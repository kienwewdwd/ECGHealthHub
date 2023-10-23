import {
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../../../FirebaseConfig';
import { ActivityIndicator } from 'react-native';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { TabRouter, useNavigation } from '@react-navigation/native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import {
  IMG_ButtonLogin,
  IMG_Login,
  IMG_SignUp,
  IMG_SignUptext,
  IMG_donthave,
  IMG_google,
  IMG_logo,
  IMG_orloginwith
} from 'assets';
import { SCREEN_NAME } from '../../../constants';


const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();
  const isValidEmail = (email: any) => {
    // Regular expression for basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signIn = async () => {
    if (!email || !password) {
      Alert.alert('Please enter both email and password.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigation.navigate('TabRouter', { email: 'email' });
    } catch (error: any) {
      console.log(error);
      Alert.alert('Check your email: ' + error.message);
    } finally {
      setLoading(false);
      
    }
  };
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken, user } = userInfo;

      // Use idToken and user to sign in or register the user with Firebase Authentication
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled Google sign-in
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Another sign-in process is already in progress
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Google Play Services are not available
      } else {
      }
    }
  };


  return (
    <View>
      <View style={styles.logo}>
        <Image source={IMG_Login} />
      </View>
      <View style={{ marginBottom: 30, marginTop: 10,  justifyContent: 'center',alignItems: 'center'}}>
            <Image source={IMG_logo} />
          </View>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            value={email}
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            secureTextEntry={true}
            value={password}
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={text => setPassword(text)}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff"  />
          ) : (
            <>
              <View style = {{marginVertical: 20}}>
                <TouchableOpacity onPress={signIn}>
                  <Image source={IMG_ButtonLogin} />
                </TouchableOpacity>
              </View>

              <View style = {{alignItems: 'center'}}>
                <Image source={IMG_orloginwith} />
              </View>
              <View style = {{marginVertical: 20}}>
              <TouchableOpacity onPress={handleGoogleLogin}>
                <Image source={IMG_google} />
              </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={IMG_donthave} style={{ marginRight: 5 }} />
                <TouchableOpacity onPress={() => navigation.navigate(SCREEN_NAME.SIGNUP_SCREEN)}>
                  <Image source={IMG_SignUptext} />
                </TouchableOpacity>
              </View>
              {/* <Button title="Google" onPress={handleGoogleLogin} /> */}
            </>
          )}
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    marginHorizontal: 38,

    justifyContent: 'center',
    // alignItems: 'center'
  },
  input: {
    marginVertical: 10,
    height: 60,
    width: 340,
    // borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#D9D9D9'
  },
  logo: {
    marginHorizontal: 30,
    marginVertical: 30
  }
});
