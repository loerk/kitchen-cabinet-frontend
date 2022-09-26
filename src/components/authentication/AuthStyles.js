import { Center } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loginHeader: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 50,
    backgroundColor: '#891D47',
  },
  loginHeaderLogo: {
    width: 150,
    resizeMode: 'contain',
    borderRadius: 5,
    maxWidth: 280,
  },
  loginHeaderText: {
    marginTop: 15,
    color: '#FCF5EA',
    fontWeight: 'bold',
    fontSize: 20,
  },
  loginWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
    borderRadius: 12,
    marginTop: -10,
    backgroundColor: '#FCF5EA',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 280,
  },
  formInput: {
    height: 44,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#EDF0F7',
  },
  loginResetText: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#808080',
    fontSize: 15,
    paddingTop: 20,
  },
  loginResetLink: {
    color: '#891D47',
    fontSize: 15,
    fontWeight: 'bold',
  },
  returnLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    color: '#808080',
    fontSize: 15,
    paddingTop: 20,
  },
  returnLoginLink: {
    color: '#891D47',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    backgroundColor: '#891D47',
    borderRadius: 50,
  },
  buttonLabel: {
    color: '#FCF5EA',
    fontSize: 15,
  },
  loginFooterText: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#808080',
    fontSize: 15,
  },
  loginFooterLink: {
    color: '#891D47',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default styles;
