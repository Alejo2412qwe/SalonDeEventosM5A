import { Component, OnInit } from '@angular/core';
import { SalonService } from '../service/salon.service';
import { Salon } from '../modelo/salon';

@Component({
  selector: 'app-listasalones',
  templateUrl: './listasalones.component.html',
  styleUrls: ['./listasalones.component.css']
})
export class ListasalonesComponent implements OnInit {


  salon: Salon[] = [];

  constructor(private SalonService: SalonService) {
  }

  ngOnInit(): void {
    this.SalonService.getSalon().subscribe(
      salon => this.salon = salon
    );

  }
}
