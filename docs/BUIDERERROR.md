ifications was removed from Expo Go with the release of SDK 53. Use a development build instead of Expo Go. Learn more at https://docs.expo.dev/develop/development-builds/introduction/.]

Code: notifications.ts
  2 | import {  Platform } from 'react-native';
  3 | import * as Device from 'expo-device';
> 4 | import * as Notifications from 'expo-notifications';
    | ^
  5 | import Constants from 'expo-constants';
  6 |
  7 | Notifications.setNotificationHandler({
Call Stack
  <global> (app\lib\notifications.ts:4)
  <global> (app\(app)\_layout.tsx:3)
 ERROR  [TypeError: Cannot read property 'ErrorBoundary' of undefined]

Code: useScreens.js
  139 |     }), [sorted, protectedScreens]);
  140 | }
> 141 | function fromImport(value, { ErrorBoundary, SuspenseFallback, ...component }) {
      | ^
  142 |     // If possible, add a more helpful display name for the component stack to improve debugging of React errors such as `Text strings must be rendered within a <Text> component.`.
  143 |     if (component?.default && __DEV__) {
  144 |         component.default.displayName ??= `${component.default.name ?? 'Route'}(${value.contextKey})`;
Call Stack
  fromImport (node_modules\expo-router\build\useScreens.js:141)
  getQualifiedRouteComponent (node_modules\expo-router\build\useScreens.js:206:34)
  useStore (node_modules\expo-router\build\global-state\useStore.js:55:68)
  ContextNavigator (node_modules\expo-router\build\ExpoRoot.js:122:46)
  callComponent.react_stack_bottom_frame (node_modules\react-native\Libraries\Renderer\implementations\ReactFabric-dev.js:17130:29)
  renderWithHooks (node_modules\react-native\Libraries\Renderer\implementations\ReactFabric-dev.js:5648:40)
  updateFunctionComponent (node_modules\react-native\Libraries\Renderer\implementations\ReactFabric-dev.js:8081:34)
  beginWork (node_modules\react-native\Libraries\Renderer\implementations\ReactFabric-dev.js:9340:41)
  run (<native>)
  runWithFiberInDEV (node_modules\react-native\Libraries\Renderer\implementations\ReactFabric-dev.js:697:33)
  performUnitOfWork (node_modules\react-native\Libraries\Renderer\implementations\ReactFabric-dev.js:14134:39)
  workLoopSync (node_modules\react-native\Libraries\Renderer\implementations\ReactFabric-dev.js:13966:58)
  renderRootSync (node_modules\react-native\Libraries\Renderer\implementations\ReactFabric-dev.js:13947:23)
  performWorkOnRoot (node_modules\react-native\Libraries\Renderer\implementations\ReactFabric-dev.js:13160:43)
  performWorkOnRootViaSchedulerTask (node_modules\react-native\Libraries\Renderer\implementations\ReactFabric-dev.js:3673:24)

Code: ExpoRoot.js
  83 |                     initialMetrics: INITIAL_METRICS, children: children }) }) }));
  84 |     }, [ParentWrapper]);
> 85 |     return (0, jsx_runtime_1.jsx)(ContextNavigator, { ...props, wrapper: wrapper });
     |                                 ^
  86 | }
  87 | const initialUrl = react_native_1.Platform.OS === 'web' && typeof window !== 'undefined'
  88 |     ? new URL(window.location.href)
Call Stack
  ExpoRoot (node_modules\expo-router\build\ExpoRoot.js:85:33)
  App (node_modules\expo-router\build\qualified-entry.js:20:91)
  call (<native>)
  apply (<native>)
  <anonymous> (node_modules\react-native-css-interop\dist\runtime\wrap-jsx.js:20:24)
  WithDevTools (node_modules\expo\src\launch\withDevTools.tsx:21:12)
