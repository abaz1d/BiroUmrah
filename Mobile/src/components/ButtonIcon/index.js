import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  IconCuciKomplit,
  IconCuciKering,
  IconSetrikaAja,
  IconCuciBulanan,
  IconCuciTahunan,
  IconCuciUrgent,
  IconHaji,
  IconUmrah,
  IconHaji2,
  IconUmrah2,
  IconHaji3,
  IconUmrah3
} from '../../assets';
import { WARNA_SEKUNDER, WARNA_UTAMA } from '../../utils/constant';
import { useNavigation } from '@react-navigation/native';

const ButtonIcon = ({ title, type }) => {
  const Icon = () => {

    if (title === 'Haji Plus') return <IconHaji />;

    if (title === 'Umrah Plus') return <IconUmrah />;

    if (title === 'Haji Reguler') return <IconHaji2 />;

    if (title === 'Umrah Reguler') return <IconUmrah2 />;

    if (title === 'Umrah Ramadhan') return <IconHaji3 />;

    if (title === 'Terpopuler') return <IconUmrah3 />;

    return <IconCuciKomplit />;
  };
  const navigation = useNavigation(); //untuk pindah halaman

  return (
    <TouchableOpacity style={styles.container(type)}
      onPress={() => navigation.navigate(title)}
    // onPress={() => console.log(title)}
    >
      <View style={styles.button(type)}>
        <Icon />
      </View>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  container: (type) => ({
    marginBottom: type === "layanan" ? 12 : 0,
    marginRight: type === "layanan" ? 20 : 0,
    justifyContent: 'center',
  }),
  button: (type) => ({
    backgroundColor: WARNA_UTAMA,
    padding: type === 'layanan' ? 12 : 7,
    alignItems: 'center',
    borderRadius: 10,
    width: 150,

  }),
  text: (type) => ({
    fontSize: type === 'layanan' ? 14 : 10,
    fontFamily: type === 'layanan' ? 'TitilliumWeb-Light' : 'TitilliumWeb-Regular',
    textAlign: 'center',
    marginTop: type === 'layanan' ? 0 : 3,
    color: '#000000',
  }),

});
