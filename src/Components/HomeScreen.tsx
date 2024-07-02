import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text, TextInput, StyleSheet, Image, ImageBackground, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios'; // Import Axios for HTTP requests
import RaisedButton from './RaisedButton';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Ambulance: undefined; 
  Hospital: undefined;
  arrow:undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
  
    axios.post('http://192.168.20.194:8000/driver/login', {
      username: username,
      password: password
    })
    .then(function (response) { 
      console.log(response.data);
      const allow = response.data.Allow; // Assuming token is in response.data.token
      if (allow==true) {
        // Navigate to another page upon successful login
        navigation.navigate('Ambulance'); // Use the passed navigation prop
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <ImageBackground source={{ uri: 'https://i.pinimg.com/474x/d9/57/10/d957104a1472ed8778eca6ce8225890f.jpg' }} style={styles.backgroundImage}>
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={password} onChangeText={setPassword} />
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.button}>
            <RaisedButton onPress={handleLogin} title="Login" />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
    alignItems: 'center',
  },
  input: {
    top: '50%',
    left: '10%',
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 16,
    color: 'black'
  },
  button: {
    top: '180%',
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  tinyLogo: {
    top: -100,
    width: 100,
    height: 100,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default LoginScreen;
