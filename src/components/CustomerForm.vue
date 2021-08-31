<template>
  <v-form v-on:input="output" class="ma-1 text-h6">
    <v-container>
      <div>Vous désirez...</div>
      <v-radio-group v-model="customer.goal">
        <v-radio label="Acquérir un bien" value="buy"/>
        <v-radio label="Vendre un bien" value="sell"/>
      </v-radio-group>
    </v-container>

    <v-fade-transition>
      <v-container v-if="customer.goal !== null">
        <div>Vous êtes ?</div>
        <v-radio-group v-model="customer.type">
          <v-radio label="Une personne physique" value="person" @click="addIdentity"/>
          <v-radio label="Une personne morale" value="company" @click="resetIdentities"/>
        </v-radio-group>
      </v-container>
    </v-fade-transition>

    <v-fade-transition hide-on-leave>
      <div v-if="customer.type === 'person'">
        <v-container>
          <div class="mb-3 text-h5">Informations personnelles</div>

          <v-list v-for="(identity, index) in customer.identities" :key="identity.id" flat>
            <v-divider class="mt-1 mb-5" v-if="index > 0"/>
            <div class="d-flex mb-3">
              <div>Personne n°{{ index + 1 }}</div>
              <v-spacer/>
              <v-btn v-if="customer.identities.length > 1" icon @click="removeIdentity(index)" class="delete-button">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
            <v-combobox label="Titre" v-model="identity.title" outlined :items="titles" :rules="[rules.required]"/>
            <v-text-field id="lastname" v-model="identity.lastname" :rules="[rules.required]" label="Nom" required outlined/>
            <v-text-field id="firstname" v-model="identity.firstname" :rules="[rules.required]" label="Premier prénom" required outlined/>
            <v-text-field id="other-firstnames" v-model="identity.otherFirstnames" :rules="[]" label="Autres prénoms" outlined/>
            <DatePicker v-model="identity.dateOfBirth" label="Date de naissance"/>
            <v-text-field id="place-of-birth" v-model="identity.placeOfBirth" :rules="[rules.required]" label="Lieu de naissance" required outlined/>
            <v-text-field id="job" v-model="identity.job" :rules="[rules.required]" label="Profession" required outlined/>
            <v-text-field id="address" v-model="identity.address" :rules="[rules.required]" label="Domicile fiscal" required outlined/>
            <div class="v-label">Avez-vous une carte d'invalidité ?</div>
            <v-radio-group v-model="identity.disability" row>
              <v-radio label="Oui" :value="true"/>
              <v-radio label="Non" :value="false"/>
            </v-radio-group>
            <div class="v-label">Etes-vous de nationalité française ?</div>
            <v-radio-group v-model="identity.stranger" row>
              <v-radio label="Oui" :value="false"/>
              <v-radio label="Non" :value="true"/>
            </v-radio-group>
            <v-fade-transition>
              <div v-if="identity.stranger">
                <v-text-field id="nationality" v-model="identity.nationality" :rules="[rules.required]" label="Nationalité" :required="identity.stranger" outlined/>
              </div>
            </v-fade-transition>
          </v-list>

          <v-btn v-if="customer.identities.length < 2" block @click="addIdentity" color="primary">
            <v-icon class="mr-2">mdi-plus</v-icon>Ajouter une personne
          </v-btn>

        </v-container>

        <v-container class="mt-3">
          <div class="mb-4 text-h5">Situation conjugale</div>
          <div>Vous êtes...</div>
          <v-radio-group v-model="customer.maritalStatus.type">
            <v-radio label="Célibataire" value="single"/>
            <v-radio label="Marié(e)" value="married"/>
            <v-radio label="Pacsé(e)" value="pacsed"/>
            <v-radio label="Divorcé(e)" value="divorced"/>
            <v-radio label="Veuf(ve)" value="widowed"/>
          </v-radio-group>

          <v-fade-transition hide-on-leave>
            <div v-if="customer.maritalStatus.type === 'married'">
              <DatePicker v-model="customer.maritalStatus.weddingDate" label="Date du mariage"/>
              <v-text-field id="wedding-place" v-model="customer.maritalStatus.weddingPlace" :rules="[rules.required]" label="Lieu du mariage" required outlined/>
              <v-combobox label="Régime matrimonial" v-model="customer.maritalStatus.weddingType" outlined :items="weddingTypes" :rules="[rules.required]"/>
              <div>Avez-vous signé un contrat de mariage ?</div>
              <v-radio-group v-model="customer.maritalStatus.weddingContract" row>
                <v-radio label="Oui" :value="true"/>
                <v-radio label="Non" :value="false"/>
              </v-radio-group>

              <v-fade-transition>
                <div v-if="customer.maritalStatus.weddingContract">
                  <DatePicker v-model="customer.maritalStatus.weddingContractDate" label="Date de signature du contrat mariage"/>
                  <v-text-field id="wedding-contract-sollicitor" v-model="customer.maritalStatus.weddingContractSollicitor" :rules="[rules.required]" label="Nom et prénom du notaire" required outlined/>
                </div>
              </v-fade-transition>
            </div>
          </v-fade-transition>

          <v-fade-transition hide-on-leave>
            <div v-if="customer.maritalStatus.type === 'pacsed'">
              <DatePicker v-model="customer.maritalStatus.pacsDate" label="Date du pacs"/>
              <v-text-field id="pacs-place" v-model="customer.maritalStatus.pacsPlace" :rules="[rules.required]" label="Lieu du pacs" required outlined/>
            </div>
          </v-fade-transition>
        </v-container>
      </div>
    </v-fade-transition>

    <v-fade-transition hide-on-leave>
      <v-container v-if="customer.type === 'company'">
        <div class="mb-3">Informations</div>
        <v-text-field id="company-id" v-model="customer.company.companyId" :rules="[rules.required]" label="Dénomination sociale" required outlined/>
      </v-container>
    </v-fade-transition>

  </v-form>
</template>

<script>
import DatePicker from "@/components/CustomForm/DatePicker";

export default {
  name: "CustomerForm",
  components: {DatePicker},
  data: () => {
    return {
      customer: {
        goal: null,
        type: null,
        identities: [],
        company: {
          companyId: null
        },
        maritalStatus: {
          type: null,
          weddingDate: null,
          weddingPlace: null,
          weddingType: null,
          weddingContract: null,
          weddingContractDate: null,
          weddingContractSollicitor: null,
          pacsDate: null,
          pacsPlace: null
        }
      },
      rules: {
        required: value => !!value || 'Ce champs est requis'
      },
      titles: ['Monsieur', 'Madame', 'Mademoiselle'],
      weddingTypes: ['Séparation de biens', 'Communauté universelle', 'Communauté d\'acquêts']
    }
  },
  methods: {
    output: function () {
      this.$emit('input', this.customer);
    },
    addIdentity() {
      this.customer.identities.push({
        id: this.customer.identities.length,
        lastname: null,
        firstname: null,
        otherFirstnames: null,
        dateOfBirth: null,
        disability: null,
        address: null,
        job: null,
        nationality: null,
        placeOfBirth: null,
        stranger: null,
        title: null
      });
    },
    removeIdentity(index) {
      this.customer.identities.splice(index, 1);
    },
    resetIdentities() {
      this.customer.identities = [];
    }
  }
}
</script>

<style scoped>
.delete-button::before {
  color: grey
}

.delete-button:hover {
  color: red
}
</style>