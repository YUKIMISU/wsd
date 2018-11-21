import { StyleSheet } from 'react-native';
import { WHITE_COLOR, GRAY_COLOR, BLACK_COLOR } from '../../Asserts/style';

export default StyleSheet.create({
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
  },
  footer: {
    paddingTop: 20,
    paddingBottom: 15
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16
    // fontWeight: '600'
  }
});
