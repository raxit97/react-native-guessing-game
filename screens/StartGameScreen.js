import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import TitleText from "../components/common/TitleText";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import Input from '../components/common/Input';
import { Colors } from '../constants/colors';
import BodyText from "../components/common/BodyText";
import MainButton from "../components/common/MainButton";

const StartGameScreen = (props) => {

  const [enteredValue, setEnteredValue] = useState('');
  const [isInputConfirmed, setIsInputConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  let confirmedOutput;

  const numberInputHamndler = (numberInput) => {
    setEnteredValue(numberInput.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setIsInputConfirmed(false);
  };

  const confirmInputHandler = () => {
    const selectedNumber = parseInt(enteredValue);
    if (isNaN(selectedNumber) || selectedNumber <= 0 || selectedNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }
    setIsInputConfirmed(true);
    setSelectedNumber(selectedNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  if (isInputConfirmed) {
    confirmedOutput = (
      <Card style={styles.confirmationContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onClick={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start a New Game</TitleText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a Number</BodyText>
          <Input blurOnSubmit autoCapitalize='none' keyboardType='number-pad'
            maxLength={2} style={styles.input} onChangeText={numberInputHamndler}
            value={enteredValue} />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Reset" onPress={resetInputHandler} color={Colors.secondary} />
            </View>
            <View style={styles.button}>
              <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  input: {
    width: 35,
    textAlign: 'center'
  },
  confirmationContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
});

export default StartGameScreen;
