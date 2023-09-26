import { View, Text, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    const user = {
      email,
      password
    };
    console.log("login called");
    axios.post("http://192.168.221.59:8000/login", user).then(resp => {
      console.log(resp.data)
      const token = resp.data.token;
      AsyncStorage.setItem('authToken', token);
      navigation.replace('Main');
    }).catch(err => {
      Alert.alert("Login error", "Invalid email or password")
      console.log(err)
    });
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.replace("Main");
        }

      } catch (error) {
        console.log("error", error);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={require("../assets/amazon.png")}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#041E42" }}>
            Login to your Account
          </Text>
        </View>
        <View style={{
          flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#DBDBD0",
          paddingVertical: 5,
          borderRadius: 5,
          marginTop: 30
        }}>
          <MaterialIcons name="email" style={{ marginLeft: 8 }} size={24} color="grey" />
          <TextInput
            placeholder='enter your Email'
            onChangeText={(text) => setEmail(text)}
            style={{
              color: "grey",
              marginVertical: 10,
              width: 300,
              fontSize: 16
            }} />
        </View>

        <View style={{
          flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#DBDBD0",
          paddingVertical: 5,
          borderRadius: 5,
          marginTop: 30
        }}
        >
          <Entypo name="key" style={{ marginLeft: 8 }} size={24} color="grey" />
          <TextInput
            placeholder='enter your Email'
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={{
              color: "grey",
              marginVertical: 10,
              width: 300,
              fontSize: 16
            }} />
        </View>

        <View style={{
          marginTop: 12,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Text>Keep me logged in</Text>
          <Text style={{ color: "#007FFF", fontWeight: "500" }}>Forgot Password?</Text>
        </View>
        <View style={{ marginTop: 50 }} />
        <Pressable
          style={{
            width: 200,
            backgroundColor: "#febe10",
            borderRadius: 6,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 15
          }}
          onPress={handleLogin}
        >
          <Text style={{
            textAlign: "center",
            color: "white",
            fontSize: 16,
            fontWeight: "bold"
          }}>Login</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Register')} style={{ marginTop: 15 }}>
          <Text style={{ textAlign: "center", color: "grey", fontSize: 16 }}>Don't have an account? Sign up</Text>
        </Pressable>
      </KeyboardAvoidingView>


    </SafeAreaView>
  )
}

export default LoginScreen
