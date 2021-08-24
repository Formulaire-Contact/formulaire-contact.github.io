<template>
  <v-container>
    <v-btn color="primary" v-on:click="exportPDF">Télécharger PDF</v-btn>
  </v-container>
</template>

<script>
import { render } from "@/assets/js/renderer";

export default {
  name: "DocumentsAndExport",
  methods: {
    exportPDF: function() {
      console.log('Saving PDF...');
      render(this.info);
    }
  },
  props: ['info']
}
</script>

<style scoped>

</style>