import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Modal,
  PermissionsAndroid,
  Linking,
  TouchableOpacity,
  ImageBackground,
  TextInput, // Import TextInput
  ScrollView // Import ScrollView
} from 'react-native';
import Signboard from './Digit';
import TrafficLightButton from './TrafficLightButton';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import axios from 'axios'; // Import Axios

interface NextScreenProps {
  navigation: any; // or use appropriate type for navigation prop
}

// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const App: React.FC<NextScreenProps> = ({ navigation }) => {
  // state to hold location
  const [location, setLocation] = useState<GeoPosition | null>(null);
  const [auth, setAuth] = useState<string>("");
  const [showLists, setShowLists] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showCard, setShowCard] = useState(false);
  const [cardData, setCardData] = useState<{ latitude: string; longitude: string }>({ latitude: '', longitude: '' }); // State to hold card data
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedField, setSelectedField] = useState('Field 1');


  useEffect(() => {
    axios.post('http://192.168.20.194:8000/driver/login', {
      username: "Nandakishor",
      password: "nani@123"
    })
      .then(function (response: { data: any }) {
        console.log(response.data.Token)
        setAuth(response.data.Token);
        console.log(auth);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (auth !== "") {
      getLocation();
    }
  }, [auth]);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const selectField = (field: string) => {
    setSelectedOption(field);
    setShowCard(true);
    setShowDropdown(false); // Hide the dropdown after selecting a field
  };

  const getLocation = () => {
    console.log("Auth", auth);
    let url = "ws://192.168.20.194:8000/ws/driver/" + auth;
    console.log(url);

    const websocket = new WebSocket(url);

    websocket.onmessage = (event: MessageEvent) => {
      console.log(`Received: ${event.data}`);
    };

    websocket.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
    };
    
    

    websocket.onopen = () => {
      console.log('WebSocket connection opened:');
      requestLocationPermission().then(res => {
        console.log('res is:', res);
        if (res) {
          Geolocation.getCurrentPosition(
            position => {
              setLocation(position);

              // WebSocket data transmission
              websocket.send(JSON.stringify(
                {
                  "Username": "Ravitej",
                  "Ambulanceid": "AMBU009",
                  "Latitude": position.coords.latitude,
                  "Longitude": position.coords.longitude,
                  "status": "Online",
                  "Emergency": 1,
                  "hospital": "Chandranna Hospitals"
                }
              ));

              // You can keep this console.log for debugging
              console.log('WebSocket data sent:', {
                "Latitude": position.coords.latitude,
                "Longitude": position.coords.longitude
              });
            },
            error => {
              console.log(error.code, error.message);
              setLocation(null);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        }
      }).catch(error => {
        console.error('Error requesting location permission:', error);
      });
    };

    websocket.onclose = () => {
      console.log('WebSocket connection closed.');
    };
  };

  const navigateToNextScreen = () => {
    if (cardData.latitude && cardData.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${cardData.latitude},${cardData.longitude}`;
      Linking.openURL(url);
    }
  };
  
  const onMapSimulator = () => {
    // Navigate to the new page here
    navigation.navigate('Arrow'); // Change 'NewPage' to the name of your new page in the navigation stack
  };

  // Function to Send Location to WhatsApp
  const sendLocation = () => {
    setShowCard(true);
    if (location) {
      const latitude = location.coords.latitude.toString();
      const longitude = location.coords.longitude.toString();
      setCardData({ latitude, longitude });
    }
  };

  // Function to handle green button press
  const onGreenButtonPress = () => {
    setShowCard(true);
    if (location) {
      const latitude = location.coords.latitude.toString();
      const longitude = location.coords.longitude.toString();
      setCardData({ latitude, longitude });
    }
  };

  return (
    <ImageBackground source={{ uri: 'https://i.pinimg.com/originals/70/3d/0e/703d0e1df3233d89ad764fba6beb7d1e.gif' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TrafficLightButton onPressButton={getLocation} onMapSimulator={sendLocation} onGreenPress={onGreenButtonPress} />
        <Text style={styles.text}>Welcome $username!</Text>
        <Text style={styles.text}>Latitude: {location ? location.coords.latitude : null}</Text>
        <Text style={styles.text}>Longitude: {location ? location.coords.longitude : null}</Text>
        {showCard && (
          <View style={styles.dropdownContainer}>
            <TouchableOpacity onPress={toggleDropdown}>
              <Text>{selectedField}</Text>
            </TouchableOpacity>
            <Modal
              animationType="fade"
              transparent={true}
              visible={showDropdown}
              onRequestClose={() => setShowDropdown(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                  <TouchableOpacity onPress={() => selectField('Hospital 1')}>
                    <Text style={styles.dropdownItem}>Hospital 1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => selectField('Hospital 2')}>
                    <Text style={styles.dropdownItem}>Hospital 2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => selectField('hospital 3')}>
                    <Text style={styles.dropdownItem}>Hospital 3</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

        )}
        <Signboard />
      </View>
      {showCard && (
        <View style={styles.cardContainer}>
          <Text>Selected Option: {selectedOption}</Text>
          <TouchableOpacity onPress={navigateToNextScreen}>
            <Text>Navigate</Text>
          </TouchableOpacity>
        </View>
      )}
      <View>
        <Button title="Navigate to New Page" onPress={onMapSimulator} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'blue'
  },
  cardContainer: {
    backgroundColor: 'black',
    bottom:'20%',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    backgroundColor: '#9ca997'
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'black'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    color: 'black'
  },
  dropdownItem: {
    paddingVertical: 10,
    color: 'black'
  },
});

export default App;
