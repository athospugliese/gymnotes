import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from 'src/COMPONENTS/Card';
import Title from 'src/COMPONENTS/Title';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; 
import colors from '../../src/THEME/THEME.ts';

interface Note {
  id: string;
  title: string;
  description: string;
}

interface Collection {
  id: string;
  name: string;
  notes: Note[];
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation(); 
  const [notes, setNotes] = useState<Note[]>([]);

  const loadNotes = async () => {
    try {

      const storedNotes = await AsyncStorage.getItem('notes');
      let allNotes: Note[] = storedNotes ? JSON.parse(storedNotes) : [];
  
      const storedCollections = await AsyncStorage.getItem('collections');
      if (storedCollections) {
        const collections: Collection[] = JSON.parse(storedCollections);
        collections.forEach((collection) => {
          allNotes = [...allNotes, ...collection.notes];
        });
      }
  
      setNotes(allNotes);
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
      <View style={{ backgroundColor: colors.dark, flex: 1 }}>
        <Title size="large" color="white">Notes</Title>
        {notes.length === 0 ? (
          <Title size="medium" color="white" style={styles.emptyTitle}>
            Nenhuma nota recente
          </Title>
        ) : (
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card id={item.id} title={item.title} description={item.description} />
            )}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
  },
  emptyTitle: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
