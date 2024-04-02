import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper'; // Make sure to install react-native-paper

const AbilitiesListComponent = ({ abilities }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {abilities.map((ability, index) => (
        <Button
          key={index}
          mode="contained-tonal"
          style={{ marginRight: 8, backgroundColor: '#EDE7F6' }}
        >
          {ability.ability.name}
        </Button>
      ))}
    </ScrollView>
  );
};

export default AbilitiesListComponent;
