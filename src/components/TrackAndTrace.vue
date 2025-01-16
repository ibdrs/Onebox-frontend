<script setup>
  import { ref } from 'vue';

  const trackingNumber = ref('');
  const trackingData = ref(null);
  const loading = ref(false);
  const error = ref(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  function formatDate(date) {
    date = new Date(date);

    
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  }


  function fetchTracking() {
    trackingData.value = null;
    loading.value = true;
    error.value = false;
    return fetch(`${API_URL}tracking/track/` + trackingNumber.value, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          const error = new Error(res.statusText);
          error.json = res.json();
          throw error;
        }
        return res.json();
      })
      .then(json => {
        if (Object.keys(json).length > 0) {
          trackingData.value = json;
        } else {
          const error = new Error('empty result');
          throw error;
        }
      })
      .catch(err => {
        error.value = err;
        if (err.json) {
          return err.json.then(json => {
            error.value.message = json.message;
          });
        }
      })
      .then(() => {
        loading.value = false;
      });
  }
</script>

<template>
  <div class="page_inner_container">
    <h2>Track & trace</h2>
    <input v-model="trackingNumber" type="text" placeholder="Track & Trace nummer" />
    <button class="trace" @click="fetchTracking" :disabled="loading">
      Traceer
    </button>
    <div class="message">
      <div v-if="error">Geen informatie gevonden...</div>
      <div v-if="loading">Bezig met informatie opvragen...</div>
    </div>

    <div v-if="trackingData" class="card">
      <div class="card_body">
        <h2 class="heading">{{ trackingData.trackAndTraceCode }}</h2>

        <p><strong>Status:</strong> {{ trackingData.status }}</p>
        <p><strong>Leveringsdatum:</strong> {{ formatDate(trackingData.leveringsDatum) }}</p>
        <p><strong>Levertijd:</strong> {{ trackingData.schattingLevertijd}}</p>

        <hr />

        <h2 class="heading">Informatie</h2>

        <p><strong>Naam: </strong>{{ trackingData.naam }}</p>
        <p><strong>Adres: </strong>{{ trackingData.adres }}</p>
        <p><strong>Woonplaats: </strong>{{ trackingData.woonplaats }}</p>
        <p><strong>Postcode: </strong>{{ trackingData.postcode }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  h2 {
    margin-bottom: 10px;
  }

  .page_inner_container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }

  input {
    width: 50%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid;
    border-radius: 5px;
    box-sizing: border-box;
  }

  button.trace {
    padding: 10px 20px;
    border: none;
    color: #fff;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
</style>
