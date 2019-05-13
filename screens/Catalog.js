import React, {Component} from 'react';
import {Image, ListView, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
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
      dataSource: ds.cloneWithRows([{id: 'placeholder', name: 'placeholder', price: 'placeholder', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII='}]), //TODO nie pokazywanie tego przy braku internetu - po prostu []
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
    fetch('http://virtserver.swaggerhub.com/Har877/Sklep_Internetowy_ReactNative_PSM/1.0.0/products/getProducts')
    .then(response => response.json())
    .then(json => this.setState({ dataSource: ds.cloneWithRows(json) }))
    .catch((error) => {
      alert('Błąd podczas pobierania katalogu produktów.\nSprawdź połączenie z internetem!');
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
      alert('Błąd AsyncStorage koszyka!');
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <TextInput
            placeholder='Szukaj produktu'
            style={styles.searchInput}
            onChangeText={(search) => this.setState({search})}
            value={this.state.search}
          />
        </View>
        <View style={{flex: 8, backgroundColor: '#F5FCFF'}}>
          <ListView
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    backgroundColor: 'lightgray',
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'gray'
  },
  image: {
    flex: 1,
    width: 64,
    height: 64,
    resizeMode: 'contain'
  }
});
