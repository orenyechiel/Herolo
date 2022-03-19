<template>
  <div class="search-box">
    <div class="input-group input-group-lg">
      <input
        type="text"
        class="form-control"
        v-model="searchField"
        placeholder="Search City"
        @input="auto()"
        @focusin="showSuggestionsList = true"
      />
    </div>
    <div class="autocomplete" v-show="showSuggestionsList">
      <ul class="list-group" v-if="searchField.length > 1">
        <li
          class="list-group-item d-flex justify-content-between align-items-start"
          v-for="suggestion in suggestionsList"
          :key="suggestion.Key"
          @click="
            fetchNewLocation(suggestion.Key);
            fetchCurrentCondition(suggestion.Key);
            changeCurrentConditionCity(suggestion.LocalizedName);
            isFavorite(suggestion.Key)
            showSuggestionsList = false;
          "
        >
          <div class="ms-2 me-auto location-name">
            <div class="fw-bold">{{ suggestion.LocalizedName }}</div>
            {{ suggestion.AdministrativeArea.LocalizedName }}
          </div>
          <span class="badge bg-primary rounded-pill">
            {{ suggestion.Country.LocalizedName }}
          </span>
        </li>
      </ul>
    </div>
  </div>

  <div class="main-panel">
    <div class="d-md-flex justify-content-between align-items-center mb-5">
      <CurrentCondition
        v-if="getCurrentCondition"
        :city-name="getCurrentConditionCity"
        :value="getCurrentCondition.Temperature.Metric.Value"
        :unit="getCurrentCondition.Temperature.Metric.Unit"
      />

      <button
        type="button"
        class="btn btn-success ms-auto"
        @click="addFavorite({
          id: getCurrentLocationCode,
          city: getCurrentConditionCity,
          temp: getCurrentCondition.Temperature.Metric.Value,
          unit: getCurrentCondition.Temperature.Metric.Unit,
          status: getCurrentCondition.WeatherText
        })"
      >
        Add this Location to Favorites
      </button>
      <span class="badge rounded-pill bg-info text-dark ms-3" 
            v-if="isCurrentFavorite">Favorite</span>
      
    </div>

    <div class="headlines text-center">
      <h1>{{ getCurrentCondition.WeatherText }}</h1>
      <h2>This week: {{ getCurrentLocationDetails.Text }}</h2>
    </div>

    <ul class="forecast">
      <li v-for="day in getCurrentLocation" :key="day.Date">
        <div class="card text-center">
          <div class="card-header">{{ dater(day.Date) }}</div>
          <div class="card-body">
            <h5 class="card-title">{{ day.Day.IconPhrase }}</h5>
            <p class="card-text">
              {{ day.Temperature.Minimum.Value }} -
              {{ day.Temperature.Maximum.Value }}
              {{ day.Temperature.Maximum.Unit }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import formatDate from "@/mixing/formatDate";
import { mapActions, mapGetters, mapMutations } from "vuex";

import CurrentCondition from "@/components/CurrentCondition.vue";

export default {
  name: "HomePage",
  mixins: [formatDate],
  components: { CurrentCondition },
  data() {
    return {
      searchField: "",
      suggestionsList: [],
      showSuggestionsList: false,
      isCurrentFavorite: false
    };
  },
  computed: {
    ...mapGetters([
      "getApiKey",
      "getCurrentLocationCode",
      "getCurrentLocation",
      "getCurrentLocationDetails",
      "getCurrentCondition",
      "getCurrentConditionCity",
      "getFavorites",
    ]),
  },
  methods: {
    ...mapMutations(["changeCurrentConditionCity", "addFavorite"]),
    ...mapActions(["fetchNewLocation", "fetchCurrentCondition"]),
    auto() {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.getApiKey}&q=${this.searchField}`
        )
        .then((res) => {
          const data = res.data.sort();
          this.suggestionsList = data;
        })
        .catch((error) => {
          console.log("err: ", error);
        });
    },
    isFavorite(id) {
      const index = this.getFavorites.findIndex(i => i.id === id)
      if(index === -1) {
        this.isCurrentFavorite = false
      } else {
        this.isCurrentFavorite = true
      }
    }
  },
  created() {
    // fetching Tel aviv at first
    this.fetchNewLocation(this.getCurrentLocationCode);
    this.fetchCurrentCondition(this.getCurrentLocationCode);
    this.isFavorite(this.getCurrentLocationCode)
  },
};
</script>

<style scoped lang="scss">
.search-box {
  max-width: 560px;
  margin: 0 auto;
  position: relative;
  @media screen and (max-width: 768px) {
    max-width: 400px;
  }
  .autocomplete {
    position: absolute;
    width: 100%;
    z-index: 9;
  }
  ul {
    li {
      cursor: pointer;
      &:nth-child(n + 8) {
        display: none !important;
      }
      &:hover,
      &:focus {
        background-color: #3d7576;
        .location-name {
        color: white;
        }
      }
    }
  }
}

.main-panel {
  box-shadow: 0 3px 7px 0 rgba(19, 23, 111, 0.12);
  border-radius: 12px;
  padding: 30px 25px 40px;
  margin-top: 35px;

  .headlines {
    width: 80%;
    margin: 0 auto;
    h1 {
      margin-bottom: 25px;
    }
    h2 {
      font-size: 20px;
    }
  }

  .forecast {
    margin-top: 40px;
    padding: 10px 0;
    list-style-type: none;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    li {
      @media screen and (min-width: 992px) {
        flex: 1 1 0;
      }
      .card {
        height: 100%;
      }
    }
  }
}
</style>