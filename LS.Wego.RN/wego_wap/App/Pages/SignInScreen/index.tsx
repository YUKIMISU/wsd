import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import SignUpForm from './SignUpForm';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

class SignInScreen extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={style.container}>
        <SignUpForm />
      </View>
    );
  }
}

export default SignInScreen;
