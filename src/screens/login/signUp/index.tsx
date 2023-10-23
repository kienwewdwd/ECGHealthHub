import { Alert, Button, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../../../FirebaseConfig';
import { ActivityIndicator } from 'react-native';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { TabRouter, useNavigation } from '@react-navigation/native';
import { IMG_Login, IMG_logo,IMG_SignUp, IMG_ButtonSignUp, IMG_Returnto, IMG_loginText } from 'assets';
import { SCREEN_NAME } from '../../../constants';
const SignUpScreen = () => {
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
      const signUp = async () => {
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
          const response = await createUserWithEmailAndPassword(auth, email, password);
          console.log(response);
          navigation.navigate(SCREEN_NAME.SIGNIN_SCREEEN)
        } catch (error: any) {
          console.log(error);
          Alert.alert('Check your email: ' + error.message);
        } finally {
          setLoading(false);
        }
      };
    
      return (
        <View>
          <View style={styles.logo}>
            <Image source={IMG_SignUp} />
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
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <>
                  <View style = {{marginVertical: 20}}>
                    <TouchableOpacity onPress={signUp}>
                      <Image source={IMG_ButtonSignUp} />
                    </TouchableOpacity>
                  </View>
    
                  <View style = {{alignItems: 'center'}}>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={IMG_Returnto} style={{ marginRight: 7 }} />
                    <TouchableOpacity onPress={() => navigation.navigate(SCREEN_NAME.SIGNIN_SCREEEN)}>
                      <Image source={IMG_loginText} />
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
    
    export default SignUpScreen;
    
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
    