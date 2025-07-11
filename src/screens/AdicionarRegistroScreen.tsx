// src/screens/AdicionarRegistroScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Influencia, Mood, RegistroSono } from '../types/diario';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/DiarioNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'AdicionarRegistro'>;

const TODAS_INFLUENCIAS: Influencia[] = ['Fiz exercício', 'Meditei', 'Desconectei', 'Usei o celular', 'Estudei', 'Refleti', 'Brinquei', 'Escrevi', 'Fiz leituras'];

const AdicionarRegistroScreen = ({ route, navigation }: Props) => {
  const { onSalvar } = route.params;

  const [mood, setMood] = useState<Mood | null>(null);
  const [horaDeitar, setHoraDeitar] = useState(new Date());
  const [horaAcordar, setHoraAcordar] = useState(new Date());
  const [influencias, setInfluencias] = useState<Influencia[]>([]);
  const [isDeitarPickerVisible, setDeitarPickerVisibility] = useState(false);
  const [isAcordarPickerVisible, setAcordarPickerVisibility] = useState(false);

  const toggleInfluencia = (influencia: Influencia) => {
    setInfluencias(prev =>
      prev.includes(influencia)
        ? prev.filter(i => i !== influencia)
        : [...prev, influencia]
    );
  };

  const handleSalvar = () => {
    if (!mood) {
      Alert.alert('Ops!', 'Por favor, selecione como foi sua noite.');
      return;
    }

    const novoRegistro: RegistroSono = {
      id: new Date().toISOString(),
      data: new Date(),
      mood: mood,
      horaDeitar: horaDeitar,
      horaAcordar: horaAcordar,
      influencias: influencias,
    };

    onSalvar(novoRegistro);
    navigation.goBack();
  };

  // --- ESTA PARTE (DO RETURN) PROVAVELMENTE ESTAVA FALTANDO ---
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Como foi sua noite?</Text>
      
      <View style={styles.moodSelector}>
        <TouchableOpacity onPress={() => setMood('revigorante')} style={[styles.moodOption, mood === 'revigorante' && styles.moodSelected]}>
            <Text>☀️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMood('normal')} style={[styles.moodOption, mood === 'normal' && styles.moodSelected]}>
            <Text>🌙</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMood('cansativa')} style={[styles.moodOption, mood === 'cansativa' && styles.moodSelected]}>
            <Text>🌧️</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.timeInputContainer} onPress={() => setDeitarPickerVisibility(true)}>
        <Icon name="moon-waning-crescent" size={24} color="#FFF" />
        <Text style={styles.timeText}>Fui dormir às... {horaDeitar.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.timeInputContainer} onPress={() => setAcordarPickerVisibility(true)}>
        <Icon name="white-balance-sunny" size={24} color="#FFF" />
        <Text style={styles.timeText}>Acordei às... {horaAcordar.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>O que influenciou seu sono?</Text>
      <View style={styles.influenciasContainer}>
        {TODAS_INFLUENCIAS.map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.tag, influencias.includes(item) && styles.tagSelected]}
            onPress={() => toggleInfluencia(item)}
          >
            <Text style={[styles.tagText, influencias.includes(item) && styles.tagTextSelected]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
        <Text style={styles.saveButtonText}>Salvar Registro</Text>
      </TouchableOpacity>
      
      <DateTimePickerModal
        isVisible={isDeitarPickerVisible}
        mode="time"
        onConfirm={(date) => { setHoraDeitar(date); setDeitarPickerVisibility(false); }}
        onCancel={() => setDeitarPickerVisibility(false)}
      />
      <DateTimePickerModal
        isVisible={isAcordarPickerVisible}
        mode="time"
        onConfirm={(date) => { setHoraAcordar(date); setAcordarPickerVisibility(false); }}
        onCancel={() => setAcordarPickerVisibility(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1A1A2E' },
    contentContainer: { padding: 20, alignItems: 'center' },
    title: { fontSize: 32, fontWeight: 'bold', color: '#FFF', marginBottom: 20, fontFamily: 'Seu-Fonte-Titulo' },
    moodSelector: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 30 },
    moodOption: { padding: 20, borderRadius: 50, backgroundColor: '#2E2E50', opacity: 0.5 },
    moodSelected: { opacity: 1, transform: [{ scale: 1.1 }] },
    timeInputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2E2E50', padding: 15, borderRadius: 10, marginBottom: 15, width: '80%' },
    timeText: { color: '#FFF', marginLeft: 10, fontSize: 16 },
    subtitle: { fontSize: 20, color: '#FFF', marginTop: 20, marginBottom: 15, fontFamily: 'Seu-Fonte-Subtitulo' },
    influenciasContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 30 },
    tag: { borderColor: '#8A2BE2', borderWidth: 1, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 15, margin: 5 },
    tagSelected: { backgroundColor: '#8A2BE2' },
    tagText: { color: '#FFF' },
    tagTextSelected: { color: '#FFF' },
    saveButton: { backgroundColor: '#8A2BE2', padding: 20, borderRadius: 15, width: '100%', marginTop: 20 },
    saveButtonText: { color: '#FFF', textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
});

export default AdicionarRegistroScreen;