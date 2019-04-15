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
      dataSource: ds.cloneWithRows([{userId: 'aasdasdasdasdasdsd', id: 'asd', title: 'asasdasdasdasdd', completed: false}]), //TODO nie pokazywanie tego przy braku internetu - po prostu []
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
    fetch('https://jsonplaceholder.typicode.com/todos')
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
          product: {'id': props.title, 'name': props.title, 'price': props.id, 'description': props.title, 'image': 'placeholder'}, //placeholder
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
      shoppingCart.contents.push({'id': product.title, 'name': product.title, 'price': product.id, 'description': product.title, 'image': 'placeholder'}); //id ma być w stringu
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
                        <Image style={styles.image} source={require('../assets/phone.png')}/>
                      </View>
                      <View style={{flex: 2, justifyContent: 'center'}}>
                        <Text>{data.title}</Text>
                        <Text>Cena: {data.id} zł</Text>
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
