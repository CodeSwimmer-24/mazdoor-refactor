import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import LoginUi from './Ui';
import Mazdoor from '../Mazdoor';
import RegisterForm from '../Register';
import Customer from '../Customer';
import axios from 'axios';
import { hostUrl } from '../../services';
import { useAuthStore } from '../../zustand/authStore';

const Login = () => {
  const [loading, setLoading] = useState(true); // For initial loading
  const [user, setUser] = useState(null); // To store the current user
  const [isNewUser, setIsNewUser] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [checkRole, setCheckRole] = useState("");

  const { setEmail, setRole, setName, setAge, setContact, setGender, setLocality, setExactLocation, setBuildingAddress } = useAuthStore();

  useEffect(() => {
    // Set up Google Sign-In configuration
    GoogleSignin.configure({
      webClientId: "659599005965-4fl00tl7ouiea7rgmn888ice2g8m63b3.apps.googleusercontent.com",
    });

    // Check if the user is already logged in
    const unsubscribe = auth().onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          const { email } = currentUser;

          const response = await axios.post(`${hostUrl}/mazdoor/v1/login`, {
            emailId: email,
          });
          setNewEmail(email);

          setIsNewUser(response.data.isNewUser);

          if (!response.data.isNewUser) {
            // Fetch user profile if not new
            const profileApiUrl = `${hostUrl}/mazdoor/v1/getProfile?emailId=${email}`;
            const profileResponse = await axios.get(profileApiUrl);
            const { name, role, emailId, contactNo, gender, address } = profileResponse.data;

            setName(name);
            setRole(role);
            setEmail(emailId);
            setLocality(address.locality);
            setContact(contactNo);
            setGender(gender);
          }
        } catch (error) {
          console.error('Error checking user status:', error);
        }
      }
      setUser(currentUser);
      setLoading(false); // Stop loading after checking user state
    });

    return unsubscribe; // Cleanup the listener on component unmount
  }, []);

  const onGoogleButtonPress = async () => {
    setLoading(true); // Set loading to true when starting login process

    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const result = await auth().signInWithCredential(googleCredential);
      const { email } = result.user;

      const response = await axios.post(`${hostUrl}/mazdoor/v1/login`, {
        emailId: email,
      });

      setIsNewUser(response.data.isNewUser);

      if (response.data.isNewUser === false) {
        const profileApiUrl = `${hostUrl}/mazdoor/v1/getProfile?emailId=${email}`;
        const profileResponse = await axios.get(profileApiUrl);
        const { name, role, emailId, contactNo, gender, address, age } = profileResponse.data;
        setCheckRole(role)
        setName(name);
        setRole(role);
        setEmail(emailId);
        setLocality(address.locality);
        setContact(contactNo);
        setGender(gender);
        setAge(age);
        setExactLocation(address.exactLocation);
        setBuildingAddress(address.buildingAddress)
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    } finally {
      setLoading(false); // Stop loading after login process
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={50} color="#0000ff" />
      </View>
    );
  }

  // If user is logged in, show the appropriate page
  if (user) {
    if (isNewUser) {
      return <RegisterForm email={newEmail} />;
    } else {
      return checkRole === "customer" ? <Customer /> : <Mazdoor />;
    }
  }

  // If user is not logged in, show the Login page
  return <LoginUi onGoogleButtonPress={onGoogleButtonPress} />;
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Login;
