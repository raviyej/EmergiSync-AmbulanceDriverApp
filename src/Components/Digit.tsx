import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Digit component
interface TrafficLightButtonProps {
  value: string;
}

const Digit: React.FC<TrafficLightButtonProps> = ({ value }) => {
  return (
    <View style={styles.digitContainer}>
      <Text style={styles.digitText}>{value}</Text>
    </View>
  );
};

// Signboard component
const Signboard = () => {
  const words = ['Press', ' The ', ' Red ', 'Light', 'Above']; // Array of words
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000); // Change word every second (adjust as needed)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.signboardContainer}>
      {words[currentWordIndex].split('').map((char, index) => (
        <Digit key={index} value={char} />
      ))}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  signboardContainer: {
    flexDirection: 'row',
  },
  digitContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    marginHorizontal: 5,
  },
  digitText: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Signboard;