Could not open editor.
You can set an editor for Expo to open by defining the $EXPO_EDITOR or $VISUAL environment variable (e.g. "vscode" or "atom")
 ERROR  [Error: expo-notifications: Android Push notifications (remote notifications) functionality provided by expo-notifications was removed from Expo Go with the release of SDK 53. Use a development build instead of Expo Go. Learn more at https://docs.expo.dev/develop/development-builds/introduction/.]

Code: notifications.ts
  48 |
  49 |   //     const projectId = Constants.expoConfig?.extra?.eas.projectId || Constants.easConfig?.projectId;
> 50 |   //     if (!projectId) {
     |   ^
  51 |   //       throw new Error('Could not find Project ID in app.json/app.config.js');
  52 |   //     }
  53 |   //     token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
Call Stack
  registerForPushNotificationsAsync (app\lib\notifications.ts:50:3)
  AppLayout (app\(app)\_layout.tsx:32:22)
 ERROR  [Error: expo-notifications: Android Push notifications (remote notifications) functionality provided by expo-notifications was removed from Expo Go with the release of SDK 53. Use a development build instead of Expo Go. Learn more at https://docs.expo.dev/develop/development-builds/introduction/.]

Code: _layout.tsx
  34 |       }}
  35 |     >
> 36 |       <Stack.Screen name="index" options={{  headerShown: false, gestureEnabled: true }} />
     |                                                                                            ^
  37 |       <Stack.Screen name="(screens)/explore" options={{ presentation: 'modal', title: 'Explorar', headerShown: false, gestureEnabled: true }} />
  38 |       <Stack.Screen name="(screens)/clan" options={{ title: 'Clã', headerShown: false, gestureEnabled: true }} />
  39 |       <Stack.Screen name="(public)/[slug]" options={{ title: 'Usuario', headerShown: false, gestureEnabled: true }} />
Call Stack
  AppLayout (app\(app)\_layout.tsx:36:92)
Android Bundled 6867ms node_modules\expo-router\entry.js (1 module)
 WARN  SafeAreaView has been deprecated and will be removed in a future release. Please use 'react-native-safe-area-context' instead. See https://github.com/AppAndFlow/react-native-safe-area-context
 WARN  Route "./(app)/(auth)/login.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./(app)/(auth)/register.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./(app)/(password)/forgot-password.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./(app)/(password)/reset-password.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/clan/AddMissionSheet.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/clan/AddTerritorySheet.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/clan/EditMissionSheet.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/clan/EditTerritorySheet.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/clan/tabs/EventsTab.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/clan/tabs/MembersTab.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/clan/tabs/MissionsTab.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/clan/tabs/RecruitTab.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/clan/tabs/TerritoriesTab.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/explore/ClansList.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/explore/Dashboard.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/explore/TerritoriesList.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/explore/TerritoryMap.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/feed/CommentItem.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/feed/CreatePostSheet.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/feed/PostImageCarousel.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/feed/PostItem.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/home/ActivateFeedButton.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/home/CreateProfilePrompt.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/home/HomeContent.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/home/HomeHeader.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/home/PullToRevealSymbol.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/profile/EditClanEmblemSheet.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/profile/EditJapaneseNameSheet.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/profile/EditProfileSheet.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/profile/ImageUpload.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/profile/ProfileForm.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/profile/ProfileHeader.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/profile/ProfileInfo.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/profile/ProfileSocialLinks.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./context/ScrollContext.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./context/auth-context.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./context/profile-context.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/use-clan-management.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/use-color-scheme.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/use-post-details.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/use-posts.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/use-theme-color.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/useClanAssets.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/useClanMembers.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/useExploreData.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/usePublicProfile.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/userProfileOld.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./lib/notifications.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./lib/supabase.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./lib/types.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./utils/formatDate.tsx" is missing the required default export. Ensure a React component is exported as default.
 ERROR  [Error: Cannot find native module 'ExponentAV']

Code: login.tsx
  3 | import { useRouter } from "expo-router";
  4 | import { Eye, EyeOff, Lock, User } from "lucide-react-native";
> 5 | import { Video, ResizeMode } from 'expo-av';
    | ^
  6 | import { useAuth } from "../../context/auth-context";
  7 | import { CustomButton } from "../../../components/ui/custom-button";
  8 |
