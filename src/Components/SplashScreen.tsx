// components/LoginScreen.tsx
import React, { useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, Text, TextInput, StyleSheet, Image, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    EmergiSync: undefined;
    Ambulence: undefined;
    Hospital: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EmergiSync'>;

type LoginScreenProps = {
    navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {

    useEffect(() => {
        // Navigate to 'EmergiSync' after 2 seconds
        const timeout = setTimeout(() => {
            navigation.navigate('EmergiSync');
        }, 2000);

        // Clear the timeout on unmount to prevent memory leaks
        return () => clearTimeout(timeout);
    }, [navigation]);

    return (
        <LinearGradient colors={['#9ca997', '#9ca997', '#9ca997']} style={styles.backgroundGradient}>
            <View style={styles.container}>
                <View style={styles.section}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: 'https://i.pinimg.com/736x/ea/f6/ab/eaf6ab2d4e336550a1f67185d0db095a.jpg',
                        }}
                    />
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        marginBottom: 24,
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
    button: {
        width: 100,
        height: 50,
        // borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    tinyLogo: {
        top: -10,
        width: 300,
        height: 300,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
});

export default LoginScreen;
