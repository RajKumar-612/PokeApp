import React from 'react';
//import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IconComponentProps {
  iconName: string;
  color?: string;
  size?: number;
}

const IconComponent: React.FC<IconComponentProps> = ({
  iconName,
  color,
  size,
}) => {
  const renderIcon = () => {
    switch (iconName) {
      case 'home':
        return <Icon name="home" color={color} size={size} />;
      case 'cart':
        return <Icon name="shopping-cart" color={color} size={size} />;
      default:
        return null;
    }
  };

  return <>{renderIcon()}</>;
};

export default IconComponent;
