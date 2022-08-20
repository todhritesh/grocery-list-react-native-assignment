import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function GroceryContainer({ groceryList, setGroceryList,setTempList }) {

    async function storeData(data){
        try{
          await AsyncStorage.setItem("lists",JSON.stringify(data));
        }catch(err){
          console.log(err)
        }
      }

    function handleRemovegrocery(index) {
        const temp_data = groceryList.filter(((item, i) => (i !== index)))
        setGroceryList(temp_data)
        setTempList(temp_data)
        storeData(temp_data)
    }

    function handleCompletedgrocery(index) {
        const data = groceryList.map((item, i) => {
            if (i === index) {
                item.status = true
                return item;
            }
            return item;
        })
        storeData(data)
        setGroceryList(data);
        setTempList(data);
    }

    return (
        <View style={styles.groceryListContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {
                    groceryList.map((item, i) => (

                        <View key={i} style={{ ...styles.groceryListItem, backgroundColor: `${item.status ? "#b1ffb0e6" : "white"}` }} >
                            <View style={styles.groceryImage}></View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.groceryTitle}>{item.grocery}</Text>
                            </View>
                            <View style={styles.groceryAction}>
                                {
                                    !item.status &&
                                    <View style={styles.groceryCompleted} >
                                        <TouchableOpacity
                                            onPress={() => handleCompletedgrocery(i)}
                                        >
                                            <EntypoIcon name="check" size={30} color="green" />
                                        </TouchableOpacity>
                                    </View>
                                }
                                <View style={styles.groceryDelete} >
                                    <TouchableOpacity
                                        onPress={() => handleRemovegrocery(i)}
                                    >
                                        <EntypoIcon name="cross" size={30} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    ))
                }

                {
                    !groceryList.length &&
                    <View style={styles.groceryListItem} >
                        <View style={styles.groceryImage}></View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.groceryTitle}>Enter grocery name </Text>
                        </View>
                        <View style={styles.groceryAction}></View>
                    </View>
                }

            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    groceryListContainer: {
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1
    },
    groceryListItem: {
        borderRadius: 10,
        backgroundColor: "white",
        padding: 7,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 20,
        elevation: 15,
        alignItems: 'center'
    },
    groceryTitle: {
        fontSize: 17,
        color: 'black'
    },
    groceryImage: {
        width: 25,
        height: 25,
        backgroundColor: '#81ecec',
        marginRight: 15,
        borderRadius: 8
    },
    groceryAction: {
        flex: 1,
        fontSize: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    groceryCompleted: {
        marginRight: 5
    },
    groceryDelete: {

    },
})