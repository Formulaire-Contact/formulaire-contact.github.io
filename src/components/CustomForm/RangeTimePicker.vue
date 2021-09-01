<template>
  <div class="d-flex">
    <div class="mt-3 mr-3">De</div>
    <v-combobox class="mr-2" v-model="startTime" outlined @input="output"
                :items="startTimes.map(value => value + 'h')" :rules="[rules.required]"/>
    <div class="ma-3">à</div>
    <v-combobox class="ml-2" v-if="range.start < 13" v-model="endTime" outlined @input="output"
                :items="morningEndTimes.map(value => value + 'h')" :rules="[rules.required]"/>
    <v-combobox class="ml-2" v-if="range.start > 13" v-model="endTime" outlined @input="output"
                :items="afternoonEndTimes.map(value => value + 'h')" :rules="[rules.required]"/>
  </div>
</template>

<script>
export default {
  name: "RangeTimePicker",
  data: function() {
    return {
      range: {
        start: null,
        end: null
      },
      startTimes: [9, 10, 11, 14, 15, 16, 17],
      morningEndTimes: [10, 11, 12],
      afternoonEndTimes: [15, 16, 17, 18],
      rules: {
        required: value => !!value || 'Ce champs est requis'
      }
    }
  },
  methods: {
    output: function () {
      this.$emit('input', this.range);
    }
  },
  computed: {
    startTime: {
      get: function() {
        return this.range.start ? this.range.start + 'h' : '-';
      },
      set: function(value) {
        this.range.start = parseInt(value.slice(0, value.length - 1));
        if (this.range.end <= this.range.start ||
            (this.range.start < 13 && this.range.end > 13) ||
            (this.range.start > 13 && this.range.end < 13)
        ) {
          this.range.end = this.range.start + 1;
        }
      }
    },
    endTime: {
      get: function() {
        return this.range.end ? this.range.end + 'h' : '-';
      },
      set: function(value) {
        this.range.end = parseInt(value.slice(0, value.length - 1));
        if (this.range.end <= this.range.start) {
          this.range.start = this.range.end - 1;
        }
      }
    },
  }
}
</script>

<style scoped>

</style>