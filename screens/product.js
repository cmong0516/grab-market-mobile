import axios from "axios";
import React, { useEffect, useState } from "react";
import {ScrollView, Text, ActivityIndicator, StyleSheet, View, Image, TouchableOpacity, Alert} from "react-native";
import { API_URL } from "../config/constants";
import Avatar from "../assets/icons/avatar.png";
import dayjs from "dayjs"

export default function ProductScreen(props){
    const {id} = props.route.params;
    const [product,setProduct] = useState(null);
    useEffect(()=>{
        axios.get(`${API_URL}/products/${id}`)
        .then((result)=>{
            console.log('product result: ', result.data)
            setProduct(result.data.product)
        }).catch((error)=>{
            console.error(error);
        });
    },[]);

    const onPressButton = () => {
        if(!product.soldout){
            Alert.alert('구매가 완료되었습니다.')
        }
    };

    if(!product){
        return <ActivityIndicator />;
    }

    return (
            <View style={styles.container}>
                <ScrollView>
                <View>
                    <Image style={styles.productImage} source={{uri : `${API_URL}/${product.imageUrl}`}} resizeMode="contain"/>
                </View>
                <View style={styles.productSection}>
                    <View style={styles.productSeller}>
                        <Image source={Avatar} style={styles.avatarImage}/>
                        <Text>{product.seller}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}>{product.price}원</Text>
                        <Text style={styles.productDate}>{dayjs(product.createdAt).format('YYYY년 MM월 DD일')}</Text>
                        <Text style={styles.productDescription}>{product.description}</Text>
                    </View>
                </View>
                </ScrollView>
                <TouchableOpacity onPress={onPressButton}>
                    <View style={product.soldout === 1 ? styles.purchaseDisabled : styles.purchaseButton}>
                        <Text style={styles.purchaseText}>{product.soldout === 1 ? '구매완료' : "구매하기"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff"
    },
    productImage:{
        width:'100%',
        height: 300,
    },
    productSeller:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatarImage:{
        width:50,
        height:50,
    },
    productSection:{
        padding: 8
    },
    divider:{
        backgroundColor: '#e9ecef',
        height:1,
        marginVertical: 16,
    },
    productName: {
        fontSize:20,
        fontWeight: '400',
    },
    productPrice:{
        fontSize: 18,
        fontWeight: '700',
        marginTop: 8,
    },
    productDate:{
        fontSize: 14,
        marginTop: 14,
        color:'rgb(204,204,204)'
    },
    productDescription: {
        marginTop: 16,
        fontSize: 17
    },
    purchaseButton:{
        position: "absolute",
        bottom:0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: "rgb(255,80,88)",
        alignItems: "center",
        justifyContent: "center",
    },
    purchaseText:{
        color: "white",
        fontSize: 20,
    },
    purchaseDisabled:{
        position: "absolute",
        bottom:0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center",
    }
})