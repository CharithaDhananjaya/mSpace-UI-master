<template>
  <div class="MessageWidget">
    <v-card height="auto" max-width="400px" elevation-8>
      <v-toolbar class="mb-8 teal lighten-2" elevation-12>
        <v-toolbar-title>Message Options</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-text-field
          class="message"
          placeholder="Message"
          prepend-icon="mdi-message-text"
          outlined
        ></v-text-field>
        <v-text-field
          class="message-tags"
          placeholder="Message Tags"
          prepend-icon="mdi-bookmark"
          outlined
        ></v-text-field>
        <v-text-field
          class="message-preview"
          placeholder="Message Preview"
          prepend-icon="mdi-comment-check"
          outlined
        ></v-text-field>
      </v-container>
      <v-card-actions>
        <v-row align-center justify-center>
          <v-spacer></v-spacer>
          <v-btn class="green darken white--text mx-2">Preview</v-btn>
          <v-btn class="blue darken white--text mx-2">Send</v-btn>
          <v-spacer></v-spacer>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "MessageWidget"
};
</script>

<style>
</style>