<template>
  <div class="flash-messages">
    <flash-message
      v-for="message in orderedMessages"
      :message="message"
      :key="message.id"
      @dismiss="dismiss(message.id)"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { genId } from "@/utils";

const messages = [];

export function flash(message) {
  messages.push({
    id: genId(),
    content: message
  });
}

export default {
  data() {
    return {
      messages: messages
    };
  },
  computed: {
    orderedMessages() {
      return [...this.messages].reverse();
    }
  },
  methods: {
    dismiss(messageId) {
      const index = this.messages.findIndex(message => message.id == messageId);
      messages.splice(index, 1);
    }
  }
};
</script>

<style scoped lang="scss">
@import "resources/sass/init";

.flash-messages {
  position: fixed;
  z-index: 10000;
  // right: 50px;
  top: var(--sp-4);
  left: 50%;
  transform: translateX(-50%);
}
</style>