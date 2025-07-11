// src/screens/DiarioScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RegistroSono } from '../types/diario';
import RegistroCard from '../components/RegistroCard';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/DiarioNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Diario'>;

const DiarioScreen = ({ navigation }: Props) => {
  const [registros, setRegistros] = useState<RegistroSono[]>([]);

  const handleAdicionarRegistro = (novoRegistro: RegistroSono) => {
    setRegistros(listaAnterior => [novoRegistro, ...listaAnterior]);
  };

  const renderDiarioVazio = () => (
    <View style={styles.containerVazio}>
      <Text style={styles.title}>Meu Diário do Descanso</Text>
      {/* Aqui você pode adicionar a imagem do guerreiro dormindo */}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AdicionarRegistro', { onSalvar: handleAdicionarRegistro })}
      >
        <Icon name="plus" size={40} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  const renderDiarioPreenchido = () => (
    <SafeAreaView style={styles.container}>
        <FlatList
            data={registros}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <RegistroCard registro={item} />}
            ListHeaderComponent={<Text style={styles.title}>Meu Diário do Descanso</Text>}
            contentContainerStyle={styles.listContent}
        />
        <TouchableOpacity 
            style={styles.addButtonFlutuante} 
            onPress={() => navigation.navigate('AdicionarRegistro', { onSalvar: handleAdicionarRegistro })}
        >
            <Icon name="plus" size={30} color="#FFF" />
        </TouchableOpacity>
    </SafeAreaView>
  );

  return registros.length === 0 ? renderDiarioVazio() : renderDiarioPreenchido();
};

// --- ESTA PARTE ESTAVA FALTANDO ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1A1A2E' },
    listContent: { paddingHorizontal: 20, paddingBottom: 100 },
    containerVazio: { flex: 1, backgroundColor: '#1A1A2E', justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 32, fontWeight: 'bold', color: '#FFF', textAlign: 'center', marginVertical: 30, fontFamily: 'Seu-Fonte-Titulo' },
    textoVazio: { fontSize: 18, color: '#AAA', textAlign: 'center', marginVertical: 20 },
    addButton: { backgroundColor: '#8A2BE2', width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginTop: 30 },
    addButtonFlutuante: { position: 'absolute', bottom: 40, right: 30, backgroundColor: '#8A2BE2', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
});
// ------------------------------------

export default DiarioScreen;