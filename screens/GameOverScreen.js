import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { GlobalStyles } from '../constants/default-styles';
import { Colors } from '../constants/colors';
import MainButton from '../components/common/MainButton';

const GameOverScreen = (props) => {

    const { guessRounds, userNumber, onNewGame } = props;

    return (
        <View style={styles.screen}>
            <Text style={{ ...GlobalStyles.titleText, ...styles.title }}>The Game is Over!</Text>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/success.png')}
                // source={{ uri: 'https://www.macmillandictionary.com/external/slideshow/full/142242_full.jpg' }}
                />
            </View>
            <View style={styles.resultContainer}>
                <Text style={{ ...GlobalStyles.bodyText, ...styles.resultText }}>
                    Your phone needed <Text style={styles.highlight}>{guessRounds}</Text> rounds to guess the
                    number <Text style={styles.highlight}>{userNumber}</Text>
                </Text>
            </View>
            <MainButton onClick={onNewGame}>New Game</MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 25
    },
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        width: 300,
        height: 300,
        overflow: 'hidden',
        marginVertical: 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 30
    },
    resultText: {
        textAlign: 'center',
        fontSize: 18
    }
});

export default GameOverScreen;
