import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Badge, Card, Text,Button } from 'react-native-elements';
import axios from 'axios';
import { API_URL } from '../helper';
import { useSelector } from 'react-redux';
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen';


const HistoryPage=(props)=>{

    const [filter, setFilter] = useState(["Semua","Menunggu Konfirmasi","Terima Pesanan","Pesanan Batal"])
    const[data,setData] = useState([]) 
    const [statusIdx,setStatusIdx] = useState (0)
    const{iduser} = useSelector ((state)=>{
        return{
            iduser : state.userReducer.id
        }
    })

    useEffect(()=>{
        getData()
    },[])

    const getData=()=>{
        axios.get(`${API_URL}/userTransactions?iduser=${iduser}`)
        .then((res)=>{
            setData(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }


    const printFilter=()=>{
        return filter.map((value,index)=>{
            return <View
                style={statusIdx==index?desain.filterAktif:desain.filterOff}
                key={index.toString()}
                >
                <Text style={{textAlign : 'center',color : '#1264B1',fontWeight :'700',alignContent:'center'}} onPress={()=> getTransaksiFilter(value,index)}>{value}</Text>
                </View>
        })
    }

    const getTransaksiFilter=(status,statusActive)=>{
        axios.get(`${API_URL}/userTransactions?${statusActive > 0 ? `status=${status}&iduser=${iduser}` : `iduser=${iduser}`}`)
        .then((res)=>{
            setData(res.data)
            setStatusIdx(statusActive)
        }).catch((err)=>{
            console.log(err)
        })
    }

    console.log(data)
    const printHistory = () =>{
        return data.map((val,idx)=>{
            let badgeColor = val.status.includes('Konfirmasi') ?"warning" : val.status.includes('Batal') ?"error" : "success"
            return(
                <View key={idx.toString()} style={{borderWidth:0.5,marginBottom:hp(3),borderColor:'#b2bec3',borderRadius:15}}>
                    <View style={{backgroundColor:'#1B1464',padding:10,borderTopLeftRadius:15,borderTopRightRadius:15}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontSize:12,fontWeight:'bold',color:'white'}}>{val.invoice}</Text>
                        <Badge value={val.status} textStyle={{fontWeight:'bold'}} 
                            status={badgeColor}
                        />
                    </View >
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontSize:12,color:'white'}}>{val.date}</Text>
                    </View>
                    </View>
                    <View style={{flexDirection:'row',paddingHorizontal:wp(2),paddingVertical:hp(2),justifyContent:"space-between"}}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={{uri : val.detail[0].images}} style={{height:50,width:50}} />
                        <View style={{marginLeft:wp(2)}}>
                            <Text style={{fontWeight:'bold',fontSize:18}}>{val.detail[0].nama}</Text>
                            <Text style={{color:'grey'}}> {val.detail[0].qty} X IDR. {val.detail[0].harga} </Text>
                            {
                                val.detail.length>1?
                                <Text style={{color:'grey'}}> + {(val.detail.length)-1} produk lainnya </Text>
                                :null
                            }
                        </View>
                    </View>
                    <View>
                        <Text style={{fontWeight:'bold',fontSize:18,color:'grey'}}>Total</Text>
                        <Text style={{fontWeight:'bold',fontSize:18}}>IDR {val.totalPayment}</Text>
                    </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'flex-end',paddingVertical:hp(1)}}>
                        <Button
                        title='Batalkan Pesanan'
                        disabled = {badgeColor=='error'?true : false}
                        buttonStyle={{padding:3,backgroundColor:'red'}}
                        titleStyle={{fontSize:12,color:'white'}}
                        containerStyle={{margin:5}}
                        
                        />
                        <Text style={{padding:5,color:'#4FA4F3',marginHorizontal:wp(2),borderRadius:5}} onPress={()=>props.navigation.navigate('Transaction Detail',{detail:val})}>
                            Lihat Detail Produk
                        </Text>
                    </View>
                        
                </View>
            )
        })
    }

    return (
        <View style={{flex:1,backgroundColor:'white'}}>
            <View style={{flexDirection:'row',width:wp(100),marginVertical:hp(2),justifyContent:'space-around'}}>
                {printFilter()}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{padding:10}}>
            {printHistory()}
            </View>

            </ScrollView>
        </View>
    )
}

const desain = StyleSheet.create({
    filterAktif :{
        width:wp(23),
        borderColor:'#1B1464',
        borderBottomWidth:2,
        paddingBottom:hp(1),
        marginHorizontal:wp(2),
        justifyContent:"center"
            
    },
    filterOff :{
        width:wp(23),
        paddingBottom:hp(1),
        marginHorizontal:wp(2),
        justifyContent:"center"
            
    }
})


export default HistoryPage;