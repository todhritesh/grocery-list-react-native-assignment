import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import FeatherIcon from 'react-native-vector-icons/Entypo';

const Search = ({setShowSearch,tempList,setGroceryList}) => {
    const [searchInput,setSearchInput] = React.useState('')

    const handleSearch = (val) =>{
        if (val === "") {
            setSearchInput("")
            setGroceryList(tempList)
            return
        }
        setSearchInput(val)
        setGroceryList(tempList.filter((item,i)=>item.grocery.toLowerCase().includes(val.toLowerCase())))
    }

  return (
    <View style={styles.addgroceryContainer}>
        <View style={styles.searchGroceryInput}>
            <TextInput placeholderTextColor="grey" value={searchInput} onChangeText={(val) => handleSearch(val)} placeholder='Search sometthing...' style={{ fontSize: 15, paddingHorizontal: 15 , color:"black",height:40 }} />
        </View>
        <View style={styles.addgroceryButton}>
            <TouchableOpacity onPress={()=>setShowSearch((val)=>!val)}  activeOpacity={.5} >
                <FeatherIcon name='circle-with-cross' size={30}  />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    addgroceryContainer: {
        paddingTop: 10,
        paddingRight: 5,
        paddingLeft: 5,
        flexDirection: 'row',
        justifyContent: "space-between",
        width: "100%",
        alignItems: 'center',
    },
    searchGroceryInput: {
        flex: 3,
        borderWidth: .5,
        borderColor: "black",
        borderRadius: 40,
        fontSize: 30,
        height: 40,
    },
    addgroceryButton: {
        paddingLeft: 10,
    }
})