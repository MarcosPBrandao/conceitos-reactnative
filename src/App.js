import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
// api android emulador
import api from './services/api';

export default function App() {
  const [ repositories, setRepositories ] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);
  async function handleLikeRepository(id) {
    try {
       const response = await api.post(`repositories/${id}/like`);
       const filter = repositories.filter(repository => repository.id !== id)
       setRepositories([...filter,response.data])
      } catch (error) {
        console.log('problema ao atualizar o like', error);
      }       
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList style={styles.repositoryContainer}
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (
           <> 
            <View><Text style={styles.repository}>{repository.title}</Text></View>
            <View style={styles.techsContainer}>
                {repository.techs.map(tech => (
                  <Text style={styles.tech}>
                    {tech}
                  </Text>
                ))}              
            </View>
            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                testID={`repository-likes-1`}
              >
              <Text style={styles.likeText}>{repository.likes}</Text> curtidas
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button} activeOpacity={0.6}
              onPress={() => handleLikeRepository(repository.id)}
              // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
              testID={`like-button-${repository.id}`}
            >
            <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>            
          </>            
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
