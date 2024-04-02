import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Counter from "react-native-counters";
import { Button } from 'react-native-paper';
import { COLORS, globalStyles } from '../globalstyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { updateItemQuantity, deleteItem } from '../store/cartSlice'; // Adjust the import path as necessary
import Toast from 'react-native-toast-message';

const CartView = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  };

  const onChangeCounter = (count, id) => {
    dispatch(updateItemQuantity({ id, quantity: count }));
    Toast.show({
      type: 'success',
      text1: 'Quantity updated',
      position: 'bottom',
      visibilityTime: 800,
    });
  };

  const onRemoveItem = (id) => {
    dispatch(deleteItem(id));
    Toast.show({
      type: 'success',
      text1: 'Item removed from cart',
      position: 'bottom',
      visibilityTime: 800,
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.sprites[0].url }} style={styles.itemImage} />
        <TouchableOpacity onPress={() => onRemoveItem(item.id)} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Counter start={item.quantity} min={1} max={10} onChange={(count) => onChangeCounter(count, item.id)} />
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black, paddingHorizontal: wp(2) }}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={{ backgroundColor: COLORS.black }}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Grand Total: ${totalPrice.toFixed(2)}</Text>
        <Button mode="contained" onPress={() => console.log('Place Order')}>Place Order</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  imageContainer: {
    flex: 1,
  },
  detailsContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: COLORS.red,
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: COLORS.white,
    textAlign: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 5,
  },
  totalContainer: {
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 10,
  },
});

export default CartView;
