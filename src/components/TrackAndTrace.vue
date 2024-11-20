<script setup>
  import { ref } from 'vue';

  const trackingNumber = ref('');
  const trackingData = ref(null);
  const loading = ref(false);
  const error = ref(false);

  function formatDate(date) {
    date = new Date(date * 1000);

    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
  }
  function formatStatus(status) {
    var statusses = {
      0: "Geannuleerd",
      1: "Label aangemaakt",
      2: "Afwachten op bezorging",
      3: "Mee met bezorger",
      4: "Bezorgt"
    }
    return statusses[status];
  }
  function fetchTracking() {
    trackingData.value = null;
    loading.value = true;
    error.value = false;
    return fetch('https://192.168.152.36/onebox_api/tracking/track/' + trackingNumber.value, {
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
        <h2 class="heading">{{trackingData.trackingCode }}</h2>

        <p><strong>Status:</strong> {{ formatStatus(trackingData.status) }}</p>
        <p><strong>Huidige locatie:</strong> {{ trackingData.location }}</p>
        <p><strong>Levertijd:</strong> {{ formatDate(trackingData.timeDeparture) }}</p>

        <hr />

        <h2 class="heading">Informatie</h2>

        <p><strong>Naam: </strong>{{ trackingData.firstName}} {{ trackingData.middleName }} {{ trackingData.lastName }}</p>
        <p><strong>Adres: </strong>{{ trackingData.address }}</p>
        <p><strong>Email: </strong>{{ trackingData.email }}</p>
        <p><strong>Onebox ID: </strong>{{ trackingData.oneboxID }}</p>
        <p><strong>Pakket gegevens: </strong>{{ trackingData.size }} {{ trackingData.weight }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .trace {
      margin-top: 1rem;
  }
</style>
