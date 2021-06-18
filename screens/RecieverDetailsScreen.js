
import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';

import db from '../config.js';

export default class RecieverDetailsScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      userId                    : firebase.auth().currentUser.email,
      userName                  : "",
      vlogerId                : this.props.navigation.getParam('details')["user_id"],
      vlogTitle                  : this.props.navigation.getParam('details')["vlog_title"],
      description     : this.props.navigation.getParam('details')["description"],
      vlogerName              : '',
      vlogerContact           : '',
      vlogerAddress           : '',
      vlogerRequestDocId      : '',
      likes:'',
      docId     : ''
    }
  }

 

  getRecieverDetails(){
    db.collection('users').where('email_id','==',this.state.vlogerId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          vlogerName    : doc.data().first_name,
          vlogerContact : doc.data().contact,
          vlogerAddress : doc.data().address,
        })
      })
    });

    
  }




  getUserDetails=(userId)=>{
    db.collection("users").where('email_id','==', userId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        this.setState({
          userName  :doc.data().first_name + " " + doc.data().last_name
        })
      })
    })
  }

 addMyLikes=()=>{
   
    db.collection("my_likes").add({
      "targeted_user_id"    : this.state.vlogerId,
      "targeted_user_name"    : this.state.vlogerName,
      "liker_id"            : this.state.userId,
      "vlog_title"           : this.state.vlogTitle,
  
      "date"                : firebase.firestore.FieldValue.serverTimestamp(),
     
     
    })
  }






  addNotification=()=>{
    var message = this.state.userName + " liked your Vlog"
    db.collection("all_notifications").add({
      "targeted_user_id"    : this.state.vlogerId,
      "liker_id"            : this.state.userId,
      "vlog_title"           : this.state.vlogTitle,
      "date"                : firebase.firestore.FieldValue.serverTimestamp(),
      "notification_status" : "unread",
      "message"             : message
    })
  }

getLikes=(likes,docId)=>{

    db.collection('users').where('email_id','==',this.state.vlogerId).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
      var data = doc.data()
        this.setState({
          likes   : data.like,
          docId     : doc.id
        })
      });
    })
  }


updateLikes=()=>{
    db.collection('users').doc(this.state.docId)
    .update({
      "like": this.state.likes+1,
    
    })
    
   db.collection('users').where('email_id','==',this.state.vlogerId).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
      var data = doc.data()
        this.setState({
          likes   : data.like,
        })
      });
    })
  

  }

  updatedisLikes=()=>{
    db.collection('users').doc(this.state.docId)
    .update({
      "like": this.state.likes-1,
    
    })
db.collection('users').where('email_id','==',this.state.vlogerId).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
      var data = doc.data()
        this.setState({
          likes   : data.like,
        })
      });
    })
  

  }
  

  componentDidMount(){
    this.getRecieverDetails()
    this.getUserDetails(this.state.userId)
    this.getLikes()
  }


    render(){
      return(
        <View style={styles.container}>
          <View style={{flex:0.1}}>
            <Header
              leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
              centerComponent={{ text:"The Vlog", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
              backgroundColor = "#eaf8fe"
            />
          </View>
          <View style={{flex:0.3}}>
            <Card
                title={"Vlog Information"}
                titleStyle= {{fontSize : 20}}
              >
              <Card >
                <Text style={{fontWeight:'bold'}}>Title : {this.state.vlogTitle}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Description : {this.state.description}</Text>
              </Card>
            </Card>
          </View>
          <View style={{flex:0.3}}>
            <Card
              title={"Vloger Information"}
              titleStyle= {{fontSize : 20}}
              >
              <Card>
                <Text style={{fontWeight:'bold'}}>Name: {this.state.vlogerName}</Text>
              </Card>
                <Card>
                <Text style={{fontWeight:'bold'}}>Likes : {this.state.likes}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Contact: {this.state.vlogerContact}</Text>
              </Card>
            </Card>
          </View>
          <View style={styles.buttonContainer}>
            {
              this.state.vlogerId !== this.state.userId
              ?(
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                   
             this.addMyLikes()
                     this.updateLikes()
                     this.addNotification()
                this.props.navigation.navigate("MyLikes");
           
              
                      
                    }}>
                  <Text>LIKE</Text>
                </TouchableOpacity>
              )
              : null
            }
              <View style={styles.buttonContainer}>
            {
              this.state.vlogerId !== this.state.userId
              ?(
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                   
                     this.updatedisLikes()
                   
                
                  
                  
                      
                    }}>
                  <Text>DISLIKE</Text>
                </TouchableOpacity>
              )
              : null
            }
          </View>
          </View>
        </View>
      )
    }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16,
    marginTop:28,
  }
})
