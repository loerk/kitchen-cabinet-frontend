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
    backgroundColor: '#208AEC',
  },
  loginHeaderLogo: {
    width: 150,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  loginHeaderText: {
    marginTop: 15,
    color: '#f0f0f0',
    fontWeight: 'bold',
    fontSize: 20,
  },
  loginWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
    borderRadius: 12,
    marginTop: -10,
    backgroundColor: '#fff',
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
    borderRadius: 50,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    backgroundColor: '#0065A4',
    borderRadius: 50,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 15,
  },
  loginFooterText: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#808080',
    fontSize: 15,
  },
  loginFooterLink: {
    color: '#208AEC',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default styles;
