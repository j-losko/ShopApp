import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, RefreshControl} from 'react-native';
import {Navigation} from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

type Props = {};
export default class Orders extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Złożone zamówienia'
        }
      }
    };
  }
  
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      dataSource: ds.cloneWithRows([])
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
    try {
      let orders = await AsyncStorage.getItem('orders');
      if(orders == null) {
        orders = [];
      }
      orders = JSON.parse(orders);
      this.setState({ dataSource: ds.cloneWithRows(orders) });
    }
    catch(error) {
      alert(error.message);
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(data) =>
            <View style={styles.row}>
              <Text>Data zamówienia: {data.orderData.date}</Text>
              <Text>Sposób dostawy: {data.orderData.deliveryMethod}</Text>
              <Text>Sposób zapłaty: {data.orderData.paymentMethod}</Text>
              <Text>Imię i nazwisko: {data.orderData.name}</Text>
              <Text>Kod pocztowy: {data.orderData.postalCode}</Text>
              <Text>Miejscowość: {data.orderData.town}</Text>
              <Text>Adres: {data.orderData.address}</Text>
              <Text>Adres 2: {data.orderData.address2}</Text>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    marginHorizontal: 30
  },
  row: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#FBFDFC'
  }
});
