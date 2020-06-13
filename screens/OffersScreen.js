import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Alert, Button, TextInput} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store_name: '',
      offer_name:'',
      product:'',
      discount_percentage:'',
      start:'',
      end:'',
    };
  }

  onRegister() {
    SecureStore.getItemAsync('store_name').then((value) =>{
      if(value){
        this.state.store_name = value;
      }
    });
    const { offer_name, product, discount_percentage, start, end} = this.state;
    fetch('https://http418-safely-app.herokuapp.com/add_new_offer', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        store_name: this.state.store_name,
        offer_name:this.state.offer_name,
        product:this.state.product,
        discount_percentage:this.state.discount_percentage,
        start:this.state.start,
        end:this.state.end
      }),
    });
    Alert.alert(`${offer_name}`, `${product} Special Offer Created`);
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView style={styles.containerScroll} contentContainerStyle={styles.contentContainer}>
        <TextInput
          value={this.state.offer_name}
          onChangeText={(offer_name) => this.setState({ offer_name })}
          placeholder={'Offer Name'}
          style={styles.input}
        />
        <TextInput
          value={this.state.product}
          onChangeText={(product) => this.setState({ product })}
          placeholder={'Product'}
          style={styles.input}
        />
        <TextInput
          value={this.state.discount_percentage}
          onChangeText={(discount_percentage) => this.setState({ discount_percentage })}
          placeholder={'Discount %'}
          style={styles.input}
        />
        <TextInput
          value={this.state.start}
          onChangeText={(start) => this.setState({ start })}
          placeholder={'Start Date'}
          style={styles.input}
        />
        <TextInput
          value={this.state.end}
          onChangeText={(end) => this.setState({ end })}
          placeholder={'End Date'}
          style={styles.input}
        />

        <Button
          title={'Create Offer'}
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
