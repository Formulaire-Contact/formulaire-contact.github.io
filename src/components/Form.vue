<template>
  <v-row class="d-flex justify-center">
    <div class="col-lg-8 col-xl-6">
      <v-row class="d-flex justify-center ma-4">
        <v-progress-linear :value="25 * (step - 1)" rounded/>
        <span class="ma-3 text-h5">{{ currentStepName }}</span>
      </v-row>
      <v-row class="ma-4">
        <v-btn :disabled="step === 1" v-if="step > 1" @click="step--;saveStep();">Retour</v-btn>
        <v-btn @click="resetForm">Réinitialiser</v-btn>
      </v-row>

      <v-row>
        <v-window v-model="step" class="ma-2 pa-5" style="width: 100%">
          <v-window-item :value="1" reverse-transition="v-fade-transition" eager>
            <CustomerForm v-model="info.customer"/>
          </v-window-item>

          <v-window-item :value="2" reverse-transition="v-fade-transition" eager>
            <BuildingForm v-model="info.building" :customerGoal="info.customer.goal"/>
          </v-window-item>

          <v-window-item :value="3" reverse-transition="v-fade-transition" eager>
            <ContactForm v-model="info.contact"/>
          </v-window-item>

          <v-window-item :value="4" reverse-transition="v-fade-transition">
            <Summary :info="info"/>
          </v-window-item>

          <v-window-item :value="5" reverse-transition="v-fade-transition">
            <DocumentsAndExport :info="info"/>
          </v-window-item>
        </v-window>
      </v-row>

      <v-row class="ma-4">
        <v-spacer></v-spacer>
        <v-btn :disabled="step === 5" color="primary" @click="step++;saveStep();">Valider</v-btn>
      </v-row>
    </div>
  </v-row>

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
    this.step = parseInt(localStorage.getItem('step'));
  }
}
</script>

<style scoped>

</style>