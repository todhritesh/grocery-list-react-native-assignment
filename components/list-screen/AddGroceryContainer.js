import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddGroceryContainer({setTempList, groceryList, setGroceryList, groceryInput, setInput, disableSubmit, setDisableSubmit }) {
    
    async function storeData(data){
        try{
          await AsyncStorage.setItem("lists",JSON.stringify(data));
        }catch(err){
          console.log(err)
        }
      }

    function handleInput(val) {
        if (val === "") {
            setDisableSubmit(true)
            setInput("")
            return
        }
        setDisableSubmit(false)
        setInput(val)
    }

    function handleSubmit() {
        const data = {
            status: false,
            grocery: groceryInput
        }

        const temp_data = [...groceryList, data]

        setGroceryList(temp_data);
        setTempList(temp_data);
        storeData(temp_data)
        setInput("");
        setDisableSubmit(true)
    }
    return (
        <View style={styles.AddGroceryContainer}>
            <View style={styles.addGroceryInput}>
                <TextInput placeholderTextColor="grey" value={groceryInput} onChangeText={(val) => handleInput(val)} placeholder='Write sometthing...' style={{ fontSize: 18, paddingHorizontal: 15 ,height:50, color:"black" }} />
            </View>
            <View style={styles.addgroceryButton}>
                <TouchableOpacity onPress={() => handleSubmit()} disabled={disableSubmit} >
                    <AntDesign name='pluscircleo' size={40} color={`${disableSubmit ? "grey" : "green"}`} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    AddGroceryContainer: {
        paddingTop: 10,
        paddingBottom: 20,
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
        width: "100%",
        alignItems: 'center',
    },
    addGroceryInput: {
        flex: 3,
        borderWidth: .5,
        borderColor: "black",
        borderRadius: 40,
        fontSize: 30,
        height: 50,
    },
    addgroceryButton: {
        paddingLeft: 10,
    }
})