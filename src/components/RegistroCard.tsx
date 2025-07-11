// src/components/RegistroCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RegistroSono } from '../types/diario';

type Props = {
  registro: RegistroSono;
};

const RegistroCard = ({ registro }: Props) => {
  const duracaoHoras = (registro.horaAcordar.getTime() - registro.horaDeitar.getTime()) / (1000 * 60 * 60);

  const getMoodEmoji = () => {
    if (registro.mood === 'revigorante') return '☀️';
    if (registro.mood === 'normal') return '🌙';
    return '🌧️';
  }

  return (
    <View style={styles.card}>
      <Text style={styles.moodEmoji}>{getMoodEmoji()}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.dataText}>{registro.data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}</Text>
        <Text style={styles.sonoText}>Sono {registro.mood}</Text>
        <Text style={styles.duracaoText}>🕒 {duracaoHoras.toFixed(1)}h de sono</Text>
        <View style={styles.tagsContainer}>
            {registro.influencias.slice(0, 2).map(tag => <Text key={tag} style={styles.tag}>{tag}</Text>)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    card: { flexDirection: 'row', backgroundColor: '#2E2E50', borderRadius: 15, padding: 15, marginBottom: 20, alignItems: 'center' },
    moodEmoji: { fontSize: 40, marginRight: 15 },
    infoContainer: { flex: 1 },
    dataText: { color: '#AAA', fontSize: 12 },
    sonoText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    duracaoText: { color: '#FFF', fontSize: 14, marginVertical: 4 },
    tagsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    tag: { backgroundColor: '#8A2BE2', color: 'white', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4, fontSize: 10, marginRight: 5, marginTop: 5 },
});

export default RegistroCard;