import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { IconAkun, IconAkunActive, IconHome, IconHomeActive, IconPesanan, IconPesananActive } from '../../assets'
import { WARNA_UTAMA, WARNA_DISABLE } from '../../utils/constant'

export default function TabItemBox({ isFocused, onPress, onLongPress, label }) {
    const Icon = () => {
        if (label === 'Home') { return isFocused ? <IconHomeActive /> : <IconHome /> }
        if (label === 'Keberangkatan') { return isFocused ? <IconPesananActive /> : <IconPesanan /> }
        if (label === 'Akun') { return isFocused ? <IconAkunActive /> : <IconAkun /> }
        return <IconHome /> // default
    }
    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}
        >
            <Icon />
            <Text style={styles.text(isFocused)}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
    },
    text: (isFocused) => ({
        fontSize: 10,
        color: isFocused ? '#000000' : WARNA_DISABLE,
        marginTop: 4,
    }),
})