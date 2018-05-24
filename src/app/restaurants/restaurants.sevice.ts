import { MenuItem } from './../restaurant-detail/menu-item/menu-item.model';
import { ErroHandler } from './../app.error-handler';
import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Restaurant } from './restaurant/restaurant.model';

import { MEAT_API } from '../app.api';

@Injectable()
export class RestaurantService{
    
    constructor(private http: Http){}

    restaurants(): Observable<Restaurant[]>  {
       return this.http.get(`${MEAT_API}/restaurants`)
        .map(response => response.json())
        .catch(ErroHandler.handError)
    }

    restaurantById(id: string): Observable<Restaurant>  {
        return this.http.get(`${MEAT_API}/restaurants/${id}`)
         .map(response => response.json())
         .catch(ErroHandler.handError)
     }

     reviewsOfRestaurant(id:string): Observable<any>{
         return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
            .map(response => response.json())
            .catch(ErroHandler.handError)
     }

     menuOfRestaurant(id:string): Observable<MenuItem[]>{
        return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
           .map(response => response.json())
           .catch(ErroHandler.handError)
    }
}