Call Stack
  <global> (app\(app)\(auth)\login.tsx:5)
 ERROR  [Error: Cannot find native module 'ExponentAV']

Code: login.tsx
  3 | import { useRouter } from "expo-router";
  4 | import { Eye, EyeOff, Lock, User } from "lucide-react-native";
> 5 | import { Video, ResizeMode } from 'expo-av';
    | ^
  6 | import { useAuth } from "../../context/auth-context";
  7 | import { CustomButton } from "../../../components/ui/custom-button";
  8 |
Call Stack
  <global> (app\(app)\(auth)\login.tsx:5)
 ERROR  [Error: Cannot find native module 'ExponentAV']

Code: login.tsx
  3 | import { useRouter } from "expo-router";
  4 | import { Eye, EyeOff, Lock, User } from "lucide-react-native";
> 5 | import { Video, ResizeMode } from 'expo-av';
    | ^
  6 | import { useAuth } from "../../context/auth-context";
  7 | import { CustomButton } from "../../../components/ui/custom-button";
  8 |
Call Stack
  <global> (app\(app)\(auth)\login.tsx:5)
 ERROR  [Error: Cannot find native module 'ExponentAV']

Code: login.tsx
  3 | import { useRouter } from "expo-router";
  4 | import { Eye, EyeOff, Lock, User } from "lucide-react-native";
> 5 | import { Video, ResizeMode } from 'expo-av';
    | ^
  6 | import { useAuth } from "../../context/auth-context";
  7 | import { CustomButton } from "../../../components/ui/custom-button";
  8 |
Call Stack
  <global> (app\(app)\(auth)\login.tsx:5)
 ERROR  [Error: Cannot find native module 'ExponentAV']

Code: login.tsx
  3 | import { useRouter } from "expo-router";
  4 | import { Eye, EyeOff, Lock, User } from "lucide-react-native";
> 5 | import { Video, ResizeMode } from 'expo-av';
    | ^
  6 | import { useAuth } from "../../context/auth-context";
  7 | import { CustomButton } from "../../../components/ui/custom-button";
  8 |
Call Stack
  <global> (app\(app)\(auth)\login.tsx:5)

