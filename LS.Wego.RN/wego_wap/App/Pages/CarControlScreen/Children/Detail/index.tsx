import * as React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native';
// import
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView, MapTypes } from 'react-native-baidu-map';
import {
  GREEN_COLOR,
  GRAY_COLOR,
  WHITE_COLOR,
  BLACK_COLOR
} from '../../../../Asserts/style';
import { alert } from '../../../../Config/utils';
import { RootSaga } from '../../../../Store';
import DetailMsg from './DetailMsg';
// import Bmap from './b';

const style = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  // switch
  switchBox: {
    position: 'absolute',
    // top: 0,
    right: 0
  },
  divideBox: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  divideLine: {
    position: 'relative',
    top: -2,
    width: 2,
    height: 30,
    backgroundColor: GREEN_COLOR
  }
});

class Detail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.GREEN_COLOR = GREEN_COLOR;
  }

  state = {
    carId: -1,
    detailContainerHeight: 0,
    canShow: false
  };

  static propTypes = {
    center: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    onCarDetail: PropTypes.func.isRequired,
    onCarAction: PropTypes.func.isRequired
  };

  // Life Cycle.
  componentWillMount() {
    const { navigation, onCarDetail } = this.props;
    const id = navigation.getParam('id');
    this.setState({
      carId: id
    });
    onCarDetail(id);
  }

  // Method.
  _controlCar = type => {
    this.props.onCarAction({
      type,
      carId: this.state.carId
    });
  };

  _updateDetailContainerHeight = h => {
    this.setState({
      detailContainerHeight: h
    });
  };

  _startAnimation = () => {
    LayoutAnimation.configureNext({
      duration: 700, //持续时间
      update: {
        // 视图更新
        type: LayoutAnimation.Types.easeIn
      }
    });
    this.setState({
      canShow: !this.state.canShow
    });
  };

  render() {
    let { center, title, status, list } = this.props;
    const { canShow, detailContainerHeight } = this.state;
    let marker = null;
    if (JSON.stringify(center) == '{}') {
      center = null;
    }
    if (center) {
      marker = {
        ...center,
        title
      };
    }
    return (
      <View style={{ flex: 1 }}>
        <MapView
          center={center}
          trafficEnabled={true}
          marker={marker}
          mapType={MapTypes.NORMAL}
          style={style.map}
          zoom={15}
        />
        <DetailMsg
          canShow={canShow}
          title={title}
          status={status}
          list={list}
          onControlCar={this._controlCar}
          onUpdateHeight={this._updateDetailContainerHeight}
        />
        <View
          style={[
            style.switchBox,
            { bottom: !canShow ? detailContainerHeight - 1 : 0 }
          ]}>
          <TouchableOpacity onPress={this._startAnimation}>
            <Icon
              type="evilicon"
              name={`arrow-${!canShow ? 'down' : 'up'}`}
              size={40}
              color={this.GREEN_COLOR}
            />
          </TouchableOpacity>
          <View style={style.divideBox}>
            <View style={style.divideLine} />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({
  carControlDetail: { center, title, status, list }
}) => ({
  center,
  title,
  status,
  list
});

const mapDispatchToProps = {
  onCarDetail: id => ({
    type: RootSaga.CAR_DETAIL,
    payload: id
  }),
  onCarAction: action => ({
    type: RootSaga.CAR_ACTION,
    payload: action
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
