<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Auto Logo"
          class="shrink mr-2"
          contain
          src="https://thiscatdoesnotexist.com/"
          transition="scale-transition"
          width="40"
        />
        <span> Vacation Apply Generator </span>

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn target="_blank" text>
        <span class="mr-2">Generate</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Form
        v-if="isReady"
        @user="fetchUser"
        :user="user"
        v-on:generate="genereateDocx"
      ></Form>
    </v-main>
  </v-app>
</template>

<script lang="ts">
const ipcRenderer = window.require("electron").ipcRenderer;

import { IpcRendererEvent } from "electron";
import Vue from "vue";
import Form from "./components/Form.vue";
import { User } from "./models/User";
export default Vue.extend({
  name: "App",
  components: {
    Form,
  },

  async created() {
    console.log("Request Setting json");

    const response = await ipcRenderer.invoke("give-me-setting", "ping");
    console.log(response);
    this.isReady = true;
    this.user = response;
  },
  methods: {
    fetchUser(user: User) {
      console.log("@App");
      this.user = user;
      console.log(user);
    },
    async genereateDocx(user: User) {
      console.log("Generate on App");
      console.log(this.user);
      console.log("Request Convert to Background ");
      alert("Reqeust Convert Job");
      const response = await ipcRenderer.invoke(
        "convert-json-to-docx",
        this.user
      );
      alert("end Job");
    },
  },

  data: () => ({
    isReady: false, // 非同期UI用
    user: Object,
  }),
});
</script>
