import { StyleSheet,TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  IMG_WC1_img,
  IMG_WC1_text,
  IMG_WC1_title,
  IMG_WC2_img,
  IMG_WC2_text,
  IMG_WC2_title,
  IMG_WC3_img,
  IMG_WC3_text,
  IMG_WC3_title,
  IMG_back,
  IMG_next,
  IMG_skip
} from 'assets';
import { Image } from 'react-native';
import { COLORS } from '../../assets/color';
import { TabRouter, useNavigation } from '@react-navigation/native';
import LoginRouter from '../../router/loginRouter';

const WelcomeScreen = () => {
  const navigator = useNavigation();

  const navigatorMoveToTabbar = () => {
    navigator.navigate(LoginRouter);
  }
  const [currentStep, setCurruntStep] = useState(0);
  const [steps, setSteps] = useState([
    {
      img: IMG_WC1_img,
      title: IMG_WC1_title,
      content: IMG_WC1_text
    },
    {
      img: IMG_WC2_img,
      title: IMG_WC2_title,
      content: IMG_WC2_text
    },
    {
      img: IMG_WC3_img,
      title: IMG_WC3_title,
      content: IMG_WC3_text
    }
  ]);
  const nextStep = () => {
    setCurruntStep(currentStep >= 2 ? 2 : currentStep + 1);
  };
  const prevStep = () => {
    setCurruntStep(currentStep <= 0 ? 0 : currentStep - 1);
  };
  const autoNextStep = () => {
    nextStep();
  };


  useEffect (() => {
    const timer = setTimeout(autoNextStep, 5000);
    return () => {
      clearTimeout(timer);
    };

  }, [currentStep]
  );
  return (
    <View style = {styles.container1}>
      <TouchableOpacity onPress={navigatorMoveToTabbar}>
      <Image source={IMG_skip} style={styles.stepImage3}/>
      </TouchableOpacity>
    <View style={styles.container}>
      <Image source={steps[currentStep].img} style={styles.stepImage} resizeMode="cover"/>
      <View style={styles.stepIndicatorView}>
        {steps.map((step, index) => {
          return (
            <View
              style={{
                ...styles.stepIndicator,
                width: currentStep === index ? 40 : 30,
                backgroundColor: currentStep === index ? COLORS.DarkBlue : 'gray'
              }}></View>
          );
        })}
      </View>
      <Image source={steps[currentStep].title} style={styles.stepImage1} />
      <Image source={steps[currentStep].content} style={styles.stepImage2}/>
      <View style={styles.navigationView}>
      {
          currentStep > 0 ? 
            <TouchableOpacity 
              onPress={() => prevStep()}>
              <Image source={IMG_back} style={styles.stepImage1}/>
            </TouchableOpacity>
            :
            <View></View>
        }
           <TouchableOpacity
              onPress={() => {
                currentStep === 2 ? navigatorMoveToTabbar() : nextStep()
              }
              }>
              <Image source={IMG_next} style={styles.stepImage1}/>
            </TouchableOpacity>
      </View>
    </View>

    </View>
   
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({

  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  container1: {
    flex: 1,
    backgroundColor: '#fff',
  },
  stepIndicatorView: {
    flexDirection: 'row'
  },
  stepIndicator: {
    height: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    // marginTop: 15
  },
  navigationView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  stepImage: {
    width: "99%",
    // height: "50%",
    marginVertical: 30,
    marginTop: -50
  },
  stepImage1: {

    // height: "50%",
    marginTop: 20,
    marginBottom: 20
  },
  stepImage2: {

    // height: "50%",
    marginVertical: 5,
 
  },
  stepImage3: {

    // height: "50%",
    marginBottom: 50,
    marginLeft: 320,
    marginTop: 10
 
  },
});
