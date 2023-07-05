import { Component, OnInit } from '@angular/core';
import { Persona } from '../modelo/persona';
import { PersonaService } from '../service/persona.service';

@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.css']
})
export class ListausuariosComponent implements OnInit {

  persona: Persona[] = [];

  constructor(private PersonaService: PersonaService) {
  }

  ngOnInit(): void {
    this.PersonaService.getPersonas().subscribe(
      personas => this.persona = personas
    );
  }

}
