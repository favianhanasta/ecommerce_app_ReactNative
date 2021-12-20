import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, StatusBar,View } from 'react-native';
import { Text,Image,Input,Icon,Button } from 'react-native-elements';
import {heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { useDispatch } from 'react-redux';
import { onRegister } from '../actions';
import { API_URL } from '../helper';

const RegisterPage = (props) => {

    const [inEmail,setEmail] = useState('')
    const [inUsername,setUsername] = useState('')
    const [inPassword,setPassword] = useState('')
    const [visible,setVisible] = useState(true)

    const dispatch = useDispatch();

    const btRegister = async () =>{
        let respon = await dispatch(onRegister(inEmail,inUsername,inPassword))
        if(respon.success>0){
            Alert.alert(`Selamat Datang ${inUsername}!` ,`Silahkan Login`,
            [
                {
                    text:'To Login Page',
                    onPress:()=>props.navigation.dispatch(StackActions.replace('Login'))
                }
            ])
        }
    }

    return (
        <View style={{flex:1,backgroundColor:'white',paddingHorizontal:20}}>
            <StatusBar backgroundColor={'white'} barStyle='dark-content'/>
            <KeyboardAvoidingView behavior='position'>
            <Icon   
            name='arrow-left' 
            type='font-awesome' 
            color='#1B1464' 
            containerStyle={{position:'absolute',zIndex:30,marginTop:hp(3)}} 
            size={25}
            onPress={()=>props.navigation.goBack()}/>
            <Image source={require('../assets/register_asset.png')}
            style={{height:hp(35)}}/>
            <Text h2 style={{color:'#1B1464'}}>Register</Text>
            <Input placeholder='Username'
                    onChangeText={(val)=>setUsername(val)}
                    leftIcon={
                        <Icon name='user' type='feather' color='#bdc3c7'/>
                    }
            />
            <Input placeholder='Email'
                    onChangeText={(val)=>setEmail(val)}
                    leftIcon={
                        <Icon name='mail' type='feather' color='#bdc3c7'/>
                    }
            />
            <Input placeholder='Password'
                    onChangeText={(val)=>setPassword(val)}
                    secureTextEntry={visible}
                    leftIcon={
                        <Icon name='lock' type='feather' color='#bdc3c7'/>
                    }
                    rightIcon={
                        visible == true ?
                        <Icon name='eye' type='feather' color='#bdc3c7' onPress={()=>setVisible(false)}/>
                        :
                        <Icon name='eye-off' type='feather' color='#bdc3c7' onPress={()=>setVisible(true)}/>
                    }
                    />
            <Text>By signing up, you're agree to our 
                <Text style={{fontWeight:'bold',color:'#00a8ff'}}> Terms & Conditions</Text> and <Text style={{fontWeight:'bold',color:'#00a8ff'}}> Privacy Policy</Text>
            </Text>
            
            <Button 
                title='Continue'
                containerStyle={{borderRadius:10,marginTop:hp(2)}}
                buttonStyle={{backgroundColor:'#00a8ff'}}
                onPress={btRegister}
            />
            <View style={{marginTop:hp(2),marginBottom:hp(2)}}>
                <Text style={{textAlign:'center'}}>
                    Joined us before ?
                    <Text style={{fontWeight:'bold',color:'#00a8ff'}} onPress={()=>props.navigation.navigate('Login')}> Login</Text>
                </Text>
            </View>
            </KeyboardAvoidingView>
        </View>
    )

}

export default RegisterPage;