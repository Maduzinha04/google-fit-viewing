import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DadosFit } from '../../interfaces/dados-fit.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-main',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, MatPaginatorModule, MatDividerModule],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {
  @Input() dadosFit!: DadosFit[];
  @Output() dadoSelecionado = new EventEmitter<DadosFit>();
  
  // Configurações de paginação
  pageSize = 6;
  pageIndex = 0;
  pageSizeOptions = [3, 6, 9, 12];
  
  get dadosPaginados(): DadosFit[] {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dadosFit?.slice(startIndex, endIndex) || [];
  }
  
  get totalItens(): number {
    return this.dadosFit?.length || 0;
  }
  
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  
  temMetricasSecundarias(dado: DadosFit): boolean {
    return dado.frequenciaCardiacaMedia > 0 || 
           dado.pesoMedio > 0 || 
           dado.velocidadeMedia > 0 || 
           this.temAtividades(dado);
  }
  
  temAtividades(dado: DadosFit): boolean {
    return dado.duracaoBicicleta > 0 || 
           dado.duracaoCaminhada > 0 || 
           dado.duracaoCorrida > 0 || 
           dado.duracaoOutra > 0;
  }
}
