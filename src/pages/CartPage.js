import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Image, Text, Icon,Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserChart } from '../actions/userAction';
import { API_URL } from '../helper';


const CartPage =()=>{

    const dispatch = useDispatch()

    const {iduser,cart,username} = useSelector((state)=>{
        return {
            iduser:state.userReducer.id,
            username:state.userReducer.username,
            cart : state.userReducer.cart
        }
    })

    // const [bill,setBill] =  useState({
    //     shipping : 0,
    //     tax : 0,
    //     total : 0
    // })

    const btIncrement = (index) =>{
        let temp = [...cart]
        temp[index].qty += 1
        temp[index].totalHarga += temp[index].harga
        dispatch(updateUserChart(iduser,temp))
    }

    const btDecrement = (index) =>{
        let temp = [...cart]
        if(temp[index].qty>1){
            temp[index].qty -= 1
            temp[index].totalHarga -= temp[index].harga
        }else{
            Alert.alert('Attention','Apakah anda ingin menghapus barang?',[
                {
                    text : 'OK',
                    onPress : ()=>btDelete(index)
                },
                {
                    text : 'Cancel'
                }
                
            ])
        }
        dispatch(updateUserChart(iduser,temp))
    }
    const btDelete =(index)=>{
        let temp = [...cart]
        temp.splice(index,1)
        dispatch(updateUserChart(iduser,temp))

    }

    const hargaTotal = () =>{
        let total=0
        cart.forEach((value,idx)=>{
            total += value.totalHarga
        })
        return total        
    }
    const shipping = () =>{
        let total=0
        cart.forEach((value,idx)=>{
            total += value.totalHarga
        })
        return total*20/100      
    }
    const tax = () =>{
        let total=0
        cart.forEach((value,idx)=>{
            total += value.totalHarga
        })
        return total*10/100        
    }
    
    const totalPayment = () =>{
        return hargaTotal()+shipping()+tax()
    }

    
    const btCheckout = () =>{
        const d = new Date();
        axios.post(`${API_URL}/userTransactions`,{
            iduser : iduser,
            username: username,
            invoice : `#INV/${d.getTime()}`,
            date : d.toLocaleString("id-ID"),
            note : '',
            totalPayment : totalPayment(),
            ongkir : shipping(),
            tax : tax(),
            detail : [...cart],
            status : 'Menunggu Konfirmasi'
       })
       .then((res)=>{
           dispatch(updateUserChart(iduser,[]))
           Alert.alert("Checkout berhasil")
       })
       .catch((err)=>{
           console.log(err)
       })
   }

    const printCart = () =>{
        if(cart){
            return cart.map((value,index)=>{
                return (
                    <View style={desain.cartBox}> 
                        <Image source={{uri:value.images}} 
                        style={{height:100,width:100,borderRadius:20,borderWidth:1,borderColor:'#dfe6e9'}}/>
                        <View style={{marginLeft:wp(4)}}>
                            <Text style={{fontSize:20,fontWeight:'800',color:'#2D4B6D'}}>{value.nama}</Text>
                            <Text style={{color:'#727A83',fontWeight:'700'}}>{value.type}</Text>
                            <View style={{flexDirection:'row',display:'flex',alignItems:'center',marginTop:hp(2)}}>
                                <Icon type='feather' name='minus' size={20} containerStyle={{backgroundColor:'#EBF5F8',padding:5,borderRadius:7}} color={'#0058AB'} onPress={()=>btDecrement(index)}/>
                                <Text style={{fontWeight:'700',fontSize:18,color:'#2D4B6D',marginHorizontal:wp(2)}}>{value.qty}</Text>
                                <Icon type='feather' name='plus' size={20} containerStyle={{backgroundColor:'#EBF5F8',padding:5,borderRadius:7}} color={'#0058AB'} onPress={()=>btIncrement(index)}/>
                            </View>
                        </View>
                        <View style={{marginLeft:'auto',flexDirection:'column'}}>
                        <Text style={{fontSize:18,fontWeight:'800',color:'#0058AB'}}>IDR. {value.totalHarga}</Text>
                        <Icon 
                        type='feather' name='trash-2' size={20} color={'#dfe6e9'} 
                        containerStyle={{marginLeft:'auto',marginTop:'auto',paddingBottom:hp(3)}} onPress={()=>btDelete(index)}
                        />
                        </View>
                    </View>
                )
            })
        }

        }

    return(
        <View style={{flex:1,backgroundColor:'white',paddingTop:hp(5)}}>

            <View style={{alignItems:'center'}}>
            <Text h4 style={{color:'#405B7A',fontWeight:'800'}}>
                Cart
            </Text>
            </View>
            <ScrollView>
            <View>
                {printCart()}
            </View>
            </ScrollView>
            <View style={{marginBottom:hp(6),padding:15}}>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{color:'#727A83'}}> Shipping </Text>
                    <Text style={{color:'#0058AB',fontWeight:'700'}}> IDR  {shipping()}</Text>
                </View>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginVertical:hp(1)}}>
                    <Text style={{color:'#727A83'}}> Tax </Text>
                    <Text style={{color:'#0058AB',fontWeight:'700'}}> IDR  {tax()}</Text>
                </View>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:hp(1)}}>
                    <Text style={{color:'#727A83'}}> Total </Text>
                    <Text style={{color:'#1B1464',fontWeight:'700',fontSize:20}}> IDR {hargaTotal()} </Text>
                </View>
                <Button
                    title={`Checkout IDR. ${totalPayment()}`}
                    type='clear'
                    containerStyle={{
                        borderRadius:25,
                        backgroundColor:'#FBD914'
                    }}
                    titleStyle={{
                        color:'#4FA4F3'
                    }}
                    onPress={btCheckout}
                    />
                </View>
        </View>
    )
}

const desain = StyleSheet.create({
    cartBox : {
        height:hp(20),
        width:wp(100),
        padding:15,
        flexDirection:'row',
        display:'flex',
    }
})
export default CartPage;