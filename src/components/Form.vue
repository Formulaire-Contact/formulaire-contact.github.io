<template>
  <v-container>
    <v-container class="col-lg-8 col-xl-5">
      <v-row class="d-flex justify-center">
        <v-progress-linear :value="25 * (step - 1)" rounded/>
        <span class="ma-3 text-h5">{{ currentStepName }}</span>
      </v-row>
      <v-row>
        <v-btn :disabled="step === 1" v-if="step > 1" @click="step--;saveStep();">Retour</v-btn>
        <v-btn @click="resetForm">Réinitialiser</v-btn>
      </v-row>

      <v-row>
        <v-container>
          <v-window v-model="step">
            <v-window-item :value="1">
              <CustomerForm v-model="info.customer"/>
            </v-window-item>

            <v-window-item :value="2">
              <BuildingForm v-model="info.building" :customerGoal="info.customer.goal"/>
            </v-window-item>

            <v-window-item :value="3">
              <ContactForm v-model="info.contact"/>
            </v-window-item>

            <v-window-item :value="4">
              <Summary :info="info"/>
            </v-window-item>

            <v-window-item :value="5">
              <DocumentsAndExport :info="info"/>
            </v-window-item>
          </v-window>
        </v-container>
      </v-row>

      <v-row>
        <v-spacer></v-spacer>
        <v-btn :disabled="step === 5" color="primary" @click="step++;saveStep();">Valider</v-btn>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import CustomerForm from "@/components/CustomerForm";
import DocumentsAndExport from "@/components/DocumentsAndExport";
import Summary from "@/components/Summary";
import BuildingForm from "@/components/BuildingForm";
import ContactForm from "@/components/ContactForm";

export default {
  name: "Form",
  components: {
    ContactForm,
    BuildingForm,
    Summary,
    DocumentsAndExport,
    CustomerForm
  },
  data: () => {
    return {
      step: 1,
      info: {
        customer: {},
        building: {},
        contact: {},
        documents: []
      }
    }
  },
  computed: {
    currentStepName() {
      switch (this.step) {
        case 1:
          return 'Informations personnelles'
        case 2:
          return 'Bien'
        case 3:
          return 'Contact'
        case 4:
          return 'Récapitulatif'
        case 5:
          return 'Documents'
        default:
          return ''
      }
    }
  },
  methods: {
    resetForm: function() {
      localStorage.clear();
      document.location = '';
    },
    saveStep: function() {
      localStorage.setItem('step', this.step + '');
    }
  },
  created() {
    //this.step = parseInt(localStorage.getItem('step'));
  }
}
</script>

<style scoped>

</style>