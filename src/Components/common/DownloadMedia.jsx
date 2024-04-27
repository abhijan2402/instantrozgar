import { View, Text, StyleSheet, Platform, PermissionsAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '../Button';
import { Color } from '../../Constants/Color';
import RNFetchBlob from 'rn-fetch-blob';

const DownloadMedia = ({fileUrl}) => {
    const [loading,setLoading]=useState(false)
    ;
    const getFileExtention = fileUrl => {
        const match = /\.([^.?]+)(?:\?|$)/.exec(fileUrl);
        return match ? match[1] : undefined;
    };

    const downloadFile = () => {
        setLoading(true)
        let date = new Date();
        let FILE_URL = fileUrl;    
        let file_ext = getFileExtention(FILE_URL);
        console.log(file_ext,'name');
        file_ext = '.' + file_ext[0];
        const { config, fs } = RNFetchBlob;
        let RootDir = fs.dirs.PictureDir;
        let options = {
          fileCache: true,
          addAndroidDownloads: {
            path:RootDir + '/file_' + Math.floor(date.getTime() + date.getSeconds() / 2) + file_ext,
            description: 'downloading file...',
            notification: true,
            useDownloadManager: true,   
          },
        };
        config(options)
        .fetch('GET', FILE_URL)
        .then(res => {
            setLoading(false)
            console.log('res -> ', JSON.stringify(res));
            alert('File Downloaded Successfully.');
        })
        .catch((e)=>{
            setLoading(false);
            alert('File not Downloaded Successfully.');
            console.log(e,"error")
        })
      };

    return (
        <Button
            onPress={downloadFile}
            BtnStyle={[
                styles.BtnStyle,
                {borderWidth: 2, borderColor: Color.ThemeBlue,backgroundColor:Color.white,marginBottom:8},
            ]}
            BtnTxtStyle={[styles.BtnTxtStyle,{color:Color.LightBlue,}]}
            title={'Download Resume'}
            loading={loading}
            loaderColor={Color.LightBlue}
        />
    )
}
const styles=StyleSheet.create({
    BtnStyle: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 6,
        width: '90%',
        marginVertical: 2,
        alignSelf: 'center',
        backgroundColor: Color.ThemeBlue,
        height:40
      },
      BtnTxtStyle: {
        fontSize: 16,
        fontWeight: '700',
        color: Color.White,
      },
})
export default DownloadMedia