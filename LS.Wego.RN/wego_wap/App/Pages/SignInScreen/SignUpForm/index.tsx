import * as React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Alert, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-vector-icons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { RootSaga } from '../../../Store/';
import style from './style';
// constant
const ACTIVE_COLOR = '#2bc77b';
const DEFAULT_BOTTOM_COLOR = '#eee';
const TEXT_COLOR = '#a3a3a3';
const TEXT_ACTIVE_COLOR = '#333';
const INPUT_HEIGHT = 48;
const WARNING_BOTTOM_COLOR = '#F56C6C';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    userName: '',
    password: '',
    inputs: ['default', 'default'],
    isSubmit: false
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  // Life Cycle
  componentWillMount() {
    this.setState({
      userName: this.props.username
    });
  }

  // Methods
  // Input
  _onInputFocus = index => {
    this.setState(prevState => {
      const inputs = prevState.inputs;
      inputs[index] = 'active';
      return {
        inputs
      };
    });
  };

  _onInputEndEditing = index => {
    const { inputs, userName, password } = this.state;
    const value = index === 0 ? userName : password;
    inputs[index] = value === '' ? 'warning' : 'default';
    this.setState({
      inputs
    });
  };

  _onInputChangeText = (text, index) => {
    const state = {
      ...this.state,
      [index === 0 ? 'userName' : 'password']: text
    };
    const { userName, password } = state;

    this.setState({
      ...state,
      isSubmit: userName && password
    });
  };

  _onInputSubmit = () => {
    if (this.state.isSubmit) {
      this._handleSubmit();
    }
  };

  // Submit.
  _handleSubmit = () => {
    const { userName: username, password, isSubmit } = this.state;
    const { isLoading, onSubmit } = this.props;
    if (isSubmit && !isLoading) {
      onSubmit({
        username,
        password
      });
    } else {
      Alert.alert(
        '提示',
        '正在提交，请勿多次提交...',
        [
          {
            text: 'OK'
          }
        ],
        {
          cancelable: false
        }
      );
    }
  };

  render() {
    const { inputs, isSubmit, userName: username, password } = this.state;
    return (
      <View style={style.container}>
        <Text style={style.title}>欢迎来到小哥出行</Text>
        <View style={style.inputsWrapper}>
          {inputs.map((input, index) => {
            return (
              <View key={index}>
                <Fumi
                  label={index + 1 === 1 ? '用户名' : '密码'}
                  height={INPUT_HEIGHT}
                  style={[
                    style.input,
                    {
                      borderBottomColor:
                        input === 'active'
                          ? ACTIVE_COLOR
                          : input === 'warning'
                            ? WARNING_BOTTOM_COLOR
                            : DEFAULT_BOTTOM_COLOR
                    },
                    index === 0 ? {} : style.password
                  ]}
                  labelStyle={{ color: TEXT_COLOR }}
                  inputStyle={{ color: TEXT_ACTIVE_COLOR }}
                  iconClass={FontAwesomeIcon}
                  secureTextEntry={index === 1}
                  iconName={index + 1 === 1 ? 'user' : 'lock'}
                  iconColor={ACTIVE_COLOR}
                  onFocus={() => this._onInputFocus(index)}
                  onEndEditing={() => this._onInputEndEditing(index)}
                  onChangeText={text => this._onInputChangeText(text, index)}
                  onSubmitEditing={this._onInputSubmit}
                />
                <Text style={style.warningTip}>
                  {input === 'warning' &&
                    (index === 0 ? '用户名不能为空' : '密码不能为空')}
                </Text>
              </View>
            );
          })}
        </View>
        <Button
          title="提交"
          containerViewStyle={style.buttonContainer}
          buttonStyle={style.submit}
          backgroundColor={isSubmit ? ACTIVE_COLOR : ''}
          onPress={this._handleSubmit}>
          提交
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  username: state.signIn.username,
  isLoading: state.loading
});
const mapDispatchToProps = {
  onSubmit: data => {
    return {
      type: RootSaga.SIGNIN,
      payload: data
    };
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
