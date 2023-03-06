import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'
import { IconSearch } from '../../assets';
import React from 'react'

export default function SearchBox() {
    const [search, onChangeSearch] = React.useState('');
    return (
        <View style={styles.container}>
            <IconSearch style={styles.icons} />
            <TextInput style={styles.search} onChangeText={onChangeSearch} value={search} placeholder="Kolom Pencarian. . . " placeholderTextColor="lightgray" />
        </View>
    )
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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
    search: {
        marginLeft: 10,
        marginTop: - 0.013 * windowHeight,
        marginBottom: - 0.013 * windowHeight,
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Light',
        color: 'black',
    },
    icons: {
        paddingTop: 40
    }
})