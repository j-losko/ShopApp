import React, {Component} from 'react';
import {Image, ListView, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

type Props = {};
export default class ShoppingCart extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Koszyk'
        }
      }
    };
  }
  
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      dataSource: ds.cloneWithRows([]),
    };
  }
  
  componentWillMount = async() => {
    this.getShoppingCart();
  }
  
  getShoppingCart = async() => {
    try {
      const value = await AsyncStorage.getItem('shoppingCart');
      this.setState({ dataSource: ds.cloneWithRows(JSON.parse(value).contents) });
    } catch (error) {}
  }
  
  removeFromShoppingCart = async(id) => {
    try {
      const value = await AsyncStorage.getItem('shoppingCart');
      let shoppingCart = JSON.parse(value);
      for(let i = 0; i < shoppingCart.contents.length; i++){ 
        if(shoppingCart.contents[i].id === id) {
          shoppingCart.contents.splice(i, 1);
          break;
        }
      }
      await AsyncStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
      this._onRefresh();
    } catch (error) {
      alert('Błąd AsyncStorage koszyka!');
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getShoppingCart().then(() => {
      this.setState({refreshing: false});
    });
  }

  goToMakingAnOrder = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'MakingAnOrder',
        passProps: {
		  refreshCallback: () => this._onRefresh()
        },
      }
    });
  }

  goToProductDetails = (screen, props) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screen,
        passProps: {
          product: props,
          showWhichButton: 'deleteFromShoppingCart',
          refreshCallback: () => this._onRefresh()
        },
      }
    });
  }

  render() {
    if(this.state.dataSource._dataBlob.s1.length < 1) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Koszyk jest pusty</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={{flex: 7, backgroundColor: '#F5FCFF'}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(data) =>
              <View style={styles.row}>
                <View style={{flex: 3}}>
                  <TouchableOpacity onPress={() => this.goToProductDetails('ProductDescription', data)}>
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
                  <TouchableOpacity onPress={() => this.removeFromShoppingCart(data.id)}>
                    <Image source={require('../assets/trash.png')} style={{height: 32, width: 32}}/>
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
        <View style={{flex: 2}}>
          <Text>Suma zamówienia:</Text>
          <TouchableOpacity onPress={() => this.goToMakingAnOrder()}>
            <Text style={{padding: 10, backgroundColor: 'green'}}>Dalej</Text>
          </TouchableOpacity>
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
