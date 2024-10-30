import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

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

const CollectionsScreen = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [expandedCollectionId, setExpandedCollectionId] = useState<string | null>(null);

  const loadCollections = async () => {
    try {
      const storedCollections = await AsyncStorage.getItem('collections');
      if (storedCollections) {
        setCollections(JSON.parse(storedCollections));
      }
    } catch (error) {
      console.log('Erro ao carregar coleções:', error);
    }
  };

  const saveCollections = async (newCollections: Collection[]) => {
    try {
      await AsyncStorage.setItem('collections', JSON.stringify(newCollections));
      setCollections(newCollections);
    } catch (error) {
      console.log('Erro ao salvar coleções:', error);
    }
  };

  useEffect(() => {
    loadCollections();
  }, []);

  const createCollection = () => {
    if (newCollectionName.trim() === '') return;

    const newCollection: Collection = {
      id: Date.now().toString(),
      name: newCollectionName,
      notes: [],
    };

    const updatedCollections = [...collections, newCollection];
    saveCollections(updatedCollections);
    setNewCollectionName('');
    setModalVisible(false);
  };

  const toggleExpandCollection = (id: string) => {
    setExpandedCollectionId((prevId) => (prevId === id ? null : id));
  };

  const renderCollection = ({ item }: { item: Collection }) => (
    <View style={styles.collectionContainer}>
      <View style={styles.collectionHeader}>
        <Text style={styles.collectionName}>{item.name}</Text>
        <TouchableOpacity onPress={() => toggleExpandCollection(item.id)}>
          <Ionicons
            name={expandedCollectionId === item.id ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
      {/* Renderização das notas da coleção (somente se estiver expandida) */}
      {expandedCollectionId === item.id && item.notes.length > 0 && (
        <View style={styles.notesContainer}>
          {item.notes.map((note: Note, index: number) => (
            <View key={index} style={styles.noteCard}>
              <Text style={styles.noteTitle}>{note.title}</Text>
              <Text style={styles.noteDescription}>{note.description}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Coleções</Text>
      <FlatList
        data={collections}
        keyExtractor={(item) => item.id}
        renderItem={renderCollection}
        contentContainerStyle={styles.listContainer}
      />
      {/* Botão para adicionar nova coleção */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={24} color="#FFFFFF" />
        <Text style={styles.addButtonText}>Nova coleção</Text>
      </TouchableOpacity>

      {/* Modal para criar uma nova coleção */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Coleção</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da coleção"
              value={newCollectionName}
              onChangeText={setNewCollectionName}
            />
            <TouchableOpacity style={styles.saveButton} onPress={createCollection}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    padding: 16,
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 80,
  },
  collectionContainer: {
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
  },
  collectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collectionName: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  notesContainer: {
    marginTop: 8,
  },
  noteCard: {
    backgroundColor: '#3C3C3E',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  noteTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteDescription: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#2C2C2E',
    padding: 12,
    borderRadius: 8,
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  input: {
    width: '100%',
    backgroundColor: '#3C3C3E',
    padding: 8,
    borderRadius: 8,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default CollectionsScreen;
