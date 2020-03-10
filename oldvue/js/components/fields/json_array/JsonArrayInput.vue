<template>
  <div style="padding: var(--sp-6); border: 1px solid var(--primary-8)">
    <div v-for="(field, index) in nestedFields" :key="index" v-if="index < 100">
      <m-form-field :field="field" #default="{on, props}">
        <component v-bind="props" v-on="on" :is="`${field.type}Input`" />
        <button type="button" @click="() => remove(index)">remove</button>
      </m-form-field>
    </div>

    <button type="button" @click="add">add</button>

    <!-- <pre>{{field}}</pre> -->
  </div>
</template>

<script>
import { genId } from "@/utils";

export default {
  props: ["field", "value", "name", "id", "hasError"],
  computed: {
    nestedFields() {
      return (this.value || []).map((_, index) => {
        return {
          ...this.field.template_field,
          name: `${this.name}.${index}`,
        };
      });
    }
  },
  methods: {
    add() {
      const newValue = [...(this.value || []), null];
      this.$emit("input", newValue);
    },
    remove(index) {
      const newValue = [
        ...this.value.slice(0, index),
        ...this.value.slice(index+1)
      ];
      this.$emit("input", newValue);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>