<template>
  <v-container v-on:input="output">
    Type du bien ?
    <v-radio-group v-model="building.type">
      <v-radio label="Une maison" value="house"/>
      <v-radio label="Un appartement" value="flat"/>
      <v-radio label="Un terrain" value="land"/>
    </v-radio-group>
  </v-container>
</template>

<script>

export default {
  name: "BuildingInfoForm",
  data: function(){
    return {
      building: {
        type: ''
      }
    }
  },
  methods: {
    output: function () {
      this.$emit('input', this.building);
    }
  }
}
</script>

<style scoped>

</style>