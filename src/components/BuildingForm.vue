<template>
  <v-form v-on:input="output" class="ma-1 text-h6">

    <v-container v-if="customerGoal === 'buy'">

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

      <v-fade-transition>
        <div class="mt-10" v-if="building.type !== null">
          <div class="mb-4 text-h5">Informations sur le bien</div>
          <v-text-field id="address" v-model="building.address" :rules="[rules.required]" label="Adresse complète du bien" required outlined/>
          <v-textarea id="description" v-model="building.description" :rules="[rules.required]" label="Description du bien" required outlined/>
          <v-text-field id="price" v-model="building.price" :rules="[rules.required, rules.price]" label="Prix de vente négocié avec l'acquéreur" type="number" suffix="€" required outlined/>

          <div>Le bien est actuellement...</div>
          <v-radio-group v-model="building.currentResidents">
            <v-radio label="Occupé par moi" value="occupied"/>
            <v-radio label="Loué" value="rented"/>
            <v-radio label="Vide" value="empty"/>
          </v-radio-group>

          <div>Le montant du séquestre (dépôt de garantie) a-t-il été convenu avec l’acquéreur ?</div>
          <v-radio-group v-model="building.guaranteeAgreed" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <v-fade-transition hide-on-leave>
            <div v-if="building.guaranteeAgreed">
              <div>Quel est le montant du séquestre (dépôt de garantie) convenu avec l’acquéreur ?</div>
              <v-radio-group v-model="building.guaranteeType">
                <v-radio label="5% du prix du bien" value="5%"/>
                <v-radio label="10% du prix du bien" value="10%"/>
                <v-radio label="Montant précis" value="preciseAmount"/>
                <v-radio label="Absence de séquestre" value="noGuarantee"/>
              </v-radio-group>
              <v-fade-transition>
                <div v-if="building.guaranteeType === 'preciseAmount'">
                  <v-text-field id="price" v-model="building.guaranteeAmount" :rules="[rules.required, rules.price]" label="Montant du séquestre" type="number" suffix="€" required outlined/>
                </div>
              </v-fade-transition>
            </div>
          </v-fade-transition>

          <v-fade-transition hide-on-leave>
            <div v-if="building.guaranteeAgreed === false">
              <div class="text-subtitle-2">Merci de discuter de ce point avec l’acquéreur et de nous transmettre le souhait des parties.</div>
            </div>
          </v-fade-transition>

          <div>La vente est-elle négociée par une agence immobilière ou un mandataire immobilier ?</div>
          <v-radio-group v-model="building.realEstateAgency" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <v-fade-transition>
            <div v-if="building.realEstateAgency">
              <div>Les frais d'agence sont à la charge...</div>
              <v-radio-group v-model="building.realEstateAgencyFees" row>
                <v-radio label="Du vendeur" value="seller"/>
                <v-radio label="De l'acquéreur" value="buyer"/>
              </v-radio-group>
            </div>
          </v-fade-transition>
          <div>La vente est-elle négociée par une agence immobilière ou un mandataire immobilier ?</div>
          <v-radio-group v-model="building.realEstateAgency" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <div>L’acquisition a-t-elle été financée par un emprunt ?</div>
          <v-radio-group v-model="building.loan" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <div>Le bien est-il votre résidence principale ?</div>
          <v-radio-group v-model="building.mainResidence" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <v-text-field id="taxableResidence" v-model="building.taxableResidence" :rules="[rules.required]" label="Centre d'imposition" required outlined/>
        </div>
      </v-fade-transition>

      <v-fade-transition>
        <div class="mt-10" v-if="(building.type === 'house' && building.lessThanTenYears !== null) || building.type === 'coownershipLot'">
          <div class="mb-4 text-h5">Diagnostics</div>
          <div>Le permis de construire du bien a-t-il été délivré avant le 01 Juillet 1997 ?</div>
          <v-radio-group v-model="building.before1997" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <v-fade-transition>
            <div v-if="building.before1997">
              <div>Le permis de construire du bien a-t-il été délivré avant le 01 Janvier 1949 ?</div>
              <v-radio-group v-model="building.before1949" row>
                <v-radio label="Oui" :value="true"/>
                <v-radio label="Non" :value="false"/>
              </v-radio-group>
            </div>
          </v-fade-transition>

          <div>L’installation électrique du bien a-t-elle plus de 15 ans ?</div>
          <v-radio-group v-model="building.electricalMoreThan15Years" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <div>Le bien est-il relié au gaz de ville ?</div>
          <v-radio-group v-model="building.cityGas" row>
            <v-radio label="Oui" :value="true"/>
            <v-radio label="Non" :value="false"/>
          </v-radio-group>

          <v-fade-transition>
            <div v-if="building.cityGas">
              <div>L’installation du gaz a-t-elle plus de 15 ans ?</div>
              <v-radio-group v-model="building.cityGasMoreThan15Years" row>
                <v-radio label="Oui" :value="true"/>
                <v-radio label="Non" :value="false"/>
              </v-radio-group>
            </div>
          </v-fade-transition>
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
        guaranteeType: null,
        guaranteeAmount: null,
        realEstateAgency: null,
        realEstateAgencyFees: null,
        loan: null,
        mainResidence: null,
        taxableResidence: null,
        priorStatement: null,
        arrangeLicence: null,
        before1949: null,
        before1997: null,
        immatriculated10Years: null,
        electricalMoreThan15Years: null,
        cityGas: null,
        cityGasMoreThan15Years: null,
      },
      rules: {
        required: value => !!value || 'Ce champs est requis',
        price: value => parseFloat(value) > 0 || 'Prix de vente invalide'
      }
    }
  },
  watch: {
    building: {
      handler: function () {
        this.saveData();
      },
      deep: true
    }
  },
  methods: {
    output: function () {
      this.$emit('input', this.building);
    },
    saveData: function() {
      localStorage.setItem('info.building', JSON.stringify(this.building));
    },
    loadData: function() {
      let data = localStorage.getItem('info.building');
      if (data !== null) {
        this.building = JSON.parse(data);
      }
    }
  },
  created: function() {
    this.loadData();
  },
  props: ['customerGoal']
}
</script>

<style scoped>

</style>