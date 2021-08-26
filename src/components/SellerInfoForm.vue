<template>
  <v-form v-on:input="output" class="ma-2 text-h6">
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
      <v-container v-if="customer.type === 'person'">
        <div class="mb-3">Informations personnelles</div>

        <v-list v-for="(identity, index) in customer.identities" :key="identity.id" flat>
          <v-divider class="mt-1 mb-5" v-if="index > 0"/>
          <div class="d-flex mb-3 text-h7">
            <div>Personne n°{{ index + 1 }}</div>
            <v-spacer/>
            <v-btn v-if="customer.identities.length > 1" icon @click="removeIdentity(index)" class="delete-button">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
          <v-combobox label="Titre" v-model="identity.title" outlined :items="titles" :rules="[rules.required]"></v-combobox>
          <v-text-field id="lastname" v-model="identity.lastname" :rules="[rules.required]" label="Nom" required outlined/>
          <v-text-field id="firstname" v-model="identity.firstname" :rules="[rules.required]" label="Premier prénom" required outlined/>
          <v-text-field id="other-firstnames" v-model="identity.otherFirstnames" :rules="[]" label="Autres prénoms" outlined/>
          <DatePicker v-model="identity.dateOfBirth"/>
          <v-text-field id="place-of-birth" v-model="identity.placeOfBirth" :rules="[rules.required]" label="Lieu de naissance" required outlined/>
          <v-text-field id="job" v-model="identity.job" :rules="[rules.required]" label="Profession" required outlined/>
          <v-text-field id="address" v-model="identity.address" :rules="[rules.required]" label="Domicile fiscal" required outlined/>
          <v-container class="pt-0">
            <div class="v-label">Avez-vous une carte d'invalidité ?</div>
            <v-radio-group v-model="identity.disability" row>
              <v-radio label="Oui" value="true"/>
              <v-radio label="Non" value="false"/>
            </v-radio-group>
          </v-container>
          <v-container class="pt-0">
            <div class="v-label">Etes-vous de nationalité française ?</div>
            <v-radio-group v-model="identity.stranger" row>
              <v-radio label="Oui" :value="false"/>
              <v-radio label="Non" :value="true"/>
            </v-radio-group>
          </v-container>
          <v-fade-transition>
            <div v-if="identity.stranger">
              <v-text-field id="nationality" v-model="identity.nationality" :rules="[rules.required]" label="Nationalité" :required="identity.stranger" outlined/>
            </div>
          </v-fade-transition>
        </v-list>

        <v-btn v-if="customer.identities.length < 2" block @click="addIdentity" color="primary" class="">
          <v-icon class="mr-2">mdi-plus</v-icon>
          Ajouter une personne
        </v-btn>

      </v-container>
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
  name: "SellerInfoForm",
  components: {DatePicker},
  data: () => {
    return {
      customer: {
        goal: null,
        type: null,
        identities: [],
        company: {
          companyId: null
        }
      },
      rules: {
        age: [
          val => val < 10 || `I don't believe you!`,
        ],
        required: value => !!value || 'Ce champs est requis',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'E-mail invalide'
        }
      },
      titles: ['Monsieur', 'Madame', 'Mademoiselle']
    }
  },
  methods: {
    output: function () {
      this.$emit('input', this.seller);
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