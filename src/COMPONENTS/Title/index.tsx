import React from 'react';
import { Text, TextProps } from 'react-native';
import styles from './styles';

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  weight?: 'regular' | 'bold';
  color?: 'primary' | 'secondary' | 'dark' | 'white';
}

const Title: React.FC<CustomTextProps> = ({
  children,
  size = 'medium',
  weight = 'regular',
  color = 'dark',
  style,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles.text,
        styles[size],
        styles[weight],
        { color: styles[color].color },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Title;
