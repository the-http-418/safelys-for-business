import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Component } from 'react';
import { Image,StyleSheet, Text, View,TouchableOpacity,Alert} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
//import { Avatar } from "react-native-elements";
import { SafeAreaView,FlatList} from 'react-native';
import Constants from 'expo-constants';
function Item({ shop }) {
const {store_name,customer_count,max_customers,store_size,employee_count} = shop

  return (
    <View style={styles.item}>
      <Text style={styles.maintitle}>Suresh Singh</Text>
        <Text style={styles.title}>15 Items</Text>
        <Text style={styles.title}>Rs. 1578</Text>
        <Text style={styles.title}>Aplha Sunrise Apartments</Text>
    </View>
  );
}


export default class StoreListScreen extends Component {
  state = {
    longitude:null,
    latitude:null,
    dataSource:null,
    isLoading:true,
    test: false
  };
  async getStores()
  {
    fetch('https://http418-safely-app.herokuapp.com/get_order_data', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        store_name: this.state.store_name
      }),
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log(response)
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson.data,
        },
        function() {
          console.log(this.state.dataSource)
        });
      })
      .catch(error => {
        console.error(error);
      });
    }
  componentDidMount() {
  //this.timer = setInterval(()=> this.getStores(), 300000)
  }

render()
{
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    <Text style={styles.checkwelcome}>Pending Orders</Text>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={this.state.dataSource}
        renderItem={({ item }) => <Item shop={item} />}
        keyExtractor={item => item.shop_name}
      >
      </FlatList>
      <Text>Suresh Singh</Text>
        <Text style={styles.titlsse}>15 Items</Text>
        <Text style={styles.titless}>Rs. 1578</Text>
        <Text style={styles.titlsse}>Aplha Sunrise Apartments</Text>
<Text></Text>
        <Text>Sanskriti Pattanayak</Text>
          <Text style={styles.titlsse}>10 Items</Text>
          <Text style={styles.titless}>Rs. 483</Text>
          <Text style={styles.titlsse}>Grove Street</Text>
    </SafeAreaView>
    </ScrollView>
  );
}

}


const styles = StyleSheet.create({
  profdeet : {
    color:'black',
    fontSize : 18,
    textAlign:'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    marginTop: Constants.statusBarHeight,
  },
  welcome: {
    fontSize:18
  },
  checkwelcome: {
    fontSize:18,
    fontWeight:'bold',
    color:'green',
    textAlign:'center'
  },
  contentContainer: {
    paddingTop: 15,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  item: {
    backgroundColor: '#000000',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  maintitle: {
    fontSize: 18,
    fontWeight : 'bold',
    color:'#FFFFFF'
  },
  title: {
    fontSize: 16,
    color:'#C0C0C0'
  },
});
