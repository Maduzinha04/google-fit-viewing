import { Injectable } from '@angular/core';
import { DadosFit } from '../interfaces/dados-fit.interface';

@Injectable({
  providedIn: 'root'
})
export class CsvReaderService {

  lerCSV(arquivo: File): Promise<DadosFit[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const csv = e.target?.result as string;
          console.log('Arquivo lido com sucesso, tamanho:', csv.length);
          const dadosFit = this.processarCSV(csv);
          resolve(dadosFit);
        } catch (error) {
          console.error('Erro ao processar CSV:', error);
          reject(error);
        }
      };
      
      reader.onerror = () => {
        console.error('Erro ao ler arquivo');
        reject(new Error('Erro ao ler o arquivo'));
      };
      
    
      reader.readAsText(arquivo, 'UTF-8');
    });
  }

  private processarCSV(csv: string): DadosFit[] {
    
    
    const linhas = csv.split('\n');

    

    
    const dados: DadosFit[] = [];
    
    // Pula o cabeçalho (primeira linha)
    for (let i = 1; i < linhas.length; i++) {
      const linha = linhas[i].trim();
      if (linha) {
        // Tenta diferentes separadores: vírgula, ponto e vírgula, tab
        let colunas = linha.split(',');
        if (colunas.length < 20) {
          colunas = linha.split(';');
        }
        if (colunas.length < 20) {
          colunas = linha.split('\t');
        }
      
        if (colunas.length >= 20) {
          try {
            const dadoFit: DadosFit = {
              data: this.parseData(colunas[0]),
              contagemMinutosMovimento: this.parseNumero(colunas[1]),
              calorias: this.parseNumero(colunas[2]),
              distancia: this.parseNumero(colunas[3]),
              pontosCardio: this.parseNumero(colunas[4]),
              minutosCardio: this.parseNumero(colunas[5]),
              frequenciaCardiacaMedia: this.parseNumero(colunas[6]),
              frequenciaCardiacaMaxima: this.parseNumero(colunas[7]),
              frequenciaCardiacaMinima: this.parseNumero(colunas[8]),
              velocidadeMedia: this.parseNumero(colunas[9]),
              velocidadeMaxima: this.parseNumero(colunas[10]),
              velocidadeMinima: this.parseNumero(colunas[11]),
              contagemPassos: this.parseNumero(colunas[12]),
              pesoMedio: this.parseNumero(colunas[13]),
              pesoMaximo: this.parseNumero(colunas[14]),
              pesoMinimo: this.parseNumero(colunas[15]),
              duracaoBicicleta: this.parseNumero(colunas[16]),
              duracaoCaminhada: this.parseNumero(colunas[17]),
              duracaoCorrida: this.parseNumero(colunas[18]),
              duracaoOutra: this.parseNumero(colunas[19])
            };
            
            dados.push(dadoFit);
            console.log('Dado processado:', dadoFit);
          } catch (error) {
            console.error(`Erro ao processar linha ${i}:`, error, linha);
          }
        } else {
          console.warn(`Linha ${i} ignorada - apenas ${colunas.length} colunas:`, linha);
        }
      }
    }
    
    console.log('Total de dados processados:', dados.length);
    return dados;
  }

  private parseNumero(valor: string): number {
    const numero = parseFloat(valor.replace(',', '.'));
    return isNaN(numero) ? 0 : numero;
  }

  private parseData(valor: string): Date {

    const dataLimpa = valor.trim();
    
    if (dataLimpa.includes('/')) {
      const partes = dataLimpa.split('/');
      if (partes.length === 3) {
        const dia = parseInt(partes[0]);
        const mes = parseInt(partes[1]) - 1;
        const ano = parseInt(partes[2]);
        return new Date(ano, mes, dia);
      }
    }
    
    if (dataLimpa.includes('-')) {
      return new Date(dataLimpa + 'T00:00:00'); 
     }
  
    return new Date(dataLimpa);
  }
}
