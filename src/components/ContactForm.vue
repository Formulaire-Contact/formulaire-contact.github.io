<template>
  <v-container>
    Disponibilités: ...
    <!--        <v-text-field id="email" v-model="seller.email" :rules="[rules.email, rules.required]" label="Mail" required outlined/>-->
  </v-container>
</template>

<script>
export default {
  name: "AppointmentForm",
  data: function(){
    return {
      appointment: {
        dates: []
      }
    }
  }
}
</script>

<style scoped>

</style>