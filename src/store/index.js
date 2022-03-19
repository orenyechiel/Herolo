import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    panel: "HomePage",
    accuWeatherApi: "i7yUJEg69R3aFH0R1oVKW5gUR9Gz212b",
    currentLocationCode: "",
    currentLocation: "",
    currentLocationDetails: "",
    errorFromServer: false,
    favoriteLocations: '',
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
    addFavorite(state, payload) {
      state.favoriteLocations = payload;
    }
  },
  actions: {
    async fetchNewLocation({ commit, state }, code) {
      commit("changeLocationCode", code);

      try {
        const location = await axios.get(
          `https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/forecasts/v1/daily/5day/${code}?apikey=${state.accuWeatherApi}`
        );
        commit("changeLocation", location.data.DailyForecasts);
        commit("changeLocationDetails", location.data.Headline);
        console.log(location.data);

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
