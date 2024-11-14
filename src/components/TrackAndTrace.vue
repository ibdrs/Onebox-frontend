<script setup>
  import { ref } from 'vue';

  const trackingNumber = ref(''); // Store the tracking number
  const trackingInfo = ref(null); // Store the tracking info (e.g., fetched from an API)
  const loading = ref(false); // Show loading indicator when waiting for data

  // Functions needed for the trackPackage function
  const isInteger = (value) => {
    return Number.isInteger(Number(value));  // Convert to number and check if it’s an integer
  };

  // Simulate a tracking function (no API, just hardcoded)
  const trackPackage = async () => {
    if (!trackingNumber.value) {
      alert('Please enter a tracking number');
      return;
    }

    // Check for validating if the tracking number is an integer, if not return
    if (!isInteger(trackingNumber.value)) {
      alert('Please enter a valid tracking number');
      return;
    }

    loading.value = true;
    trackingInfo.value = null;

    // Simulate a delay for "fetching" data
    setTimeout(() => {
      // Simulate different responses based on the tracking number
      if (trackingNumber.value === '12345') {
        trackingInfo.value = {
          status: 'Delivered',
          location: 'Amsterdam, Netherlands',
          estimatedDelivery: '2024-11-03',
          recipientName: 'Tom Schipper',
          recipientAddress: 'Haarlemmerstraat 120',
          recipientPostal: '1013 EX',
          recipientCountry: 'Netherlands',
        };
      } else if (trackingNumber.value === '67890') {
        trackingInfo.value = {
          status: 'In Transit',
          location: 'Rotterdam, Netherlands',
          estimatedDelivery: '2024-11-10',
          recipientName: 'Xiaou Li',
          recipientAddress: '2056 Bakkersoordsekade',
          recipientPostal: '3195GN',
          recipientCountry: 'Netherlands',
        };
      } else {
        trackingInfo.value = {
          status: 'Not Found',
          location: 'N/A',
          estimatedDelivery: 'N/A',
          recipientName: 'N/A',
          recipientAddress: 'N/A',
          recipientPostal: 'N/A',
          recipientCountry: 'N/A',
        };
      }
      loading.value = false;
    }, 1500);
  };
</script>

<template>
  <div class="track-and-trace-container">
    <h2 style="padding:0.6rem;">Track Your Package</h2>
    <input v-model="trackingNumber"
           type="text"
           placeholder="Enter your tracking number"
           class="tracking-input" />
    <button @click="trackPackage" class="track-button" :disabled="loading">
      Track
    </button>

    <div v-if="loading" class="loading-message">
      Tracking information is being fetched...
    </div>

    <div v-if="trackingInfo" class="tracking-info">
      <p><strong>Status:</strong> {{ trackingInfo.status }}</p>
      <p><strong>Location:</strong> {{ trackingInfo.location }}</p>
      <p><strong>Estimated Delivery:</strong> {{ trackingInfo.estimatedDelivery }}</p>

      <hr class="splitter" />

      <!-- Delivery Information Section -->
      <h2 class="delivery-header">Where will your package be delivered?</h2>

      <p><strong>Name:</strong> {{ trackingInfo.recipientName }}</p>
      <p><strong>Address:</strong> {{ trackingInfo.recipientAddress }}</p>
      <p><strong>Postal Code:</strong> {{ trackingInfo.recipientPostal }}</p>
      <p><strong>Country:</strong> {{ trackingInfo.recipientCountry }}</p>
    </div>
  </div>
</template>

<style scoped>
  .main-content {
      background-color: var(--color-background-soft);
  }

  .track-and-trace-container {
    text-align: center;
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
    background-color: var(--color-background-soft);
    border-radius: 8px;
    border: 1px solid var(--color-border);
  }

  .tracking-input {
    padding: 0.8rem;
    font-size: 1rem;
    width: 80%;
    max-width: 350px;
    margin-bottom: 1.5rem;
    border: 2px solid var(--color-input-border);
    border-radius: 4px;
    background-color: var(--color-input-background);
  }

  .track-button {
    padding: 0.6rem 1.2rem;
    background-color: #646cff;
    color: var(--vt-c-white);
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 8px;
    transition: background-color 0.3s;
    margin-top: 1rem;
  }

   .track-button:hover {
     background-color: #5758d3;
   }

   .track-button:disabled {
     background-color: #ddd;
     cursor: not-allowed;
   }

  .loading-message {
    margin-top: 1rem;
    color: #888;
  }

  .tracking-info {
    margin-top: 2rem;
    text-align: left;
    font-size: 1.2rem;
    max-width: 400px;
    margin: 0 auto;
    background-color: var(--color-background-soft);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--color-border);
  }

  .tracking-info p {
    margin: 0.5rem 0;
    color: var(--color-text);
  }

  .delivery-header {
    font-size: 1.2rem;
    margin-top: 1rem;
    font-weight: bold;
    color: var(--color-heading);
  }

  strong {
    font-weight: bold;
  }

  .splitter {
    width: 100%;
    height: 1px;
    background-color: #ccc;
    margin: 20px auto;
  }
</style>
