import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button, CheckBox} from "@rneui/themed";
import {login, reset} from '../features/auth/authSlice'
import { StyleSheet, View, Text, ToastAndroid} from 'react-native';
import Spinner from '../components/Spinner'
import * as SecureStore from 'expo-secure-store'


const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();

  const {isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

    useEffect(() => {
      if(isError){
        ToastAndroid.show(message, ToastAndroid.CENTER)
      
      }

      if(isSuccess){
        navigation.navigate('Roster')
      }
      dispatch(reset())
    },[isError, isSuccess, message, navigation, dispatch])

    useEffect(() => {
      SecureStore.getItemAsync('userinfo').then((userData)=> {
        const userinfo = JSON.parse(userData)
        if (userinfo) {
          setEmail(userinfo.email);
          setPassword(userinfo.password);
          setRemember(true);
      }
      })
    }, []);


const onPressLogin = async () => {

  const userData = {
    email,
    password,
    remember
  }
  dispatch(login(userData))
  
  console.log('email:', email)
  console.log('password:', password)
  console.log('remember:', remember)
  if(email && password){
    navigation.navigate('Roster')
  }
  if (remember) {
    SecureStore.setItemAsync(
      'userinfo',
      JSON.stringify({
        email,
        password,
        remember

      })
    ).catch((error) => console.log('Could not save user info', error))
  } else {
    
    SecureStore.deleteItemAsync('userinfo').catch(
      (error) => console.log('Could not delete user info', error)
    );
  }
  /* 
    MW: It is going to the roster screen no matter what happens above.
    Only navigate if the credentials are correct
  */

  }

  if(isLoading){
    return <Spinner />
  }


    return(
       <>
       <View style={styles.container}>
       
          <Text style={styles.text}>Login or Create an Account</Text>  

      
    
         
          <Input 
            inputContainerStyle={{borderWidth:1,borderRadius:5 }}
            placeholder="Email" 
            leftIcon={{type:'font-awesome', name:'envelope'}}
          
            leftIconContainerStyle={{margin: 10}}
            value={email}
            onChangeText={(value) => setEmail(value)}
            />
            <Input 
            inputContainerStyle={{borderWidth:1,borderRadius:5 }}
            placeholder="Password" 
            secureTextEntry={true}
            leftIcon={{type:'font-awesome', name:'lock'}}
            leftIconContainerStyle={{margin: 10}}
            value={password}
            onChangeText={(value) => setPassword(value)}
            />
           
            <Button 
            title="LOGIN" 
            accessibilityLabel='Login button'
            buttonStyle={{
                backgroundColor: 'steelblue',
                borderRadius:10, 
                padding: 15,
                margin: 15,
            }} 
            containerStyle={{ width: 300}}
            
            onPress={() =>{
             
              onPressLogin();
                       
            }} 
            />
            <CheckBox
              title='Remember Me'
              center
              checked={remember}
              containerStyle={{width:250, borderRadius: 10}}
              onPress={() => setRemember(!remember)} 
              />
            <Button 
            title="Create Account"
            accessibilityLabel='Create Account Button'
            type="clear"
            onPress = {() => {
            navigation.navigate('Create Account')
            } }    
            
              />
       </View>
         
     
      </>
);
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      margin: 20, 
      justifyContent: 'center',
      alignItems: 'center'
      
    },
   
    text:{
      fontSize: 20,
      margin: 20, 
      justifyContent: "center",

    },
  
  });
  
export default LoginScreen