import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilitysService } from 'src/app/services/utilitys.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  estudentForm: FormGroup;
  adviseInfo: any = '';

  constructor(private fb: FormBuilder, private utilityService: UtilitysService, private router: Router){
    this.estudentForm = this.fb.group({
      cedula : new FormControl('', Validators.required),
      correo_electronico : new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {}

  submitForm(){
    if(this.estudentForm.valid){
      this.utilityService.sendLogin(this.estudentForm.value).subscribe((response: any) => {
        console.log('RESPONSE: ', response);
        if(response.token){
          localStorage.setItem('session', response.token);
          localStorage.setItem('usuario', response.nombre);
          this.adviseInfo = 'Sesión iniciada exitosamente';
          this.router.navigate(['/preguntas']);
        }
      }, (error: any) => {
        console.error(error);
        this.adviseInfo = error.error.message;
      });
    }else{
      console.error('Lo sentimos, el formulario esta incompleto');
      this.adviseInfo = 'Lo sentimos, el formulario esta incompleto';
    }
  }

  closeInfo(){
    this.adviseInfo = '';
  }

}
