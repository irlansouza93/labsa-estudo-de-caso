/*
  ARQUIVO DE CONFIGURAÇÃO DO ESTUDO DE CASO CLÍNICO
  Centraliza os dados do caso clínico, empresa e registros de acompanhamento.
*/
window.LABSA_CASE = {
  company: {
    name: "LABSA Soluções em Diagnóstico",
    shortName: "LABSA",
    city: "Manaus, AM",
    category: "Distribuidora de Artigos Hospitalares e Diagnósticos",
    mapsUrl: "https://maps.app.goo.gl/WGduTvrcb6qpPFig6",
    whatsappUrl: "https://wa.me/5592999999999", // Ajustar para o contato real do comercial, se disponível
    instagramUrl: "https://www.instagram.com/labsadiagnosticos/"
  },
  caseStudy: {
    title: "Estudo de Caso Clínico: Tratamento de Lesão Traumática em Militar da Ativa",
    product: "UrgoClean Ag",
    intervalDays: 3,
    totalDays: 9,
    records: [
      {
        day: 0,
        label: "Admissão e Avaliação Inicial",
        date: "Dia 0",
        image: "assets/case/registro-01.webp",
        focal: "50% 52%",
        note: "Paciente masculino, 32 anos, militar da ativa, vítima de acidente de motocicleta. Apresenta ferimento traumático infectado em membro inferior com acúmulo de esfacelo úmido e exsudato abundante. Conduta terapêutica ainda não iniciada."
      },
      {
        day: 3,
        label: "Terapia Inicial com Hidrogel",
        date: "Dia 3",
        image: "assets/case/registro-02.webp",
        focal: "50% 42%",
        note: "Ferida mantida sob tratamento exclusivo com hidrogel por três dias. Observa-se estagnação do processo de cicatrização, persistência de tecido desvitalizado (esfacelo) e controle insatisfatório da carga bacteriana local."
      },
      {
        day: 6,
        label: "Introdução de UrgoClean Ag",
        date: "Dia 6",
        image: "assets/case/registro-03.webp",
        focal: "50% 43%",
        note: "Revisão da conduta com introdução da cobertura UrgoClean Ag (tecnologia poliabsorvente de desbridamento e ação antimicrobiana de prata). Nota-se rápida resposta clínica: controle efetivo da infecção, desbridamento do esfacelo e início de cicatrização ativa."
      },
      {
        day: 9,
        label: "Evolução e Granulação",
        date: "Dia 9",
        image: "assets/case/registro-04.webp",
        focal: "50% 46%",
        note: "Após o uso contínuo de UrgoClean Ag, observa-se excelente evolução clínica. O leito da lesão apresenta-se limpo, livre de esfacelos e com tecido de granulação saudável em franca expansão. Redução expressiva da área da lesão."
      }
    ]
  }
};
