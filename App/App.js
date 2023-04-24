import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Switch } from 'react-native-gesture-handler';
// const WebSocket = require('ws')

const socket = new WebSocket('ws://localhost:3000/ws');


// START SCREEN
const Start = props => {
  const change = () => {
    props.navigation.navigate('Login');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image source={require('./assets/logo.png')} style = {{width: 250,height: 250}}/>
      <Text style = {styles.title}>LET MAKE YOUR HOME !</Text>
      <TouchableOpacity onPress={change}>
        <Text style = {styles.start_btn}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
};

// LOGIN SCREEN
const Login = props => {
  const login = () => {
  props.navigation.navigate('HomeScreen');
  };

  return (
    <KeyboardAvoidingView behavior = {Platform.OS === "ios" ? "padding" : "height"} style = {{flex: 1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style = {{fontSize: 24, fontWeight: 'bold', marginTop: -100}}>
        Welcome back !
      </Text>
      <Image 
        source={require('./assets/loginscreen.png')} 
        style = {{width: 400, height: 200, marginBottom: 50, marginTop: 100}}
      />
      {/* PHONE */}
      <TextInput style={styles.input} placeholder="Phone number"/>

      {/* PASSWORD */}
      <TextInput style={styles.input} placeholder="Password" secureTextEntry = {true}/>

      {/* LOGIN BUTTON */}
      <TouchableOpacity onPress={login}>
        <Text style = {styles.login_btn}>LOG IN</Text>
      </TouchableOpacity>
    </View>

    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// HOME SCREEN
const HomeScreen = props => {
  // GO TO CONTROL SCREEN
  const control = () => {
    props.navigation.navigate('Control');
  };
  // GO TO DATA SCREEN
  const data = () => {
    props.navigation.navigate('Data');
  };
  // GO TO FACE ID
  const faceID = () => {
    props.navigation.navigate('Face ID');
  };

  return (
    <View> 
      {/* HEADER */}
      <View style={styles.header}>
        <Text style = {{fontSize: 24,color: 'white',fontWeight:'bold'}}>
          Hello , USER 
        </Text>
      </View>
      
      <View>
      {/* CONTROL */}
      <TouchableOpacity style ={styles.button} onPress={control}>
        <Text style = {styles.button1}>
          <Icon name='adjust' size={15}/>
          {"   "}CONTROL
        </Text>
      </TouchableOpacity>
      {/* DATA */}
      <TouchableOpacity style ={styles.button} onPress={data}>
        <Text style={styles.button1}>
          <Icon name='database' size={15}/>
          {"   "}DATA
        </Text>
      </TouchableOpacity>
      {/* FACE ID */}
      <TouchableOpacity style ={styles.button} onPress={faceID}>
        <Text style = {styles.button1}>
          <Icon name='camera' size={15}/>
          {"   "}FACE ID
        </Text>
      </TouchableOpacity>

      </View>
    </View>
  );
};

// CONTROL SCREEN
const Control = props => {
  const [light1, setLight1] = useState(false)
  const toggleLIGHT1 = (value) => {
    setLight1(value)
  }
  const [light2, setLight2] = useState(false)
  const toggleLIGHT2 = (value) => {
    setLight2(value)
  }
  const sendSignalLight1 = async (light1) => {
    try {
      let lightsignal = 0;
      if (light1 === true) {
        lightsignal = 1
      }
      else lightsignal = 0
      const response = await fetch('https://io.adafruit.com/api/v2/huyn02/feeds/button1/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-AIO-Key': 'aio_ZNJW41JwYsQB9DtbW52cty5gFZPK'
        },
        body: JSON.stringify({ value: lightsignal  })
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  const sendSignalLight2 = async (light2) => {
    try {
      let light2signal = 0;
      if (light2 === true) {
        light2signal = 1
      }
      else light2signal = 0
      const response = await fetch('https://io.adafruit.com/api/v2/huyn02/feeds/button2/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-AIO-Key': 'aio_ZNJW41JwYsQB9DtbW52cty5gFZPK'
        },
        body: JSON.stringify({ value: light2signal  })
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View>
      <View style={styles.header}>
        <Text style = {{fontSize: 24,color: 'white',fontWeight:'bold'}}>
          Control
        </Text>
      </View>
      <View>
        {/* <View style ={styles.control}>
          <View style ={styles.button}>
            <Text style = {{fontSize: 20}}>
              <Icon name='fan' size={20}/>{"   "}SMART FAN
            </Text>
          <Text style={styles.on_off}>{fan ? 'ON':'OFF'}</Text>
          
          <Switch 
            style={{ marginTop: 50, marginLeft: 100}}
            onValueChange={toggleFAN}
            value={fan}/>
        </View>
      </View> */}

      <View style ={styles.control}>
        <View style ={styles.button}>
          <Text style = {{fontSize: 20}}>
            <Icon name='lightbulb' size={20}/>{"   "}SMART LIGHT 1
          </Text>
          <Text style={styles.on_off}>{light1 ? 'ON':'OFF'}</Text>
          {/*BUTTON TO TURN ON/OFF LIGHT */}
          <Switch
            style={{marginTop: 50, marginLeft: 100}}
            onValueChange={toggleLIGHT1}
            value={light1}
            onGestureEvent={sendSignalLight1(light1)}
            />
        </View>
      </View>

      <View style ={styles.control}>
        <View style ={styles.button}>
          <Text style = {{fontSize: 20}}>
            <Icon name='lightbulb' size={20}/>{"   "}SMART LIGHT 2
          </Text>
          <Text style={styles.on_off}>{light2 ? 'ON':'OFF'}</Text>
          {/*BUTTON TO TURN ON/OFF LIGHT */}
          <Switch
            style={{marginTop: 50, marginLeft: 100}}
            onValueChange={toggleLIGHT2}
            value={light2}
            onGestureEvent={sendSignalLight2(light2)}
            />
        </View>
      </View>

      </View>
    </View>
  );
};

// DATA SCREEN
const Data = props => {
  let TEMPERATURE = 32;
  let HUMIDITY = 80;
  const [temp, setTemp] = useState(0)
  const [light, setLight] = useState(0)
  const [humid, setHumid] = useState(0)
  const [ai, setAi] = useState("")
  useEffect(() => {
    socket.onmessage = (message) => {
      const data = JSON.parse(message.data)
      setTemp(data.temp)
      setHumid(data.humid)
      setLight(data.light)
      setAi(data.ai)  
    }
    // return () => intervalId; //This is important???
  }, [])
  return (
    <View>
      <View style={styles.header}>
        <Text style = {{fontSize: 24,color: 'white',fontWeight:'bold'}}>
          DATA
        </Text>
      </View>
      <View>
      <View style ={styles.button}>
        <Text style = {styles.button1}>
          <Icon name='temperature-high'size={15}/>
          {"   "}TEMPERATURE{"\n\n"}
          <Text style={{fontWeight: 'bold'}}>
             { temp }°C
          </Text>
        </Text>
      </View>
      <View style ={styles.button}>
        <Text style={styles.button1}>
          <Icon name='lightbulb' size={15}/>
          {"   "}LIGHT{"\n\n"}
          <Text style={{fontWeight: 'bold'}}>
             { light }%
          </Text>
        </Text>
      </View>
      <View style ={styles.button}>
        <Text style={styles.button1}>
          <Icon name='water' size={15}/>
          {"   "}HUMIDITY{"\n\n"}
          <Text style={{fontWeight: 'bold'}}>
             { humid }%
          </Text>
        </Text>
      </View>
      </View>
    </View>
  );
};

//FACE ID SCREEN
const FACEID = props => {
  const [temp, setTemp] = useState(0)
  const [light, setLight] = useState(0)
  const [humid, setHumid] = useState(0)
  const [ai, setAi] = useState("")
  useEffect(() => {
    socket.onmessage = (message) => {
      const data = JSON.parse(message.data)
      setTemp(data.temp)
      setHumid(data.humid)
      setLight(data.light)
      setAi(data.ai)  
    }
    // return () => intervalId; //This is important???
  }, [])
  return (
    <View>
      <View style={styles.header}>
        <Text style = {{fontSize: 24,color: 'white',fontWeight:'bold'}}>
          FACE ID
        </Text>
      </View>
      <View>
      <View style ={styles.button}>
        <Text style = {styles.button1}>
          <Icon name='head-side-mask'size={15}/>
          {"   "}CAMERA AI{"\n\n"}
          <Text style={{fontWeight: 'bold'}}>
             {/* { ai } */}
             {ai}
          </Text>
        </Text>
      </View>
      <View style ={styles.camera}>
        <Text style={styles.ai}>
        <Icon name='expand'size={15}/>
        {"    "}PICTURE
        </Text>
        <Image
          style = {styles.img}
          //source = {{uri: ''}} 
        />
      </View>
      </View>
    </View>
  );
};

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Control" component={Control} />
        <Stack.Screen name="Data" component={Data} />
        <Stack.Screen name="Face ID" component={FACEID} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// CSS
const styles = StyleSheet.create({
  input: {
    margin: 10,
    height: 50,
    width: 220,
    borderColor: '#bcbcbc',
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
  },
  header: {
    width : 1000,
    height: 100,
    backgroundColor: '#3f6ff0',
    justifyContent: 'center',
    paddingLeft: 50,
    marginBottom: 80
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25
  },
  button1: {
    paddingVertical: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#eae2e2',
    borderRadius: 15,
    fontSize: 20,
    backgroundColor: '#eae2e2',
    overflow: 'hidden',
    width: 250,
    textAlign: "center",
  },
  control:{
    backgroundColor: '#eae2e2',
    marginBottom: 50,
    width: 250,
    left: 90,
    borderColor: '#eae2e2',
    borderWidth: 1,
    borderRadius: 15
  },
  on_off:{
    top: 80,
    left: 25,
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold'
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 100,
    marginTop: 150
  },
  start_btn:{
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: '#3f6ff0',
    borderRadius: 15,
    color: 'white',
    fontSize: 20,
    backgroundColor: '#3f6ff0',
    overflow: 'hidden'
  },
  login_btn:{
    marginBottom: -50,
    marginTop: 80,
    padding: 10,
    borderWidth: 1,
    borderColor: '#3f6ff0',
    borderRadius: 15,
    color: 'white',
    fontSize: 20,
    backgroundColor: '#3f6ff0',
    overflow: 'hidden',
    width: 150,
    textAlign: "center"
  },
  img:{
    width: 250,
    height: 200,
    borderWidth: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: '#eae2e2',
  },
  camera:{
    borderWidth: 1,
    borderColor: '#eae2e2',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: '#eae2e2'
  },
  ai:{
    textAlign: 'center',
    fontSize: 20,
    padding: 15
  }
});

export default App;