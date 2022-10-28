import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, FlatList, Alert } from "react-native";
import { Participant } from "../../components/Participant";
import { styles } from "./styles";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  const textToday = 'Sexta-feira, 19 de Agosto de 2022'
  const today = new Date().toLocaleDateString('pt-BR',{ dateStyle: 'full' } )

  function handlePartipantAdd() {
    if(participants.includes(participantName)) {
      return Alert.alert('Participante existe', 'Já existe um participante na lista com esse nome.');
    }

    setParticipants(prevState => [...prevState, participantName])
    setParticipantName('')
  }

  function handlePartipantRemove(name: string) {
    Alert.alert('Remover', `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>{textToday}</Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder='Nome do participante'
          placeholderTextColor='#6B6B6B'
          value={participantName}
          onChangeText={setParticipantName}
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={handlePartipantAdd}
        >
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant 
            key={item}
            name={item} 
            onRemove={() => handlePartipantRemove(item)}
          />
        )}    
        showsVerticalScrollIndicator={false}   
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )} 
      />
    </View>
  )
}