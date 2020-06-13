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
      <Text style={styles.maintitle}>{store_name}</Text>
        <Text style={styles.title}>Filled Capacity : {customer_count} \ {max_customers} </Text>
        <Text style={styles.title}>Store Area (sq.ft) : {store_size} </Text>
        <Text style={styles.title}>Employee Count : {employee_count} </Text>
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
  this.timer = setInterval(()=> this.getStores(), 300000)
  }

    findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
        const longitude = JSON.stringify(position.coords.longitude);
				this.setState({ longitude });
        const latitude = JSON.stringify(position.coords.latitude)
        this.setState({latitude});
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};

render()
{
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    <Text style={styles.checkwelcome}>Pending Orders</Text>
    <TouchableOpacity onPress={this.findCoordinates}>
					<Text style={styles.welcome}>Find My Coords?</Text>
					<Text style={styles.welcome}>Longitude: {this.state.longitude}</Text>
          <Text style={styles.welcome}>Latitude: {this.state.latitude}</Text>
				</TouchableOpacity>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={this.state.dataSource}
        renderItem={({ item }) => <Item shop={item} />}
        keyExtractor={item => item.shop_name}
      />
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
