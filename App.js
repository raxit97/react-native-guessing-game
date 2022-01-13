import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [isAppReady, setIsAppReady] = useState(false);
  let screen;

  if (!isAppReady) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={(error) => console.log(error)}
        onFinish={() => setIsAppReady(true)} />
    );
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGuessRounds(numberOfRounds);
  };

  const newGameHandler = () => {
    setUserNumber();
    setGuessRounds(0);
  };

  if (userNumber && guessRounds <= 0) {
    screen = <GameScreen userSelectedNumber={userNumber} onGameOver={gameOverHandler} />;
  } else if (guessRounds > 0) {
    screen = <GameOverScreen userNumber={userNumber} guessRounds={guessRounds} onNewGame={newGameHandler} />;
  } else {
    screen = <StartGameScreen onStartGame={startGameHandler} />;
  }

  return (
    <View style={styles.screen}>
      <Header title='Guess a Number' />
      {screen}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
