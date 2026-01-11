import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import AdminDashboard from "../screens/AdminDashboard";
import SemiAdminDashboard from "../screens/SemiAdminDashboard";
import UserDashboard from "../screens/UserDashboard";
import FolderUpload from "../screens/FolderUpload";
import FolderDetailsScreen from "../screens/FolderDetailsScreen";
import SubmissionDetails from "../screens/SubmissionDetails";
import DepartmentFolders from "../screens/DepartmentFolders";
import UsersManagement from "../screens/UsersManagement";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={{ title: "Admin Dashboard" }}
      />
      <Stack.Screen
        name="SemiAdminDashboard"
        component={SemiAdminDashboard}
        options={{ title: "Admin" }}
      />
      <Stack.Screen
        name="UserDashboard"
        component={UserDashboard}
        options={{ title: "Folders" }}
      />
      <Stack.Screen
        name="FolderUpload"
        component={FolderUpload}
        options={{ title: "Submission" }}
      />
      <Stack.Screen
        name="FolderUploadDetail"
        component={FolderDetailsScreen}
        options={{ title: "Folder Details" }}
      />
      <Stack.Screen
        name="SubmissionDetails"
        component={SubmissionDetails}
        options={{ title: "Submissions" }}
      />
      <Stack.Screen
        name="DepartmentFolders"
        component={DepartmentFolders}
        options={{ title: "Department Folders" }}
      />
      <Stack.Screen
        name="UsersManagement"
        component={UsersManagement}
        options={{ title: "Users Management" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
