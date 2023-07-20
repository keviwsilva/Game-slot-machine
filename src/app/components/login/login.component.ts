import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormsModule, Validators } from "@angular/forms";
import { Conta } from "../../conta";
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from "../../service/service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  @ViewChild('signUp') signUpButton!: ElementRef;
  @ViewChild('signIn') signInButton!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  
  formulario: any;
  contas: Conta[] = [];
  email!: string;
  senha!: string;
  form:boolean = true;


  constructor(
    private router: Router,
    private toastr: ToastrService,
    private service: AuthService,

   ) {}

  
  ngOnInit(): void {

  this.formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    telefone: new FormControl('', [Validators.required, Validators.minLength(9)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });


  
  const contasStorage = localStorage.getItem('conta');
  if (contasStorage) {
    this.contas = JSON.parse(contasStorage);
  }

  this.signUpButton.nativeElement.addEventListener('click', () => {
    this.container.nativeElement.classList.add('right-panel-active');
  });

  this.signInButton.nativeElement.addEventListener('click', () => {
    this.container.nativeElement.classList.remove('right-panel-active');
  });
  }


  CadastrarConta(): void{

  if (this.formulario.valid) {
    const email = this.formulario.value.email;
    const contasStorage = localStorage.getItem('contas');
    const contas: any[] = contasStorage ? JSON.parse(contasStorage) : [];
    const contaEncontrada = contas.find((conta) => conta.email === email);

    if (!contaEncontrada) {
      // this.formulario.value.contaId = Guid.create().toString();
      const conta = this.formulario.value;
      contas.push(conta);
      localStorage.setItem('contas', JSON.stringify(contas));
      this.formulario.reset();
      this.toastr.success('Conta cadastrada com sucesso');
    } else {
      this.toastr.warning('Conta já cadastrada anteriormente');
    }
  }
}

  onSubmit() {

    
    if (this.service.login(this.email, this.senha)) {
      const dataLogin = new Date();
      localStorage.setItem('horarioLogin', dataLogin.toISOString());


      const contasStorage = localStorage.getItem('contas');
      if (contasStorage) {
        const contas: any[] = JSON.parse(contasStorage);
        const contaEncontrada = contas.find((conta) => conta.email === this.email);
        if (contaEncontrada) {
          localStorage.setItem('usuarioLogado', JSON.stringify(contaEncontrada));
        }
      }

       this.router.navigate(['/home']);
      
    }
    else {
      
      this.toastr.warning("senha e/ou email incorreta ")
    }
  }


  formshow(){
    if(this.form == false){
      this.form = true
    }
    else{
      this.form = false
    }
  }

}
