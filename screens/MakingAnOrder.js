import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {RadioButton} from '../components/RadioButton.js'
import AsyncStorage from '@react-native-community/async-storage';

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
    this.state = {
      deliveryMethod: '',
      paymentMethod: '',
      name: '',
      postalCode: '',
      town: '',
      address: '',
      address2: ''
    };
  }
  
  makeAnOrder = async () => {
    if( this.state.deliveryMethod != '' && this.state.paymentMethod != '' &&
        this.state.name != '' && this.state.postalCode != '' &&
        this.state.town != '' && this.state.address != '' ) {
      try {
        this.setState({'date': new Date().toDateString()});
        const value = await AsyncStorage.getItem('shoppingCart');
        let shoppingCart = JSON.parse(value);
        let products = [];
        let index;
        for(let i = 0; i < shoppingCart.contents.length; i++){
          index = products.findIndex(x => x.productId === shoppingCart.contents[i].id);
          if(index > -1) {
            products[index] = {'productId': products[index].productId, 'amount': products[index].amount + 1};
          } else {
            products.push({'productId': shoppingCart.contents[i].id, 'amount': 1});
          }
        }
        await fetch('https://online-shop-psm.herokuapp.com/orders/makeOrder', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"products": products}),
        });
        await AsyncStorage.setItem('shoppingCart', JSON.stringify({ contents:[] }));
        
        let orders = await AsyncStorage.getItem('orders');
        if(orders == null) {
          orders = [];
        } else {
          orders = JSON.parse(orders);
        }
        orders.push({'orderData': this.state, 'orderProducts': products});
        await AsyncStorage.setItem('orders', JSON.stringify(orders));
        this.props.refreshCallback();
        Navigation.pop(this.props.componentId);
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('Wypełnij wszystkie pola!');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{flex: 3}}>
            <Text>Wybierz sposób dostawy:</Text>
            <View style={{flex: 1, alignContent: 'flex-start'}}>
              <TouchableOpacity style={styles.radioButton} onPress={() => this.setState({'deliveryMethod': 'Poczta Polska'})}>
                <RadioButton selected={this.state.deliveryMethod == 'Poczta Polska'}/>
                <Text> Poczta Polska</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.radioButton} onPress={() => this.setState({'deliveryMethod': 'Kurier DPD'})}>
                <RadioButton selected={this.state.deliveryMethod == 'Kurier DPD'}/>
                <Text> Kurier DPD</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 4}}>
            <Text>Wybierz sposób zapłaty:</Text>
            <View style={{flex: 1}}>
              <TouchableOpacity style={styles.radioButton} onPress={() => this.setState({'paymentMethod': 'Karta płatnicza'})}>
                <RadioButton selected={this.state.paymentMethod == 'Karta płatnicza'}/>
                <Text> Karta płatnicza</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.radioButton} onPress={() => this.setState({'paymentMethod': 'Przelew bankowy'})}>
                <RadioButton selected={this.state.paymentMethod == 'Przelew bankowy'}/>
                <Text> Przelew bankowy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.radioButton} onPress={() => this.setState({'paymentMethod': 'Przelew PayPal'})}>
                <RadioButton selected={this.state.paymentMethod == 'Przelew PayPal'}/>
                <Text> Przelew PayPal</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 8}}>
            <Text>Uzupełnij adres dostawy:</Text>
            <TextInput
              placeholder='Imię i nazwisko'
              style={styles.input}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
            />
            <View style={{flexDirection: 'row'}}>
              <TextInput
                placeholder='Kod pocztowy'
                style={[styles.input, {flex: 4}]}
                onChangeText={(postalCode) => this.setState({postalCode})}
                value={this.state.postalCode}
              />
              <TextInput
                placeholder='Miejscowość'
                style={[styles.input, {flex: 9}]}
                onChangeText={(town) => this.setState({town})}
                value={this.state.town}
              />
            </View>
            <TextInput
              placeholder='Adres'
              style={styles.input}
              onChangeText={(address) => this.setState({address})}
              value={this.state.address}
            />
            <TextInput
              placeholder='Adres 2 (opcjonalne)'
              style={styles.input}
              onChangeText={(address2) => this.setState({address2})}
              value={this.state.address2}
            />
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => this.makeAnOrder()}>
              <Text style={styles.button}>Złóż i opłać zamówienie</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    margin: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 3
  },
  radioButton: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    margin: 2
  },
  button: {
    padding: 12,
    backgroundColor: '#BDFFBD',
    borderRadius: 10,
    textAlign: 'center'
  }
});
