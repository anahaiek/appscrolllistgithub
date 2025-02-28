import React, { useState, useEffect }from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

//O useState permite que você armazene o estado de uma variável, e o useEffect serve para executar código após a renderização do componente.
//Importa o componente StatusBar do Expo para controlar a barra de status do dispositivo.



export default function App() {
  const baseURL ='https://api.github.com/';
  const perPage = 20;

  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadApi();
  },[]);

  async function loadApi(){
    if(loading) return;

    setLoading(true);
//https://api.github.com/search/repositories?q=react&per_page=5&page=1
    const response = await axios.get(`${baseURL}search/repositories?q=react&per_page=${perPage}&page=${page}`)
  
    setdata([...data, ...response.data.items]);
    setPage(page + 1);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista APIs do GitHub </Text>
    <FlatList
    style={{marginTop: 35}}
    contentContainerStyle={{marginHorizontal: 20}}
    data={data}
    keyExtractor={item => String(item.id)}
    renderItem={({item}) => <ListItem data={item} /> }
    onEndReached={loadApi}
    onEndReachedThreshold={0.1}//10%
    ListFooterComponent={ <FooterList load={loading} /> }

    />
    </View>
  );
}

function ListItem( {data} ){
  return(
    <View style={styles.listItem}>
      <Text style={styles.listText}>{data.full_name}</Text>
    </View>
  )
}

function FooterList({ load }){
  if(!load) return null;
  return(
    <View style={styles.loading}>
      <ActivityIndicator size={25} color='#121212'/>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  listItem:{
    backgroundColor: '#121212',
    padding:25,
    marginTop:20,
    borderRadius:10,
  },
  listText:{
    fontSize:16,
    color:'#FFF'
  },
  loading:{
    padding:10,
  },
  titulo:{
    marginTop:50,
    marginBottom:-20,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  }
});
