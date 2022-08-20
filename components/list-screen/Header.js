import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

export default function Header({setShowSearch}) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Grocery List</Text>
            <TouchableOpacity  onPress={()=>setShowSearch((val)=>!val)}  activeOpacity={.5} style={{}}>
                <AntDesignIcon  name="search1" color="black" size={25} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection:'row',
        justifyContent: "space-between",
        marginTop: 17,
        paddingLeft:5,
        paddingRight:5,
    },
    headerText: {
        fontSize: 25,
        fontWeight: "bold",
        color:"black",
    },
})