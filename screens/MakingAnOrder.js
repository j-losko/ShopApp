import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';

type Props = {};
export default class MakingAnOrder extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Składanie zamówienia'
        }
      }
    };
  }
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
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
});
