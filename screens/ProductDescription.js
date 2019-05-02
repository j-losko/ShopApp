import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';

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
  
  addToShoppingCart = async() => {
    try {
      let shoppingCart;
      const value = await AsyncStorage.getItem('shoppingCart');
      if (value == null) {
        shoppingCart = { contents:[] };
      } else {
        shoppingCart = JSON.parse(value);
      }
      shoppingCart.contents.push(this.props.product);
      await AsyncStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    } catch (error) {
      alert('Błąd AsyncStorage koszyka!');
    }
  }
  
  removeFromShoppingCart = async() => {
    try {
      const value = await AsyncStorage.getItem('shoppingCart');
      let shoppingCart = JSON.parse(value);
      for(let i = 0; i < shoppingCart.contents.length; i++){ 
        if(shoppingCart.contents[i].id === this.props.product.id) {
          shoppingCart.contents.splice(i, 1);
          break;
        }
      }
      await AsyncStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
      this.props.refreshCallback();
      Navigation.pop(this.props.componentId);
    } catch (error) {
      alert('Błąd AsyncStorage koszyka!');
    }
  }
  
  render() {
    let button;
    if(this.props.showWhichButton == 'addToShoppingCart') {
      button = <TouchableOpacity onPress={() => this.addToShoppingCart()}>
                 <View style={styles.buttonView}>
                   <Image source={require('../assets/add.png')} style={styles.buttonImage}/>
                   <Text style={styles.button}>Dodaj do koszyka</Text>
                 </View>
               </TouchableOpacity>;
    } else {
      button = <TouchableOpacity onPress={() => this.removeFromShoppingCart()}>
                 <View style={styles.buttonView}>
                   <Image source={require('../assets/trash.png')} style={styles.buttonImage}/>
                   <Text style={styles.button}>Usuń z koszyka</Text>
                 </View>
               </TouchableOpacity>;
    }
  
    return (
      <View style={styles.container}>
        <View style={{flex: 3, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Image style={styles.image} source={{uri: this.props.product.image}}/>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text>{this.props.product.name}</Text>
            <Text>Cena: {this.props.product.price} zł</Text>
          </View>
        </View>
        <View style={{flex: 3}}>
          <View>
            <Text>Opis:</Text>
            <Text>{this.props.product.description}</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View>
            {button}
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
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#1DFF00',
    color: 'white',
    padding: 10,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    height: 32,
    width: 32
  }
});
