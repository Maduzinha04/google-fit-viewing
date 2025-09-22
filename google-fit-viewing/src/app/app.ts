import { Component } from '@angular/core';
import { Main } from './components/main/main';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DadosFit } from './interfaces/dados-fit.interface';
import { CsvReaderService } from './service/csv-reader.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Main, 
    CommonModule, 
    MatButton, 
    MatFormField, 
    MatLabel, 
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule, 
    FormsModule,
    MatIconModule,
    NgxChartsModule,
    MatDialogModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = "Bem-vindo ao PhysioCare";
  dadosFit: DadosFit[] = [];
  dataInicial: Date | null = null;
  dataFinal: Date | null = null;

  constructor(private csvReaderService: CsvReaderService, private dialog: MatDialog) {}


  async importarDados() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    
    input.onchange = async (event) => {
      const arquivo = (event.target as HTMLInputElement).files?.[0];
      if (arquivo) {
        try {
          this.dadosFit = await this.csvReaderService.lerCSV(arquivo);
          console.log('Dados importados:', this.dadosFit);
        } catch (error) {
          console.error('Erro ao importar dados:', error);
        }
      }
    };
    
    input.click();
  }

  filtrarDadosPorPeriodo(dataInicial: Date, dataFinal: Date): DadosFit[] {
    return this.dadosFit.filter(dado => 
      dado.data >= dataInicial && dado.data <= dataFinal
    );
  }

  get dadosFiltrados(): DadosFit[] {
    if (!this.dataInicial || !this.dataFinal) {
      return this.dadosFit;
    }
    return this.filtrarDadosPorPeriodo(this.dataInicial, this.dataFinal);
  }

  onRangeChange() {
    if (this.dataInicial && this.dataFinal) {
      console.log('Período selecionado:', this.dataInicial, 'até', this.dataFinal);
      console.log('Dados filtrados:', this.dadosFiltrados.length, 'registros');
    }
  }

  // Dados para gráficos
  get caloriasPorDia() {
    return [{
      name: "Calorias",
      series: this.dadosFiltrados.map(dado => ({
        name: dado.data,
        value: dado.calorias || 0
      }))
    }];
  }

  get passosPorDia() {
    return this.dadosFiltrados.map(dado => ({
      name: dado.data.toLocaleDateString('pt-BR'),
      value: dado.contagemPassos || 0
    }));
  }

  get pesoPorDia() {
    return [{
      name: "Peso",
      series: this.dadosFiltrados
        .filter(dado => dado.pesoMedio > 0)
        .map(dado => ({
          name: dado.data,
          value: dado.pesoMedio
        }))
    }];
  }

  get distribuicaoAtividades() {
    const totais = this.dadosFiltrados.reduce((acc, dado) => {
      acc.bicicleta += dado.duracaoBicicleta / 60000; // ms para minutos
      acc.caminhada += dado.duracaoCaminhada / 60000;
      acc.corrida += dado.duracaoCorrida / 60000;
      acc.outras += dado.duracaoOutra / 60000;
      return acc;
    }, { bicicleta: 0, caminhada: 0, corrida: 0, outras: 0 });

    return [
      { name: 'Bicicleta', value: Math.round(totais.bicicleta) },
      { name: 'Caminhada', value: Math.round(totais.caminhada) },
      { name: 'Corrida', value: Math.round(totais.corrida) },
      { name: 'Outras', value: Math.round(totais.outras) }
    ].filter(item => item.value > 0);
  }

  get distanciaPorDia() {
    return [{
      name: "Distância",
      series: this.dadosFiltrados
        .filter(dado => dado.distancia > 0)
        .map(dado => ({
          name: dado.data,
          value: Math.round(dado.distancia / 1000 * 100) / 100 // metros para km
        }))
    }];
  }

  // Configurações dos gráficos
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  animations = true;

  colorScheme = {
    name: 'fitness',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FF8C00', '#FF1493']
  };

  onDataInicialChange(event: any) {
    console.log('Data Inicial selecionada:', event);
  }

  onDataFinalChange(event: any) {
    console.log('Data Final selecionada:', event);
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
