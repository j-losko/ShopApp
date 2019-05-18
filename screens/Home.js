import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, BackHandler} from 'react-native';
import {Navigation} from 'react-native-navigation';

type Props = {};
export default class App extends Component<Props> {
  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => this.goToScreen('Catalog')}>
            <View style={styles.row}>
              <Image source={require('../assets/catalog.png')}/>
              <Text style={styles.buttonText}>Katalog produktów</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => this.goToScreen('ShoppingCart')}>
            <View style={styles.row}>
              <Image source={require('../assets/shoppingCart.png')}/>
              <Text style={styles.buttonText}>Koszyk</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => this.goToScreen('Orders')}>
            <View style={styles.row}>
              <Image source={require('../assets/clipboard.png')}/>
              <Text style={styles.buttonText}>Złożone zamówienia</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => BackHandler.exitApp()}>
            <View style={styles.row}>
              <Image source={require('../assets/powerOff.png')}/>
              <Text style={styles.buttonText}>Wyjdź</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    margin: 10,
    borderRadius: 10
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
