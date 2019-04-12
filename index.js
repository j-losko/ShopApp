/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import App from './App';
import Home from './screens/Home';
import Catalog from './screens/Catalog';
import MakingAnOrder from './screens/MakingAnOrder';
import Orders from './screens/Orders';
import ProductDescription from './screens/ProductDescription';
import ShoppingCart from './screens/ShoppingCart';

Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App);
Navigation.registerComponent(`Home`, () => Home);
Navigation.registerComponent(`Catalog`, () => Catalog);
Navigation.registerComponent(`MakingAnOrder`, () => MakingAnOrder);
Navigation.registerComponent(`Orders`, () => Orders);
Navigation.registerComponent(`ProductDescription`, () => ProductDescription);
Navigation.registerComponent(`ShoppingCart`, () => ShoppingCart);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
  root: {
    stack: {
	  children: [
		{
		  component: {
            name: 'Home',
			options: {
              topBar: {
                title: {
                  text: 'Home'
                },
              }
            },
            passProps: {
              text: 'props'
            }
          }
		}
	  ],
	}
  }
});
});