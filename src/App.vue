<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2"
               contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
               transition="scale-transition" width="40"/>
        <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" width="100"
               contain min-width="100" src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"/>
      </div>
    </v-app-bar>

    <v-main>
      <SellerForm/>
    </v-main>
  </v-app>
</template>

<script>
import SellerForm from "@/components/SellerForm";

export default {
  name: 'App',

  components: {
    SellerForm
  },

  data: () => ({
    //
  }),
};
</script>
