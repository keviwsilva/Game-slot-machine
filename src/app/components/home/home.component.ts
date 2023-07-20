import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from "../../service/service.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  saldo?: number;
  timeLogin?: string;
  usuarioLogado: any[] = []
  valorSelecionado: string = "0";

  constructor(private authService: AuthService, private router: Router,
    private toastr: ToastrService) {
  }
  
  ngOnInit(){
    this.getTime()
    this.getInfo()
    this.totalSaldo()
    this.saldo = this.totalSaldo() || 0;
  }


  setSaldo() {
    const valorSelecionado = parseFloat(this.valorSelecionado);
    if (this.saldo != null && this.usuarioLogado && this.usuarioLogado.length > 0) {
      this.saldo = valorSelecionado;
      localStorage.setItem(`saldo_${this.usuarioLogado[0].email}`, JSON.stringify(this.saldo));
      this.toastr.success('Saldo Atualizado Com Sucesso');
    } else {
      this.toastr.success('Usuário não autenticado ou saldo não definido');
    }
  }

  
  
  totalSaldo(){
    const saldoString = localStorage.getItem(`saldo_${this.usuarioLogado[0].email}`);
     return saldoString ? parseFloat(saldoString) : null;
  }

  getInfo(){
    const usuario = localStorage.getItem('usuarioLogado'); 
    this.usuarioLogado = usuario ? [JSON.parse(usuario)] : [];
  
  }

  getTime(){
    const time = localStorage.getItem('horarioLogin');
    this.timeLogin = time !== null ? time : undefined;
  }


  // game(){
  //   this.router.navigate(['/game'])
  // }
  game() {
    this.router.navigate(['/game'], { state: { usuarioLogado: this.usuarioLogado } });
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