Code: _layout.tsx
  3 | export default function AuthLayout() {
  4 |   return (
> 5 |     <Stack screenOptions={{ headerShown: false }}>
    |     ^
  6 |       <Stack.Screen name="login" options={{ title: 'Login', headerShown: false, gestureEnabled: true }}/>
  7 |       <Stack.Screen name="register" options={{ title: 'Registro', headerShown: false, gestureEnabled: true }} />
  8 |     </Stack>
Call Stack
  AuthLayout (app\(app)\(auth)\_layout.tsx:5:5)
  AppLayout (app\(app)\_layout.tsx:31:5)
  RootLayoutNav (app\_layout.tsx:75:7)
  RootLayout (app\_layout.tsx:93:9)
 ERROR  [Error: Cannot find native module 'ExponentAV']

Code: login.tsx
  3 | import { useRouter } from "expo-router";
  4 | import { Eye, EyeOff, Lock, User } from "lucide-react-native";
> 5 | import { Video, ResizeMode } from 'expo-av';
    | ^
  6 | import { useAuth } from "../../context/auth-context";
  7 | import { CustomButton } from "../../../components/ui/custom-button";
  8 |
Call Stack
  <global> (app\(app)\(auth)\login.tsx:5)

Code: _layout.tsx
  3 | export default function AuthLayout() {
  4 |   return (
> 5 |     <Stack screenOptions={{ headerShown: false }}>
    |     ^
  6 |       <Stack.Screen name="login" options={{ title: 'Login', headerShown: false, gestureEnabled: true }}/>
  7 |       <Stack.Screen name="register" options={{ title: 'Registro', headerShown: false, gestureEnabled: true }} />
  8 |     </Stack>
Call Stack
  AuthLayout (app\(app)\(auth)\_layout.tsx:5:5)
  AppLayout (app\(app)\_layout.tsx:31:5)
  RootLayoutNav (app\_layout.tsx:75:7)
  RootLayout (app\_layout.tsx:93:9)
 ERROR  [TypeError: Cannot read property 'ErrorBoundary' of undefined]

Code: _layout.tsx
  3 | export default function AuthLayout() {
  4 |   return (
> 5 |     <Stack screenOptions={{ headerShown: false }}>
    |     ^
  6 |       <Stack.Screen name="login" options={{ title: 'Login', headerShown: false, gestureEnabled: true }}/>
  7 |       <Stack.Screen name="register" options={{ title: 'Registro', headerShown: false, gestureEnabled: true }} />
  8 |     </Stack>
Call Stack
  AuthLayout (app\(app)\(auth)\_layout.tsx:5:5)
  AppLayout (app\(app)\_layout.tsx:31:5)
  RootLayoutNav (app\_layout.tsx:75:7)
  RootLayout (app\_layout.tsx:93:9)
 WARN  Route "./(app)/(auth)/login.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./(app)/(auth)/register.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./(app)/(password)/forgot-password.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./(app)/(password)/reset-password.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/clan/AddMissionSheet.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/clan/AddTerritorySheet.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/clan/EditMissionSheet.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/clan/EditTerritorySheet.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/clan/tabs/EventsTab.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/clan/tabs/MembersTab.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/clan/tabs/MissionsTab.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/clan/tabs/RecruitTab.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/clan/tabs/TerritoriesTab.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/explore/ClansList.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/explore/Dashboard.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/explore/TerritoriesList.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/explore/TerritoryMap.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/feed/CommentItem.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/feed/CreatePostSheet.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/feed/PostImageCarousel.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/feed/PostItem.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/home/ActivateFeedButton.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/home/CreateProfilePrompt.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/home/HomeContent.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/home/HomeHeader.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/home/PullToRevealSymbol.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/profile/EditClanEmblemSheet.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/profile/EditJapaneseNameSheet.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/profile/EditProfileSheet.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/profile/ImageUpload.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/profile/ProfileForm.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/profile/ProfileHeader.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/profile/ProfileInfo.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./components/profile/ProfileSocialLinks.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./context/ScrollContext.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./context/auth-context.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./context/profile-context.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/use-clan-management.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/use-color-scheme.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/use-post-details.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/use-posts.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/use-theme-color.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/useClanAssets.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/useClanMembers.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/useExploreData.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/usePublicProfile.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./hooks/userProfileOld.tsx" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./lib/notifications.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./lib/supabase.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./lib/types.ts" is missing the required default export. Ensure a React component is exported as default.
 WARN  Route "./utils/formatDate.tsx" is missing the required default export. Ensure a React component is exported as default.
 ERROR  [Error: Cannot find native module 'ExponentAV']

Code: login.tsx
  3 | import { useRouter } from "expo-router";
  4 | import { Eye, EyeOff, Lock, User } from "lucide-react-native";
> 5 | import { Video, ResizeMode } from 'expo-av';
    | ^
  6 | import { useAuth } from "../../context/auth-context";
  7 | import { CustomButton } from "../../../components/ui/custom-button";
  8 |
Call Stack
  <global> (app\(app)\(auth)\login.tsx:5)
 ERROR  [Error: Cannot find native module 'ExponentAV']

Code: login.tsx
  3 | import { useRouter } from "expo-router";
  4 | import { Eye, EyeOff, Lock, User } from "lucide-react-native";
> 5 | import { Video, ResizeMode } from 'expo-av';
    | ^
  6 | import { useAuth } from "../../context/auth-context";
  7 | import { CustomButton } from "../../../components/ui/custom-button";
  8 |
Call Stack
  <global> (app\(app)\(auth)\login.tsx:5)
 ERROR  [Error: Cannot find native module 'ExponentAV']

Code: login.tsx
  3 | import { useRouter } from "expo-router";
  4 | import { Eye, EyeOff, Lock, User } from "lucide-react-native";
> 5 | import { Video, ResizeMode } from 'expo-av';
    | ^
  6 | import { useAuth } from "../../context/auth-context";
  7 | import { CustomButton } from "../../../components/ui/custom-button";
  8 |
Call Stack
  <global> (app\(app)\(auth)\login.tsx:5)
 ERROR  [Error: Cannot find native module 'ExponentAV']

Code: login.tsx
  3 | import { useRouter } from "expo-router";
  4 | import { Eye, EyeOff, Lock, User } from "lucide-react-native";
> 5 | import { Video, ResizeMode } from 'expo-av';
    | ^
  6 | import { useAuth } from "../../context/auth-context";
  7 | import { CustomButton } from "../../../components/ui/custom-button";
  8 |
Call Stack
  <global> (app\(app)\(auth)\login.tsx:5)
 ERROR  [Error: Cannot find native module 'ExponentAV']

Code: login.tsx
  3 | import { useRouter } from "expo-router";
  4 | import { Eye, EyeOff, Lock, User } from "lucide-react-native";
> 5 | import { Video, ResizeMode } from 'expo-av';
    | ^
  6 | import { useAuth } from "../../context/auth-context";
  7 | import { CustomButton } from "../../../components/ui/custom-button";
  8 |
Call Stack
  <global> (app\(app)\(auth)\login.tsx:5)

Code: _layout.tsx
  3 | export default function AuthLayout() {
  4 |   return (
> 5 |     <Stack screenOptions={{ headerShown: false }}>
    |     ^
  6 |       <Stack.Screen name="login" options={{ title: 'Login', headerShown: false, gestureEnabled: true }}/>
  7 |       <Stack.Screen name="register" options={{ title: 'Registro', headerShown: false, gestureEnabled: true }} />
  8 |     </Stack>
Call Stack
  AuthLayout (app\(app)\(auth)\_layout.tsx:5:5)
  AppLayout (app\(app)\_layout.tsx:31:5)
  RootLayoutNav (app\_layout.tsx:75:7)
  RootLayout (app\_layout.tsx:93:9)
 ERROR  [Error: Cannot find native module 'ExponentAV']

Code: login.tsx
  3 | import { useRouter } from "expo-router";
  4 | import { Eye, EyeOff, Lock, User } from "lucide-react-native";
> 5 | import { Video, ResizeMode } from 'expo-av';
    | ^
  6 | import { useAuth } from "../../context/auth-context";
  7 | import { CustomButton } from "../../../components/ui/custom-button";
  8 |
Call Stack
  <global> (app\(app)\(auth)\login.tsx:5)

Code: _layout.tsx
  3 | export default function AuthLayout() {
  4 |   return (
> 5 |     <Stack screenOptions={{ headerShown: false }}>
    |     ^
  6 |       <Stack.Screen name="login" options={{ title: 'Login', headerShown: false, gestureEnabled: true }}/>
  7 |       <Stack.Screen name="register" options={{ title: 'Registro', headerShown: false, gestureEnabled: true }} />
  8 |     </Stack>
Call Stack
  AuthLayout (app\(app)\(auth)\_layout.tsx:5:5)
  AppLayout (app\(app)\_layout.tsx:31:5)
  RootLayoutNav (app\_layout.tsx:75:7)
  RootLayout (app\_layout.tsx:93:9)
 ERROR  [TypeError: Cannot read property 'ErrorBoundary' of undefined]

Code: _layout.tsx
  3 | export default function AuthLayout() {
  4 |   return (
> 5 |     <Stack screenOptions={{ headerShown: false }}>
    |     ^
  6 |       <Stack.Screen name="login" options={{ title: 'Login', headerShown: false, gestureEnabled: true }}/>
  7 |       <Stack.Screen name="register" options={{ title: 'Registro', headerShown: false, gestureEnabled: true }} />
  8 |     </Stack>
Call Stack
  AuthLayout (app\(app)\(auth)\_layout.tsx:5:5)
  AppLayout (app\(app)\_layout.tsx:31:5)
  RootLayoutNav (app\_layout.tsx:75:7)
  RootLayout (app\_layout.tsx:93:9)