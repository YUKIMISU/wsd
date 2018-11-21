import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput } from 'react-native';
import { WHITE_COLOR, GRAY_COLOR, GREEN_COLOR } from '../../Asserts/style';
import { Button } from 'react-native-elements';

const style = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    marginBottom: 10
  },
  textInput: {
    marginTop: 16,
    paddingLeft: 10,
    paddingBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: GRAY_COLOR
  },
  inputButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 0,
    marginRight: 0
  },
  inputButton: {
    paddingVertical: 7,
    paddingHorizontal: 19,
    backgroundColor: GREEN_COLOR,
    borderRadius: 6
  }
});

/**
 * Search.
 * Proptypes:
 * - buttonName - Used as search button's name.
 * - onSearch - Used to call Parent Component Method.
 */
export default class Search extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    inputText: ''
  };

  INPUT_BUTTON_COLOR = WHITE_COLOR;

  static propTypes = {
    buttonName: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired
  };

  render() {
    const { buttonName, onSearch } = this.props;
    return (
      <View style={style.inputWrapper}>
        <TextInput
          placeholder="请输入车牌号"
          style={style.textInput}
          onChangeText={text => {
            this.setState({
              inputText: text
            });
          }}
        />
        <Button
          title={buttonName}
          color={this.INPUT_BUTTON_COLOR}
          containerViewStyle={style.inputButtonContainer}
          buttonStyle={style.inputButton}
          onPress={() => {
            onSearch(this.state.inputText);
          }}
        />
      </View>
    );
  }
}
