import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  Alert, KeyboardAvoidingView, StatusBar, View } from 'react-native';
import { Button, Icon, Image, Input, SocialIcon, Text } from 'react-native-elements';
import {heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../actions';
import { API_URL } from '../helper';

const LoginPage = (props) =>{

    const dispatch =  useDispatch();

    const {iduser,username} = useSelector((state)=>{
        return {
            iduser : state.userReducer.id,
            username : state.userReducer.username,
        }
    })

    useEffect(()=>{
        if(iduser){
            props.navigation.dispatch(StackActions.replace('TabNav'))
        }
    })

    const [inUsername,setInUsername] = useState('')
    const [inPassword,setInPassword] = useState('')
    const [visible,setVisible] = useState(true)

    const onBtLogin = async () =>{
        let respon = await dispatch(onLogin(inUsername,inPassword))
        if(respon.success>0){
            props.navigation.dispatch(StackActions.replace("TabNav"))
        }else{
            Alert.alert('Attention ⚠','This Account is Not Exist')
        }
        
    }

    return (
        <View style={{flex:1,backgroundColor:'white',paddingHorizontal:20}}>
            <StatusBar backgroundColor={'white'} barStyle='dark-content'/>
            <KeyboardAvoidingView behavior='position'>

            <Image source={require('../assets/login_asset.png')}
            style={{height:hp(35)}}
            />
            <Text h2 style={{color:'#1B1464'}}>Login</Text>
            <View style={{marginVertical:hp(2)}}>
                <Input placeholder='Username'
                    onChangeText={(val)=>setInUsername(val)}
                    leftIcon={
                        <Icon name='user' type='feather' color='#bdc3c7'/>
                    }
                    />
                <Input placeholder='Password'
                    onChangeText={(val)=>setInPassword(val)}
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
            </View>
            <Button 
                title='Login'
                containerStyle={{borderRadius:10}}
                buttonStyle={{backgroundColor:'#00a8ff'}}
                onPress={onBtLogin}
                />
            <Text style={{textAlign:'center',color:'grey',marginVertical:hp(2)}}>OR</Text>
            <Button 
                title='Login with Google'
                containerStyle={{borderRadius:10}}
                titleStyle={{color:'black'}}
                icon={<SocialIcon type='google' iconSize={10} raised={false}/>}
                buttonStyle={{backgroundColor:'#ecf0f1'}}
                />
            <View style={{marginTop:hp(2),marginBottom:hp(2)}}>
                <Text style={{textAlign:'center'}}>
                    No have account?
                    <Text 
                    style={{fontWeight:'bold',color:'#00a8ff'}} 
                    onPress={()=>props.navigation.navigate('Register')}
                    > Register</Text>
                </Text>
            </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default LoginPage;