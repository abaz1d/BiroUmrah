import { SafeAreaView, ImageBackground, StyleSheet, Text, View, Dimensions, Image, FlatList, RefreshControl, Pressable } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view';
import React, { useEffect, useRef, useState } from 'react';
import { ImageHeader, Avatar } from '../../assets'
import { ButtonIcon, PesananAktif, SearchBox } from '../../components'
import { WARNA_ABU_ABU, WARNA_UTAMA } from '../../utils/constant'
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

const Home = () => {
  const navigation = useNavigation();
  const [order, setOrder] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://153.92.210.7:3001/produk")
      // const { data } = await request.get('/produk')

      if (data.success) {
        let response = await data.data;
        setOrder(response);
        setRefreshing(false);
      } else {
        throw 'Error fetching users list'
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setRefreshing(true);
    fetchData();
  }, [order.length])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);
  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' style={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ImageBackground source={ImageHeader} style={styles.header}>
          <Pressable onPress={() => navigation.navigate("Akun")}>
            <Image source={Avatar} style={styles.avatar} />
          </Pressable>
          <View style={styles.greet}>
            <Text style={styles.hai}>Hai, <Text style={styles.username}>Kamu</Text></Text>
            <Text style={styles.datang}>Assalamu'alaikum</Text>
          </View>
        </ImageBackground>
        <SearchBox />
        <View style={styles.layanan}>
          <Pressable>
            <Text style={styles.label}>Paket Layanan Kami</Text>
          </Pressable>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.iconLayanan}>
              <ButtonIcon title="Haji Plus" type="layanan" />
              <ButtonIcon title="Umrah Plus" type="layanan" />
              <ButtonIcon title="Haji Reguler" type="layanan" />
              <ButtonIcon title="Umrah Reguler" type="layanan" />
              <ButtonIcon title="Umrah Ramadhan" type="layanan" />
              <ButtonIcon title="Terpopuler" type="layanan" />
            </View>
          </ScrollView>
        </View>
        <SafeAreaView style={styles.pesananAktif}>
          <Pressable onPress={() => navigation.navigate("Keberangkatan")}>
            <Text style={styles.label}>Daftar Keberangkatan &gt;</Text>
            <FlatList disableVirtualization={true} onPress={() => navigation.navigate("Keberangkatan")}
              data={order}
              renderItem={
                ({ item }) => <PesananAktif
                  key={item.noid_produk}
                  item={item} />
              }
            />
          </Pressable>
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}

export default Home

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.3,
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: WARNA_UTAMA
  },
  avatar: {
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,
  },
  greet: {
    marginTop: 20,
  },
  hai: {
    fontSize: windowWidth * 0.03,
    color: '#000000',
    fontFamily: 'TitilliumWeb-Regular',
  },
  username: {
    fontSize: windowWidth * 0.04,
    color: '#000000',
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  datang: {
    fontSize: windowWidth * 0.04,
    color: '#000000',
    fontFamily: 'TitilliumWeb-Bold',
  },
  layanan: {
    marginLeft: 5,
    paddingTop: 5,
  },
  label: {
    fontSize: windowWidth * 0.04,
    color: '#000000',
    fontFamily: 'TitilliumWeb-Bold',
    marginLeft: 30,
    marginRight: 50,
    paddingTop: 15,
    marginBottom: 5,
  },
  iconLayanan: {
    flex: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  item: {
    marginHorizontal: 10,
  },
  pesananAktif: {
    backgroundColor: WARNA_ABU_ABU,
    margin: 5,
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    fontSize: windowWidth * 0.04,
    paddingBottom: 20,
  }
})