import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20
  },
  title: {
    paddingBottom: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
  inputsWrapper: {
    marginBottom: 20
  },
  // submit
  input: {
    height: 65,
    paddingBottom: 10,
    borderBottomWidth: 1
  },
  password: {
    marginTop: 10
  },
  warningTip: {
    textAlign: 'center',
    color: '#F56C6C',
    fontSize: 12,
    paddingTop: 5
  },
  buttonContainer: {
    marginLeft: 0,
    marginRight: 0
  },
  submit: {
    // alignSelf: 'stretch',
    borderRadius: 5
  }
});
