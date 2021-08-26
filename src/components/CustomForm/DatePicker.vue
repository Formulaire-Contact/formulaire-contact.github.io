<template>
  <v-menu v-on:input="output" ref="menu" v-model="menu" :close-on-content-click="false"
          transition="scale-transition" offset-y min-width="auto">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field :value="formatDate" label="Date de naissance" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" class="pt-0 mt-0"/>
    </template>
    <v-date-picker id="birthdate" v-model="date" min="1900-01-01" @change="saveDate"
                   :first-day-of-week="1" locale="fr-fr" :active-picker.sync="activePicker"
                   :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"/>
  </v-menu>
</template>

<script>
import moment from "moment";

export default {
  name: "DatePicker",
  data: () => {
    return {
      date: null,
      activePicker: 'YEAR',
      menu: false,
    }
  },
  methods: {
    output: function () {
      this.$emit('input', this.date);
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
      return this.date ? moment(this.date).format("DD/MM/yyyy") : "";
    }
  },
}
</script>

<style scoped>

</style>