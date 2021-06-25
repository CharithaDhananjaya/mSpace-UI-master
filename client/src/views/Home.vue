<template>
  <div class="Home">
    <v-container class="Appbar">
      <AppBar></AppBar>
    </v-container>
    <v-layout row wrap align-center>
      <v-flex xs12 sm6 md3>
        <v-contianer
          class="MessageWidget"
          :class="{'ma-2': $vuetify.breakpoint.smAndDown, 'ma-5': $vuetify.breakpoint.mdAndUp}"
        >
          <v-row class="flex-one">
            <MessageWidget></MessageWidget>
          </v-row>
        </v-contianer>
      </v-flex>
      <v-flex xs12 sm6 md9>
        <v-container class="scroll-area" id="scroll-target">
          <v-row class="flex-two" v-scroll:#scroll-target="onScroll">
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
            <MessagePreview></MessagePreview>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import AppBar from "../components/AppBar";
import MessagePreview from "../components/MessagePreview";
import MessageWidget from "../components/MessageWidget";

export default {
  name: "Home",
  components: {
    AppBar,
    MessagePreview,
    MessageWidget
  }
};
</script>

<style scoped>
.Appbar {
  margin-bottom: 20px;
}
.MessageWidget {
  justify-content: center;
  align-content: center;
}
.flex-one {
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
.flex-two {
  height: 600px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-right: 5px;
}
.scroll-area {
  overflow-x: auto;
  overflow-y: auto;
  margin-top: 10px;
  scroll-behavior: smooth;
  height: 100%;
  align-content: space-between;
  justify-content: space-between;
}
#scroll-target {
  justify-items: center;
  align-items: center;
}
</style>
