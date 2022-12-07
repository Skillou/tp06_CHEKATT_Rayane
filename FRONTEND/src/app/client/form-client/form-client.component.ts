import {Client} from '../../model/Client';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ClientService} from "../../Utils/Services/client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})

export class FormClientComponent implements OnInit {

  validate: boolean = false;
  civilities: string[] = ['M.', 'Mme.', 'Autres'];

  // client: Client = new Client();

  client: Client = new Client({
    civility: '',
    firstName: '',
    lastName: '',
    email: '',
    telphone: NaN,
    street: '',
    city: '',
    zipCode: NaN,
    login: '',
    password: ''
  });

  public clientForm: FormGroup = this.fb.group({
    civility: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telphone: ['', [Validators.required, Validators.pattern(/^((\+)33|0)[1-9](\d{2}){4}$/)]],
    street: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', [Validators.required, Validators.pattern(/(?:0[1-9]|[13-8][0-9]|2[ab1-9]|9[0-5])(?:[0-9]{3})?|9[78][1-9](?:[0-9]{2})?/)]],
    login: ['', [Validators.required, Validators.pattern('\\S{5}\\S*')]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private clientService: ClientService, private router: Router,) {
  }

  get civility() {
    return this.clientForm.get('civility');
  }

  get firstName() {
    return this.clientForm.get('firstName');
  }

  get lastName() {
    return this.clientForm.get('lastName');
  }

  get email() {
    return this.clientForm.get('email');
  }

  get telphone() {
    return this.clientForm.get('telphone');
  }

  get street() {
    return this.clientForm.get('street');
  }

  get city() {
    return this.clientForm.get('city');
  }

  get zipCode() {
    return this.clientForm.get('zipCode');
  }

  get login() {
    return this.clientForm.get('login');
  }

  get password() {
    return this.clientForm.get('password');
  }

  get confirmPassword() {
    return this.clientForm.get('confirmPassword');
  }

  ngOnInit(): void {
    this.clientForm.valueChanges.subscribe(form => {
      this.client.civility = form.civility ?? '';
      this.client.firstName = form.firstName ?? '';
      this.client.lastName = form.lastName ?? '';
      this.client.email = form.email ?? '';
      this.client.telphone = form.telphone ?? '';
      this.client.street = form.street ?? '';
      this.client.city = form.city ?? '';
      this.client.zipCode = form.zipCode ?? '';
      this.client.login = form.login ?? '';
      this.client.password = form.password ?? '';
    })
  }

  onSubmit(): void {
    this.validate = true;
    if (this.clientForm.valid) {
      
      this.clientService.client = this.client;
      this.router.navigate(['/client/result']);
    } 
    else {
      console.log("Error : ", this.clientForm);
    }
  }
}