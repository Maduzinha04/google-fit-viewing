export interface DadosFit {
    data: Date;
    contagemMinutosMovimento: number;
    calorias: number; // kcal
    distancia: number; // metros
    pontosCardio: number;
    minutosCardio: number;
    frequenciaCardiacaMedia: number; // bpm
    frequenciaCardiacaMaxima: number; // bpm
    frequenciaCardiacaMinima: number; // bpm
    velocidadeMedia: number; // m/s
    velocidadeMaxima: number; // m/s
    velocidadeMinima: number; // m/s
    contagemPassos: number;
    pesoMedio: number; // kg
    pesoMaximo: number; // kg
    pesoMinimo: number; // kg
    duracaoBicicleta: number; // ms
    duracaoCaminhada: number; // ms
    duracaoCorrida: number; // ms
    duracaoOutra: number; // ms
}
