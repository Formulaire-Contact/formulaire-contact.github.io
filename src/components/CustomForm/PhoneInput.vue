<template>
  <v-text-field id="phone" v-model="formattedPhone" :rules="required ? [rules.required, rules.phone] : [rules.phone]" :label="label"
                required outlined @input="output" @blur="focusOut" @focus="focusIn"/>
</template>

<script>
import {formatNational, isPhoneNumberValid} from "../../assets/js/phoneValidator";

export default {
  name: "PhoneInput",
  data: function() {
    return {
      formattedPhone: '',
      phone: '',
      rules: {
        required: value => !!value || 'Ce champs est requis',
        phone: value => {
          return (!value || isPhoneNumberValid(value, 'fr')) || 'Téléphone invalide';
        }
      }
    }
  },
  methods: {
    focusOut: function() {
      this.phone = this.formattedPhone.replaceAll(' ', '');
      if (isPhoneNumberValid(this.phone, 'fr')) {
        this.formattedPhone = formatNational(this.phone, 'fr');
      }
    },
    focusIn: function() {
      this.formattedPhone = this.phone;
    },
    output: function() {
      this.$emit('input', this.formattedPhone);
    }
  },
  props: ['label', 'required']
}
</script>

<style scoped>

</style>