import { StyleSheet, Text, View, FlatList, RefreshControl, Modal, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { PesananAktif } from '../../components';
import axios from "axios";

const DalamProses = () => {
  const [order, setOrder] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const bukaModal2 = () => {
    // setModalVisible(true);
    console.log("Buka Modal 2bisa")
  }
  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://153.92.210.7:3001/produk")
      // const { data } = await request.get('/produk')

      if (data.success) {
        let response = await data.data;
        setOrder(response.filter(item => !item.pulang));
        setRefreshing(false);
      } else {
        throw 'Error fetching users list'
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, [order.length])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  return (
    <View style={styles.pesananAktif}>
      <FlatList 
        data={order}
        renderItem={
          ({ item }) =>
            <Pressable onPressIn={() => bukaModal2()}>
              <PesananAktif
               keyExtractor={item => item.noid_produk}
                key={item.noid_produk}
                initialNumToRender={5}
                item={item} />
            </Pressable>
        }
      />
    </View>
  )
}

export default DalamProses

const styles = StyleSheet.create({
  pesananAktif: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
  }
})