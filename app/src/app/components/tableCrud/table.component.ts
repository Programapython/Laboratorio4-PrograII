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
    }
  
    resetForm(form: NgForm){
      if(form){
        form.reset()
      }
    }
  
    addPerson(form: NgForm){
      if(form.value._id){
         this.personService.patchPersons(form.value)
         .subscribe( res => {
            this.resetForm(form)
         })
      } else {
        this.personService.postPerson(form.value)
        .subscribe( res => {
          this.resetForm(form)
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
    }
    deletePerson(person: Person){
      if(confirm('Realmente desea borrar los datos?')){
        this.personService.deletePersons(person)
        .subscribe(res => {
        this.getPersons()
        })
        console.log("deleteando")
      }
    }
    openNew() {
        this.person = {};
        this.submitted = false;
        this.personDialog = true;
    }

    hideDialog() {
      this.personDialog = false;
      this.submitted = false;
  }
}





