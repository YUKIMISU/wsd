import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { globalStyle } from '../../Asserts/style';
import { alert } from '../../Config/utils';
import {
  GREEN_COLOR,
  GRAY_COLOR,
  WHITE_COLOR,
  BLACK_COLOR
} from '../../Asserts/style';
import { RootSaga } from '../../Store';
import style from './style';
import WGSearch from '../../Components/WGSearch';

class CarControlScreen extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    isLoadMore: false
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    pageNum: PropTypes.number.isRequired,
    carList: PropTypes.array.isRequired,
    totalNum: PropTypes.number.isRequired,
    onCarList: PropTypes.func.isRequired
  };

  // Life Cycle.
  componentDidMount() {
    this.props.onCarList();
  }

  // Methods.
  _SearchCarNo = carNo => {
    if (carNo) {
      this.props.onCarList({ carNo });
    } else {
      alert('提示', '车牌号不能为空');
    }
  };

  _PickItem = item => {
    this.props.navigation.navigate('CarControlDetail', {
      id: item.id
    });
  };

  _updateList = () => {
    this.props.onCarList({ carNo: '', pageNum: 1 });
  };

  _loadMore = () => {
    const { pageNum, totalNum } = this.props;
    if (pageNum < totalNum) {
      this.setState({
        isLoadMore: true
      });
      this.props.onCarList({ carNo: '', pageNum: this.props.pageNum });
    }
  };

  _renderFooter = () => {
    const { isLoadMore, loading, totalNum, pageNum } = this.props;
    if (isLoadMore && loading) {
      this.setState({
        isLoadMore: false
      });
      return (
        <View>
          <ActivityIndicator />
          <Text>正在加载更多数据...</Text>
        </View>
      );
    } else {
      return (
        (pageNum === totalNum && (
          <View style={style.footer}>
            <Text style={style.footerText}>没有更多数据了</Text>
          </View>
        )) ||
        null
      );
    }
  };

  _renderItem = item => (
    <TouchableOpacity
      style={style.listItem}
      activeOpacity={0.7}
      onPress={() => this._PickItem(item)}>
      <Text style={style.listItemText}>{item.cCarNumber}</Text>
    </TouchableOpacity>
  );

  render() {
    const {
      props: { carList, loading, onCarLis },
      _updateList,
      _renderItem,
      _loadMore,
      _renderFooter,
      _SearchCarNo
    } = this;
    return (
      <View style={globalStyle.main}>
        <WGSearch buttonName="搜索" onSearch={_SearchCarNo} />
        <FlatList
          style={style.listWrapper}
          data={carList}
          refreshing={loading}
          onRefresh={_updateList}
          onEndReached={_loadMore}
          onEndReachedThreshold={1}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => _renderItem(item)}
          ListFooterComponent={_renderFooter}
        />
      </View>
    );
  }
}

const mapStateToProps = ({
  loading,
  carControl: { pageNum, carList, totalNum }
}) => ({
  loading,
  carList,
  pageNum,
  totalNum
});

const mapDispatchToProps = {
  onCarList: params => ({
    type: RootSaga.CAR_LIST,
    payload: params
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarControlScreen);
