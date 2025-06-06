import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { fetchTVShows } from './api';
import DropDownPicker from 'react-native-dropdown-picker';
import MediaCard from './components/MediaCard';

const TVScreen = ({ navigation }) => {
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([
    { label: 'Airing Today', value: 'airing_today' },
    { label: 'On The Air', value: 'on_the_air' },
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
  ]);

  useEffect(() => {
    loadTVShows(selectedCategory);
  }, [selectedCategory]);

  const loadTVShows = async (category) => {
    setLoading(true);
    const tvData = await fetchTVShows(category);
    setTVShows(tvData);
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
          data={tvShows}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MediaCard
              item={item}
              onPress={() => navigation.navigate('MovieDetails', { movieId: item.id, isTV: true })}
            />
          )}
        />
      )}
    </View>
  );
};

export default TVScreen;

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
