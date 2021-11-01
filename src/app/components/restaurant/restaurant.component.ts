import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { Restaurant } from 'src/app/models/restaurant';
import { MenuService } from 'src/app/services/menu.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  private restaurantService : RestaurantService;
  private menuService : MenuService;

  public restaurants : Restaurant[] = [];
  public menus : Menu[] = [];
  
  public id : number;
  public name : string;
  public customers : number;
  public employees : number;
  public menuId : number;

  public editMode : boolean = false;
  
  constructor(restaurantService : RestaurantService, menuService : MenuService) {
    this.restaurantService = restaurantService;
    this.menuService = menuService;
   }

  ngOnInit(): void {
    this.restaurantService.getAllRestaurants().subscribe((restaurantFromApi) =>{
      this.restaurants = restaurantFromApi;
      this.restaurants.sort((a, b) => a.name.localeCompare(b.name))
  })
    this.menuService.getAllMenu().subscribe((menuFromApi) =>{
      this.menus = menuFromApi;
    })
}
public addRestaurant(){
  var newRestaurant : Restaurant = {
    id : this.id,
    name : this.name,
    customers : this.customers,
    employees : this.employees,
    menuId : this.menuId
  }
  this.restaurantService.addRestaurant(newRestaurant).subscribe((restaurantId) =>{
    newRestaurant.id = restaurantId;
    this.restaurants.push(newRestaurant);    
  })
}
public deleteRestaurant(id: number) : void {
  this.restaurantService.deleteRestaurant(id).subscribe(() =>{   
  this.restaurants = this.restaurants.filter(h => h.id !== id);
  })
}
public updateRestaurant(restaurant: Restaurant): void {
  this.editMode = true;

  this.id = restaurant.id;
  this.name = restaurant.name;
  this.customers = restaurant.customers;
  this.employees = restaurant.employees;
  this.menuId = restaurant.menuId;
}

public sendUpdatedRestaurant (){
  var updatedRestaurant: Restaurant = {
    id: this.id,
    name : this.name,
    customers : this.customers,
    employees : this.employees,
    menuId : this.menuId,
  }
  this.restaurantService.updateRestaurant(updatedRestaurant).subscribe(() =>{
    // for (let i = 0; i < this.restaurants.length; i++) {
    //   const emp = this.restaurants[i];
    //   if (emp.id == updatedRestaurant.id) {
    //     emp.name = updatedRestaurant.name;
    //     emp.customers = updatedRestaurant.customers;          
    //     emp.employees = updatedRestaurant.employees;          
    //     emp.menuId = updatedRestaurant.menuId;
    //     return;          
    //   }      
    // } 
    (this.restaurants = this.restaurants.map((e) =>
    e.id !== updatedRestaurant.id ? e : updatedRestaurant
    )
    .sort((a, b) => a.name.localeCompare(b.name))
    )   
  })
  this.editMode = false;  
}

}
