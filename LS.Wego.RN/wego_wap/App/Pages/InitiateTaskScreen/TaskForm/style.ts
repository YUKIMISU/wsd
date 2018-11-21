import { StyleSheet } from 'react-native';
import { GREEN_COLOR, GRAY_COLOR, BLACK_COLOR } from '../../../Asserts/style';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20
  },
  buttonContainer: {
    marginLeft: 0,
    marginRight: 0
  },
  button: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8
  },
  formWrapper: {
    marginVertical: 10
  },
  formItemWrapper: {
    position: 'relative',
    marginBottom: 10
  },
  horizontalFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  formLabel: {
    color: BLACK_COLOR,
    marginTop: 0,
    marginLeft: 0,
    fontSize: 16
  },
  formInput: {
    width: 'auto'
  },
  formInputContainer: {
    marginTop: 5,
    marginLeft: 0,
    marginRight: 0,
    paddingHorizontal: 6
  },
  submitWrapper: {
    marginLeft: 0,
    marginRight: 0
  },
  submitButton: {
    marginTop: 5,
    borderRadius: 6
  },
  submitIconContainer: {
    position: 'absolute',
    right: 5,
    bottom: 15
  }
});
