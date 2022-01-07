import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

const App = () => {

  const [courseGoals, setCourseGoals] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);

  const addGoalHandler = (enteredGoal) => {
    setCourseGoals((prevState) => [
      ...prevState,
      { uid: idCounter, value: enteredGoal }
    ]);
    setIdCounter(prevState => prevState + 1);
    setShowAddGoalModal(false);
  };

  const deleteGoalHandler = (goalUID) => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.uid !== goalUID);
    });
  };

  return (
    <View style={styles.screen}>
      <Button title='Add New Goal' onPress={() => setShowAddGoalModal(true)}></Button>
      <GoalInput setShowAddGoalModal={setShowAddGoalModal} showModal={showAddGoalModal} onAddGoal={addGoalHandler} />
      <FlatList
        keyExtractor={(item) => item.uid}
        data={courseGoals}
        renderItem={itemData => <GoalItem onDeleteGoal={deleteGoalHandler} data={itemData.item} />}
      />
    </View>
  );
};

export default App;

// Flexbox tutorial
// export default function App() {
//   return (
//     <View style={{ padding: 50, flexDirection: 'row', width: '100%', height: 300, justifyContent: 'space-around',  alignItems: 'stretch' }}>
//       <View style={{
//         backgroundColor: 'red',
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//       }}>
//         <Text>1</Text>
//       </View>
//       <View style={{
//         backgroundColor: 'blue',
//         flex: 2,
//         justifyContent: 'center',
//         alignItems: 'center'
//       }}>
//         <Text>2</Text>
//       </View>
//       <View style={{
//         backgroundColor: 'green',
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//       }}>
//         <Text>3</Text>
//       </View>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  screen: {
    paddingTop: 50,
    paddingHorizontal: 20
  },
  listItems: {
    maxHeight: 300
  }
});
