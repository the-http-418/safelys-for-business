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
      customer_count: '',
    };
    SecureStore.getItemAsync('customer_count').then((value) =>{
      //Alert.alert(value);
    });
  }


  addCount() {
    SecureStore.getItemAsync('customer_count').then((value) =>{
      var num = parseInt(value);
      num+=1;
      SecureStore.setItemAsync('customer_count', toString(num));
      Alert.alert(num);
    });

    //const { customer_count } = this.state;
    //`${ customer_count }` += 1;
    //Alert.alert( `${customer_count} Customer limit set`);
  }

  onRegister() {
    const { customer_count } = this.state;
    //`${ customer_count }` += 1;
    Alert.alert( `${customer_count} Customer limit set`);
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView style={styles.containerScroll} contentContainerStyle={styles.contentContainer}>
        <TextInput
          value={this.state.store_name}
          style={styles.input}
        />
        <Button
          title={'+'}
          style={styles.inputplus}
          onPress={this.addCount}
        />
        <Button
          title={'-'}
          style={styles.inputminus}
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
  inputplus: {
    width: '50%',
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    color: 'black'
  },
  inputminus: {
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
