import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { View, Text, StyleSheet } from 'react-native';
import { Header as RneHeader } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
// import style from './style';

const style = StyleSheet.create({
  icon: {
    marginLeft: 10,
    color: '#000',
    backgroundColor: 'transparent'
  }
});

// Custom Components
const BACKGROUND_COLOR = 'transparent';
const COLOR = '#000';
class DefaultLeftComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Icon.Button
        name="chevron-small-left"
        backgroundColor={BACKGROUND_COLOR}
        size={30}
        color={COLOR}
        onPress={() => {
          this.props.onGoBack();
        }}
      />
    );
  }
}
const mapStatToProps = state => ({});
const mapDispatchToProps = {
  onGoBack: () => NavigationActions.back()
};
export default connect(mapStatToProps, mapDispatchToProps)(
  DefaultLeftComponent
);
