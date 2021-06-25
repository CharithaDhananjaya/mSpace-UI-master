<template>
  <div class="MessagePreview">
    <v-card class="card" color="white" elevaation-5>
      <v-toolbar class="blue white--text" elevation-12>
        <v-toolbar-title>SPID : SPName</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <div>PhoneNumber</div>
        <div>Email</div>
        <div>message</div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "MessagePreview"
};
</script>

<style scoped>
.card {
  margin: 10px;
  max-width: 220px;
  max-height: 200px;
}
.contact {
  font-size: 24px;
  font-weight: bolder;
}
.message {
  font-size: 18px;
}
</style>