import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private menuService : MenuService;  
  
  public menus : Menu[] = [];

  public id : number;
  public title : string ;
  public price : number ;
  public weight : number ;
  public meat : number ;
  public about : string ;

  public editMode : boolean = false;

  constructor(menuService : MenuService) {
    this.menuService = menuService;
    
   }

  ngOnInit(): void {
    this.menuService.getAllMenu().subscribe((menuFromApi) =>{
      this.menus = menuFromApi;
      this.menus.sort((a, b) => a.price - b.price);
  })
}
public addMenu(){
  var newMenu : Menu = {
    id : this.id,
    title : this.title,
    price : this.price,
    weight : this.weight,
    meat : this.meat,
    about : this.about
  }
  this.menuService.addMenu(newMenu).subscribe((menuId) =>{
    newMenu.id = menuId;
    this.menus.push(newMenu);
  })
}
public updateMenu(menu: Menu): void {
  this.editMode = true;

  this.id = menu.id;
  this.title = menu.title;
  this.price = menu.price;
  this.weight = menu.weight;
  this.meat = menu.meat;
  this.about = menu.about;    
}

public sendUpdatedMenu (){
  var updatedMenu: Menu = {
    id: this.id,
    title : this.title,
    price : this.price,
    weight : this.weight,
    meat : this.meat,
    about : this.about,
  }
  this.menuService.updateMenu(updatedMenu).subscribe(() =>{
    for (let i = 0; i < this.menus.length; i++) {
      const emp = this.menus[i];
      if (emp.id == updatedMenu.id) {
        emp.title = updatedMenu.title;
        emp.price = updatedMenu.price;          
        emp.weight = updatedMenu.weight;          
        emp.meat = updatedMenu.meat;
        emp.about = updatedMenu.about;
        return;          
      }      
    }    
  })
  this.editMode = false;
}
public deleteMenu(id: number) : void {
  this.menuService.deleteMenu(id).subscribe(() =>{   
  this.menus = this.menus.filter(h => h.id !== id);
  })
}

}
