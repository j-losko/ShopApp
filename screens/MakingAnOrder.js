import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {RadioButton} from '../components/RadioButton.js'

//równo radio buttons mają być


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
  
  makeAnOrder = () => {
    if( this.state.deliveryMethod != '' && this.state.paymentMethod != '' &&
        this.state.name != '' && this.state.postalCode != '' &&
        this.state.town != '' && this.state.address != '' ) {
      alert('Złożone zamówienie!');
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
              <Text style={{padding: 10, backgroundColor: 'green'}}>Złóż i opłać zamówienie</Text>
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
    marginVertical: 5
  },
  radioButton: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
	margin: 2
  },
});
