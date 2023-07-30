<template>
  <v-container>
    <!-- <v-card class="mt-5" elevation="4" shaped>
      <v-toolbar dark color="new">
        <v-toolbar-title align-center>المستخدمين</v-toolbar-title>
      </v-toolbar>

      <v-card-text> <addEmployeeForm></addEmployeeForm> </v-card-text>
    </v-card> -->

    <v-card style="margin-top: 50px" elevation="12" shaped>
      <usersTable></usersTable>
    </v-card>
  </v-container>
</template>
<script>
// @ is an alias to /src
// import addEmployeeForm from "../components/forms/addEmployeeForm.vue";
import usersTable from "../components/tables/usersTable.vue";

export default {
  name: "Home",
  components: {
    usersTable,
    // addEmployeeForm,
  },
};
</script>
