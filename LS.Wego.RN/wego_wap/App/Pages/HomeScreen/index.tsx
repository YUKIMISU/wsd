import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

// import RN_BAIDU effect
import Bmap from './b';
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this._onNavigate = this._onNavigate.bind(this);
  }
  _onNavigate(index) {
    let navigateScreen;
    switch (index) {
      case 0:
        navigateScreen = 'InitiateTask';
        break;
      case 1:
        navigateScreen = 'MyTask';
        break;
      case 2:
        navigateScreen = 'Repair';
        break;
      default:
        navigateScreen = 'CarControl';
        break;
    }
    this.props.navigation.navigate(navigateScreen);
  }
  render() {
    const buttons = ['发起', '任务', '报修', '控制'];
    return (
      <View style={style.container}>
        <View style={style.topIndex}>
          <ButtonGroup
            onPress={this._onNavigate}
            buttons={buttons}
            containerStyle={{ height: 100 }}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  topIndex: {
    flex: 1,
    justifyContent: 'space-between'
  },
  box: {},
  item: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 10,
    borderColor: 'red',
    borderWidth: 2
  }
});

export default HomeScreen;
