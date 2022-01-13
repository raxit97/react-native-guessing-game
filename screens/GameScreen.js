import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Alert, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import MainButton from '../components/common/MainButton';
import NumberContainer from '../components/NumberContainer';
import { GlobalStyles } from '../constants/default-styles';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    if (randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randomNumber;
    }
};

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem} key={itemData.item}>
        <Text style={{ ...GlobalStyles.bodyText }}>#{listLength - itemData.index}</Text>
        <Text style={{ ...GlobalStyles.bodyText }}>{itemData.item}</Text>
    </View>
);

const GameScreen = (props) => {

    const { userSelectedNumber, onGameOver } = props;
    let initialGuess = generateRandomBetween(1, 100, userSelectedNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1), currentHigh = useRef(99);

    useEffect(() => {
        if (currentGuess === userSelectedNumber) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, onGameOver, userSelectedNumber, pastGuesses]);

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < userSelectedNumber) || (direction === 'greater' && currentGuess > userSelectedNumber)) {
            Alert.alert(
                'Don\'t lie!!',
                'You know that this is wrong...',
                [{ text: 'Sorry', style: 'cancel' }]
            );
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else if (direction === 'greater') {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(previousGuesses => [nextNumber.toString(), ...previousGuesses]);
    };

    return (
        <View style={styles.screen}>
            <Text style={GlobalStyles.titleText}>Computer's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onClick={() => nextGuessHandler('lower')}>
                    <Ionicons name='md-remove' size={24} color='white' />
                </MainButton>
                <MainButton onClick={() => nextGuessHandler('greater')}>
                    <Ionicons name='md-add' size={24} color='white' />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    keyExtractor={(item) => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((pastGuess, index) => renderListItem(pastGuess, pastGuesses.length - index))}
                </ScrollView> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        width: '60%',
        marginTop: 5,
        flex: 1
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default GameScreen;
