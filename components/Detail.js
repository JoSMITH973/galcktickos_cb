import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Table, Text, View, TouchableOpacity, Dimensions, Image, Pressable, Modal, Alert, TextInput } from "react-native";
import { DataTable, Button  } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

export default function ShowTable({ route, navigation }) {
  const { data } = route.params;
  const [updateListe, onUpdateListe] = React.useState(AsyncStorage.getItem('liste'));
  
  const [modalVisible, setModalVisible] = useState(false);
  
  const [quantite, onChangeQuantite] = React.useState(data.quantite);
  const [newQuantite, onChangeNewQuantite] = React.useState(data.quantite);

  return (
    <View style={styles.body}>
      <View style={styles.squareProduct} >
        <Image
            source={{
              uri:data.image,
            }}
            style={styles.productImage}
        />
      </View>

      <DataTable style={styles.datatable}>
        {data.nom_marque !== "" && (
          <DataTable.Row>
            <DataTable.Cell>Marque</DataTable.Cell>
            <DataTable.Cell >{data.nom_marque}</DataTable.Cell>
          </DataTable.Row>
        )}

        

        <DataTable.Row>
          <DataTable.Cell>Produit</DataTable.Cell>
          <DataTable.Cell >{data.nom_produit}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Quantité</DataTable.Cell>
          <DataTable.Cell >{quantite}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Dernière modification</DataTable.Cell>
          <DataTable.Cell>{data.date_mod}</DataTable.Cell>
        </DataTable.Row>

      <View style={styles.optionButtons}>
        <TouchableOpacity >
          <Button style={styles.optionButton} mode="contained" color="#ff914d" onPress={ () => setModalVisible(true) }> Modifier le stock </Button>
            {modalVisible && (<View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Quantité</Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={onChangeNewQuantite}
                    value={newQuantite}
                    defaultValue={newQuantite}
                    placeholder="Ex : 5"
                    keyboardType="numeric"
                  />
                  
                  <View style={{display:"flex", flexDirection:"row", marginTop:"2%"}}>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        setModalVisible(!modalVisible)
                        onChangeNewQuantite(quantite)
                        }
                      }
                    >
                      <Text style={styles.textStyle}>Fermer</Text>
                    </Pressable>
                    
                    <Pressable
                      style={[styles.button, styles.buttonClose, {marginLeft:"5%"}]}
                      onPress={() => {
                        onChangeQuantite(newQuantite)
                        SaveData(data.id_product, newQuantite)
                        setModalVisible(!modalVisible)
                        }
                      }
                    >
                      <Text style={styles.textStyle}>Confirmer</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View> ) }
        </TouchableOpacity>
      </View>
      </DataTable>
    </View>
  )
}

async function SaveData(id, modif_quantite) {
  const getStorage = await AsyncStorage.getItem('liste');
  const arrayStorage = JSON.parse(getStorage)
  var tt = arrayStorage.filter( item => { return item.id_product == id });
  var objModif = await arrayStorage
  .filter( item => { return item.id_product == id })
  objModif[0].quantite = modif_quantite;
  Object.assign(objModif, arrayStorage)
  await AsyncStorage.setItem('liste', JSON.stringify(arrayStorage));
}

const styles = StyleSheet.create({
  body: {
      flex: 1,
    },
  datatable: {
      paddingLeft : 20,
      paddingRight: 20,
      paddingVertical: 20
    },
  optionButtons: {
    flexDirection: "row",
    alignSelf: "center",

  },
  optionButton: {
    marginTop: 20,
    marginHorizontal: 20,
  },

  squareProduct: {
    marginTop: 35,
    borderRadius: "5%",
    alignSelf: "center",
    width: 160, 
    height: 160,
    marginVertical: 20
  },
  productImage: {
    alignSelf: "center",
    width: 130, 
    height: 130, 
    marginTop: 15
  },
    productHeading: {
    alignSelf: "center",
  },  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  textInput: {
    width: "80%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
  },
});