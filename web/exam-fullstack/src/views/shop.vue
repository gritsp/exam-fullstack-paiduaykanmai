<template>
    <v-container>
        <v-row>
            <v-col>
                <v-btn  depressed to="/" style="text-align:left; background-color:white;" ><v-icon>mdi-arrow-left</v-icon></v-btn>
            </v-col>
            <v-col>
                <h2 style="text-align:center;">ร้าน {{storeData.name}}</h2>
            </v-col>
            <v-col>                
				<template>
					<v-dialog transition="dialog-bottom-transition" max-width="1000">
						<template v-slot:activator="{ on, attrs }">
						<div style="display: flex; justify-content: flex-end">
							<v-btn outlined v-bind="attrs" v-on="on"
							><v-icon>mdi-plus</v-icon>Add product</v-btn
							>
						</div>
						</template>
						<template v-slot:default="dialog">
							<v-card>
								<v-card-title>Add product</v-card-title>
									<v-card-text>
										<v-sample-table>
										
											<thead>
											<tr>
												<th style="width: 10%; text-align: center;font-size:16px;">ID</th>
												<th style="width: 20%; text-align: center;font-size:16px;">Name</th>
												<th style="width: 30%; text-align: center;font-size:16px;">Description</th>            
												<th style="width: 10%; text-align: center;font-size:16px;">Price</th>
												<th style="width: 10%; text-align: center;font-size:16px;">Unit</th>
												<th style="width: 10%; text-align: center;font-size:16px;">Category</th>
												<th style="width: 10%; text-align: center;font-size:16px;">Action</th>
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

													
														<v-btn depressed style="background-color: white" @click="putProductToStore(item._id)"><v-icon>mdi-plus</v-icon>add to store</v-btn>
													
													</td>
												</tr>
											</tbody>										
										</v-sample-table>
									</v-card-text>
								<v-card-actions class="justify-end">
									<v-btn text @click="dialog.value = false">Close</v-btn>
								</v-card-actions>
							</v-card>
						</template>
					</v-dialog>
				</template>   
            </v-col>
        </v-row>
        <h4 style="text-align:center;">{{storeData.description}} ที่อยู่: {{storeData.address}} โทร: {{storeData.tel}}</h4><br>
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
                    <tr v-for="(item, index) in showProduct" :key="index">
                        <td style="text-align: center">{{ item._id }}</td>
                        <td style="text-align: center">{{ item.name }}</td>
                        <td style="text-align: center">{{ item.description }}</td>            
                        <td style="text-align: center">{{ item.price }}</td>            
                        <td style="text-align: center">{{ item.unit }}</td>            
                        <td style="text-align: center">{{ item.category }}</td>
                        <td style="text-align: center">
                        
                        
                        
                            <v-btn depressed style="background-color: white" @click="deleteItem(item._id)">
							<v-icon style="color: red">mdi-delete</v-icon></v-btn>
                        
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>

<script>
import axios from "axios"
export default {
    name:"Shop",
    data () {
        return{
            storeId: this.$route.params.id,
            storeData: null,
            productList: [],
            storeProduct: [],
			productShow: []
        }
    },
    methods: {
		check: function(){
			console.log(this.productList)
		},
        getStoreData: function () {
            axios.get("http://localhost:3000/api/store/"+this.storeId).then((res) => {
                this.storeData = res.data.data;
                if (res.data.data.data!=""&&res.data.data.data!="N"){
					this.storeProduct = JSON.parse(res.data.data.data)  
				}
            });
			
        },
        getProductList: function () {
			axios.get("http://localhost:3000/api/product").then((res) => {
				this.productList = res.data.data;
			});
			
		},
		putProductToStore: function (id) {
			if (this.storeProduct[0]!=null){
				this.storeProduct.push({data:id})
			}
			else {this.storeProduct = [{data:id}]}
			console.log(this.storeProduct)
			axios.put("http://localhost:3000/api/store/data/"+this.storeId,{
				data:this.storeProduct
			}).then(res=>console.log(res.data.data)).catch(err=>console.log(err))
			
		},
		deleteItem: function (id){
			for (var i=0;i<this.storeProduct.length;i++){
				if (this.storeProduct[i].data==id){
					this.storeProduct.splice(i,1)
				}
			}
			axios.put("http://localhost:3000/api/store/data/"+this.storeId,{
				data:this.storeProduct
			}).then(res=>console.log(res.data.data)).catch(err=>console.log(err))
			
		}
    },
    mounted () {
        this.getStoreData();
        this.getProductList();
		
    },
	computed : {
		showProduct: function () {
			var temp = []
			for (var j= 0;j<this.storeProduct.length;j++){
				console.log(this.storeProduct[j])
				for (var i = 0; i<this.productList.length;i++){
					console.log(this.productList[i])
					if (this.storeProduct[j].data==this.productList[i]._id){
						temp.push(this.productList[i])
						
					}
				}
			}
			// console.log(this.storeProduct,"storeProduct")
			// console.log(this.productList,"productList")
			// console.log(this.productShow,"productShow")

			return temp
		}
	}

}
</script>

<style>

</style>