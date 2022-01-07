import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Modal } from 'react-native';

const GoalInput = ({ onAddGoal, showModal, setShowAddGoalModal }) => {

    const [enteredGoal, setEnteredGoal] = useState('');
    const addGoal = () => {
        onAddGoal(enteredGoal);
        setEnteredGoal('');
    };

    return (
        <Modal visible={showModal} animationType='slide'>
            <View style={goalInputStyles.inputContainer}>
                <TextInput
                    placeholder="Course Goal"
                    style={goalInputStyles.textInput}
                    value={enteredGoal}
                    onChangeText={setEnteredGoal}
                />
                <View style={goalInputStyles.buttonContainer}>
                    <View style={goalInputStyles.button}>
                        <Button title="CANCEL" color="red" onPress={() => setShowAddGoalModal(false)} />
                    </View>
                    <View style={goalInputStyles.button}>
                        <Button title="ADD" onPress={addGoal} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const goalInputStyles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '60%'
    },
    button: {
        width: '40%'
    }
})

export default GoalInput;
