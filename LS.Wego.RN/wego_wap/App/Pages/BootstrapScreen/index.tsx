import * as React from 'react';
import { AsyncStorage, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { RootAction } from '.././../Store';
// import style from './style';
const DELAY_TIME = 0;

// Style.
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bootText: {
    fontSize: 30
  }
});

// Component.
class BootstrapScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    // add delay effect
    const timer = setTimeout(() => {
      clearTimeout(timer);
      this._bootstrapAsync();
    }, DELAY_TIME);
  }

  async _bootstrapAsync() {
    const token = await AsyncStorage.getItem('token');
    const userName = await AsyncStorage.getItem('token');
    this.props.onUpdateUsername(userName);

    this.props.navigation.navigate(token ? 'App' : 'Auth');
  }

  render() {
    return (
      <View style={style.container}>
        <Text style={style.bootText}>Welcome Wego</Text>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  username: state.signIn.username
});
const mapDispatchToProps = {
  onUpdateUsername: username =>
    RootAction.signIn({
      username
    })
};
export default connect(mapStateToProps, mapDispatchToProps)(BootstrapScreen);
