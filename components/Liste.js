import React, { useState, useEffect } from 'react';
import { Platform, Button, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Pressable, Modal, ScrollView, TextInput, FlatList } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { DataTable } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function ShowList({ route, navigation }) {
  const [dataList, setDataList] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [firstLaunch, setFirstLaunch] = React.useState(true);

  async function getList() {
      try {
        var storageList = await AsyncStorage.getItem('liste');
        storageList = JSON.parse(storageList);
        setDataList(storageList);
      }
      catch(e) { }
      finally { }
  }
    
  useEffect( () => {
    const unsubscribe = navigation.addListener('focus', () => {
      getList()
    });
    return unsubscribe;
  }, [navigation])

  return (
    <View style={styles.body}>
      <ScrollView>    
        <DataTable>
          <DataTable.Header>
          <DataTable.Title>Nom Produit</DataTable.Title>
          <DataTable.Title numeric>Quantite</DataTable.Title>
          </DataTable.Header>
          {dataList.length < 1 && (
            <DataTable.Row>
                <DataTable.Cell>Aucun produit trouvé</DataTable.Cell>
                <DataTable.Cell numeric>0</DataTable.Cell>
            </DataTable.Row>
          )}
          {dataList.length > 0 && dataList.map(product => (
            <DataTable.Row onPress={() => {
                navigation.navigate('Détail', {
                  data: product,
                });
              }}>
                <DataTable.Cell>{product.nom_produit}</DataTable.Cell>
                <DataTable.Cell numeric>{product.quantite}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
      <View style={styles.scanButton}>
        <TouchableOpacity
          onPress={() => {
              navigation.navigate('Camera');
          }}>
          <Ionicons name="ios-scan-circle" size={70} color="orange" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "space-between",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  listeItem: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'top',
    alignItems: 'center',
    borderStyle: 'solid',
    marginTop: 10,
    marginBottom: 5,
    padding: 10
  },
  itemName: {
    flex: 2,
    fontSize: 18,
    height: 44,
  },
  itemQuantity: {
    flex: 1,
    fontSize: 18,
    height: 44,
    marginRight: "5%",
    textAlign: 'right',
  },
  itemSeparator: {
    height: "1px",
    width:"80%",
    alignSelf: "center",
    backgroundColor: "black"
  },
  scanButton: {
    position: 'absolute',
    alignSelf: "center",
    bottom: 35,
    right: 15
  }
});