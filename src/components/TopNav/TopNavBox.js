import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconUnderlineOn } from '../../assets';
import { WARNA_DISABLE } from '../../utils/constant';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function TopNavBox({ selectPesanan, setSelectPesanan }) {
    return (
        <View style={styles.container}>
            {selectPesanan == 'Dalam Proses' ? (
                <TouchableOpacity style={styles.navigasi}>
                    <Text style={styles.text}>Dalam Proses</Text>
                    <IconUnderlineOn />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.navigasi}
                    onPress={() => setSelectPesanan('Dalam Proses')}>
                    <Text style={styles.text2}>Dalam Proses</Text>
                </TouchableOpacity>
            )}

            {selectPesanan == 'Riwayat' ? (
                <TouchableOpacity style={styles.navigasi}>
                    <Text style={styles.text}>Riwayat</Text>
                    <IconUnderlineOn />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.navigasi}
                    onPress={() => setSelectPesanan('Riwayat')}>
                    <Text style={styles.text2}>Riwayat</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        marginTop: - 0.034 * windowHeight,
    },
    navigasi: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 0.4 * windowWidth,
        padding: 5,
    },
    text: {
        fontSize: 16,
        fontFamily: 'TitilliumWeb-SemiBold',
        color: '#000000'
    },
    text2: {
        fontSize: 16,
        fontFamily: 'TitilliumWeb-SemiBold',
        color: WARNA_DISABLE
    }
})