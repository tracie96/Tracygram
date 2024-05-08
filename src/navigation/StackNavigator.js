import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import CustomBottomTab from '../components/customBottomTab';
import SplashScreen from '../pages/splashScreen/index';
import LoginScreen from '../pages/auth/login';
import SignUpScreen from '../pages/auth/signUp';
import ResetPasswordScreen from '../pages/auth/resetPass';
import HomePage from '../pages/home';
import InboxScreen from '../pages/home/chat/InboxScreen';
import MessageScreen from '../pages/home/chat/MessageScreen';
import NewGroupScreen from '../pages/home/chat/NewGroupScreen';
import NewGroupDetailsScreen from '../pages/home/chat/NewGroupDetailsScreen';
import NotificationScreen from '../pages/home/notification/NotificationScreen';
import SupaMallScreen from '../pages/supaMall/index';
import AddScreen from '../pages/add/index';
import LuvHubScreen from '../pages/luvHub/index';
import ProfileScreen from '../pages/profile/index';
import ProfileSettingScreen from '../pages/profile/ProfileSetting';
import DeactivateAccountSettingScreen from '../pages/profile/DeactivateAccountSetting';
import InterestSettingScreen from '../pages/profile/InterestSetting';
import AccountSettingScreen from '../pages/profile/AccountSetting';
import VisibilitySettingScreen from '../pages/profile/VisibilitySetting';
import AccountInformationSettingScreen from '../pages/profile/AccountInformationSetting';
import ContentYouSeeSettingScreen from '../pages/profile/ContentYouSee';
import EditProfileSettingScreen from '../pages/profile/EditProfile';
import AudienceMediaTaggingSettingScreen from '../pages/profile/AudienceMediaTagging';
import NotificationPreferencesSettingScreen from '../pages/profile/NotificationPreferences';
import SecurityAndPrivacySettingScreen from '../pages/profile/SecurityAndPrivacy';
import BlockingSettingScreen from '../pages/profile/BlockingSetting';
import PersonalInformationSettingScreen from '../pages/profile/PersonalInformationSetting';
import ProfileSetupSettingScreen from '../pages/profile/ProfileSetupSetting';
import LikesScreen from '../pages/profile/Likes';
import RecentActivitiesScreen from '../pages/profile/RecentActivities';
import MallDetails from '../pages/supaMall/mallDetails';
import OnboardingScreen from '../pages/onboarding/index';
import FollowerProfileScreen from '../pages/home/followerProfile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const screenOption = {
  ...TransitionPresets.SlideFromRightIOS,
  ...TransitionPresets.BottomSheetAndroid,
  headerShown: false,
  animationEnabled: true,
  unmountOnBlur: true,
};

const HomePageStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen
        name="HomeScreen"
        component={HomePage}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="HomeChatScreen"
        component={InboxScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="HomeNotificationScreen"
        component={NotificationScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="NewGroupScreen"
        component={NewGroupScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="NewGroupDetailsScreen"
        component={NewGroupDetailsScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="FollowerProfileScreen"
        component={FollowerProfileScreen}
        options={{headerLeft: props => null}}
      />
    </Stack.Navigator>
  );
};

const SupaMallStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen
        name="SupaMallScreen"
        component={SupaMallScreen}
        options={{headerLeft: props => null}}
      />

      <Stack.Screen
        name="SupaMallScreenDetails"
        component={MallDetails}
        options={{headerLeft: props => null}}
      />
    </Stack.Navigator>
  );
};

const AddStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen
        name="AddPost"
        component={AddScreen}
        options={{headerLeft: props => null}}
      />
    </Stack.Navigator>
  );
};

const LuvHubStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen
        name="HomeScreen"
        component={LuvHubScreen}
        options={{headerLeft: props => null}}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="ProfileSetting"
        component={ProfileSettingScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="ProfileVisibilitySetting"
        component={VisibilitySettingScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="ProfileContentYouSeeSetting"
        component={ContentYouSeeSettingScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="ProfileAccountingSetting"
        component={AccountSettingScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="ProfileSecurityAndPrivacySetting"
        component={SecurityAndPrivacySettingScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="ProfileEditProfileSetting"
        component={EditProfileSettingScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="ProfileAudienceMediaTaggingSetting"
        component={AudienceMediaTaggingSettingScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="ProfileAccountInformationSetting"
        component={AccountInformationSettingScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="ProfileNotificationPreferencesSetting"
        component={NotificationPreferencesSettingScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="ProfileInterestSetting"
        component={InterestSettingScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="ProfileBlockingSetting"
        component={BlockingSettingScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="ProfileDeactivateAccountSetting"
        component={DeactivateAccountSettingScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="ProfilePersonalInformationSetting"
        component={PersonalInformationSettingScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="ProfileProfileSetupSetting"
        component={ProfileSetupSettingScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="ProfileRecentActivities"
        component={RecentActivitiesScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="ProfileLikes"
        component={LikesScreen}
        options={{headerLeft: props => null}}
      />
    </Stack.Navigator>
  );
};

function TabNavigation() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={HomePageStack}
        options={{headerShown: false}}
      />

      <Tab.Screen
        name="SupaMall"
        component={SupaMallStack}
        options={{headerShown: false}}
      />

      <Tab.Screen
        name="Add"
        component={AddStack}
        options={{headerShown: false}}
      />

      <Tab.Screen
        name="LuvHub"
        component={LuvHubStack}
        options={{headerShown: false}}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerLeft: props => null}}
      />

      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{headerLeft: props => null}}
      />
    </Stack.Navigator>
  );
};

const SplashStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen
        name="splashMain"
        component={SplashScreen}
        options={{headerLeft: props => null}}
      />

      <Stack.Screen
        name="SplashAbout"
        component={SplashScreen}
        options={{headerLeft: props => null}}
      />
    </Stack.Navigator>
  );
};

const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen
        name="splashMain"
        component={OnboardingScreen}
        options={{headerLeft: props => null}}
      />

      {/* <Stack.Screen
        name="SplashAbout"
        component={SplashScreen}
        options={{headerLeft: props => null}}
      /> */}
    </Stack.Navigator>
  );
};

export default MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen name="Splash" component={SplashStack} />
      <Stack.Screen name="Onboarding" component={OnboardingStack} />
      <Stack.Screen name="Main" component={TabNavigation} />
      <Stack.Screen name="Auth" component={AuthStack} />
    </Stack.Navigator>
  );
};
