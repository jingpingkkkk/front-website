import { createSlice } from '@reduxjs/toolkit';

export const themeSettingsSlice = createSlice({
  name: 'themeSettings',

  initialState: {
    /**
     * {
     *    _id: String,
     *    welcomeMessage: String,
     *    userId: String,
     *    facebookLink: String,
     *    twitterLink: String,
     *    instagramLink: String,
     *    telegramLink: String,
     *    youtubeLink: String,
     *    whatsappLink:String,
     *    blogLink:String,
     *    footerMessage: String,
     *    news: String,
     *    supportNumber: String,
     *    forgotPasswordLink: String,
     *    depositePopupNumber: String,
     *    bannerImages: Array,
     *    updatedAt: Date,
     *    createdAt: Date,
     *    welcomeMobileImage: String,
     *    welcomeDesktopImage: String,
     *    logoImage: String
     * }
     */
    themeSettings: {},
    themeLoading: false,
  },

  reducers: {
    setThemeSettings: (state, action) => {
      state.themeSettings = action.payload;
    },

    setThemeLoading: (state, action) => {
      state.themeLoading = action.payload;
    },
  },
});

export const { setThemeSettings, setThemeLoading } = themeSettingsSlice.actions;

export default themeSettingsSlice.reducer;
