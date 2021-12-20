import axios from 'axios';
import React, { useState } from 'react';
import { Alert, FlatList, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Image, Text,Icon, Button,Overlay, Input } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../helper';
import { StackActions } from '@react-navigation/native';
import { updateUserChart } from '../actions/userAction';
const DetailProduct = (props) =>{
    const {nama,deskripsi,harga,brand,images,stock,kategori} = props.route.params.detail
    const [activeType,setActiveType] = useState({})
    const [visibleOverlay, setVisibleOverlay] = useState(false)
    const [qty,setQty]=useState('1')

    let dispatch = useDispatch()

    const {iduser,cart} = useSelector((state)=>{
        return {
            iduser : state.userReducer.id,
            cart : state.userReducer.cart
        }
    })

    const printType =()=>{
        return stock.map((value,index)=>{
            if(activeType.type==value.type){
                return <Button title={value.type}
                    containerStyle={desain.btTypeActive}
                    type='clear'
                    titleStyle={{color:'white'}}
                    onPress={()=>btType(value)}
                />
            }else {
                return <Button title={value.type}
                    containerStyle={desain.btTypeOff}
                    type='clear'
                    onPress={()=>btType(value)}
                />
            }
        })
    }

    const toggleOverlay =()=>{
        setVisibleOverlay(!visibleOverlay)
    }

    const btType =(value)=>{
        setActiveType(value)
    }

    const onBtAddToChart = () =>{
        if(activeType.type){
            toggleOverlay()
            console.log('data type',activeType)
        }else{
            Alert.alert('Attention','choose product type first')
        }
    }

    const btAlert=()=>{
        setVisibleOverlay(false)
        setActiveType({})
        setQty('1')
    }

    const btSubmitCart = async()=>{
        try{ 
            if(parseInt(qty)>0 && iduser){
                let data={
                    images:images[0],
                    nama,
                    harga,
                    brand,
                    totalHarga : harga,
                    type : activeType.type,
                    qty : parseInt(qty),
                }
                let temp =[...cart]
                temp.push(data)
                let respon = await dispatch(updateUserChart(iduser,temp))
                if(respon.success){
                    Alert.alert('Success✔','Cart Berhasil ditambahkan',
                    [
                        {
                            text:'OK',
                            onPress: btAlert
                        }
                    ]
                    )
                }else{
                    Alert.alert('Add Cart Failed')
                }
            }
            else{
                Alert.alert('Attention','Input jumlah barang')
            }

        }catch(error){
            console.log(error)
        }
            // .then((res)=>{
            //     console.log('cart',res.data)
            // })
            // .catch((err)=>{
            //     console.log(err)
            // })
    }

    return (
        <View style={{flex:1,backgroundColor:'#F8F8F8',paddingTop:hp(5),padding:15}}>
            <StatusBar backgroundColor={'#F8F8F8'}/>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{backgroundColor:'white',padding:10,borderRadius:30}}>
            <View style={desain.boxIcon}>
            <Icon   
                name='chevron-left' 
                type='font-awesome' 
                color='#0058AB' 
                containerStyle={{width:30}} 
                onPress={()=>props.navigation.goBack()}/>
            <Icon   
                name='heart' 
                type='font-awesome' 
                color='grey' 
                containerStyle={{width:30,marginLeft:'auto'}} 
                />
            </View>
            <FlatList
                data={images}
                renderItem={({item})=>(
                    <Image 
                    source={{uri:item}} 
                    style={{height:hp(50),width:wp(92)}}
                    />  
                    )}
                    keyExtractor={(item,index)=>index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    />
            </View>
            <View style={desain.boxTitle}>
                <View>
                <Text h4 style={{color:'#405B7A'}}>{nama}</Text>
                <Text style={{fontSize:13,color:'grey',width:wp(50)}}>IKEA | {kategori}</Text>
                </View>
                <Text h3 style={{color:'#0058AB',marginLeft:'auto'}}>IDR {harga}</Text>
            </View>
            <View>
                <Text style={{paddingHorizontal:wp(3),color:'#405B7A',fontWeight:'800'}}>
                    Choose Type : <Text style={{color:'grey'}}>{stock.length} type,</Text>
                    <Text style={{color:'#405B7A',fontWeight:'800'}}>{activeType.qty} stock</Text> 
                </Text>
                <View style={desain.type}>
                    {printType()}
                </View>
                <Text style={{color:'#1b1464',fontWeight:'800',marginTop:20}}>Description</Text>
                <Text style={{textAlign:'justify',marginTop:10,height:hp(30)}}>
                    {deskripsi}
                </Text>
            </View>
            </ScrollView>
            <Button
                title='Add to Cart'
                type='clear'
                containerStyle={{
                    marginVertical:hp(1),
                    borderRadius:25,
                    backgroundColor:'#FBD914'
                }}
                titleStyle={{
                    color:'#4FA4F3'
                }}
                onPress={onBtAddToChart}
            />
            <View>
                <Overlay isVisible={visibleOverlay} onBackdropPress={toggleOverlay}>
                    <Input containerStyle={{width:wp(70)}} keyboardType='numeric' 
                    placeholder="Masukkan Jumlah Barang" value={qty} 
                    onChangeText={value=>setQty(value)} />
                    <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:"center",marginTop:hp(-2)}}  >
                    <Icon type='feather' name='plus-square' color="#FBD914" size={20}/>
                    <Text style={{ color:"#FBD914",marginLeft:wp(1),fontWeight:'700'}} onPress={btSubmitCart}>Submit</Text>     
                    </View>
                </Overlay>
            </View>
        </View>
    )
}

const desain = StyleSheet.create({
    boxTitle :{
        backgroundColor:'#F8F8F8',
        display:'flex',
        flexDirection:'row',
        paddingHorizontal:wp(3),
        paddingVertical :hp(3),
    },
    boxIcon :{
        backgroundColor:'white',
        display:'flex',
        flexDirection:'row',
        paddingHorizontal:wp(4),
        paddingVertical :hp(3)
    },
    type : {
        display : 'flex',
        flexDirection : 'row',
        marginTop:16,
    },
    btTypeActive :{
        borderRadius : 25,
        marginLeft:5,
        backgroundColor:'#4FA4F3',
        marginHorizontal: wp(2),
        paddingHorizontal:25
        
    },
    btTypeOff :{
        borderRadius : 25,
        marginLeft:5,
        marginHorizontal: wp(2),
        paddingHorizontal:25,
        borderWidth : 1,
        borderColor:'grey'
    }
})

export default DetailProduct;