// src/types/diario.ts
export type Mood = 'revigorante' | 'normal' | 'cansativa';

export type Influencia = 'Fiz exercício' | 'Meditei' | 'Desconectei' | 'Usei o celular' | 'Estudei' | 'Refleti' | 'Brinquei' | 'Escrevi' | 'Fiz leituras';

export interface RegistroSono {
  id: string; // Um identificador único, como a data em formato ISO
  data: Date;
  mood: Mood;
  horaDeitar: Date;
  horaAcordar: Date;
  influencias: Influencia[];
}