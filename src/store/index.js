import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    panel: "HomePage",
    accuWeatherApi: "JbvjPdWanpm8NEKm6OD9YwkAZxSvvLkD",
    currentLocationCode: 215854,
    currentLocation: "",
    currentLocationDetails: "",
    currentCondition: "",
    currentConditionCity: "Tel Aviv",
    errorFromServer: false,
    favoriteLocations: [],
  },
  getters: {
    getPanel(state) {
      return state.panel;
    },
    getApiKey(state) {
      return state.accuWeatherApi;
    },
    getCurrentLocationCode(state) {
      return state.currentLocationCode;
    },
    getCurrentLocation(state) {
      return state.currentLocation;
    },
    getCurrentLocationDetails(state) {
      return state.currentLocationDetails;
    },
    getCurrentCondition(state) {
      return state.currentCondition;
    },
    getCurrentConditionCity(state) {
      return state.currentConditionCity;
    },
    getFavorites(state) {
      return state.favoriteLocations;
    },
    isErrorFromServer(state) {
      return state.errorFromServer;
    },
  },
  mutations: {
    changePanel(state, payload) {
      state.panel = payload;
    },
    changeLocationCode(state, payload) {
      state.currentLocationCode = payload;
    },
    changeLocation(state, payload) {
      state.currentLocation = payload;
    },
    changeLocationDetails(state, payload) {
      state.currentLocationDetails = payload;
    },
    changeCurrentCondition(state, payload) {
      state.currentCondition = payload;
    },
    changeCurrentConditionCity(state, payload) {
      state.currentConditionCity = payload;
    },
    addFavorite(state, payload) {
      const index = state.favoriteLocations.findIndex(i => i.id === payload.id)
      if(index === -1) {
        state.favoriteLocations = [...state.favoriteLocations, payload];
      }
    },
    removeFavorite(state, payload) {
      const arr = state.favoriteLocations.filter(i => i.id !== payload)
      state.favoriteLocations = arr
    }
  },
  actions: {
    async fetchCurrentCondition({commit, state}, code) {
      try {
        const location = await axios.get(
          `https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/currentconditions/v1/${code}?apikey=${state.accuWeatherApi}`
        );
        commit("changeCurrentCondition", location.data[0]);
        if (state.errorFromServer) {
          state.errorFromServer = false;
        }
      } catch (error) {
        console.error(error);
        state.errorFromServer = true;
      }
    },

    async fetchNewLocation({ commit, state }, code) {
      commit("changeLocationCode", code);
      try {
        const location = await axios.get(
          `https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/forecasts/v1/daily/5day/${code}?apikey=${state.accuWeatherApi}`
        );
        commit("changeLocation", location.data.DailyForecasts);
        commit("changeLocationDetails", location.data.Headline);

        if (state.errorFromServer) {
          state.errorFromServer = false;
        }
      } catch (error) {
        console.error(error);
        state.errorFromServer = true;
      }
    },
  },
});
