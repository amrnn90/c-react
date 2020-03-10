<template>
  <div>
    <h1 class="resource-label">Edit {{resource.label}}</h1>
    <page-card style="margin-bottom: var(--sp-10)">
      <div class="form-wrapper">
        <m-form
          v-if="item"
          :item="itemData"
          :action="item.api_urls.update"
          @error-focus="handleErrorFocus"
          @success="handleCreateSuccess"
          #default="{form}"
        >
            <m-form-field :field="field" #default="{on, props}" v-for="field in resource.fields" :key="field.name">
              <component v-bind="props" v-on="on" :is="`${field.type}Input`" />
            </m-form-field>

          <div class="actions-wrapper">
            <button type="submit" class="create-btn">Update</button>
          </div>
          <!-- <pre>{{form}}</pre> -->
        </m-form>
      </div>
    </page-card>
    <!-- <page-card>
      <pre>{{resource}}</pre>
    </page-card>-->
  </div>
</template>

<script>
export default {
  props: ["resource"],
  data() {
    return {
      item: null
    };
  },
  computed: {
    itemData() {
      return this.item
        ? this.item.fields.reduce((result, field) => {
            result[field.name] = field.data;
            return result;
          }, {})
        : null;
    }
  },
  methods: {
    handleErrorFocus(errorComponents) {
      const inputName = errorComponents[0].name;
      const el = this.$el.querySelector(`[name="${inputName}"]`);
      if (el) {
        el.focus();
      }
    },
    handleCreateSuccess(res) {
      this.$flash("Item updated successfully!");
      this.$router.push({ name: `${this.resource.name}.index` });
    }
  },
  created() {
    axios
      .get(`${this.resource.api_urls.base_path}/${this.$route.params.id}`)
      .then(({ data }) => {
        this.item = data;
      });
  }
};
</script>


<style scoped lang="scss">
@import "resources/sass/init";

.resource-label {
  font-size: var(--fz-2xl);
  color: var(--grey-2);
  margin-bottom: var(--sp-6);
}

.form-wrapper {
  max-width: var(--sp-21);
  margin: 0 auto;
  // display: flex;
  // justify-content: center;
  padding: var(--sp-10) var(--sp-4);
}

.actions-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--sp-10);
}

.create-btn {
  // height: var(--sp-10);
  background: var(--primary);
  color: var(--primary-10);
  border-radius: var(--br);
  padding: var(--sp-3) var(--sp-7);
  font-size: var(--fz-xs);
  font-weight: var(--fw-bold);
}
</style>