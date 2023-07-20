import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from "../../service/service.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  matriz!: number[][];
  somaHorizontal: number[] = [];
  somaDiagonal: number[] = [];
  saldo!: any;
  numApostas: number = 0;


  apostaForm!: FormGroup;
  usuarioLogado: any[] = []
  animationClass!: string;
  
  
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router, 
    private activatedRoute: ActivatedRoute) {
      this.apostaForm = this.formBuilder.group({
           valorAposta: ['0.50', [Validators.required, Validators.min(1)]]
      });
  }
  
  ngOnInit() {
    this.info();
    this.saldo = this.getSaldoFromLocalStorage() || 100;
    this.generateRandomMatrix(); 
  } 

  info(){
    const usuario = localStorage.getItem('usuarioLogado'); 
    this.usuarioLogado = usuario ? [JSON.parse(usuario)] : [];
    console.log(this.usuarioLogado[0].email)
  }

  generateRandomMatrix() {
    //declare the values from the bets
    const possibleValues = [0.6, 1.0, 1.6, 2.0, 5.0, 20.0, 50.0, 0.6, 1.0, 1.6, 2.0, 5.0, 20.0, 0.6, 1.0, 1.6, 0.6, 20.0, 1.0, 2.0, 5.0, 20.0, 0.6, 1.0, 1.6, 2.0, 0.6, 1.0, 20.0, 1.6, 2.0, 5.0, 20.0];
    
    //insert the value in each place from the matriz
    this.matriz = [
      [this.getRandomValue(possibleValues), this.getRandomValue(possibleValues), this.getRandomValue(possibleValues)],
      [this.getRandomValue(possibleValues), this.getRandomValue(possibleValues), this.getRandomValue(possibleValues)],
      [this.getRandomValue(possibleValues), this.getRandomValue(possibleValues), this.getRandomValue(possibleValues)]
    ];
    
    if (this.numApostas > 1 && this.numApostas % 15 === 0 && this.numApostas !== 1 && this.numApostas !== 0) {
      const possibleValues = [0.6, 1.0, 1.6, 5.0, 20.0, 50.0, 0.6, 1.0, 1.6,0.6, 1.0, 1.6,0.6, 1.0, 1.6,0.6, 1.0, 1.6,0.6, 1.0, 1.6,0.6, 1.0, 1.6,0.6, 1.0, 1.6,0.6, 1.0, 1.6, 5.0,0.6, 1.0, 1.6, 5.0,0.6, 1.0, 1.6, 20.0,20.0,5.0,0.6, 1.0, 1.6, 5.0,0.6, 1.0, 1.6,0.6, 1.0, 1.6, 5.0,0.6, 1.0, 1.6];
      const randomValue = this.getRandomValue(possibleValues);
  
      this.preencherMatriz(randomValue);
    }
  }

  preencherMatriz(valor: number) {
    for (let i = 0; i < this.matriz.length; i++) {
      for (let j = 0; j < this.matriz[i].length; j++) {

        this.matriz[i][j] = valor;
      }
    }
  }

  calcularSomaHorizontal(): number {

    let somaHorizontal = 0;
    //get the value from each row to see if has a sequence of the same value and return the value of it to make the calculation 
    for (const linha of this.matriz) {
      if(this.isSequenciacomCoringa(linha)){
        somaHorizontal += linha[linha.findIndex(valor => valor !== 50.0)];
      }
      else if(new Set(linha).size === 1) {
        //just get the value of the first 
        somaHorizontal += linha[0];
      }
    }

    return somaHorizontal;
  }

  calcularSomaDiagonal(): number {
    //this is used to find the value from the first diagonal that is matriz[0][0], matriz[1][1], matriz[2][2]
    const diagonalPrincipal = this.matriz.map((linha, index) => linha[index]);
    let somaDiagonal = 0
    if(this.isSequenciacomCoringa(diagonalPrincipal)){
      somaDiagonal += diagonalPrincipal[diagonalPrincipal.findIndex(valor => valor !== 50.0)];
    }
    else if (new Set(diagonalPrincipal).size === 1) {
      somaDiagonal += diagonalPrincipal[0];
    }

  //this is used to find the value from the second diagonal that is matriz[2][0], matriz[1][1], matriz[0][2]
    const diagonalSecundaria = this.matriz.map((linha, index) => linha[2 - index]);
    if(this.isSequenciacomCoringa(diagonalSecundaria)){
      somaDiagonal += diagonalSecundaria[diagonalSecundaria.findIndex(valor => valor !== 50.0)];
    }
    else if (new Set(diagonalSecundaria).size === 1) {
      somaDiagonal += diagonalSecundaria[0];
    }
    // console.log(somaDiagonal);
    return somaDiagonal;

  }


