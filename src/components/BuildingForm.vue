<template>
  <v-form v-on:input="output" class="ma-1 text-h6">

    <v-container v-if="customerGoal === 'sell'">

    </v-container>

    <v-container v-if="customerGoal === 'sell'">
      <div>Vous vendez...</div>
      <v-radio-group v-model="building.type">
        <v-radio label="Une parcelle de terre" value="land"/>
        <v-radio label="Un terrain à bâtir" value="constructibleLand"/>
        <v-radio label="Un terrain à bâtir en lotissement" value="constructibleLandInSubdivision"/>
        <v-radio label="Un lot de copropriété" value="coownershipLot"/>
        <v-radio label="Un immeuble à usage commercial" value="commercialBuilding"/>
        <v-radio label="Une maison individuelle" value="house"/>
      </v-radio-group>

      <v-fade-transition>
        <div v-if="building.type === 'house'">
          <div>La maison a-t-elle moins de 10 ans ?</div>
          <v-radio-group v-model="building.lessThanTenYears" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>
        </div>
      </v-fade-transition>

    </v-container>
  </v-form>
</template>

<script>

export default {
  name: "BuildingForm",
  data: function(){
    return {
      building: {
        type: null,
        lessThanTenYears: null,
        address: null,
        description: null,
        price: null,
        currentResidents: null,
        guaranteeAgreed: null,
        guaranteeAmount: null,
        realEstateAgency: null,
        loan: null,
        mainResidence: null,
        taxableResidence: null
      }
    }
  },
  methods: {
    output: function () {
      this.$emit('input', this.building);
    }
  },
  props: ['customerGoal']
}
</script>

<style scoped>

</style>