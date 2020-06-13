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
      store_name: '',
      store_size: '',
      location:'',
      employee_count:'',
      max_customers:'',
    };
    /*
    SecureStore.setItemAsync('store_name', "toString({store_name})");
    var mm = SecureStore.getItemAsync('store_name').then((value) =>{
      if(mm.store_name!=undefined){
        this.setState({store_name:value});
      }
      Alert.alert(typeof(mm.store_name))
    });
    this.setState({store_name:mm.store_name})
    SecureStore.getItemAsync('store_size').then((value) =>{
      if(value!=undefined){
        this.setState({store_size:value});
      }
    });
    SecureStore.getItemAsync('location').then((value) =>{
      if(value!=undefined){
        this.setState({location:value});
      }
    });
    SecureStore.getItemAsync('employee_count').then((value) =>{
      if(value){
        this.setState({employee_count:value});
      }
    });
    SecureStore.getItemAsync('max_customers').then((value) =>{
      if(value){
        this.setState({max_customers:value});
      }
    });
    */
  }

  onRegister() {
    const { store_name, store_size, location, employee_count, max_customers} = this.state;
    SecureStore.setItemAsync('store_name', toString({store_name}));
    SecureStore.setItemAsync('store_size', toString({store_size}));
    SecureStore.setItemAsync('location', toString({location}));
    SecureStore.setItemAsync('employee_count', toString({employee_count}));
    SecureStore.setItemAsync('max_customers', toString({max_customers}));
    fetch('https://http418-safely-app.herokuapp.com/new_store', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        store_name: this.state.store_name,
        store_size: this.state.store_size,
        location: this.state.location,
        employee_count: this.state.employee_count,
        max_customers: this.state.max_customers,
      }),
    });
    Alert.alert(`${store_name}`, `${max_customers} Customer limit set`);
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView style={styles.containerScroll} contentContainerStyle={styles.contentContainer}>
        <TextInput
          value={this.state.store_name}
          onChangeText={(store_name) => this.setState({ store_name })}
          placeholder={'Store Name'}
          style={styles.input}
        />
        <TextInput
          value={this.state.store_size}
          onChangeText={(store_size) => this.setState({ store_size })}
          placeholder={'Store Size'}
          style={styles.input}
        />
        <TextInput
          value={this.state.location}
          onChangeText={(location) => this.setState({ location })}
          placeholder={'Location'}
          style={styles.input}
        />
        <TextInput
          value={this.state.employee_count}
          onChangeText={(employee_count) => this.setState({ employee_count })}
          placeholder={'Employee Count'}
          style={styles.input}
        />
        <TextInput
          value={this.state.max_customers}
          onChangeText={(max_customers) => this.setState({ max_customers })}
          placeholder={'Max Customers'}
          style={styles.input}
        />

        <Button
          title={'Register'}
          style={styles.input}
          onPress={this.onRegister.bind(this)}
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
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    color: 'black'
  },
  contentContainer: {
    paddingTop: 30,
  },
});
