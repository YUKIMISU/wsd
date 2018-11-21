import * as React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { Button, FormInput, FormLabel, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import Drawer from 'react-native-drawer';
import SubTaskList from './SubTaskList';
import { alert } from '../../../Config/utils';
import { RootSaga } from '../../../Store';
import {
  GREEN_COLOR,
  GRAY_COLOR,
  WHITE_COLOR,
  BLACK_COLOR
} from '../../../Asserts/style';
import style from './style';
import WGSearch from '../../../Components/WGSearch';

class TaskForm extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    carId: PropTypes.number.isRequired,
    parkPlace: PropTypes.string.isRequired,
    carStatus: PropTypes.string.isRequired,
    assignStaff: PropTypes.object.isRequired,
    assignNetNode: PropTypes.object.isRequired,
    onCheck: PropTypes.func.isRequired,
    onAssignStaffList: PropTypes.func.isRequired,
    onAssignNetNodeList: PropTypes.func.isRequired,
    onDistributeTask: PropTypes.func.isRequired
  };

  state = {
    selectedIndex: 0,
    buttons: ['调度任务', '整备任务', '充电任务'],
    canSubmit: false,
    canOpenDrawer: false,
    form: ['停车地点', '车辆状态', '指派人员', '指派网点'],
    type: 0 // 0 staff 1 netNode
  };

  // constant.
  BUTTON_COLOR = BLACK_COLOR;
  BUTTON_BORDER_COLOR = GRAY_COLOR;
  BUTTON_ACTIVE_COLOR = GREEN_COLOR;
  INPUT_BUTTON_COLOR = WHITE_COLOR;

  // Method.
  _pickItem = index => {
    this.setState({
      selectedIndex: index
    });
  };

  _valueByName = name => {
    const { parkPlace, carStatus, assignStaff, assignNetNode } = this.props;

    switch (name) {
      case '停车地点':
        return parkPlace;
      case '车辆状态':
        return carStatus;
      case '指派人员':
        return assignStaff.value;
      default:
        return assignNetNode.value;
    }
  };

  _checkCarNo = carNo => {
    if (carNo) {
      this.props.onCheck(carNo);
    } else {
      alert('提示', '请先输入车牌号');
    }
  };

  // type: 0 staffList 1 netNodeList
  _getDrawerList = type => {
    const { onAssignStaffList, onAssignNetNodeList } = this.props;
    (type === 0 && onAssignStaffList()) || onAssignNetNodeList();
    this.setState({
      type,
      canOpenDrawer: true
    });
  };

  _distributeTask = () => {
    const {
      loading,
      onDistributeTask,
      carId,
      carStatus,
      assignStaff,
      assignNetNode
    } = this.props;
    const { canSubmit, carNo, selectedIndex } = this.state;
    if (carId === -1) {
      return alert('提示', '请先校验车牌号');
    } else if (!assignStaff.value) {
      return alert('提示', '请先选择指派人员');
    } else if (!assignNetNode.value) {
      return alert('提示', '请先选择指派网点');
    } else if (!loading) {
      onDistributeTask({
        taskType: selectedIndex + 1,
        carId,
        managerId: assignStaff.id,
        aimStoreId: assignNetNode.id,
        carNo
      });
    }
  };

  render() {
    const {
      state,
      props,
      BUTTON_COLOR,
      BUTTON_ACTIVE_COLOR,
      BUTTON_BORDER_COLOR,
      INPUT_BUTTON_COLOR,
      _getDrawerList,
      _distributeTask
    } = this;
    const {
      selectedIndex,
      buttons,
      canSubmit,
      canOpenDrawer,
      form,
      type
    } = state;
    const { loading } = props;
    return (
      <View style={style.container}>
        <Drawer
          type="static"
          open={canOpenDrawer}
          side="left"
          onCloseStart={() => {
            this.setState({
              canOpenDrawer: false
            });
          }}
          content={
            <SubTaskList
              type={type}
              canOpen={canOpenDrawer}
              onCloseDrawer={() =>
                this.setState({
                  canOpenDrawer: false
                })
              }
            />
          }>
          <ScrollView>
            {buttons.map((name, index) => {
              return (
                <Button
                  title={name}
                  color={BUTTON_COLOR}
                  containerViewStyle={style.buttonContainer}
                  buttonStyle={[
                    style.button,
                    {
                      borderColor:
                        index === selectedIndex
                          ? BUTTON_ACTIVE_COLOR
                          : BUTTON_BORDER_COLOR
                    }
                  ]}
                  key={index}
                  iconRight={{
                    name: 'checkbox-marked-circle',
                    type: 'material-community',
                    color: index === selectedIndex && BUTTON_ACTIVE_COLOR
                  }}
                  onPress={() => {
                    this._pickItem(index);
                  }}
                />
              );
            })}
            <WGSearch buttonName="校验" onSearch={this._checkCarNo} />
            <View style={style.formWrapper}>
              {form.map((f, fi) => {
                const placeLabel =
                  f === '指派人员'
                    ? '请点击右侧列表按钮，指派人员'
                    : f === '指派网点'
                      ? '请点击右侧列表按钮，指派网点'
                      : '请先校验车牌号';
                const value = this._valueByName(f);
                return (
                  <View key={fi} style={style.formItemWrapper}>
                    <FormLabel labelStyle={style.formLabel}>{f}</FormLabel>
                    <FormInput
                      placeholder={placeLabel}
                      value={value}
                      inputStyle={style.formInput}
                      multiline={fi === 0}
                      editable={false}
                      containerStyle={style.formInputContainer}
                    />
                    {f === '指派人员' || f === '指派网点' ? (
                      <Icon
                        name="list"
                        type="feather"
                        containerStyle={style.submitIconContainer}
                        onPress={() => {
                          _getDrawerList(f === '指派人员' ? 0 : 1);
                        }}
                      />
                    ) : null}
                  </View>
                );
              })}
            </View>
            <Button
              title="立即发布任务"
              loading={loading}
              buttonStyle={style.submitButton}
              containerViewStyle={style.submitWrapper}
              color={WHITE_COLOR}
              backgroundColor={BUTTON_ACTIVE_COLOR}
              onPress={_distributeTask}
            />
          </ScrollView>
        </Drawer>
      </View>
    );
  }
}

const mapStateToProps = ({
  initiateTask: { carId, parkPlace, carStatus, assignStaff, assignNetNode },
  loading
}) => ({
  loading,
  carId,
  parkPlace,
  carStatus,
  assignStaff,
  assignNetNode
});

const mapDispatchToProps = {
  onCheck: carNo => ({
    type: RootSaga.CHECK_CAR_NO,
    payload: {
      carNo
    }
  }),
  onAssignStaffList: () => ({
    type: RootSaga.ASSIGN_STAFF_LIST
  }),
  onAssignNetNodeList: () => ({
    type: RootSaga.ASSIGN_NETNODE_LIST
  }),
  onDistributeTask: params => ({
    type: RootSaga.DISTRIBUTE_TASK,
    payload: params
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
