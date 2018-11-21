import { StyleSheet, Dimensions } from 'react-native';
import {
  GREEN_COLOR,
  GRAY_COLOR,
  WHITE_COLOR,
  BLACK_COLOR
} from '../../../../Asserts/style';

export default StyleSheet.create({
  // container
  container: {
    position: 'absolute',
    left: 10,
    // bottom: 50,
    bottom: 0,
    width: Dimensions.get('window').width - 20,
    backgroundColor: WHITE_COLOR,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 20
  },
  // switchBox
  switchBox: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  divideBox: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  divideLine: {
    position: 'relative',
    top: -6,
    width: 2,
    height: 30,
    backgroundColor: GREEN_COLOR
  },
  //
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: GREEN_COLOR,
    borderRadius: 5
  },
  titleText: {
    lineHeight: 30,
    fontSize: 16
  },
  listWrapper: {
    marginTop: 10,
    marginBottom: 10
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  listItemLeft: {
    color: '#999',
    fontSize: 16
  },
  listItemRight: {
    flexDirection: 'row'
  },
  listItemRightText: {
    color: BLACK_COLOR,
    fontSize: 16
  },
  controlBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  controlItem: {
    // height: 50
  },
  tipText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    color: '#999'
  },
  controlIconText: {
    marginTop: 5,
    fontSize: 16
  }
});
