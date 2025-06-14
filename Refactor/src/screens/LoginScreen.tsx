import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

// Define your root stack param list
type RootStackParamList = {
  VisualScheduler: undefined;
  ScheduleManagement: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VisualScheduler'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>(); // Use this navigation for screen transitions
  const { isLoggedIn, userRole, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => { // Corrected function name from handleLogin to handleSignUp
    console.log('Sign Up pressed');
    // Implement sign up logic here
  };

  const handleGoogleSignIn = () => {
    console.log('Sign in with Google pressed');
    // Implement Google Sign-in logic here
  };

  const handleAppleSignIn = () => {
    console.log('Sign in with Apple pressed');
    // Implement Apple Sign-in logic here
  };

  const handleLogin = async () => {
    console.log('Login pressed', { email, password });
    // Call the login function from AuthContext
    await login(email, password);
  };

  useEffect(() => {
    // This effect runs when isLoggedIn or userRole changes.
    if (isLoggedIn) {
      if (userRole === 'parent' || userRole === 'teacher') {
        navigation.replace('ScheduleManagement'); // Navigate to management screen for parent/teacher
      } else {
        navigation.replace('VisualScheduler'); // Navigate to visual scheduler for other roles (e.g., student)
      }
    }
  }, [isLoggedIn, userRole, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text> {/* Renamed from "Login" to "Login" for clarity */}
      </Pressable>

      <Pressable style={styles.buttonSecondary} onPress={handleSignUp}>
        <Text style={styles.buttonTextSecondary}>Sign Up</Text>
      </Pressable>

      <Text style={styles.orText}>OR</Text>

      <Pressable style={[styles.button, styles.googleButton]} onPress={handleGoogleSignIn}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.appleButton]} onPress={handleAppleSignIn}>
        <Text style={styles.buttonText}>Sign in with Apple</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8', // Light background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff', // Primary blue
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    width: '100%',
    height: 50,
    backgroundColor: '#e9e9eb', // Light gray
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonTextSecondary: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#555',
  },
  googleButton: {
    backgroundColor: '#db4437', // Google red
  },
  appleButton: {
    backgroundColor: '#000', // Apple black
  },
});

export default LoginScreen;