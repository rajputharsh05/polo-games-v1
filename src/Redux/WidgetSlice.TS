import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: { isOpen: false },
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleChat } = chatSlice.actions;
export default chatSlice.reducer;
