import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, BackHandler} from 'react-native';
import {Navigation} from 'react-native-navigation';

type Props = {};
export default class App extends Component<Props> {
  goToScreen = (screenName, screenNameTopBar) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        passProps: {
          text: 'Pushed screen'
        },
        options: {
          topBar: {
            title: {
              text: screenNameTopBar
            }
          }
        }
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.goToScreen('Catalog','Katalog produktów')}>
          <Text>Katalog produktów</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.goToScreen('ShoppingCart','Koszyk')}>
          <Text>Koszyk</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.goToScreen('Orders','Złożone zamówienia')}>
          <Text>Złożone zamówienia</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => BackHandler.exitApp()}>
          <Text>Wyjdź</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    height: 20,
    width: 50,
  },
  buttonText: {
	fontSize: 50
  }
});
