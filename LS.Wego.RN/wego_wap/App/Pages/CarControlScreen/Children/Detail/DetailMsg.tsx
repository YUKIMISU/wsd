import * as React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native';
import { Icon } from 'react-native-elements';
import {
  GREEN_COLOR,
  GRAY_COLOR,
  WHITE_COLOR,
  BLACK_COLOR
} from '../../../../Asserts/style';
import { alert } from '../../../../Config/utils';
import { RootSaga } from '../../../../Store';
import style from './DetailMsgStyle';

class DetailMsg extends React.PureComponent {
  constructor(props) {
    super(props);
    /**
     * For creating variable  when class intanted , to avoid memory leak
     */
    this.GREEN_COLOR = GREEN_COLOR;
  }

  state = {
    containerHeight: 0,
    carControl: [
      {
        name: '鸣笛',
        icon: 'sound'
      },
      {
        name: '开锁',
        icon: 'lock-open'
      },
      {
        name: '锁门',
        icon: 'lock'
      }
    ]
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    canShow: PropTypes.bool.isRequired,
    onControlCar: PropTypes.func.isRequired,
    onUpdateHeight: PropTypes.func.isRequired
  };

  _renderItem = item => (
    <View style={style.listItem}>
      <Text style={style.listItemLeft}>{item.name}</Text>
      <View style={style.listItemRight}>
        <Text style={style.listItemRightText}>{item.value}</Text>
        <Text style={style.listItemRightText}>{item.unit}</Text>
      </View>
    </View>
  );

  _layoutContainer = h => {
    this.props.onUpdateHeight(h);
    this.setState({
      containerHeight: h
    });
  };

  render() {
    const {
      // GREEN_COLOR,
      state,
      props,
      _renderItem,
      _layoutContainer
    } = this;
    const { title, status, list, onControlCar, canShow } = props;
    const { carControl, containerHeight } = state;
    return (
      <View
        style={[style.container, canShow ? { bottom: -containerHeight } : {}]}
        onLayout={({
          nativeEvent: {
            layout: { height }
          }
        }) => _layoutContainer(height)}>
        <View style={style.title}>
          <Text style={style.titleText}>{title}</Text>
          <Text
            style={[style.titleText, { color: GREEN_COLOR, marginLeft: 5 }]}>
            {status}
          </Text>
        </View>
        <FlatList
          style={style.listWrapper}
          data={list}
          keyExtractor={item => item.name}
          renderItem={({ item }) => _renderItem(item)}
        />
        <View style={style.controlBox}>
          {carControl.map((item, index) => (
            <TouchableOpacity
              key={item.name}
              activeOpacity={0.7}
              onPress={() => onControlCar(index)}>
              <View style={style.controlItem}>
                <Icon name={item.icon} type="entypo" size={30} />
                <Text style={style.controlIconText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={style.tipText}>
          注：仅可开关车门，如需发动汽车请发起调度任务
        </Text>
      </View>
    );
  }
}

export default DetailMsg;
