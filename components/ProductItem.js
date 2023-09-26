import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProductItem = ({ item, index }) => {
    return (
        <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
            <Image style={{ width: 150, height: 150, resizeMode: "contain" }} source={{ uri: item?.image }} />
            <Text numberOfLines={2} style={{ width: 150, marginTop: 10 }}>{item?.title}</Text>
            <View style={{marginTop:5, flexDirection:"row", alignItems:"center", justifyContent:"space-between" }}>
                <Text style={{fontSize:15, fontWeight:"bold"}}>&#8377;{item?.price}</Text>
                <Text style={{color:"#ffc72c", fontWeight:"bold"}} >{item?.rating?.rate} ratings</Text>
            </View>
            <Pressable style={{backgroundColor:"#ffc72c", padding:10, borderRadius:20, justifyContent:"center", alignItems:"center", marginHorizontal:10, marginTop:10}}>
                <Text>Add to Cart</Text>
            </Pressable>
        </Pressable>
    )
}

export default ProductItem
