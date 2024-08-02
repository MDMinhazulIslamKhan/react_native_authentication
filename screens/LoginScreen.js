import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay.js";
import { AuthContext } from "../store/auth-context.js";
import { authApi } from "../utils/auth.js";
import { useContext, useState } from "react";

function LoginScreen() {
  const authCtx = useContext(AuthContext);

  // for loading state
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // fetch loading token
  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    const response = await authApi.loginUser(email, password);
    setIsAuthenticating(false);
    if (response?.success && response?.data?.accessToken) {
      try {
        await AsyncStorage.setItem("token", response?.data?.accessToken);
        authCtx.authenticate(response?.data?.accessToken);
      } catch (error) {
        console.log(error);
        Alert.alert("Error!!!", "Something went wrong.");
      }
    }
  };

  // show loading
  if (isAuthenticating) {
    return <LoadingOverlay message="Login, Please wait..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
