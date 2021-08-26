<template>
  <v-container>
    <v-container class="col-lg-6">
      <v-row class="d-flex justify-center">
        <v-progress-linear v-bind:value="25 * (step - 1)" rounded/>
        <span class="ma-3 text-h5">{{ currentStepName }}</span>
      </v-row>
      <v-row>
        <v-btn :disabled="step === 1" v-if="step > 1" @click="step--">Retour</v-btn>
      </v-row>

      <v-row>
        <v-container>
          <v-window v-model="step">
            <v-window-item :value="1">
              <SellerInfoForm v-model="info.customer" v-bind:step="step"/>
            </v-window-item>

            <v-window-item :value="2">
              <BuildingInfoForm v-model="info.building"/>
            </v-window-item>

            <v-window-item :value="3">
              <ContactForm v-model="info.contact"/>
            </v-window-item>

            <v-window-item :value="4">
              <Summary v-bind:info="info"/>
            </v-window-item>

            <v-window-item :value="5">
              <DocumentsAndExport v-bind:info="info"/>
            </v-window-item>
          </v-window>
        </v-container>
      </v-row>

      <v-row>
        <v-spacer></v-spacer>
        <v-btn :disabled="step === 5" color="primary" @click="step++">Valider</v-btn>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import SellerInfoForm from "@/components/SellerInfoForm";
import DocumentsAndExport from "@/components/DocumentsAndExport";
import Summary from "@/components/Summary";
import BuildingInfoForm from "@/components/BuildingInfoForm";
import ContactForm from "@/components/ContactForm";

export default {
  name: "SellerForm",
  components: {
    ContactForm,
    BuildingInfoForm,
    Summary,
    DocumentsAndExport,
    SellerInfoForm
  },
  data: () => {
    return {
      step: 1,
      info: {
        customer: {},
        building: {},
        contact: {},
        documents: []
      },
    }
  },
  computed: {
    currentStepName () {
      switch (this.step) {
        case 1: return 'Informations personnelles'
        case 2: return 'Bien'
        case 3: return 'Contact'
        case 4: return 'Récapitulatif'
        case 5: return 'Documents'
        default: return ''
      }
    },
  }
}
</script>

<style scoped>

</style>