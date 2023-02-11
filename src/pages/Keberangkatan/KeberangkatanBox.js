import { ImageBackground, StyleSheet, View, Dimensions, Modal, Text, Pressable } from 'react-native'
import React, { useState, useRef } from 'react'
import { ScrollView } from 'react-native-virtualized-view';
import { ButtonIcon, PesananAktif, SearchBox, PesananHeader, TopNavBox } from '../../components'
import DalamProses from '../../components/TopNav/DalamProsesPesanan'
import RiwayatPesanan from '../../components/TopNav/RiwayatPesanan'
import { WARNA_UTAMA } from '../../utils/constant'

const Pesanan = () => {
  const [selectPesanan, setSelectPesanan] = useState('Dalam Proses');
  const [modalVisible, setModalVisible] = useState(false);
  const bukaModal = () => {
    // setModalVisible(true);
    console.log("Buka Modal")
  }

  return (
    <View style={styles.page}
      onStartShouldSetResponder={() => true}
    // onResponderRelease={(event) => {
    //   console.log("Swipe", event.nativeEvent.changedTouches)
    // }}>
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        <ImageBackground style={styles.header}>
          <Pressable onPress={() => bukaModal()}>
            <PesananHeader />
          </Pressable>
        </ImageBackground>
        <TopNavBox selectPesanan={selectPesanan} setSelectPesanan={setSelectPesanan} />
        {/* <Pressable onPress={bukaModal}> */}
        {selectPesanan === 'Dalam Proses' ? (
          <DalamProses/>
        ) : (
          <RiwayatPesanan />
        )}
        {/* </Pressable> */}
    </View>
  )
}

export default Pesanan

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.17,
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: WARNA_UTAMA
  },
  avatar: {
    width: windowWidth * 0.12,
    height: windowHeight * 0.061,
  },
  greet: {
    marginTop: 20,
  },
  hai: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'TitilliumWeb-Regular',
  },
  username: {
    fontSize: 24,
    color: '#000000',
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  datang: {
    fontSize: 30,
    color: '#000000',
    fontFamily: 'TitilliumWeb-Bold',
  },
  layanan: {
    marginLeft: 5,
    paddingTop: 5,
  },
  iconLayanan: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 10,
  },
  pesananAktif: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
  },


  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})