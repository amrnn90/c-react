<template>
  <div style="padding: var(--sp-6); border: 3px solid var(--grey-10); border-radius: var(--br)">
    <m-form-field
      :field="field"
      #default="{on, props}"
      v-for="field in nestedFields"
      :key="field.name"
    >
      <component v-bind="props" v-on="on" :is="`${field.type}Input`" />
    </m-form-field>

    <!-- <pre>{{field}}</pre> -->
  </div>
</template>

<script>
export default {
  props: ["field", "value", "name", "id", "hasError"],
  computed: {
    nestedFields() {
      return this.field.fields.map(field => {
        return {
          ...field,
          name: `${this.name}.${field.name}`
        };
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>