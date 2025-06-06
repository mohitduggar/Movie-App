import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { fetchMovies } from './api';
import DropDownPicker from 'react-native-dropdown-picker';
import MediaCard from './components/MediaCard';

const MoviesScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([
    { label: 'Now Playing', value: 'now_playing' },
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ]);

  useEffect(() => {
    loadMovies(selectedCategory);
  }, [selectedCategory]);

  const loadMovies = async (category) => {
    setLoading(true);
    const movieData = await fetchMovies(category);
    setMovies(movieData);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={selectedCategory}
        items={categories}
        setOpen={setOpen}
        setValue={setSelectedCategory}
        setItems={setCategories}
        containerStyle={styles.dropdown}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MediaCard item={item} onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })} />
          )}
        />
      )}
    </View>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  dropdown: {
    marginBottom: 10,
    zIndex: 1000,
  },
});
