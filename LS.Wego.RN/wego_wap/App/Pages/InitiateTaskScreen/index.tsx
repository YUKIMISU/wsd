import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TaskForm from './TaskForm';
import { globalStyle } from '../../Asserts/style';

class InitiateTaskScreen extends React.PureComponent {
  render() {
    return (
      <View style={globalStyle.main}>
        <TaskForm />
      </View>
    );
  }
}

export default InitiateTaskScreen;
