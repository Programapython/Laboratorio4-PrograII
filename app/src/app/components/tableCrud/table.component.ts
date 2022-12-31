import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';

@Component({
    selector:'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
    providers: [MessageService,ConfirmationService]
})
export class TableComponent implements OnInit {

    person: Person = new Person();
    
    persons: Person[] = [];

    selectedPerson: Person = new Person();

    submitted?: boolean;

    personDialog?: boolean;


    constructor(private personService: PersonService, 
        private messageService: MessageService, 
        private confirmationService: ConfirmationService
    ) { }
  
    ngOnInit(): void {
      this.getPersons()
      this.clean()
    }

    destroy(){
      this.selectedPerson={}
      this.personDialog=false
      this.getPersons()
    }
  
    addPerson(form: Person){
      if(form._id){
        this.personService.patchPersons(form)
        .subscribe( res => {
          this.destroy()
        })
      } else {
        this.personService.postPerson(form)
        .subscribe( res => {
          this.destroy()
        })
      }
    }
  
    getPersons(){
      this.personService.getPersons()
      .subscribe( res => {
        this.persons = res as Person[]
      })
    }
  
    editPerson(person: Person){
      this.selectedPerson = person
      console.log("editando")
      this.submitted = false;
      this.personDialog = true;
    }

    deletePerson(person: Person){
      if(confirm('Realmente desea borrar los datos?')){
        this.personService.deletePersons(person)
        .subscribe( res => {
          this.destroy()
        })
      }
    }
    openNew() {
      this.selectedPerson={}
      this.submitted = false;
      this.personDialog = true;
    }

    hideDialog() {
      this.personDialog = false;
      this.submitted = false;
      this.selectedPerson={}
    }
    
    savePerson(){
      this.submitted = true;
      this.personDialog = true;
    }
    
    clean(){
      if (this.personDialog == false){
        this.submitted = false
      }
    }

    
}






