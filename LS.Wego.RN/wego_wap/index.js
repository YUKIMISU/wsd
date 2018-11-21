import { AppRegistry, YellowBox } from 'react-native';
import App from './App/App';

// Ignore isMounted tip.
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
]);

AppRegistry.registerComponent('wego_wap', () => App);
