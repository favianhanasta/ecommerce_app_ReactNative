import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { Avatar, Badge, ButtonGroup, Icon, ListItem, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { logoutAction } from '../actions/userAction';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';

const ProfilePage =(props)=>{

    const dispatch = useDispatch()

    useEffect(() => {
        console.log("data dari reducer :", iduser)
        if (!iduser) {
            props.navigation.reset({
                index: 0,
                routes: [{ name: "Login" }]
            })
        }
    })

    const {username,email,role,status,iduser} = useSelector((state)=>{
        return {
            username : state.userReducer.username,
            email : state.userReducer.email,
            role : state.userReducer.role,
            status : state.userReducer.status,
            iduser : state.userReducer.id
        }
    })
    
    const [saldo,setSaldo] = useState([
        {
            nama : 'credit-card',
            title : 'Promo',
            qty : 7
        },
        {
            nama : 'award',
            title : 'Reward',
            qty : 7
        },
        {
            nama : 'dollar-sign',
            title : 'Saldo',
            qty : 7
        }  
    ])

    const [listMenu,setListMenu]=useState([
        {
            title :'Transactions',
            icon:'cart',
            press : ()=> props.navigation.navigate('History')
        },
        {
            title :'My Promo',
            icon:'card-bulleted-outline',
            press : ()=>{}
        },
        {
            title :'Address List',
            icon:'map',
            press : ()=>{}
        }
    ])

    const [menuSettings, setMenuSettings] = useState([
        {
            title: "Settings",
            icon: "cog-outline",
            press: () => { }
        },
        {
            title: "Privacy and Police",
            icon: "shield-account",
            press: () => { }
        },
        {
            title: "Logout",
            icon: "logout",
            press: () => {
                dispatch(logoutAction())
            }
        }
    ])

    const printListAccount = () =>{
        return listMenu.map((value,index)=>{
            return <ListItem key={index.toString()} onPress={value.press}>
                <Icon name={value.icon} size={25} type='material-community' color='#1B1464' />
                <ListItem.Content>
                    <ListItem.Title>{value.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron/>
            </ListItem>
        })
    }

    const printListSetting = () =>{
        return menuSettings.map((value,index)=>{
            return <ListItem key={index.toString()} onPress={value.press} >
                <Icon name={value.icon} size={25} type='material-community' color='#1B1464' />
                <ListItem.Content>
                    <ListItem.Title>{value.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron/>
            </ListItem>
        })
    }

    const printSaldo = () =>{
        return saldo.map((value,index)=>{
            return <View style={{flex:1, borderWidth:0.5,borderColor:'gray',padding:10,backgroundColor:'white',borderRadius:10,marginBottom:hp(3),}}>
                <Icon
                    size = {32}
                    type = 'feather'
                    name = {value.nama}
                   
                />
                <Text style={{fontWeight:'bold',fontSize:14,textAlign:'center'}}>{value.title}</Text>
                <Text style={{textAlign:'center'}}>{value.title == "Saldo" && "$"} {value.qty}</Text>
            </View>
        })
    }

    return(
        <View style={{flex:1,backgroundColor:'white',paddingTop:hp(7)}}>
            <View style={{backgroundColor:"#1B1464",paddingHorizontal:wp(3),paddingVertical:hp(4)}}>
                <View style={{ flexDirection: "row" }}>
                <Avatar
                rounded
                size="large"
                source = {{uri:'https://www.clipartmax.com/png/middle/257-2572603_user-man-social-avatar-profile-icon-man-avatar-in-circle.png'}}
                />
                <View style={{marginLeft:wp(5)}}> 
                    <Text style={{color:'yellow'}} h4 >{username} <Badge value={status} status='success'/></Text>
                    <Text style={{color:'white'}} >{email}</Text>                   
                </View>
                <Icon
                    size={28}
                    type='material-community'
                    name='account-edit'
                    color='white'
                />
                </View>
            <View style ={{paddingHorizontal:wp(3),flexDirection:'row',marginTop:hp(3)}}>
                {printSaldo()}
            </View>
            </View>
            <View style={{paddingHorizontal:wp(3),backgroundColor:'white',paddingTop:hp(2),borderTopLeftRadius:20,borderTopRightRadius:20,marginTop:hp(-3),paddingBottom:hp(5)}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{height:hp(100)}}>
                <View>
                    <Text h4>Account</Text>
                    {printListAccount()}
                </View>
                <View>
                    <Text h4>Settings</Text>
                    {printListSetting()}
                </View>
                </View>
            </ScrollView>
            </View>
        </View>
    )
}

export default ProfilePage;