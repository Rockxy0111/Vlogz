import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'


export default class MyDonationScreen extends Component {
   constructor(){
     super()
     this.state = {

       userId  : firebase.auth().currentUser.email,
      likesList : [],
      docId     : '',
     likes:'',
     }
     this.likeListRef= null
   }

   static navigationOptions = { header: null };

    getLikeList =()=>{
    this.likeListRef = db.collection("my_likes")
    .onSnapshot((snapshot)=>{
      var likesList = snapshot.docs.map((doc) => doc.data())
      this.setState({
        likesList : likesList
        
      });
    })
  }

   getRemoveList =()=>{
     db.collection('my_likes').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
      var data = doc.data()
        this.setState({
          docId     : doc.id
        })
      });
    })
  }

  reamoveLikeList = ()=>{
   db.collection("my_likes").doc(this.state.docId).delete()
    db.collection('my_likes').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
      var data = doc.data()
        this.setState({
          docId     : doc.id
        })
      });
    })
  }

  componentDidMount(){
    this.getLikeList()
    this.getRemoveList()
  }

  componentWillUnmount(){
    this.likeListRef();
  }

   

   
   keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(
     <ListItem
       key={i}
       title={"Vlog By: " +item.targeted_user_name}
       subtitle={"Title: " +item.vlog_title}
       titleStyle={{ color: 'black', fontWeight: 'bold' }}
      rightElement={

            <TouchableOpacity style={styles.button}
              onPress ={()=>{
               this.reamoveLikeList()
              }}
              >
              <Text style={{color:'black'}}>Remove</Text>
            </TouchableOpacity>
          }
       bottomDivider
     />
   )


   

   render(){
     return(
       <View style={{flex:1}}>
         <MyHeader navigation={this.props.navigation} title="My Likes"/>
         <View style={{flex:1}}>
       
           {
             this.state.likesList.length === 0
             ?(
               <View style={styles.subtitle}>
                 <Text style={{ fontSize: 20}}>List of all Vlogs Liked</Text>
               </View>
             )
             :(
           
               
               <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.likesList}
                 renderItem={this.renderItem}
               />
               
             )
           }
         </View>
       </View>
     )
   }
   }


const styles = StyleSheet.create({
  button:{
    width:100,
    height:30,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  },
  subtitle :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  }
})
