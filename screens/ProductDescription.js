import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';

type Props = {};
export default class ProductDescription extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Opis produktu'
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
        <View style={{flex: 3, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Image style={styles.image} source={require('../assets/phone.png')}/>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text>Nazwa produktu</Text>
            <Text>Cena: 10,00 zł</Text>
          </View>
        </View>
        <View style={{flex: 3}}>
          <View><Text>Opis:</Text><Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut lacus tincidunt, consectetur ipsum vitae, ullamcorper nibh. Aliquam semper felis vel ipsum commodo ornare. Phasellus fermentum molestie magna, non ornare ante porttitor ut. Vestibulum quis quam et felis tincidunt dignissim. Mauris sodales, orci sed tincidunt euismod, leo ligula vestibulum justo, vitae tempor erat erat vel nulla. Sed efficitur ultrices vulputate. Nullam pellentesque convallis eros, vel maximus augue venenatis eleifend. Proin commodo massa ut odio gravida tincidunt. Morbi faucibus bibendum urna sit amet vehicula. Aliquam erat volutpat. Sed id cursus velit, vitae faucibus magna. Maecenas eget nisl sodales, imperdiet orci non, dignissim metus. </Text></View>
        </View>
        <View style={{flex: 1}}>
          <View>
            <TouchableOpacity onPress={() => alert('Dodajemy!')}>
              <View>
                <Text style={{backgroundColor: 'green', color: 'white', padding: 10}}>+ Dodaj do koszyka</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain'
  }
});
