import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Define your colors as constants 
export const COLORS = {
  lightGrey: '#CCCCCC',
  darkGrey: '#333333',
  white: '#FFFFFF',
  black: '#000000',
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',
  yellow: '#FFFF00',
  orange: '#FFA500',
  purple: '#800080',
  pink: '#FFC0CB',
  brown: '#A52A2A',
  cyan: '#00FFFF',
  lime: '#00FF00',
};

// Create the card style
export const globalStyles = StyleSheet.create({
  cardContainer: {
    borderWidth: .5, // Hairline light grey border
    borderColor: COLORS.lightGrey, // Light grey color
    borderRadius: wp(2), // Border radius 
    padding: wp(2), // Padding
    // Add other styles for the card container
  },
  // Add other styles for the card components //(e.g., title, image, etc.)
});
