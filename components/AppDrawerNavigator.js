import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import MyDonationScreen from '../screens/MyDonationScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingScreen from '../screens/SettingScreen';
import {Icon} from 'react-native-elements';


export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator,
    navigationOptions:{
      drawerIcon : <Icon name="home" type ="fontawesome5" />
    }
    },
  MyLikes : {
    screen : MyDonationScreen,
      navigationOptions:{
      drawerIcon : <Icon name="thumbs-up" type ="font-awesome" />,
      drawerLabel : "My Likes"
    }
  },
  Notification : {
    screen : NotificationScreen,
      navigationOptions:{
      drawerIcon : <Icon name="bell" type ="font-awesome" />,
    }
  },
  Setting : {
    screen : SettingScreen,
    navigationOptions:{
     drawerIcon : <Icon name="settings" type ="fontawesome5" />,
    }
  }
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
