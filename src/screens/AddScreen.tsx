import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Modal, FlatList, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import st from '../../src/THEME/GLOBAL';
import colors from '../../src/THEME/THEME';

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

const AddScreen = ({ navigation, route }: any) => {
  const { id, title: initialTitle, description: initialDescription } = route.params || {};
  const [title, setTitle] = useState(initialTitle || 'Título');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [content, setContent] = useState(initialDescription || '');
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (initialTitle) setTitle(initialTitle);
    if (initialDescription) setContent(initialDescription);
    loadCollections(); // Carregar coleções disponíveis
  }, [initialTitle, initialDescription]);

  // Função para carregar coleções do AsyncStorage
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

  // Função para salvar a nota e associá-la a uma coleção
  const saveNote = async () => {
    if (!selectedCollection) {
      Alert.alert('Seleção de Coleção', 'Por favor, selecione uma coleção para adicionar a nota.');
      return;
    }
  
    try {
      const newNote: Note = {
        id: id || Date.now().toString(),
        title,
        description: content,
      };
  
      // Atualizar a coleção selecionada com a nova nota
      const updatedCollections = collections.map((collection) => {
        if (collection.id === selectedCollection.id) {
          const updatedNotes = id
            ? collection.notes.map((note) => (note.id === id ? newNote : note))
            : [...collection.notes, newNote];
          return { ...collection, notes: updatedNotes };
        }
        return collection;
      });
  
      // Salvar no AsyncStorage
      await AsyncStorage.setItem('collections', JSON.stringify(updatedCollections));
  
      // Atualizar as notas gerais
      const storedNotes = await AsyncStorage.getItem('notes');
      const notes = storedNotes ? JSON.parse(storedNotes) : [];
  
      if (id) {
        // Atualizar a nota existente
        const noteIndex = notes.findIndex((note: Note) => note.id === id);
        if (noteIndex > -1) {
          notes[noteIndex] = newNote;
        }
      } else {
        // Adicionar nova nota
        notes.push(newNote);
      }
  
      // Salvar notas gerais
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
  
      Alert.alert('Sucesso', 'Nota salva com sucesso!');
      navigation.goBack(); 
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a nota.');
    }
  };
  

  // Função para renderizar cada coleção na lista de seleção
  const renderCollectionItem = ({ item }: { item: Collection }) => (
    <TouchableOpacity
      style={[st.collectionItem, selectedCollection?.id === item.id && st.selectedCollectionItem]}
      onPress={() => {
        setSelectedCollection(item);
        setModalVisible(false);
      }}
    >
      <Text style={st.collectionText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={st.container}>
      {/* Barra superior com ícones de ações */}
      <View style={st.header}>
        <TouchableOpacity onPress={saveNote}>
          <Ionicons name="checkmark" size={24} color={colors.white} />
        </TouchableOpacity>
        <View style={st.header}>
          <TouchableOpacity style={st.iconButton}>
            <MaterialIcons name="undo" size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={st.iconButton}>
            <MaterialIcons name="redo" size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={st.iconButton} onPress={() => setModalVisible(true)}>
            <Ionicons name="folder" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Título editável */}
      <TouchableOpacity onPress={() => setIsEditingTitle(true)}>
        <TextInput
          style={[st.title, { paddingVertical: 4 }]}
          value={title}
          onChangeText={setTitle}
          editable={isEditingTitle}
          onBlur={() => setIsEditingTitle(false)}
          placeholder="Digite o título..."
          placeholderTextColor={colors.primary}
        />
      </TouchableOpacity>

      {/* Campo de entrada de texto */}
      <TextInput
        style={st.input}
        placeholder="Empieza a escribir..."
        placeholderTextColor={colors.primary}
        multiline
        value={content}
        onChangeText={setContent}
      />

      {/* Modal para selecionar coleção */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={st.modalContainer}>
          <View style={st.modalContent}>
            <Text style={st.modalTitle}>Selecionar Coleção</Text>
            <FlatList
              data={collections}
              keyExtractor={(item) => item.id}
              renderItem={renderCollectionItem}
              contentContainerStyle={st.listContainer}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default AddScreen;
