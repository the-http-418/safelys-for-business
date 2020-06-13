import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Alert, Button, TextInput} from 'react-native';
import * as SecureStore from 'expo-secure-store';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer_count: 0,
      store_name:"NOT DEFINED",
      old_count: 0,
    };
    SecureStore.getItemAsync('customer_count').then((value) =>{
      this.state.customer_count = parseInt(value);
      if(!this.state.customer_count){
        this.state.customer_count = 0;
      }
    });
    SecureStore.getItemAsync('store_name').then((value) =>{
      if(value){
        this.state.store_name = value;
      }
    });
  }

  componentDidMount(){
    this.timer = setInterval(()=> this.getMovies(), 1000)
  }

  async getMovies(){
    if(this.state.old_count != this.state.customer_count){
      const { customer_count } = this.state;
      this.setState({old_count:parseInt(customer_count)});
      Alert.alert("Change")
      fetch('https://http418-safely-app.herokuapp.com/update_count', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_count: this.state.customer_count,
          store_name: this.state.store_name,
        }),
      });
    }
  }



  empty() {
    this.setState({customer_count:0});
  }

  addCount() {
    const { customer_count } = this.state;
    this.setState({customer_count:parseInt(customer_count)+1});
  }

  lessCount() {
    const { customer_count } = this.state;
    if(this.state.customer_count != 0){
      this.setState({customer_count:parseInt(customer_count)-1});
    }
    SecureStore.setItemAsync('customer_count', toString(this.state.customer_count));
  }

  onRegister() {
    const { customer_count } = this.state;
    this.state.customer_count +=1;
    SecureStore.setItemAsync('customer_count', toString(this.state.customer_count));
    //`${ customer_count }` += 1;
    Alert.alert( `${customer_count} Customer limit set`);
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView style={styles.containerScroll} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.inputminus}>{this.state.customer_count}</Text>
        <Button
          title={'+'}
          style={styles.inputminus}
          onPress={this.addCount.bind(this)}
        ></Button>
        <Button
          title={'-'}
          style={styles.inputminus}
          onPress={this.lessCount.bind(this)}
        />
        <Button
          title={'Clear Count'}
          style={styles.inputminus}
          onPress={this.empty.bind(this)}
        />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerScroll: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  inputplus: {
    width: 500,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    color: 'black'
  },
  inputminus: {
    width: 200,
    height: 200,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    color: 'black',
  },
  contentContainer: {
    paddingTop: 30,
  },
});
