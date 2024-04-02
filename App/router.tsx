import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import IconComponent from './components/IconComponent';

import ListDetail from './views/ListDetail'; // detail
import ListView from './views/ListView'; // home
import CartView from './views/CartView';

import {COLORS} from './globalstyles';

import Toast from 'react-native-toast-message';

// Define types for screens and navigation
type RootStackParamList = {
  ListView: undefined;
  ListDetail: {item: any};
};

type TabParamList = {
  ListViewStack: undefined;
  CartViewStack: undefined;
};

// Tab Navigator
const Tab = createBottomTabNavigator<TabParamList>();
// Stack Navigator
const ListViewStack = createStackNavigator<RootStackParamList>();

const ListViewStackScreen: React.FC = () => {
  return (
    <ListViewStack.Navigator>
      <ListViewStack.Screen
        name="ListView"
        component={ListView}
        options={{
          headerShown: true, // Show the header. Set to false if you still want to hide it on the ListView screen
          title: 'Home', // Optional: Customize the header title
        }}
      />
      <ListViewStack.Screen
        name="ListDetail"
        component={ListDetail}
        options={{
          headerShown: true, // Show the header to see the back button
          title: 'Detail', // Optional: Customize the header title for the detail view
        }}
      />
    </ListViewStack.Navigator>
  );
};

const CartStack = createStackNavigator();

const CartStackScreen: React.FC = () => {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name="CartView"
        component={CartView}
        options={{
          headerShown: true, // Show the header for the CartView within its stack
          title: 'Cart', // Optional: Customize the header title
        }}
      />
    </CartStack.Navigator>
  );
};

const Router: React.FC = () => {
  const carts = useSelector((state: any) => state.cart.cartItems);

  return (
    <View style={{ flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'ListViewStack') {
                iconName = 'home';
                return (
                  <IconComponent
                    iconName={iconName}
                    color={focused ? COLORS.green : COLORS.lightGrey}
                    size={size}
                  />
                );
              } else if (route.name === 'CartViewStack') {
                iconName = 'cart';
                return (
                  <View>
                    <IconComponent
                      iconName={iconName}
                      color={focused ? COLORS.green : COLORS.lightGrey}
                      size={size}
                    />
                    {carts?.length > 0 && ( // CHANGED: Conditionally render the badge
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{carts.length}</Text>
                      </View>
                    )}
                  </View>
                );
              }

              // You can return any component that you like here!
            },
            tabBarActiveTintColor: COLORS.green,
            tabBarInactiveTintColor: COLORS.lightGrey,
            headerShown: false,
          })}>
          <Tab.Screen
            name="ListViewStack"
            component={ListViewStackScreen}
            options={{
              tabBarLabel: 'Home',
              headerTitle: 'Home',
            }}
          />
          <Tab.Screen
            name="CartViewStack"
            component={CartStackScreen}
            options={{
              tabBarLabel: 'Cart',
              headerTitle: 'Cart',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <Toast />
    </View>
  );
};


const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 6,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Router;
