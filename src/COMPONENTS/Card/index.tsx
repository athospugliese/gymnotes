import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface CardProps {
  id: string;
  title: string;
  description: string;
}

type RootStackParamList = {
  Home: undefined;
  Add: { id?: string; title?: string; description?: string };
};


const Card: React.FC<CardProps> = ({ id, title, description }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleEdit = () => {
    navigation.navigate('Add', { id, title, description });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={handleEdit}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <Text style={styles.description} numberOfLines={3}>
        {description}
      </Text>
    </View>
  );
};

export default Card;
