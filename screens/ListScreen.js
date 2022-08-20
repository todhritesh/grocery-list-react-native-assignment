import { View, StyleSheet} from 'react-native'
import React, { useState , useEffect } from 'react'
import Header from '../components/list-screen/Header';
import GroceryContainer from '../components/list-screen/GroceryContainer';
import AddGroceryContainer from '../components/list-screen/AddGroceryContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Search from '../components/list-screen/Search';

const ListScreen = () => {
  const [groceryList, setGroceryList] = useState([])
  const [tempList,setTempList] = useState([])
  const [disableSubmit, setDisableSubmit] = useState(true)
  const [groceryInput, setInput] = useState("")
  const [showSearch,setShowSearch] = useState(false);

  async function getData(){
    try {
      const data = await AsyncStorage.getItem('lists')
      if(data != null){
        const res = JSON.parse(data)
        setGroceryList(res);
        setTempList(res);
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getData();
  },[])
  
  return (
    <View style={styles.container}>

      {
        showSearch ?
        <Search setShowSearch={setShowSearch} tempList={tempList} setGroceryList={setGroceryList} />
        :
        <Header setShowSearch={setShowSearch} />
      }

      <GroceryContainer groceryList={groceryList} setGroceryList={setGroceryList} setTempList={setTempList} />

      <AddGroceryContainer disableSubmit={disableSubmit} setDisableSubmit={setDisableSubmit} groceryList={groceryList} setTempList={setTempList} setGroceryList={setGroceryList} groceryInput={groceryInput} setInput={setInput} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dfe6e9",
    position: 'relative',
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
})

export default ListScreen;

