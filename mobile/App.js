/* eslint-disable no-sequences */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import axios from 'react-native-axios';
import Header from './src/header';
import Footer from './src/footer';

const App = () => {
  useEffect(() => {
    axios
      .get('http://192.168.1.105:3000/all')
      .then(response => setData(response.data))
      .catch(err => console.log(err));
  });
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [kelime, setKelime] = useState('');
  const [anlamı, setAnlamı] = useState('');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [Id, setID] = useState();

  const newItemAdd = () => {
    setOpenAddModal(true);
  };

  const editItem = (kelime, anlamı, id) => {
    setOpenEditModal(true);
    setKelime(kelime), setAnlamı(anlamı), setID(id);
  };

  const sendPost = () => {
    axios
      .post('http://192.168.1.105:3000/newPost', {
        kelime: kelime,
        anlamı: anlamı,
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
    setOpenAddModal(!openAddModal);
  };

  const deletePost = id => {
    axios
      .delete(`http://192.168.1.105:3000/deletePost/${id}`)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  const editPost = id => {
    axios
      .put(`http://192.168.1.105:3000/putPost/${id}`, {
        kelime: kelime,
        anlamı: anlamı,
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
    setOpenEditModal(!openEditModal);
  };

  return (
    <View style={styles.main}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TextInput
            placeholder="Aramak İstediginiz Kelimeyi Yazınız ..."
            style={styles.textInput}
            onChangeText={setSearch}
          />
        </View>
        <View>
          {data.length === 0 ? (
            <View style={styles.loading}>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <View>
              {data
                .filter(item => {
                  if (search === '') {
                    return item;
                  } else if (item.kelime.toLowerCase().includes(search)) {
                    return item;
                  }
                })
                .map(item => {
                  return (
                    <View style={styles.card} key={item._id}>
                      <Text style={styles.kelime}>
                        {item.kelime.toUpperCase()}
                      </Text>
                      <Text style={styles.anlamı}>{item.anlamı}</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity onPress={() => deletePost(item._id)}>
                          <View style={styles.deleteBtn}>
                            <Text style={styles.deleteText}>SİL</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            editItem(item.kelime, item.anlamı, item._id)
                          }>
                          <View style={styles.editBtn}>
                            <Text style={styles.editText}>DÜZENLE</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        visible={openAddModal}
        onRequestClose={() => {
          setOpenAddModal(!openAddModal);
        }}>
        <Header />
        <View style={{backgroundColor: '#F1F8E9', height: '100%'}}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalkelime}>Yeni Kelime Ekleme</Text>
          </View>
          <View style={styles.modalForm}>
            <Text style={styles.modalText}>Kelime : </Text>
            <TextInput
              style={styles.modalTextInput}
              placeholder="Kelimeyi Giriniz ..."
              onChangeText={setKelime}
            />
            <Text style={styles.modalText}>Anlamı : </Text>
            <TextInput
              style={styles.modalTextInput}
              placeholder="Anlamını Giriniz ..."
              onChangeText={setAnlamı}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => {
                setOpenAddModal(!openAddModal);
              }}>
              <View style={styles.modalBtnBack}>
                <Text style={styles.modalkelime}>İPTAL</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sendPost()}>
              <View style={styles.modalBtnOk}>
                <Text style={styles.modalkelime}>Kelimeyi Kaydet</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        visible={openEditModal}
        onRequestClose={() => {
          setOpenAddModal(!openEditModal);
        }}>
        <Header />
        <View style={{backgroundColor: '#F1F8E9', height: '100%'}}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalkelime}>Kelime Düzenleme</Text>
          </View>
          <View style={styles.modalForm}>
            <Text style={styles.modalText}>Kelime : </Text>
            <TextInput
              style={styles.modalTextInput}
              placeholder={kelime}
              onChangeText={setKelime}
            />
            <Text style={styles.modalText}>Anlamı : </Text>
            <TextInput
              style={styles.modalTextInput}
              placeholder={anlamı}
              onChangeText={setAnlamı}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => {
                setOpenEditModal(!openEditModal);
              }}>
              <View style={styles.modalBtnBack}>
                <Text style={styles.modalkelime}>İPTAL</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => editPost(Id)}>
              <View style={styles.modalBtnOk}>
                <Text style={styles.modalkelime}>Kelimeyi Kaydet</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Footer newItemAdd={newItemAdd} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F8E9',
  },
  header: {
    margin: 10,
    flexDirection: 'row',
  },
  card: {
    margin: 10,
    borderWidth: 2,
    borderColor: '#0b6209',
    borderRadius: 20,
    backgroundColor: '#81C784',
  },
  kelime: {
    fontSize: 20,
    margin: 5,
    color: 'white',
    fontWeight: 'bold',
  },
  modalkelime: {
    fontSize: 20,
    margin: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  anlamı: {
    fontSize: 16,
    margin: 5,
    marginBottom: 10,
    color: 'white',
  },
  textInput: {
    width: '94%',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#0b6209',
    margin: 10,
  },
  modalHeader: {
    marginTop: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  modalForm: {
    borderWidth: 2,
    borderColor: '#0b6209',
    borderRadius: 20,
    margin: 10,
  },
  modalText: {
    fontSize: 18,
    margin: 5,
  },
  modalTextInput: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#0b6209',
    margin: 8,
  },
  modalBtnBack: {
    margin: 10,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'red',
  },
  modalBtnOk: {
    margin: 10,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#0b6209',
  },
  editBtn: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 20,
    width: 75,
    margin: 5,
    alignItems: 'center',
  },
  deleteBtn: {
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 20,
    width: 50,
    margin: 5,
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    display: 'flex',
    height: 630,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
  editText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
