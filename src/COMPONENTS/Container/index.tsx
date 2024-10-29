import React from 'react';
import { View, ViewProps } from 'react-native';
import styles from './styles';

interface ContainerProps extends ViewProps {
  children: React.ReactNode; 
}

const Container: React.FC<ContainerProps> = ({ children, style, ...rest }) => {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
};

export default Container;
