import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground ,Alert, TouchableOpacity} from 'react-native';
// import Logo from '../../../src/assets/images/logo.png'
import LinearGradient from 'react-native-linear-gradient';

const HospitalDetailsPage = () => {
  // Dummy data for patients
  const [patients, setPatients] = useState([
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Alice Johnson' },
    // Add more patients as needed
  ]);

  return (
    <ImageBackground source={{ uri: 'https://i.pinimg.com/564x/29/42/b5/2942b50e24d558573f7a72944322a138.jpg' }} style={styles.backgroundImage}>
      <View style={styles.container}>

        {/* <Image source={Logo}/> */}
        <Text style={styles.heading}>Hospital Details</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Hospital Name:</Text>
          <Text style={styles.value}>Your Hospital Name</Text>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>Hospital Address, City</Text>
          {/* Add more details as needed */}
        </View>
        <Text style={styles.subHeading}>Patients On the Way</Text>
        <FlatList
        data={patients}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{Alert.alert('Pressed')}} >
            <View style={styles.patientItem}>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'black'
  },
  detailsContainer: {
    marginBottom: 20,
    color: 'black'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black'
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black'
  },
  patientItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    color: 'black'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default HospitalDetailsPage;
