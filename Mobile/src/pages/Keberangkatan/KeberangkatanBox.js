import { ImageBackground, StyleSheet, View, Dimensions, Modal, Text, Pressable, TextInput } from 'react-native'
import React, { useState, useRef } from 'react'
import { ScrollView } from 'react-native-virtualized-view';
import { ButtonIcon, PesananAktif, SearchBox, PesananHeader, TopNavBox } from '../../components'
import DalamProses from '../../components/TopNav/DalamProsesPesanan'
import RiwayatPesanan from '../../components/TopNav/RiwayatPesanan'
import { WARNA_DISABLE, WARNA_UTAMA } from '../../utils/constant'
import moment from "moment";

const Pesanan = () => {
  const [selectPesanan, setSelectPesanan] = useState('Dalam Proses');
  const [modalVisible, setModalVisible] = useState(false);
  const [dataShow, setDataShow] = useState("dataShow");
  const bukaModal = async (e) => {
    await setDataShow(e)
    setModalVisible(true);
    // console.log("Buka Modal",e)
  }

  return (
    <View style={styles.page}
      onStartShouldSetResponder={() => true}
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
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.closeButton}>X</Text>
            </Pressable>
            <Text style={styles.modalTitle}>{dataShow.noid_produk}</Text>
            <Text style={styles.hr}></Text>

            <ScrollView keyboardShouldPersistTaps='handled' style={styles.page}>
              <Text style={styles.label}>Nama Travel</Text>
              <TextInput
                style={styles.input}
                editable={false}
                value={dataShow.nama_travel}
              />
              <Text style={styles.label}>Tanggal Berangkat</Text>
              <TextInput
                style={styles.input}
                editable={false}
                value={moment(dataShow.tanggal).format("DD MMM YYYY HH:SS")}
              />
              <Text style={styles.label}>Mutowif</Text>
              <TextInput
                style={styles.input}
                editable={false}
                value={dataShow.mutowif}
              />
              <Text style={styles.label}>Rute</Text>
              <TextInput
                style={styles.input}
                editable={false}
                value={dataShow.rute}
              />
              <Text style={styles.label}>Paket</Text>
              <TextInput
                style={styles.input}
                editable={false}
                value={dataShow.paket}
              />
              <Text style={styles.label}>Jumlah Jamaah</Text>
              <TextInput
                style={styles.input}
                editable={false}
                value={dataShow.jumlah}
              />
              <Text style={styles.label}>Room</Text>
              <TextInput
                style={styles.input}
                editable={false}
                value={dataShow.room}
              />
              <Text style={styles.label}>Status Mekkah</Text>
              <TextInput
                style={styles.input}
                editable={false}
                value={dataShow.flag_mk == 1 ? 'TRUE / 1' : '0 / FALSE'}
              />
              <Text style={styles.label}>Hotel Mekkah</Text>
              <TextInput
                style={styles.input}
                editable={false}
                value={dataShow.hotel_mekah}
              />
              <Text style={styles.label}>IN & OUT Mekkah</Text>
              <TextInput
                style={styles.input}
                editable={false}
                value={`${moment(dataShow.in_mk).format("DD MMM")} - ${moment(dataShow.out_mk).format("DD MMM YYYY")}`}
              />
              <Text style={styles.label}>Status Madinah</Text>
              <TextInput
                style={styles.input}
                editable={false}
                value={dataShow.flag_md == 1 ? 'TRUE / 1' : '0 / FALSE'}
              />
              <Text style={styles.label}>Hotel Madinah</Text>
              <TextInput
                style={styles.input}
                editable={false}
                value={dataShow.hotel_madinah}
              />
              <Text style={styles.label}>IN & OUT Madinah</Text>
              <TextInput
                style={styles.input}
                editable={false}
                value={`${moment(dataShow.in_md).format("DD MMM")} - ${moment(dataShow.out_md).format("DD MMM YYYY")}`}
              />
              <Text style={styles.label}>Tanggal Pulang</Text>
              <TextInput
                style={styles.input}
                editable={false}
                value={moment(dataShow.pulang).format("DD MMM YYYY HH:SS")}
              />
              <Text style={styles.label}>Catatan</Text>
              <TextInput
                style={styles.input}
                editable={false}
                value={dataShow.catatan}
              />
            </ScrollView>
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
        <DalamProses bukaModal={bukaModal} />
      ) : (
        <RiwayatPesanan bukaModal={bukaModal} />
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
  },
  modalView: {
    width: windowWidth - 30,
    height: windowHeight - 100,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  hr: {
    borderBottomColor: WARNA_DISABLE,
    borderBottomWidth: 2,
    width: windowWidth - 60,
    marginBottom: 15,
    marginTop: 25
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
    position: 'absolute',
    top: 10,
    right: 10,
    alignSelf: 'flex-end',
    backgroundColor: '#f44336',
    height: 40,
    width: 40,
    paddingHorizontal: 4,
    paddingVertical: 7,
  },
  closeButton: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: windowWidth * 0.035,
    position: 'absolute',
    marginBottom: 15,
    fontFamily: 'TitilliumWeb-Bold',
    top: 20,
    left: 20,
    alignSelf: 'flex-start',
    color: 'black'
  },
  label: {
    color: 'black',
    left: 5,
  },
  input: {
    color: 'black',
    borderRadius: 10,
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  },
})