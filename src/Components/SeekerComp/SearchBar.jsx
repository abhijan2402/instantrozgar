import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Color } from '../../Constants/Color';
import Fontisto from 'react-native-vector-icons/Fontisto';

const SearchBar = ({
    onSearchValue,
    searchedValue,
    onPress,
    showSearchIcon = true,
    searchTitle = "Jobs",
    widthDyn = '90%',
    elevation = 4,
    borderWidth,
    marginTop = 16,
    marginBottom = 8,
    paddingHorizontal = 10,
    borderColor= Color.Grey,
    backgroundColor=Color.white
}) => {
    return (
        <View style={[styles.inputBox, { backgroundColor:backgroundColor,width: widthDyn, elevation: elevation, shadowOpacity: elevation === 0 ? 0 : 0.2, shadowRadius: elevation === 0 ? 0 : 6, borderWidth: borderWidth, marginTop: marginTop, marginBottom: marginBottom, paddingHorizontal: paddingHorizontal,borderColor: borderColor, }]}>
            <TextInput value={searchedValue} placeholder={`Search ${searchTitle} here`} placeholderTextColor={Color.Grey} onChangeText={(value) => onSearchValue(value)} style={{ fontWeight: '600', color: Color.Black, fontSize: 12, flex: 1 }} />
            <View style={[{ alignItems: "center",flexDirection:"row" }]}>
                {
                    searchedValue !== '' &&
                    <TouchableOpacity onPress={() => { onSearchValue(""); }}>
                        <Fontisto
                            name="close-a"
                            color={Color.Grey}
                            size={14}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputBox: {
        backgroundColor: Color.White,
        alignSelf: "center",
        borderRadius: 6,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 46,
    }
});

export default SearchBar;
