import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from 'src/COMPONENTS/Card';
import Container from 'src/COMPONENTS/Container';
import Title from 'src/COMPONENTS/Title';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import colors from '@styles/THEME';

interface Note {
  id: string;
  title: string;
  description: string;
}

type RootStackParamList = {
  Home: undefined;
  Add: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [notes, setNotes] = useState<Note[]>([]); 

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.log('Erro ao carregar notas:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadNotes); 
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{backgroundColor: colors.dark, flex: 1}}>
        <Title size="large" color="white">
          Notes
        </Title>
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card title={item.title} description={item.description} />
          )}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
