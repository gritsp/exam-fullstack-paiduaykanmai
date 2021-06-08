<template>
  <v-contianer>
    <h2 style="text-align: center">ร้านค้า</h2>
    <template>
      <v-dialog transition="dialog-bottom-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <div style="display: flex; justify-content: flex-end">
            <v-btn outlined v-bind="attrs" v-on="on"
              ><v-icon>mdi-plus</v-icon>New</v-btn
            >
          </div>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-card-title>Create New Store</v-card-title>

            <v-card-text>
              <v-form v-model="valid" id="storeform" @submit="postStore">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="InputName"                        
                        label="Name"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="InputDes"
                        label="Description"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="InputTel"
                        label="Tel"
                        required
                      ></v-text-field>
                    </v-col>
                    
                    <v-col cols="12">
                      <v-text-field
                        v-model="InputAddress"
                        label="Address"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions class="justify-end">
                <v-btn color="success" outlined type="submit" @click="submit" form="storeform">submit</v-btn>            
                <v-btn text @click="dialog.value = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </template>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th style="width: 5%; text-align: center;font-size:18px;">ID</th>
            <th style="width: 15%; text-align: center;font-size:18px;">Name</th>
            <th style="width: 30%; text-align: center;font-size:18px;">Description</th>            
            <th style="width: 10%; text-align: center;font-size:18px;">Tel.</th>            
            <th style="width: 20%; text-align: center;font-size:18px;">Address</th>
            <th style="width: 20%; text-align: center;font-size:18px;">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in storelist" :key="index">
            <td style="text-align: center">{{ item._id }}</td>
            <td style="text-align: center">{{ item.name }}</td>
            <td style="text-align: center">{{ item.description }}</td>            
            <td style="text-align: center">{{ item.tel }}</td>         
            <td style="text-align: center">{{ item.address }}</td>
            <td style="text-align: center">
            <v-row> 
				<v-col>				
					<v-btn :to="'/shop/'+item._id" depressed style="background-color: white"
						><v-icon>mdi-store</v-icon></v-btn
					>
				</v-col>          
				<v-col>
					<v-dialog transition="dialog-bottom-transition" max-width="600">
					<template v-slot:activator="{ on, storeEdit }">
					<div>
						<v-btn v-bind="storeEdit" v-on="on" depressed style="background-color: white"
						><v-icon>mdi-pencil</v-icon></v-btn
						>
					</div>
					</template>
					<template v-slot:default="dialog">
					<v-card>
						<v-card-title>Edit Store</v-card-title>

						<v-card-text>
						<v-form v-model="valid" id="storeformput" @submit="putStore(item._id,item.name,item.description,item.tel,item.address)">
							<v-container>
							<v-row>
								<v-col cols="12">
								<v-text-field
									v-model="item.name"                        
									label="Name"
									required
								></v-text-field>
								</v-col>

								<v-col cols="12">
								<v-text-field
									v-model="item.description"
									label="Description"
									required
								></v-text-field>
								</v-col>

								<v-col cols="12">
								<v-text-field
									v-model="item.tel"
									label="Tel"
									required
								></v-text-field>
								</v-col>
								
								<v-col cols="12">
								<v-text-field
									v-model="item.address"
									label="Address"
									required
								></v-text-field>
								</v-col>
							</v-row>
							</v-container>
						</v-form>
						</v-card-text>

						<v-card-actions class="justify-end">
							<v-btn color="success" outlined type="submit" @click="submit" form="storeformput">submit</v-btn>            
							<v-btn text @click="dialog.value = false">Close</v-btn>
						</v-card-actions>
					</v-card>
					</template>
				</v-dialog>
				</v-col>
              	<v-col>
					<v-btn depressed style="background-color: white" @click="deleteItem(item._id)"
					><v-icon style="color: red">mdi-delete</v-icon></v-btn>
				</v-col>

              </v-row>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-contianer>
</template>

<script>
import axios from "axios";
export default {
  name: "Store",
  data() {
    return {
        storelist: null,
        InputName:"",
        InputDes:"",
        InputTel:"",
        InputAddress:"",
        InputData:""
    };
  },
  methods: {
    check: function () {
      console.log(this.product);
    },
    getStoreList: function () {
      axios.get("http://localhost:3000/api/store").then((res) => {
        this.storelist = res.data.data;
      });
    },
    postStore: function () {
        axios.post("http://localhost:3000/api/store",{
            name:this.InputName,
            description:this.InputDes,
            tel:this.InputTel,
            address:this.InputAddress,
            data:""
        }).then(()=>alert("success")).catch((err)=>alert(err))
    },
    deleteItem: function (id) {
      axios.delete("http://localhost:3000/api/store/"+id).then( ()=> {
        // console.log(res)
        // alert(res.data)
        this.getStoreList()
      }).catch(err=>console.log(err))
    },
    putStore: function (id,name,des,tel,address) {
      	axios.put("http://localhost:3000/api/store/"+id,{
        	name:name,
			description:des,
			tel:tel,
			address:address
      	}).then(res=>alert(res))
    },
  },
  mounted() {
    this.getStoreList();
  },
};
</script>

<style>
</style>