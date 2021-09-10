<template>
  <v-container>
    <div v-if="documents.identities.length > 1">
      <v-list v-for="(identity) in documents.identities" :key="identity.identity.id" flat>
        <div class="text-h5 mt-5">Documents personnels de {{ identity.identity.firstname }} {{ identity.identity.lastname }}</div>
          <li v-for="(document) in identity.documents" :key="document.name" class="mt-1">
            <span class="ml-2">{{ document.name }}</span><br/>
            <span class="ml-2 text-caption font-weight-bold" v-if="document.description">{{ document.description }}</span>
          </li>
      </v-list>
    </div>

    <div v-if="documents.customer.length > 0 ||
      (documents.identities.length === 1 && documents.identities[0].documents.length > 0)">
      <div class="text-h5 mt-5">Documents personnels</div>
      <ul v-if="documents.identities.length === 1">
        <li v-for="(document) in documents.identities[0].documents" :key="document.name" class="mt-1">
          <span class="ml-2">{{ document.name }}</span><br/>
          <span class="ml-2 text-caption font-weight-bold" v-if="document.description">{{ document.description }}</span>
        </li>
      </ul>
      <ul>
        <li v-for="(document) in documents.customer" :key="document.name" class="mt-1">
          <span class="ml-2">{{ document.name }}</span><br/>
          <span class="ml-2 text-caption font-weight-bold" v-if="document.description">{{ document.description }}</span>
        </li>
      </ul>
    </div>

    <div v-if="documents.building.length > 0">
      <div class="text-h5 mt-5">Documents relatifs au bien</div>
      <ul>
        <li v-for="(document) in documents.building" :key="document.name" class="mt-1">
          <span class="ml-2">{{ document.name }}</span><br/>
          <span class="ml-2 text-caption font-weight-bold" v-if="document.description">{{ document.description }}</span>
        </li>
      </ul>
    </div>

    <v-btn color="primary" class="mt-8" v-on:click="exportPDF">Télécharger PDF</v-btn>
  </v-container>
</template>

<script>
import { render } from "@/assets/js/renderer";
import { getDocuments } from "@/assets/js/documents";

export default {
  name: "DocumentsAndExport",
  methods: {
    exportPDF: function() {
      console.log('Saving PDF...');
      render(this.info);
    }
  },
  props: ['info'],
  computed: {
    documents() {
      return getDocuments(this.info);
    }
  }
}
</script>

<style scoped>

</style>