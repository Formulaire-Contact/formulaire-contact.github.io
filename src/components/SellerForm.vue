<template>
  <v-stepper alt-labels v-model="step">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="step > 1">
        Vendeur
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="step > 2">
        Bien
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3" :complete="step > 3">
        Rendez-vous
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="4" :complete="step > 4">
        Récapitulatif
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="5">
        Documents
      </v-stepper-step>
      <v-divider></v-divider>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <PersonInfoForm v-model="info.person"/>
        <div>
          <v-btn color="primary" @click="step++">Valider</v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content step="2">
        <BuildingInfoForm v-model="info.building"/>
        <div>
          <v-btn @click="step--">Retour</v-btn>
          <v-btn color="primary" @click="step++">Valider</v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content step="3">
        <AppointmentForm v-model="info.appointment"/>
        <div>
          <v-btn @click="step--">Retour</v-btn>
          <v-btn color="primary" @click="step++">Valider</v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content step="4">
        <Summary v-bind:info="info"/>
        <div>
          <v-btn @click="step--">Retour</v-btn>
          <v-btn color="primary" @click="step++">Valider</v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content step="5">
        <DocumentsAndExport v-bind:info="info"/>
        <div>
          <v-btn @click="step--">Retour</v-btn>
        </div>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import PersonInfoForm from "@/components/PersonInfoForm";
import DocumentsAndExport from "@/components/DocumentsAndExport";
import Summary from "@/components/Summary";
import BuildingInfoForm from "@/components/BuildingInfoForm";
import AppointmentForm from "@/components/AppointmentForm";

export default {
  name: "SellerForm",
  components: {
    AppointmentForm,
    BuildingInfoForm,
    Summary,
    DocumentsAndExport,
    PersonInfoForm
  },
  data: () => {
    return {
      step: 1,
      info: {
        person: {},
        building: {},
        appointment: {},
        documents: []
      },
    }
  }
}
</script>

<style scoped>

</style>