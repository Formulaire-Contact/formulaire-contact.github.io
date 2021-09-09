<template>
  <v-form v-on:input="output" class="ma-1 text-h6">
    <v-container>
      <div class="mb-3">Coordonnées</div>
      <v-text-field id="email" v-model="contact.email" :rules="[rules.email, rules.required]" label="E-mail" required outlined/>
      <PhoneInput v-model="contact.phone" label="Téléphone portable" :required="true"/>
      <PhoneInput v-model="contact.phone" label="Téléphone domicile" :required="false"/>

      <div>Pour les rendez-vous de signature, vous souhaitez...</div>
      <v-radio-group v-model="contact.appointment.type">
        <v-radio label="Assiter au rendez-vous" value="physical"/>
        <v-radio label="Opter pour une procuration" value="virtual"/>
      </v-radio-group>

      <v-fade-transition>
        <div v-if="contact.appointment.type === 'physical'">
          <div class="mb-3 mt-3">Disponibilités</div>
          <div class="text-body-1">Merci d'indiquer vos disponibilités pour le ou les rendez-vous de signature</div>

          <v-container class="col-lg-8 col-md-10">
            <v-list v-for="(slot, index) in contact.appointment.slots" :key="slot.id" flat>
              <v-divider class="mt-1 mb-5" v-if="index > 0"/>
              <div class="d-flex mb-3">
                <div>Créneau n°{{ index + 1 }}</div>
                <v-spacer/>
                <v-btn icon @click="removeSlot(index)" class="delete-button">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
              <v-combobox label="Jour" v-model="slot.dayOfWeek" outlined :items="daysOfWeek" :rules="[rules.required]"/>
              <RangeTimePicker v-model="slot.range"/>
            </v-list>
          </v-container>

          <v-btn block @click="addSlot" color="primary">
            <v-icon class="mr-2">mdi-plus</v-icon>Ajouter un créneau
          </v-btn>
        </div>
      </v-fade-transition>


    </v-container>
  </v-form>
</template>

<script>
import PhoneInput from "./CustomForm/PhoneInput";
import RangeTimePicker from "./CustomForm/RangeTimePicker";

export default {
  name: "ContactForm",
  components: {RangeTimePicker, PhoneInput},
  data: function(){
    return {
      contact: {
        email: null,
        phone: null,
        appointment: {
          type: null,
          slots: []
        }
      },
      rules: {
        required: value => !!value || 'Ce champs est requis',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'E-mail invalide'
        }
      },
      daysOfWeek: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
      slotId: 0
    }
  },
  watch: {
    contact: {
      handler: function () {
        this.saveData();
      },
      deep: true
    }
  },
  methods: {
    output: function () {
      this.$emit('input', this.contact);
    },
    addSlot() {
      this.contact.appointment.slots.push({
        id: this.slotId++,
        dayOfWeek: null,
        moment: null,
        range: {}
      });
    },
    removeSlot(index) {
      this.contact.appointment.slots.splice(index, 1);
    },
    saveData: function() {
      localStorage.setItem('info.contact', JSON.stringify(this.contact));
    },
    loadData: function() {
      let data = localStorage.getItem('info.contact');
      if (data !== null) {
        this.contact = JSON.parse(data);
      }
    }
  },
  created: function() {
    this.loadData();
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