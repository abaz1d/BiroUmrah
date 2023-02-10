import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useCallback } from 'react'
import { IconUnderlineOn } from '../../assets';
import { WARNA_DISABLE } from '../../utils/constant';
import { Picker } from '@react-native-picker/picker';

const PesananTab = () => {
    const [selectGender, setSelectGender] = useState();
    return (
        <View style={styles.container}>
            <View style={styles.page}>
                <Picker
                    selectedValue={selectGender}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectGender(itemValue)
                    }>
                   <Picker.Item label="Cuci Komplit" value="Cuci Komplit" />
                    <Picker.Item label="Cuci Kering" value="Cuci Kering" />
                    <Picker.Item label="Setrika Aja" value="Setrika Aja" />
                    <Picker.Item label="Paket Bulanan" value="Paket Bulanan" />
                    <Picker.Item label="Paket Tahunan" value="Paket Tahunan" />
                    <Picker.Item label="Paket Urgent" value="Paket Urgent" />
                </Picker>
            </View>
        </View>
    )
}

export default PesananTab

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
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
        flexGrow: 1,
        flexDirection: 'row',
        zIndex: 1,
    },
    page: {
        flex: 1,
        backgroundColor: 'transparent',
      },
    navigasi: {
        justifyContent: 'center',
        alignItems: 'center',
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