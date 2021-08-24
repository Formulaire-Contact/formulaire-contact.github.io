<template>
  <v-container v-on:input="output">
    Vous êtes ?
    <v-radio-group v-model="person.type" row>
      <v-radio label="Une personne physique" value="person"/>
      <v-radio label="Une personne morale" value="company"/>
    </v-radio-group>

    <v-container v-if="person.type === 'person'">
      <v-text-field id="firstname" v-model="person.firstname" :rules="[rules.required]" label="Prénom" required outlined/>
      <v-text-field id="lastname" v-model="person.lastname" :rules="[rules.required]" label="Nom" required outlined/>
      <v-text-field id="email" v-model="person.email" :rules="[rules.email, rules.required]" label="Mail" required outlined/>
      <div>
        <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
            transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field :value="formatDate" label="Date de naissance" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"/>
          </template>
          <v-date-picker v-model="person.dateOfBirth" min="1900-01-01" @change="saveDate"
              :first-day-of-week="1" locale="fr-fr" :active-picker.sync="activePicker"
              :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"/>
        </v-menu>
      </div>
    </v-container>
    <v-container v-if="person.type === 'company'">
      <v-text-field id="company-id" v-model="person.companyId" :rules="[rules.required]" label="Dénomination sociale" required outlined/>
    </v-container>
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  name: "PersonInfoForm",
  data: () => {
    return {
      person: {
        type: null,
        firstname: null,
        lastname: null,
        companyId: null,
        email: null,
        dateOfBirth: null
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
      activePicker: 'YEAR',
      menu: false,
    }
  },
  methods: {
    output: function () {
      this.$emit('input', this.person);
    },
    saveDate (date) {
      this.$refs.menu.save(date)
    },
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  computed: {
    formatDate() {
      return this.person.dateOfBirth ? moment(this.person.dateOfBirth).format("DD/MM/yyyy") : "";
    }
  }
}
</script>

<style scoped>

</style>