import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from './../../restaurants/restaurants.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html',
  animations: [
     trigger ('reviewAppeared', [
       state('ready', style({opacity:1 })),
        transition('void => ready',[
            style({opacity:0 , transform: 'translateY(-30px)'}),
             animate('500ms 0s ease-in-out' )

        ])
      ])
  ]



  
})
export class ReviewsComponent implements OnInit {

  reviewState = 'ready'

  reviews: Observable<any>

  constructor(private restaurantsService: RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit() {

      this.reviews = this.restaurantsService.reviewsOfRestaurant(this.route.parent.snapshot.params['id'])
  }

}
