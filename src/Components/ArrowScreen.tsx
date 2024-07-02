import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [username, setUsername] = useState('');
  const [ambulanceid, setAmbulanceid] = useState('');
  const [hospital, setHospital] = useState('Sparsh');

  const hospitals = ['Sparsh', 'Shushrusha'];
  const websocket = new WebSocket("ws://192.168.242.194:8000/ws/directiondata");

  websocket.onopen = function () {
    console.log("WebSocket connection established.");
  };

  websocket.onmessage = function (e) {
    console.log(e.data);
  };

  const pickup = () => {
    websocket.send(JSON.stringify({
      "Type": "pickup",
      "Username": username,
      "Ambulanceid": ambulanceid,
      "Hospital": hospital,
      'Lattitude': 13.1356034,
      'Longitude': 77.6165593
    }));
  };

  const direction = (direction: string, hospitalName: string) => {
    if (direction === "forward") {
      websocket.send(JSON.stringify({
        "Type": "Boolean",
        "Username": username,
        "Hospital": hospitalName,
        "value": true
      }));
    } else if (direction === "backward") {
      websocket.send(JSON.stringify({
        "Type": "Boolean",
        "Username": username,
        "Hospital": hospitalName,
        "value": false
      }));
    }
  };

  const locateHospital = (hospitalName: string) => {
    // Implement the logic to locate the hospital
    console.log(`Locating ${hospitalName} hospital...`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.hospitalContainer}>
        {hospitals.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.hospitalButton, hospital === item && styles.selectedHospital]}
            onPress={() => {
              setHospital(item);
              locateHospital(item);
            }}
          >
            <Text style={styles.hospitalButtonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={pickup}>
        <Text style={styles.buttonText}>Patient Picked up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => direction('forward', hospital)}>
        <Text style={styles.buttonText}>Front</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => direction('backward', hospital)}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hospitalContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  hospitalButton: {
    backgroundColor: 'blue',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginRight: 10,
  },
  selectedHospital: {
    backgroundColor: 'blue',
  },
  hospitalButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
