import { View, Text, SafeAreaView, Pressable, Image, KeyboardAvoidingView, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')
  const navigation = useNavigation();

  const handleRegister = ()=>{
    const user = {
      name:name,
      email,
      password
    }
    axios.post("http://192.168.221.59:8000/register", user, {headers:{'Content-Type':'application/json'}}).then(resp=>{
      console.log(resp.data);
      Alert.alert("Registration successful", "You have registered successfully");
      setName(""); setEmail(""); setPassword("");
    }).catch(err=>{
      Alert.alert("Registration error", "an error occur during registration")
      console.log("registration fialed", err.message)
    });
  };

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
            Register for your Account
          </Text>
        </View>
        <View style={{
          flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#DBDBD0",
          paddingVertical: 5,
          borderRadius: 5,
          marginTop: 30
        }}>
          <FontAwesome name="user" style={{marginLeft:8}} size={24} color="grey" />
          <TextInput
            placeholder='Enter your Name'
            value={name}
            onChangeText={( text ) => setName(text)}
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
          <MaterialIcons name="email" style={{ marginLeft: 8 }} size={24} color="grey" />
          <TextInput
            placeholder='Enter your Email'
            value={email}
            onChangeText={( text ) => setEmail(text)}
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
            value={password}
            onChangeText={( text ) => setPassword(text)}
            secureTextEntry={true}
            style={{
              color: "grey",
              marginVertical: 10,
              width: 300,
              fontSize: 16
            }} />
        </View>

        <View style={{
          marginTop:12,
          flexDirection:'row',
          justifyContent:'space-between'
        }}>
          <Text>Keep me logged in</Text>
          <Text style={{color:"#007FFF", fontWeight:"500"}}>Forgot Password?</Text>
        </View>
        <View style={{marginTop:50}} />
        <Pressable
          style={{
            width:200,
            backgroundColor:"#febe10",
            borderRadius:6,
            marginLeft:'auto',
            marginRight:'auto',
            padding:15
          }}
          onPress={handleRegister}
        >
          <Text style={{
            textAlign:"center",
            color:"white",
            fontSize:16,
            fontWeight:"bold"
          }}>Register</Text>
        </Pressable>

        <Pressable onPress={()=> navigation.goBack()} style={{marginTop:15}}>
          <Text style={{textAlign:"center", color:"grey", fontSize:16}}>Already have an account? Sign in</Text>
        </Pressable>
      </KeyboardAvoidingView>


    </SafeAreaView>
  )
}