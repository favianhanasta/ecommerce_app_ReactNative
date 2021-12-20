import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StatusBar, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, Header, Icon, Image, SearchBar, Text } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { API_URL } from '../helper';

const HomePage =(props)=>{

    const [category, setCategory] = useState(["Office","Kitchen Set","Living Room"])
    const [promo, setPromo] = useState(["Offers","What's New","Inspirations"])
    const [selectedKategori, setSelectKategori]=useState(0)
    const [selectedPromo, setSelectPromo]=useState(0)
    const [dataProduk,setDataProduk] = useState([])

    useEffect(()=>{
        getData()
    },[])

    const getData = () =>{
        axios.get(`${API_URL}/products`)
        .then((res)=>{
            setDataProduk(res.data)
        })
    }

    const printPromo=()=>{
        return promo.map((value,index)=>{
            return <Text
                style={selectedPromo==index?desain.promoAktif : desain.promoOff}
                key={index.toString()}
                >
                {value}
                </Text>
        })
    }

    const printKategori = () =>{
        return category.map((value,index)=>{
            return <Button
            title={value}
            buttonStyle={selectedKategori==index?desain.btKategoriActive : desain.btKategoriOff}
            titleStyle={selectedKategori==index?desain.titleActive : desain.titleOff}
            key={index.toString()}
            />
        })
    }

    const printProduct = () =>{
        return dataProduk.map((value,index)=>{
            return <TouchableWithoutFeedback key={index.toString()} onPress={()=>props.navigation.navigate('Detail',{detail : value})}>
            <View style={{width:wp(50)}}>
                        <View style={{paddingLeft:wp(4),marginBottom:hp(2)}}>
                        <Image source={{uri:`${value.images[0]}`}} style={{height:150,width:150}}/>
                        <Text style={{fontWeight:"700",fontSize:18,color:'#3B5777'}}>{value.nama}</Text>
                        <Text style={{color:'grey'}}>{value.kategori}</Text>
                        <Text h4 style={{color:'#0058AB'}}>IDR {value.harga}</Text>
                        </View>
                    </View>
            </TouchableWithoutFeedback> 
            
            
        })
    }

    return (
        <View style={{flex:1,backgroundColor:'white'}}>
            <StatusBar barStyle='dark-content'/>
            <Header
                backgroundColor='white'
                placement='left'
                centerComponent={
                    <SearchBar
                        placeholder='Search'
                        containerStyle={desain.searchBar}
                        inputContainerStyle={desain.inputSearch}
                    />
                }
                rightComponent={
                    <View style={{flexDirection:'row',flex:1,alignItems:'center',marginRight:10}}>
                        <Icon type="feather" size={20} name="maximize" />
                    </View>
                }
            />
            <View style={{height:hp(80)}}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flex:1, paddingHorizontal:wp(4)}}>
            <View style={desain.promo}>
                {printPromo()}
            </View>
            <View>
                <Text h2 style={{marginTop:hp(2),marginLeft:wp(3),color:'#1B1464'}}>Best Offer</Text>
                <Text style={{marginLeft:wp(3),color:'grey'}}>Get our products with best price</Text>
                <View style={desain.kategori}>
                    {printKategori()}
                </View>
            </View>
            </View>
            <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',marginTop:hp(2)}}>
                {printProduct()}
            </View>
            </ScrollView>
            </View>
        </View>
    )
}

const desain = StyleSheet.create({
    searchBar : {
        width : wp(60),
        backgroundColor: 'transparent',
        borderTopWidth : 0,
        borderBottomWidth : 0,
        padding: 0,
        marginLeft : wp(-2)

    }, 
    inputSearch: {
        backgroundColor : 'white',
        height : 40
    },
    promo:{
        display:"flex",
        flexDirection:"row", 
        justifyContent:"space-around",

    },
    promoAktif :{
        marginVertical : hp(2),
        textAlign : 'center',
        color : '#1264B1',
        fontWeight :'700',
        width:wp(35),
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20,
        borderColor:'#FDF0A3',
        borderBottomWidth:2,
        paddingBottom:hp(1)
        
    },
    promoOff : {
        marginVertical : hp(2),
        width:wp(35),
        textAlign : 'center',
        color : 'grey',
        fontWeight :'400',
    },
    kategori : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent :'space-around'
    },
    btKategoriActive :{
        width : wp(30),
        borderRadius : 20,
        marginTop : hp(3),
        backgroundColor:'#4FA4F3',
        paddingVertical:3
    },
    titleActive:{
        color:'white'
    },
    titleOff :{
        color:'grey'
    },
    btKategoriOff :{
        backgroundColor:'#F7FBFD',
        width : wp(30),
        borderRadius : 20,
        marginTop : hp(3),
        paddingVertical:3
    }
})
export default HomePage;