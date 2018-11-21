import * as React from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  Text,
  RefreshControl,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { RootSaga } from '../../../Store';
import { GRAY_COLOR, BLACK_COLOR, WHITE_COLOR } from '../../../Asserts/style';

const style = StyleSheet.create({
  listWrapper: {
    backgroundColor: WHITE_COLOR
  },
  listItem: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: GRAY_COLOR
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: BLACK_COLOR
  }
});

class SubTaskList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    canOpen: PropTypes.bool.isRequired,
    assignStaffList: PropTypes.array.isRequired,
    assignNetNodeList: PropTypes.array.isRequired,
    type: PropTypes.number.isRequired,
    onCloseDrawer: PropTypes.func.isRequired,
    onSetAssign: PropTypes.func.isRequired
  };

  state = {
    isRefresh: false
  };

  _PickItem = item => {
    const { type, onSetAssign, onCloseDrawer } = this.props;
    onSetAssign(type, {
      id: item.id,
      value: item[type === 0 ? 'userName' : 'cName']
    });
    onCloseDrawer();
  };

  _updateList = () => {
    const { type, onAssignStaffList, onAssignNetNodeList } = this.props;
    (type === 0 && onAssignStaffList()) || onAssignNetNodeList();
  };

  _renderItem = (item, type) => (
    <TouchableOpacity
      style={style.listItem}
      activeOpacity={0.7}
      onPress={() => this._PickItem(item)}>
      <Text style={style.listItemText}>
        {item[type === 0 ? 'userName' : 'cName']}
      </Text>
    </TouchableOpacity>
  );

  render() {
    const {
      assignStaffList,
      assignNetNodeList,
      type,
      loading,
      canOpen
    } = this.props;
    const list = type === 0 ? assignStaffList : assignNetNodeList;
    return (
      (canOpen && (
        <FlatList
          style={style.listWrapper}
          data={list}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={this._updateList} />
          }
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => this._renderItem(item, type)}
        />
      )) ||
      null
    );
  }
}

const mapStateToProps = ({
  initiateTask: { assignStaffList, assignNetNodeList },
  loading
}) => ({
  loading,
  assignStaffList,
  assignNetNodeList
});

const mapDispatchToProps = {
  onAssignStaffList: () => ({
    type: RootSaga.ASSIGN_STAFF_LIST
  }),
  onAssignNetNodeList: () => ({
    type: RootSaga.ASSIGN_NETNODE_LIST
  }),
  onSetAssign: (type, data) => ({
    type: RootSaga.SET_ASSIGN,
    payload: {
      type,
      data
    }
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(SubTaskList);
