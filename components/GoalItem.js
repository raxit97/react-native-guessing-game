import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

const GoalItem = ({ data, onDeleteGoal }) => {
    return (
        <TouchableHighlight underlayColor={'#ccc'} onPress={() => onDeleteGoal(data.uid)}>
            <View style={goalItemStyles.listItem}>
                <Text>{data.value}</Text>
            </View>
        </TouchableHighlight>
    );
};

const goalItemStyles = StyleSheet.create({
    listItem: {
        padding: 10,
        backgroundColor: '#ccc',
        borderColor: '#000',
        borderWidth: 1,
        marginVertical: 5
    }
})

export default GoalItem;
