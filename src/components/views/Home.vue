<template>
  <div class="search-box">
    <div class="input-group input-group-lg">
      <input
        type="text"
        class="form-control"
        v-model="searchField"
        @input="auto()"
      />
    </div>
    <div class="autocomplete" v-show="suggestionsList.length > 1">
      <ul class="list-group">
        <li
          class="
            list-group-item
            d-flex
            justify-content-between
            align-items-start
          "
          v-for="suggestion in suggestionsList"
          :key="suggestion.Key"
          @click="fetchNewLocation(suggestion.Key)"
        >
          <div class="ms-2 me-auto">
            <div class="fw-bold">{{ suggestion.LocalizedName }}</div>
            {{ suggestion.AdministrativeArea.LocalizedName }}
          </div>
          <span class="badge bg-primary rounded-pill">{{
            suggestion.Country.LocalizedName
          }}</span>
        </li>
      </ul>
    </div>
  </div>

  <div class="main-panel">
    <button
      type="button"
      class="btn btn-success"
      @click="addFavorite(getCurrentLocationCode)"
    >
      Add to Favorites
    </button>

    <h2 class="text-center">{{ getCurrentLocationDetails.Text }}</h2>

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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HomePage",
  mixins: [formatDate],
  data() {
    return {
      searchField: "",
      suggestionsList: [],
    };
  },
  computed: {
    ...mapGetters([
      "getApiKey",
      "getCurrentLocationCode",
      "getCurrentLocation",
      "getCurrentLocationDetails",
    ]),
  },
  methods: {
    ...mapActions(["fetchNewLocation"]),
    auto() {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.getApiKey}&q=${this.searchField}`
        )
        .then((res) => {
          console.log(res);
          const data = res.data.sort();
          this.suggestionsList = data;
        })
        .catch((error) => {
          console.log("my", error);
        });
    },
  },
  created() {
    // fetching Tel aviv at first
    this.fetchNewLocation(215854);
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
    }
  }
}

.main-panel {
  box-shadow: 0 3px 7px 0 rgba(19, 23, 111, 0.12);
  border-radius: 12px;
  padding: 30px 25px 40px;
  margin-top: 35px;
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