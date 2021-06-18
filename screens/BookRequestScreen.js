import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'





export default class BookRequestScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      vlogTitle:"",
      description:"",
     
      
    }
  }

 



  addVlog =(vlogTitle,description,likes)=>{
    var userId = this.state.userId
   
    db.collection('add_vlogs').add({
        "user_id": userId,
        "vlog_title":vlogTitle,
        "description":description,
     
    })

    this.setState({
        vlogTitle :'',
        description : '',
      
    })

    return alert("Posted Successfully")
  }


  render(){
    return(
        <View style={{flex:1}}>
          <MyHeader title="Write Vlog" navigation ={this.props.navigation}/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>

              <TextInput
                style ={styles.formTextInput}
                placeholder={"Vlog Title"}
                onChangeText={(text)=>{
                    this.setState({
                        vlogTitle:text
                    })
                }}
                value={this.state.vlogTitle}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"what do you want to write in it?"}
                onChangeText ={(text)=>{
                    this.setState({
                        description:text
                    })
                }}
                value ={this.state.description}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addVlog(this.state.vlogTitle,this.state.description)}}
                >
                <Text>Post</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)
