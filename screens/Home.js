import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, BackHandler} from 'react-native';
import {Navigation} from 'react-native-navigation';

type Props = {};
export default class App extends Component<Props> {
  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        passProps: {
          text: 'jakieś propsy możesz pasować'
        },
        /*options: {
          topBar: {
            title: {
              text: screenNameTopBar
            },
          }
        }*/
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => this.goToScreen('Catalog')}>
            <Text style={styles.buttonText}>Katalog produktów</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => this.goToScreen('ShoppingCart')}>
            <Text style={styles.buttonText}>Koszyk</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => this.goToScreen('Orders')}>
            <Text style={styles.buttonText}>Złożone zamówienia</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => BackHandler.exitApp()}>
            <Text style={styles.buttonText}>Wyjdź</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
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
	backgroundColor: '#ABCABC',
  },
  buttonText: {
    textAlign: 'center',
	fontSize: 12,
  }
});
