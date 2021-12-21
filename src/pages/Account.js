import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { Avatar, Icon, Overlay, Text, ListItem, Card, Input, Button } from 'react-native-elements';
import { widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import ImageCropPicker from 'react-native-image-crop-picker';
import { updateUser, updateUserPhoto } from '../actions';

const Account = (props) =>{

    // const [gambar,setGambar] = useState('https://www.clipartmax.com/png/middle/257-2572603_user-man-social-avatar-profile-icon-man-avatar-in-circle.png')
    
    const [visible,setVisible] = useState(false)

    const dispatch = useDispatch();

    const [passwordVisible,setPasswordVisible]=useState(true)

    
    const {iduser,username,email,password,role,status,photo} = useSelector((state)=>{
        return{
            iduser : state.userReducer.id, 
            username : state.userReducer.username, 
            email : state.userReducer.email, 
            password : state.userReducer.password, 
            role : state.userReducer.role, 
            status : state.userReducer.status, 
            photo : state.userReducer.photo, 
        }
    })

    const[editUsername,setEditUsername]=useState(username)
    const[editEmail,setEditEmail]=useState(email)
    const[editPassword,setEditPassword]=useState(password)
    const[inputVisible,setInputVisible]=useState(true)

    const onBtImage = async (type) =>{
        try{
            let image
            if(type=='gallery'){
                image = await ImageCropPicker.openPicker({
                    width:wp(40),
                    height:wp(40),
                    cropping:true,
                    mediaType:'photo'
                })
            }else if(type=='camera'){
                image = await ImageCropPicker.openCamera({
                    width:wp(40),
                    height:wp(40),
                    cropping:true,
                    mediaType:'photo'
                })
            }

            if(image.path){
                let res = await dispatch(updateUserPhoto(image.path,iduser))
                if(res.success){
                    setVisible(!visible)
                }
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const btEdit = ()=>{
        setInputVisible(!inputVisible)
    }


    console.log('user',editUsername)
    return(
        <View style={{flex:1,backgroundColor:'white',padding:20}}>
            <Overlay isVisible={visible} onBackdropPress={()=>setVisible(!visible)}>
                <ListItem containerStyle={{width:wp(65)}} onPress={()=>onBtImage('gallery')}> 
                    <Icon name="folder" type="feather" />
                    <ListItem.Content>
                        <ListItem.Title>Select From Gallery</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
                <ListItem containerStyle={{width:wp(65)}} onPress={()=>onBtImage('camera')}> 
                    <Icon name="camera" type="feather" />
                    <ListItem.Content>
                        <ListItem.Title>Open Camera</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>

            </Overlay>
            <ScrollView>
            <Avatar
                containerStyle={{alignSelf:'center',marginTop:16}}
                rounded
                size='xlarge'
                source={{uri:photo}}
                >
                <Avatar.Accessory
                    name='edit'
                    type='feather'
                    size={40}
                    iconStyle={{fontSize:20}}
                    color='white'
                    onPress={()=>setVisible(!visible)}
                    disabledStyle={{backgroundColor:'transparent'}}
                    />
            </Avatar>
            <View style={{marginTop:hp(3),paddingBottom:hp(1)}}>
            <Card containerStyle={{borderRadius:10}} >
                <Text style={{fontWeight:'bold'}}>Username</Text>
                <Input
                value={inputVisible? username:editUsername}
                onChangeText={(value)=>setEditUsername(value)}
                disabled={inputVisible}
                />
            </Card>
            <Card containerStyle={{borderRadius:10}}>
                <Text style={{fontWeight:'bold'}}>Email</Text>
                <Input
                value={inputVisible? email:editEmail}
                onChangeText={(value)=>setEditEmail(value)}
                disabled={inputVisible}
                />
            </Card>
            <Card containerStyle={{borderRadius:10}}>
                <Text style={{fontWeight:'bold'}}>Password</Text>
                <Input
                disabled={inputVisible}
                secureTextEntry={passwordVisible}
                value={inputVisible? password:editPassword}
                onChangeText={(value)=>setEditPassword(value)}
                rightIcon={
                    passwordVisible == true ?
                    <Icon name='eye' type='feather' color='#bdc3c7' onPress={()=>setPasswordVisible(false)} disabled={inputVisible} disabledStyle={{backgroundColor:'transparent'}}/>
                    :
                    <Icon name='eye-off' type='feather' color='#bdc3c7' onPress={()=>setPasswordVisible(true)} disabled={inputVisible}/>
                }
                />
            </Card>
            </View>
            <View style={{marginVertical:hp(2),flexDirection:'row',justifyContent:'space-around'}}>
            <Button
                title={inputVisible?'Edit':'Cancel'}
                containerStyle={{padding:10,width:wp(40)}}
                buttonStyle={{borderRadius:10}}
                onPress={btEdit}
                />
            <Button
                title='Save Change'
                containerStyle={{padding:10,width:wp(40)}}
                onPress={()=>{
                    dispatch(updateUser(editUsername,editEmail,editPassword,iduser))
                    setInputVisible(!inputVisible)
                }}
                disabled={inputVisible}
                buttonStyle={{borderRadius:10}}
                />
            </View>
            </ScrollView>
        </View>
    )
}

export default Account;