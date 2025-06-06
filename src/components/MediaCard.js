import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MediaCard = ({ item, onPress }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title || item.name}</Text>
        <Text style={styles.detail}>Popularity: {item.popularity?.toFixed(2) || 'N/A'}</Text>
        <Text style={styles.detail}>Release Date: {item.release_date || item.first_air_date || 'N/A'}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MediaCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#eef2f7',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 6,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  detail: {
    fontSize: 13,
    color: '#555',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 6,
    borderRadius: 4,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
