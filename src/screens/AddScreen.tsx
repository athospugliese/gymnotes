import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import st from '../../src/THEME/GLOBAL';
import colors from '../../src/THEME/THEME';

const AddScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('Título');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [content, setContent] = useState('');

  const saveNote = async () => {
    try {
      const newNote = {
        id: Date.now().toString(),
        title,
        description: content,
      };
      const storedNotes = await AsyncStorage.getItem('notes');
      const notes = storedNotes ? JSON.parse(storedNotes) : [];
      notes.push(newNote);
      await AsyncStorage.setItem('notes', JSON.stringify(notes));

      Alert.alert('Sucesso', 'Nota salva com sucesso!');
      navigation.goBack(); 
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a nota.');
    }
  };

  return (
    <View style={st.container}>
      {/* Barra superior com ícones de ações */}
      <View style={st.header}>
        <TouchableOpacity onPress={saveNote}>
          <Ionicons name="checkmark" size={24} color={colors.white} />
        </TouchableOpacity>
        <View style={st.header}>
          <TouchableOpacity style={st.iconButton}>
            <Ionicons name="arrow-undo" size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={st.iconButton}>
            <Ionicons name="arrow-redo" size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={st.iconButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color={colors.white} />
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
    </View>
  );
};

export default AddScreen;
