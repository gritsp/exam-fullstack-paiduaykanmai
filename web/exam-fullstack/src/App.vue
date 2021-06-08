<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container style="margin-top: 1vh">
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <router-link to="/" style="text-decoration:none; color:black;">
					<v-list-item link>
					<v-list-item-content>
						<v-list-item-title>ร้านค้า</v-list-item-title>
					</v-list-item-content>
					</v-list-item>
				</router-link>
				<router-link to="/product"  style="text-decoration:none; color:black;">
					<v-list-item link>
					<v-list-item-content>
						<v-list-item-title>สินค้า</v-list-item-title>
					</v-list-item-content>
					</v-list-item>
				</router-link>
              </v-list>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet min-height="95vh" rounded="lg">
              	<v-container>
					<router-view></router-view>
				</v-container>  
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

</script>

<style>
div {
  font-family: "Kanit", sans-serif;
}
</style>