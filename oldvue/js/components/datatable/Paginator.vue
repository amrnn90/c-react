<template>
  <page-card v-if="totalPages > 1" class="paginator" :class="{'is-disabled': isDisabled}">
      <button @click="handlePrev" class="prev" :disabled="isFirstPage">
        <icon name="chevron-left" strokeWidth="2" size="22" />
      </button>
      <span class="pages">
        <button
          @click="handlePageSelect(pageNum+1)"
          v-for="pageNum in Array(totalPages).keys()"
          :key="pageNum"
          class="page"
          :class="{active: pageNum+1 == currentPage}"
        >{{pageNum + 1}}</button>
      </span>
      <button @click="handleNext" class="next" :disabled="isLastPage">
        <icon name="chevron-right" strokeWidth="2" size="22" />
      </button>
    <!-- <pre>{{pagingInfo}}</pre> -->
  </page-card>
</template>

<script>
export default {
  props: ["pagingInfo", "isDisabled"],
  computed: {
    totalPages() {
      return Math.ceil(
        _.get(this.pagingInfo, "total", 0) /
          _.get(this.pagingInfo, "per_page", 10)
      );
    },
    currentPage() {
      return this.pagingInfo.current_page;
    },
    lastPage() {
      return this.totalPages;
    },
    isFirstPage() {
      return this.currentPage == 1;
    },
    isLastPage() {
      return this.currentPage == this.lastPage;
    }
  },
  watch: {
    currentPage(currentPage) {
      if (currentPage > this.lastPage) {
        this.changePage(this.lastPage);
      }
    }
  },
  methods: {
    handlePrev() {
      if (this.isFirstPage) return;
      this.handlePageSelect(this.currentPage - 1);
    },
    handleNext() {
      if (this.isLastPage) return;
      this.handlePageSelect(this.currentPage + 1);
    },
    handlePageSelect(pageNum) {
      if (pageNum == this.currentPage || this.isDisabled) return;
      this.changePage(pageNum);
    },
    changePage(pageNum) {
      this.$emit("page-selected", pageNum);
    }
  }
};
</script>

<style scoped lang="scss">
@import "resources/sass/init";

.paginator {
  padding-top: var(--sp-3);
  padding-bottom: var(--sp-3);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--grey-5);

  &.is-disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}

// .pages {
//   // display: inline-flex;
//   // align-items: center;
// }

.page,
.prev,
.next {
  cursor: pointer;
}
.page {
  // display: inline-block;
  line-height: var(--sp-6);
  width: var(--sp-6);
  height: var(--sp-6);
  text-align: center;
  border-radius: var(--br);
  font-size: var(--fz-xs);
  font-weight: var(--fw-bold);

  &:not(:last-child) {
    margin-right: var(--sp-5);
  }

  &:hover {
    background: var(--primary-10);
    // color: white;
  }

  &.active {
    background: var(--primary);
    color: var(--primary-10);
  }
}

.prev,
.next {
  &:disabled {
    cursor: default;
    // color: var(--grey-8);
    opacity: 0.3;
    // pointer-events: none;
  }
}
.prev {
  margin-right: var(--sp-5);
}
.next {
  margin-left: var(--sp-5);
}
</style>