// this is used to ramdom the values to put it in the matriz
  private getRandomValue(possibleValues: number[]): number {
    const randomIndex = Math.floor(Math.random() * possibleValues.length);
    return possibleValues[randomIndex];
  }


  //here we get the value from the bet, so minus the value first and then return a new value if it was a new value
  fazerAposta() {

    this.generateRandomMatrix()
    const valorAposta = this.apostaForm.get('valorAposta')?.value;

    //here see if the bet is valid, if the number is higher than 0 or the value is higher than the balance
    if (valorAposta <= 0 || valorAposta > this.saldo) {
      console.log('Aposta inválida! Verifique o valor da aposta e o saldo disponível.');
      return;
    }

    let resultadoAposta = 0;

    // Aqui, você pode implementar a lógica para calcular o resultado da aposta com base nas somas
    let somaHorizontal = this.calcularSomaHorizontal();
    let somaDiagonal = this.calcularSomaDiagonal();
    // console.log(somaDiagonal, somaHorizontal)

    if (somaDiagonal > 0 && somaHorizontal > 0) {
      resultadoAposta = somaDiagonal + somaHorizontal;
    } else if (somaDiagonal > 0) {
      resultadoAposta = somaDiagonal;
    } else if (somaHorizontal > 0) {
      resultadoAposta = somaHorizontal;
    }

    



    this.numApostas++;

    // resultadoAposta *= valorAposta

    if(this.numApostas > 1 && (this.numApostas - 1) % 15 === 0 && this.numApostas !== 1){
      // resultadoAposta = valorAposta * resultadoAposta * 10
      resultadoAposta *= valorAposta * 10;
    }else{
      resultadoAposta *= valorAposta;
    }
    

    this.saldo -= valorAposta;
    this.saldo += resultadoAposta;

    console.log(this.numApostas)
    // Salva o saldo atualizado no localStorage
    this.saveSaldoToLocalStorage();

    console.log('Resultado da Aposta:', resultadoAposta);
    console.log('Novo Saldo:', this.saldo.toFixed(2));

    // Limpar o valor da aposta após fazer a aposta
    this.apostaForm.get('valorAposta')?.setValue(valorAposta);

  }


  // here get the balance to bet
  private getSaldoFromLocalStorage() {
    const saldoString = localStorage.getItem(`saldo_${this.usuarioLogado[0].email}`);
    // console.log(this.usuarioLogado[0]);
    return saldoString ? parseFloat(saldoString) : null;
  }


  private saveSaldoToLocalStorage() {
    localStorage.setItem(`saldo_${this.usuarioLogado[0].email}`, this.saldo.toString());
  }


  isSequenciacomCoringa(sequencia: number[]): boolean {
      const coringa = 50.0; // Define o valor do coringa aqui
    
      
      
  let valorNaoCoringa: number | undefined;

  
  if (sequencia.every(valor => valor === coringa)) {
    return false;
  }


  for (const valor of sequencia) {
    if (valor !== coringa) {
      if (valorNaoCoringa === undefined) {
        valorNaoCoringa = valor;
      } else if (valor !== valorNaoCoringa && valor !== sequencia[0]) {
        return false;
      }
    }
  }

      return true;
    }
    

    back(){
      this.router.navigate(['/home']);
    }
  


}


