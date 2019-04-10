import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, RefreshControl} from 'react-native';
import {Navigation} from 'react-native-navigation';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

type Props = {};
export default class Catalog extends Component<Props> {
  constructor(props) {
    super(props);
      this.state = {
      refreshing: false,
      dataSource: ds.cloneWithRows([{userId: '', id: '', title: '', completed: ''}])
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
      let response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      let responseJson = await response.json();
      this.setState({ dataSource: ds.cloneWithRows(responseJson) });
    } catch (error) {
      alert('Błąd podczas pobierania danych.\nSprawdź połączenie z internetem!');
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) =>
            <View style={styles.row}>
              <Text style={styles.column}>{data.userId}</Text>
              <Text style={styles.column}>{data.id}</Text>
              <Text style={styles.column}>{data.title}</Text>
              <Text style={styles.column}>{data.completed}</Text>
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
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
