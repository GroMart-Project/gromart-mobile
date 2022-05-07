import { createSlice } from "@reduxjs/toolkit";
import * as SplashScreen from "expo-splash-screen";

const initialState = {
  ready: false,
  loaded: false,
  loggedIn: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    hideSplash(state, action) {
      const onReady = async () => {
        await SplashScreen.hideAsync();
      };

      if (state.loaded) {
        onReady();
      }
    },
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
      state.loaded = true;
    },
  },
});

export const { hideSplash, setLoggedIn } = userSlice.actions;

export default userSlice.reducer;
