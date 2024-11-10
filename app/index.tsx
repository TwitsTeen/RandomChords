import React, { useState } from "react";
import { Text, View, Button, Alert, TextInput, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { NavigationContainer } from "@react-navigation/native";

export default function ChordRandomizer() {
  const chords = {
    Cs: ["C#", "D#m", "E#m", "F#", "G#", "A#m"],
    Fs: ["F#", "G#m", "A#m", "B", "C#", "D#m"],
    B: ["B", "C#m", "D#m", "E", "F#", "G#m"],
    E: ["E", "F#m", "G#m", "A", "B", "C#m"],
    A: ["A", "Bm", "C#m", "D", "E", "F#m"],
    D: ["D", "Em", "F#m", "G", "A", "Bm"],
    G: ["G", "Am", "Bm", "C", "D", "Em"],
    C: ["C", "Dm", "Em", "F", "G", "Am"],
    F: ["F", "Gm", "Am", "Bb", "C", "Dm"],
    Bb: ["Bb", "Cm", "Dm", "Eb", "F", "Gm"],
    Eb: ["Eb", "Fm", "Gm", "Ab", "Bb", "Cm"],
    Ab: ["Ab", "Bbm", "Cm", "Db", "Eb", "Fm"],
    Db: ["Db", "Ebm", "Fm", "Gb", "Ab", "Bbm"],
    Gb: ["Gb", "Abm", "Bbm", "Cb", "Db", "Ebm"],
    Cb: ["Cb", "Dbm", "Ebm", "Fb", "Gb", "Abm"],
  };

  type ChordKey = keyof typeof chords;
  const [selectedKey, setSelectedKey] = useState<ChordKey>("C");
  const [number, setNumber] = useState(4);
  const [randomChords, setRandomChords] = useState<string[]>([]);

  function randomize_chords(key: ChordKey, number: number) {
    const random_chords = [];
    const chords_list = chords[key];
    for (let i = 0; i < number; i++) {
      const random_index = Math.floor(Math.random() * chords_list.length);
      random_chords.push(chords_list[random_index]);
    }
    return random_chords;
  }

  function show_random_chords() {
    if (!selectedKey) {
      Alert.alert("Please select a key.");
      return;
    }
    if (isNaN(number) || number <= 0) {
      Alert.alert(
        `Please enter a valid number of chords (1 to ${chords[selectedKey].length}).`,
      );
      return;
    }
    const random_chords = randomize_chords(selectedKey, number);
    setRandomChords(random_chords);
    Alert.alert("Random Chords:", random_chords.join(", "));
  }

  const keyOptions = Object.keys(chords).map((key) => ({
    label: key,
    value: key,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Select a key:</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedKey(value)}
          value={selectedKey}
          items={keyOptions}
          placeholder={{ label: "Select a key", value: null }}
          style={pickerSelectStyles}
        />
      </View>

      <Text style={styles.label}>Enter number of chords:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of chords"
        keyboardType="numeric"
        onChangeText={(text) => setNumber(parseInt(text))}
      />

      <Button title="Randomize chords" onPress={show_random_chords} />

      {randomChords.length > 0 && (
        <View style={styles.chordsContainer}>
          {randomChords.map((chord, index) => (
            <Text key={index} style={styles.chords}>
              {chord}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chords: {
    fontSize: 30,
    marginVertical: 16,
    width: "25%",
    borderColor: "black",
    borderWidth: 1,
    padding: 8,
  },
  chordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  Headers: {
    fontSize: 20,
    marginBottom: 16,
  },
  dropdownContainer: {
    width: "80%",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginVertical: 16,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // for icon space
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // for icon space
  },
};
