import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  private restaurantService : RestaurantService;

  public restaurants : Restaurant[] = [];
  public menus : Menu[] = [];
  
  public id : number;
  public name : string;
  public customers : number;
  public employees : number;
  public menuId : number;

  public editMode : boolean = false;
  
  constructor(restaurantService : RestaurantService) {
    this.restaurantService = restaurantService;
   }

  ngOnInit(): void {
    this.restaurantService.getAllRestaurants().subscribe((restaurantFromApi) =>{
      this.restaurants = restaurantFromApi;
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

}
