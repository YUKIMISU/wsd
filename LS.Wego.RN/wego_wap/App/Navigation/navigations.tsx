import * as React from 'react';
import { StyleSheet } from 'react-native';
import { WHITE_COLOR } from '../Asserts/style';
import {
  createSwitchNavigator,
  createStackNavigator,
  TabNavigator
} from 'react-navigation';
import HeaderLeft from '../Components/HeaderLeft';
import BootstrapScreen from '../Pages/BootstrapScreen';
/**
 * Auth.
 */
import SignInScreen from '../Pages/SignInScreen';

/**
 * App.
 */
import HomeScreen from '../Pages/HomeScreen';
import InitiateTaskScreen from '../Pages/InitiateTaskScreen';
import MyTaskScreen from '../Pages/MyTaskScreen';
import RepairScreen from '../Pages/RepairScreen';
import CarControHomeScreen from '../Pages/CarControlScreen';
import CarControlDetailScreen from '../Pages/CarControlScreen/Children/Detail';

// child stack
const carControlStack = createStackNavigator(
  {
    CarControlHome: {
      screen: CarControHomeScreen
    },
    CarControlDetail: {
      screen: CarControlDetailScreen
    }
  },
  {
    initialRouteName: 'CarControlHome',
    navigationOptions: {
      header: null,
      headerStyle: {
        textAlign: 'center'
      }
    },
    cardStyle: {
      backgroundColor: WHITE_COLOR
    }
  }
);

const routeConfig = {
  App: {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    InitiateTask: {
      screen: InitiateTaskScreen,
      navigationOptions: {
        title: '发起任务',
        headerLeft: <HeaderLeft />
      }
    },
    MyTask: {
      screen: MyTaskScreen,
      navigationOptions: {
        title: '我的任务',
        headerLeft: <HeaderLeft />
      }
    },
    Repair: {
      screen: RepairScreen,
      navigationOptions: {
        title: '故障报修',
        headerLeft: <HeaderLeft />
      }
    },
    CarControl: {
      screen: carControlStack,
      navigationOptions: {
        title: '车辆控制',
        headerLeft: <HeaderLeft />
      }
    }
  },
  Auth: {
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        header: null
      }
    }
  }
};

const AppStack = createStackNavigator(routeConfig.App, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: WHITE_COLOR
    },
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center'
    }
  },
  cardStyle: {
    backgroundColor: WHITE_COLOR
  }
});
const AuthStack = createStackNavigator(routeConfig.Auth);

export default createSwitchNavigator(
  {
    Bootstrap: BootstrapScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'Bootstrap'
  }
);
