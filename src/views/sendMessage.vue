<template>
  <v-container>
    <v-card style="margin-top: 50px" elevation="12" shaped>
      <sendMessage></sendMessage>
    </v-card>
  </v-container>
</template>
<script>
import sendMessage from "../components/forms/sendMessage.vue";

export default {
  components: {
    sendMessage,
  },
};
</script>
