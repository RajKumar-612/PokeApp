import {Button} from 'react-native-paper';
export const ButtonComponent = () => (
  <Button
    mode="contained"
    style={{backgroundColor: '#7E57C2'}}
    labelStyle={{color: 'white'}}
    onPress={() => console.log('Add to Cart pressed')}>
    Add to Cart
  </Button>
);
