<template>
  <v-contianer>
    <h2 style="text-align: center">สินค้า</h2>
    <!-- <div style="display:flex; justify-content:flex-end;"><v-btn flex depressed><v-icon>mdi-plus</v-icon>New</v-btn></div> -->
    <template>
      <v-dialog transition="dialog-bottom-transition" max-width="600">
        <template v-slot:activator="{ on, newform }">
          <div style="display: flex; justify-content: flex-end">
            <v-btn outlined v-bind="newform" v-on="on"
              ><v-icon>mdi-plus</v-icon>New</v-btn
            >
          </div>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-card-title>Create New Product</v-card-title>

            <v-card-text>
              <v-form v-model="valid" id="productform" @submit="postProduct">
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
                        v-model="InputPrice"
                        label="Price"
                        required
                      ></v-text-field>
                    </v-col>
                    
                    <v-col cols="12">
                      <v-text-field
                        v-model="InputUnit"
                        label="Unit"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12">                      
					<v-select v-model="InputCat"
						:items="category"
						item-text="name"
						item-id="id"
						label="Category"
						dense
						></v-select>
                    </v-col>
                  </v-row>
                  
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions class="justify-end">
                <v-btn color="success" outlined type="submit" @click="submit" form="productform">submit</v-btn>            
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
            <th style="width: 10%; text-align: center;font-size:18px;">ID</th>
            <th style="width: 15%; text-align: center;font-size:18px;">Name</th>
            <th style="width: 25%; text-align: center;font-size:18px;">Description</th>            
            <th style="width: 10%; text-align: center;font-size:18px;">Price</th>
            <th style="width: 10%; text-align: center;font-size:18px;">Unit</th>
            <th style="width: 10%; text-align: center;font-size:18px;">Category</th>
            <th style="width: 20%; text-align: center;font-size:18px;">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in productList" :key="index">
            <td style="text-align: center">{{ item._id }}</td>
            <td style="text-align: center">{{ item.name }}</td>
            <td style="text-align: center">{{ item.description }}</td>            
            <td style="text-align: center">{{ item.price }}</td>            
            <td style="text-align: center">{{ item.unit }}</td>            
            <td style="text-align: center">{{ item.category }}</td>
            <td style="text-align: center">
            
              <!-- <v-btn depressed style="background-color: white"
                ><v-icon>mdi-pencil</v-icon></v-btn
              > -->
			<v-row class="justify-end">
				<v-col>
					<v-dialog transition="dialog-bottom-transition" max-width="600">
				<template v-slot:activator="{ on, editProduct }">
				<div>
					<v-btn depressed v-bind="editProduct" v-on="on"
					 style="background-color: white"
                	><v-icon>mdi-pencil</v-icon></v-btn>
				</div>
				</template>
				<template v-slot:default="dialog">
				<v-card>
					<v-card-title>Edit Product</v-card-title>
					<v-card-text>
					<v-form v-model="valid" id="productformput" @submit="putProduct(item._id,item.name,item.description,item.price,item.unit,item.category)">
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
								v-model="item.price"
								label="Price"
								required
							></v-text-field>
							</v-col>
							
							<v-col cols="12">
							<v-text-field
								v-model="item.unit"
								label="Unit"
								required
							></v-text-field>
							</v-col>
							<v-col class="d-flex" cols="12">                      
							<v-select v-model="item.category"
								:items="category"
								item-text="name"
								item-id="id"
								label="Category"
								dense
								></v-select>
							</v-col>
						</v-row>
						
						</v-container>
					</v-form>
					</v-card-text>

					<v-card-actions class="justify-end">
						<v-btn color="success" outlined type="submit" @click="submit" form="productformput">submit</v-btn>            
						<v-btn text @click="dialog.value = false">Close</v-btn>
					</v-card-actions>
				</v-card>
				</template>
			</v-dialog>
				</v-col>
              <v-col>
				<v-btn depressed style="background-color: white"
					@click="deleteItem(item._id)"
				><v-icon style="color: red">mdi-delete</v-icon></v-btn
              >
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
  name: "Product",
  data() {
    return {
        productList: null,
        category: null,
		categoryId: [],
		categoryName:[],
        InputName:"",
        InputDes:"",
        InputPrice:"",
        InputUnit:"",
        InputCat:"",
    };
  },
  methods: {
    getProductList: function () {
      axios.get("http://localhost:3000/api/product").then((res) => {
        this.productList = res.data.data;
      });
    },
    postProduct: function () {
		console.log(this.InputCat)
        axios.post("http://localhost:3000/api/product",{
            name:this.InputName,
            description:this.InputDes,
            price:this.InputPrice,
            unit:this.InputUnit,
            category:this.InputCat,
        }).then(()=>{
			
			alert("success")}).catch((err)=>alert(err))
    },
    getCategory: function () {
      	axios.get("http://localhost:3000/api/category").then( res =>{
		  	this.category = res.data.data
			for (var i=0;i<this.category.length;i++){
				this.categoryName.push(this.category[i].name)
				this.categoryId.push(this.category[i]._id)	
			}
			// console.log(data.lenght)
			console.log(this.categoryName)
			console.log(this.categoryId)
      })
    },
	deleteItem: function (id) {
		axios.delete("http://localhost:3000/api/product/"+id).then( (res)=> {
			console.log(res)
			// alert(res.data)
			this.getProductList()
		}).catch(err=>console.log(err))
	},
	putProduct: function (id,name,des,price,unit,cat) {
		axios.put("http://localhost:3000/api/product/"+id,{
			name:name,
            description:des,
            price:price,
            unit:unit,
            category:cat,
		}).then(res=>alert(res))
	},
  },
  mounted() {
    this.getProductList();
	this.getCategory();
  },
};
</script>

<style>
</style>