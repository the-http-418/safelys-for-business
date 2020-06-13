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
  }

  onRegister() {
    const { store_name, max_customers } = this.state;
    SecureStore.setItemAsync('customer_count', '0');
    SecureStore.deleteItemAsync('customer_count');
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
