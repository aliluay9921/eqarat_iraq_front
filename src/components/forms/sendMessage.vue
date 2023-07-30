<template>
  <v-container>
    <v-form ref="form" class="mr-10">
      <v-col cols="12" md="12" lg="12">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="title"
              placeholder="العنوان"
              label="العنوان"
              hide-details="auto"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="body"
              placeholder="النص"
              label="النص"
              hide-details="auto"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" align-self="center" class="text-center">
            <v-row justify="center">
              <v-col cols="auto">
                <v-btn secondary color="secondary" @click="sendMessage"
                  >أرسال
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-form>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      body: "",
    };
  },

  methods: {
    sendMessage() {
      let data = {};
      data["title"] = this.title;
      data["body"] = this.body;
      this.$store.dispatch("sendMessage", data);
    },
  },
};
</script>
