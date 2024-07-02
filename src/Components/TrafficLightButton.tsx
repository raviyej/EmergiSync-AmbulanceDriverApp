import { Container } from 'postcss';
import { comma } from 'postcss/lib/list';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

interface TrafficLightButtonProps {
    onPressButton: () => void;
    onMapSimulator: () => void;
    onGreenPress: () => void;
}

const TrafficLightButton: React.FC<TrafficLightButtonProps> = ({ onPressButton, onMapSimulator }) => {
    const [redLightVisible, setRedLightVisible] = useState(true);
    const [yellowLightVisible, setYellowLightVisible] = useState(false);
    const [greenLightVisible, setGreenLightVisible] = useState(false);

    useEffect(() => {
        if (yellowLightVisible) {
            // Automatically transition to green after 2 seconds
            const timer = setTimeout(() => {
                setYellowLightVisible(false);
                setGreenLightVisible(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [yellowLightVisible]);

    const onPressRed = () => {
        setRedLightVisible(false);
        setYellowLightVisible(true); // Show yellow light when red button is pressed
        onPressButton();
    };

    const onPressGreen = () => {
        onMapSimulator();
        setRedLightVisible(false);
        setYellowLightVisible(false);
        setGreenLightVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.trafficLightFrame}>
                <TouchableOpacity onPress={onPressRed}>
                    <View style={[styles.trafficLight, { backgroundColor: redLightVisible ? 'red' : 'white' }]} />
                </TouchableOpacity>
                <View style={[styles.trafficLight, { backgroundColor: yellowLightVisible ? 'yellow' : 'white' }]} />
                <TouchableOpacity onPress={onPressGreen} disabled={!greenLightVisible}>
                    <View style={[styles.trafficLight, { backgroundColor: greenLightVisible ? 'green' : 'white' }]} />
                </TouchableOpacity>
            </View>
            <View style={styles.pole1}></View>
            <View style={styles.pole2}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    trafficLightFrame: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        right:'-15%',
        bottom:'20%',
        backgroundColor:'black'
    },
    trafficLight: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 2,
        marginHorizontal: 10,
    },
    pole1: {
        height: '400%',
        width: '5%',
        bottom: '-45%',
        right: '-103%',
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor:'black'
    },
    pole2: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30%',
        width: '25%',
        bottom: '5%',
        right: '-18%',
        borderWidth: 2,
        borderColor: 'black',
        marginBottom: 10,
        backgroundColor:'black'
    }
});

export default TrafficLightButton;
