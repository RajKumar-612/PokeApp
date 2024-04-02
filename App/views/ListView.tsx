import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native'; // Assuming you're using React Navigation
import { API_URL, LIMIT_PER_PAGE } from '../config';
import axios from 'axios';
import { COLORS } from '../globalstyles';

const fetchPokemons = async ({ pageParam = 0 }) => {
  const response = await axios.get(`${API_URL}pokemon`, {
    params: {
      limit: LIMIT_PER_PAGE,
      offset: pageParam,
    },
  });
  if (!response) {
    throw new Error('Network response was not ok');
  }
  return response.data;
};

const ListView = () => {
  const navigation = useNavigation();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: fetchPokemons,
    getNextPageParam: (lastPage, allPages) => {
      // Assuming `count` is the total number of items and `results` is the array of items
      const nextPage = allPages.flatMap(page => page.results).length;
      return nextPage < lastPage.count ? nextPage : undefined;
    },
  });

  //console.log('data', data); // fetch , axios , react-query

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ListDetail', { item })}
      style={{ padding: 20, backgroundColor: COLORS.black, borderBottomWidth: .5, borderBottomColor: COLORS.lightGrey}}
    >
      <Text style={{ textTransform: 'capitalize' }}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Flatten the data from all pages for rendering
  const pokemons = data?.pages.flatMap(page => page.results) || [];

  return (
    <FlatList
      data={pokemons}
      renderItem={renderItem}
      keyExtractor={item => item.name}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
    />
  );
};

export default ListView;
