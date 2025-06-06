import React, { useState } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet
} from 'react-native';
import { searchMedia } from './api';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';
import MediaCard from './components/MediaCard';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('multi');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([
    { label: 'Movie', value: 'movie' },
    { label: 'TV Show', value: 'tv' },
    { label: 'Multi', value: 'multi' },
  ]);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Movie/TV show name is required');
      return;
    }
    setError('');
    setLoading(true);
    const data = await searchMedia(query, type);
    setResults(data);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search Movie/TV Show Name<Text style={styles.required}>*</Text></Text>

      <View style={[styles.searchContainer, error ? styles.inputError : null]}>
        <FontAwesome name="search" size={18} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="e.g. James Bond, CSI"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.label}>Choose Search Type<Text style={styles.required}>*</Text></Text>

      <DropDownPicker
        open={open}
        value={type}
        items={categories}
        setOpen={setOpen}
        setValue={setType}
        setItems={setCategories}
        containerStyle={styles.dropdown}
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <FontAwesome name="search" size={20} color="#fff" />
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        results.length === 0 ? (
          <Text style={styles.placeholderText}>Enter a search query above to see results</Text>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MediaCard item={item} onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })} />
            )}
          />
        )
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  required: {
    color: 'red',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f8f8f8',
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  dropdown: {
    marginBottom: 10,
    zIndex: 1000,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
  },
  searchText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  placeholderText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
    fontWeight: 'bold',
  },
});
