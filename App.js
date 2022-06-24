import React, { useState, useEffect } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Button
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Constants } from 'expo';
import { Camera } from 'expo-camera';
import * as Device from 'expo-device';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Detail from './components/Detail';
import CameraFunc from './components/CameraFunc';
import Liste from './components/Liste';

export default function App() {
  const [list, setList] = React.useState([]);
  const [firstLaunch, setFirstLaunch] = React.useState(true);
  
  const Stack = createStackNavigator();
  const headerOptions = {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

const donnees = [
    {id_product:1, id_categorie: 1, nom_produit: 'Tomates', nom_marque: '', quantite: 15, date_creation: '2022-06-22', date_mod: '2022-06-22', code_barre: "", image: "https://galctkickos.s3.eu-west-3.amazonaws.com/tomates.jpg"},
    {id_product:2, id_categorie: 1, nom_produit: 'Poulet', nom_marque: 'Loué', quantite: 2, date_creation: '2022-06-22', date_mod: '2022-06-22', code_barre: "", image: "https://galctkickos.s3.eu-west-3.amazonaws.com/poulet.jpg"},
    {id_product:3, id_categorie: 1, nom_produit: 'Pates', nom_marque: 'Panzani', quantite: 1, date_creation: '2022-06-22', date_mod: '2022-06-22', code_barre: "3038350208613", image: "https://galctkickos.s3.eu-west-3.amazonaws.com/pates.png"},
    {id_product:4, id_categorie: 1, nom_produit: 'Riz', nom_marque: 'Uncle Ben', quantite: 2, date_creation: '2022-06-22', date_mod: '2022-06-22', code_barre: "5410355406412", image: "https://galctkickos.s3.eu-west-3.amazonaws.com/riz.png"},
    {id_product:5, id_categorie: 1, nom_produit: 'Semoule', nom_marque: 'Tipiak', quantite: 1, date_creation: '2022-06-22', date_mod: '2022-06-22', code_barre: "", image: "https://galctkickos.s3.eu-west-3.amazonaws.com/semoule.jpg"},
    {id_product:6, id_categorie: 1, nom_produit: 'Oignon', nom_marque: '', quantite: 9, date_creation: '2022-06-22', date_mod: '2022-06-22', code_barre: "", image: "https://galctkickos.s3.eu-west-3.amazonaws.com/oignon.png"},
    {id_product:7, id_categorie: 1, nom_produit: 'Ail', nom_marque: '', quantite: 6, date_creation: '2022-06-22', date_mod: '2022-06-22', code_barre: "", image: "https://galctkickos.s3.eu-west-3.amazonaws.com/ail.jpg"},
    {id_product:8, id_categorie: 1, nom_produit: 'Steak Haché', nom_marque: 'Charal', quantite: 9, date_creation: '2022-06-22', date_mod: '2022-06-22', code_barre: "", image: "https://galctkickos.s3.eu-west-3.amazonaws.com/steak.png"},
    {id_product:9, id_categorie: 1, nom_produit: 'Boulgourg', nom_marque: 'test', quantite: 1, date_creation: '2022-06-22', date_mod: '2022-06-22', code_barre: "", image:"https://galctkickos.s3.eu-west-3.amazonaws.com/boulgour.png"}
  ]
  
  async function setItem() {
    if(firstLaunch) {
      setFirstLaunch(false);
      try {
        await AsyncStorage.setItem('liste', JSON.stringify(donnees));
      }
      catch(e) { }
      finally { }
    }
  }

  setItem()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Liste">
        <Stack.Screen name="Liste" component={Liste} options={headerOptions} />
       <Stack.Screen
          name="Camera"
          component={CameraFunc}
          options={headerOptions}
        />
        <Stack.Screen
          name="Détail"
          title="Fiche détail"
          component={Detail}
          options={headerOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
