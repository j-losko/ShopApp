import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, RefreshControl} from 'react-native';
import {Navigation} from 'react-native-navigation';

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
      dataSource: ds.cloneWithRows([{userId: 'aasdasdasdasdasdsd', id: 'asd', title: 'asasdasdasdasdd', completed: false}])
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

  fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => this.setState({ dataSource: ds.cloneWithRows(json) }))
    .catch((error) => {
      alert('Błąd podczas wysyłania wyniku.\nSprawdź połączenie z internetem!');
    });
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
  column: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center'
  }
});
