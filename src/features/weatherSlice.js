import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '35b545361d832a820715766b8523000b';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        return rejectWithValue(error.response.data.message);
      } else if (error.request) {
        // No response was received
        return rejectWithValue('No response from the server');
      } else {
        // Something happened in setting up the request
        return rejectWithValue('Error in setting up the request');
      }
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        // Use the error message from the rejected API call
        state.error = action.payload || 'An unexpected error occurred';
      });
  },
});

export default weatherSlice.reducer;
