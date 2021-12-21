import React from 'react';
import { View } from 'react-native';
import { Card, Image, Text } from 'react-native-elements';

const DetailTransaction = (props) =>{

    let {invoice,date,note,totalPayment,ongkir,detail,status,id,iduser,username,tax} = props.route.params.detail


    const printProduct=()=>{
        return detail.map((value,index)=>{
            return <Card containerStyle={{padding:10,margin:0,marginBottom:8}}>
                <View style={{flexDirection:'row'}}>
                    <Image source={{uri:value.images}} style={{width:50,height:50}}/>
                    <View style={{marginLeft:8}}>
                        <Text style={{fontWeight:'bold'}}>{value.nama}</Text>
                        <Text style={{fontSize:12}}>{value.qty} x {value.harga}</Text>
                    </View>
                </View>
                <Card.Divider/>
                <View>
                    <Text style={{fontSize:12}}>Total Price</Text>
                    <Text style={{fontWeight:'bold'}}>Rp. {value.qty*value.harga}</Text>
                </View>
            </Card>
        })
    }

    const printTotalPayment = () =>{
        let total = 0;
        detail.forEach((val,idx)=>{
            total += val.totalHarga
        })
        return total
    }

    return (
        <View style={{flex:1}}>
            <Card containerStyle={{padding:5,margin:0}}>
                <Text style={{fontSize:16,fontWeight:'bold',marginVertical:5,borderBottomWidth:0.5}}> {status}</Text>
                <Text style={{color:'gray',marginVertical:5}}>{invoice}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{color:'gray'}}>Tanggal Pembelian</Text>
                    <Text style={{color:'gray'}}>{date}</Text>                  
                </View>
            </Card>
            <Card containerStyle={{padding:5,margin:0,marginTop:10}}>
                <Card.Title style={{textAlign:'left'}}>Detail Product</Card.Title>
                {printProduct()}
            </Card>
            <Card containerStyle={{padding:5,margin:0,marginTop:10}}>
                <Card.Title style={{textAlign:'left'}}>
                    Payment Detail
                </Card.Title>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>Total Price</Text>
                    <Text>IDR {printTotalPayment()}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>Tax</Text>
                    <Text>IDR {tax}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>Shipping</Text>
                    <Text>IDR {ongkir}</Text>
                </View>
                <Card.Divider/>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontWeight:'bold'}}>Total Payment</Text>
                    <Text style={{fontWeight:'bold'}}>IDR {totalPayment}</Text>
                </View>
            </Card>
        </View>
    )
}

export default DetailTransaction;