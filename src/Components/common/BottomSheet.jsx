import { View, Text, Dimensions, Animated, StyleSheet,Image,TouchableOpacity, ToastAndroid, Modal, Pressable, TextInput, Platform } from 'react-native'
import React,{Children, forwardRef,useEffect,useImperativeHandle,  useState} from 'react';

const FeedSheet = forwardRef(({children,type="slide",height,showTopBar=true,borderRadius=20,padding}, ref) => {
    const [openPopup,setOpenPopup]=useState(false);

    useImperativeHandle(ref, () => ({
        openOptions() {
            setOpenPopup(true)
        },
        closeOptions(){
            setOpenPopup(false)
        }
    }));
    return (
        <Modal visible={openPopup} animationType={type} transparent={true} onRequestClose={()=>setOpenPopup(false)}>
            <Pressable onStartShouldSetResponder={()=>setOpenPopup(false)} style={styles.modeOuter}>
                <View onStartShouldSetResponder={() => true} style={[styles.innnerModel,height && {height:height},{borderTopLeftRadius: borderRadius,borderTopRightRadius:borderRadius,}]}>
                    {
                        showTopBar &&
                        <View style={{width:'30%',height:6,backgroundColor:'rgba(217, 217, 217, 1)',borderRadius:100,}} />
                    }
                    {
                        children
                    }
                </View>
            </Pressable>
        </Modal>
    )
})

const styles=StyleSheet.create({
    modeOuter: {
        backgroundColor: '#000000aa',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // position:"absolute",
        // height:"100%"
       
    },
    innnerModel: {
        backgroundColor: 'white',
        width: '100%',
        paddingBottom: 20,
        elevation: 10,
        shadowColor: "white",
        alignItems:"center",
        paddingTop:Platform.OS=='ios'?30:0
    },
})
export default FeedSheet