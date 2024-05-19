import { View, Text, StyleSheet, Image, PermissionsAndroid, Alert, Pressable, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import Button from '../Button';
import { Color } from '../../Constants/Color';
import RNFetchBlob from 'rn-fetch-blob';
import { windowWidth } from '../../Constants/Dimension';

const DownloadMedia = ({fileUrl}) => {
    const [loading,setLoading]=useState(false);

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
        <View style={styles.box} >
          <ImageBackground
            blurRadius={2}
            resizeMode='cover'
            style={{width:'100%',height:70}} 
            source={require("../../assets/Images/rm.png")} 
          />
          <Text style={styles.verifiedText}>Verified</Text>
          <TouchableOpacity onPress={downloadFile} >
            <Text style={{borderTopWidth:1,height:30,fontWeight:"600",fontSize:10,paddingVertical:4,paddingHorizontal:6,borderTopColor:Color.Light_grey}}>
              Download Resume
            </Text>
          </TouchableOpacity>
        </View>
    )
}
const styles=StyleSheet.create({
  box: {
    width:windowWidth/2.5,
    height:100,
    marginHorizontal:20,
    marginBottom:10,
    borderRadius:10,
    borderWidth:2,
    borderColor:Color.Light_grey
  },
  verifiedText:{
    color:Color.LIGHT_GREEN,
    fontSize:8,
    fontWeight:"800",
    paddingHorizontal:10,
    paddingVertical:4,
    backgroundColor:"rgba(0,182,91,0.2)",
    borderRadius:100,
    position: 'absolute',
    top:6,
    right:6
  }
})
export default DownloadMedia