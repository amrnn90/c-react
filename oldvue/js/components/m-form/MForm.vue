<template>
  <form :action="action" @submit.prevent="submit">
    <slot :form="sharedForm"></slot>
  </form>
</template>

<script>
import axios from "axios";
export default {
  props: {
    action: {},
    item: { type: Object, default: null },
  },
  data() {
    return {
      sharedForm: {
        locale: 'en',
        locales: this.$store.state.structure.locales,
        fields: _.cloneDeep(this.item),
        initialFields: _.cloneDeep(this.item),
        errors: {},
        errorComponents: [],
        isLoading: false,
      },
      shouldFocus: true
    };
  },
  computed: {
    form() {
      return this.sharedForm.fields;
    },
    method() {
      return this.item ? "patch" : "post";
    },
  },
  watch: {
    "sharedForm.errorComponents": {
      handler() {
        const { sharedForm } = this;
        if (sharedForm.errorComponents.length && this.shouldFocus) {
          this.shouldFocus = false;
          this.$nextTick(() => {
            this.$emit("error-focus", sharedForm.errorComponents);
            this.shouldFocus = true;
            sharedForm.errorComponents = [];
          });
        }
      }
    }
  },
  methods: {
    submit() {
      this.clearErrors();
      this.sharedForm.isLoading = true;
      axios[this.method](this.action, this.form)
        .then(({ data }) => {
          this.$emit("success", data);
        })
        .catch(({ response }) => {
          this.sharedForm.errors = response.data.errors || {};
          this.$emit("fail", response);
        })
        .finally(() => {
          this.sharedForm.isLoading = false;
        })
    },
    clearErrors() {
      this.sharedForm.errors = {};
    }
  },
  provide() {
    return {
      sharedForm: this.sharedForm
    };
  }
};
</script>