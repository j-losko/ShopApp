import React, {Component} from 'react';
import {Image, ListView, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

type Props = {};
export default class Catalog extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Katalog produktów'
        },
        rightButtons: [
          {
            id: 'buttonShoppingCart',
            icon: {
              uri: 'shoppingcart',
            },
          }
        ],
      }
    };
  }

  navigationButtonPressed({ buttonId }) {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ShoppingCart'
      }
    });
  }
 
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state = {
      refreshing: false,
      dataSource: ds.cloneWithRows([]),
      search: ''
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  fetchData = async() => {
    fetch('https://online-shop-psm.herokuapp.com/products/getProducts')
    .then(response => response.json())
    .then(json => this.setState({ dataSource: ds.cloneWithRows(json.products) }))
    .catch((error) => {
      alert(error.message);
    });
  }
  
  goToDescription = (props) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ProductDescription',
        passProps: {
          product: {'id': props.id, 'name': props.name, 'price': props.price, 'description': props.name, 'image': props.image},
          showWhichButton: 'addToShoppingCart'
        },
      }
    });
  }
  
  addToShoppingCart = async(product) => {
    try {
      let shoppingCart;
      const value = await AsyncStorage.getItem('shoppingCart');
      if (value == null) {
        shoppingCart = { contents:[] };
      } else {
        shoppingCart = JSON.parse(value);
      }
      shoppingCart.contents.push({'id': product.id, 'name': product.name, 'price': product.price, 'description': product.name, 'image': product.image}); //id ma być w stringu
      await AsyncStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    } catch (error) {
      alert(error.message);
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 8, backgroundColor: '#F5FCFF'}}>
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(data) =>
              <View style={styles.row}>
                <View style={{flex: 3}}>
                  <TouchableOpacity onPress={() => this.goToDescription(data)}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 1}}>
                        <Image style={styles.image} source={{uri: data.image}}/>
                      </View>
                      <View style={{flex: 2, justifyContent: 'center'}}>
                        <Text>{data.name}</Text>
                        <Text>Cena: {data.price} zł</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableOpacity onPress={() => this.addToShoppingCart(data)}>
                    <Image source={require('../assets/add.png')} style={{height: 32, width: 32}}/>
                  </TouchableOpacity>
                </View>
              </View>
            }
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          />
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
    marginTop: 30,
    marginHorizontal: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    backgroundColor: '#EBEBEB',
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10
  },
  image: {
    flex: 1,
    width: 64,
    height: 64,
    resizeMode: 'contain'
  }
});
