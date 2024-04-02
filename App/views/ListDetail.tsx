import React, {useState} from 'react';
import { View, Text, ActivityIndicator, ScrollView, Image } from 'react-native';
import { COLORS } from '../globalstyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'; // Ensure axios is installed
import Carousel from 'react-native-snap-carousel';
import AbilitiesListComponent from '../components/AbilitiesListComponent';
import Counter from "react-native-counters";
import {useDispatch} from 'react-redux';

import { globalStyles } from '../globalstyles';
import { Button } from 'react-native-paper';
const { cardContainer } = globalStyles;

import { addItem } from '../store/cartSlice';
import Toast from 'react-native-toast-message';



// Function to fetch data using axios
const fetchPokemonData = async ({ queryKey }) => {
  const url = queryKey[1];
  try {
    const { data } = await axios.get(url);
    // Filter out null values from sprites
    const filteredSprites = Object.entries(data.sprites).reduce((acc, [key, value], index) => {
      // Check if value is a string (to ensure it's a URL) and not null
      if (typeof value === 'string') {
        acc.push({
          id: index, // Assign an index as id
          url: value, // URL of the image
        });
      }
      return acc;
    }, []);
    // Extract only the necessary data
    const filteredData = {
      id: data.id,
      name: data.name,
      abilities: data.abilities,
      sprites: filteredSprites,
      weight: data.weight,
      height: data.height,
    };
    //console.log('filteredData',filteredData)
    return filteredData
  } catch (error) {
    throw error;
  }
};

const ListDetail = ({ route }) => {
  const { item } = route.params;
  const dispatch = useDispatch();
  
  console.log('item>',item.url)

  const [count, setCount] = useState(1);

  // Use the 'useQuery' hook to fetch data, adapted for React Query v5
  const { data, error, isLoading } = useQuery({
    queryKey: ['pokemonData', item.url],
    queryFn: fetchPokemonData,
    // You can add React Query options here, such as staleTime, cacheTime, etc.
  });


  if (!data || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.black }}>
        <ActivityIndicator size="large" color={COLORS.white} />
      </View>
    );
  }

  if (error) {
    // With axios, you might want to handle errors based on error.response
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.black }}>
        <Text style={{ color: COLORS.white }}>An error has occurred: {error.message}</Text>
      </View>
    );
  }

  //console.log('data',data)
  const renderCarouselItem = ({ item }) => (
    <Image source={{ uri: item.url }} style={{ width: 300, height: 300 }} />
  );

  const onChangeCounter = (count) => {
    setCount(count);
  } 

  if (isLoading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.black }}><Text>Loading...</Text></View>;
  }

  if (error) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.black }}><Text>An error occurred</Text></View>;
  }

  const addtoCart = () => {
    //const { sprites, ...rest } = data;
    // Assuming addItem expects an object with a payload field
    //console.log('rest', rest) 
    dispatch(addItem({ ...data, count }));
    Toast.show({
      type: 'success',
      text1: 'Item added to cart',
      visibilityTime: 700,
    });
  }

  // Render component with fetched data
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black, paddingHorizontal: wp(2) }}>
        <ScrollView style={{ flex: 1, backgroundColor: COLORS.black }}>
        <Text style={{ fontSize: 24, color: COLORS.white, textAlign: 'center', marginVertical: 20 }}>{data.name}</Text>
        <Carousel
          data={data?.sprites} // Filter out any falsy values just in case
          renderItem={renderCarouselItem}
          sliderWidth={300}
          itemWidth={300}
          loop
        />
        <View style={cardContainer}>
          <Text style={{ fontSize: 18, color: COLORS.white, marginTop: 20 }}>Weight: {data.weight}</Text>
          <Text style={{ fontSize: 18, color: COLORS.white }}>Height: {data.height}</Text>
          <AbilitiesListComponent abilities={data.abilities} />
          <Counter start={1} min={1} max={10} onChange={onChangeCounter} />
          <Button
            mode="contained"
            style={{ backgroundColor: '#7E57C2', marginTop: 20 }}
            labelStyle={{ color: 'white' }}
            onPress={addtoCart}
          >
            Add to Cart
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default ListDetail;
