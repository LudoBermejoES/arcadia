// Data for Reformatorio Nueva Esperanza organizational chart
export const reformatorioData = {
  director: {
    id: 'el-senor-nadie',
    name: 'EL SEÑOR NADIE',
    role: 'Director del Reformatorio',
    power: 'Anulación Total de Poderes',
    age: '53 años',
    color: 'red',
    x: 650,
    y: 200
  },

  staff: [
    {
      id: 'marcus-coach',
      name: 'MARCUS "EL COACH"',
      role: 'Supervisor Educación Física',
      note: 'Promete combates',
      color: 'blue',
      x: 100,
      y: 480
    },
    {
      id: 'ana-flores',
      name: 'ANA FLORES',
      role: 'Seguridad',
      color: 'blue',
      x: 100,
      y: 600
    },
    {
      id: 'victor-crofblob',
      name: 'VÍCTOR CROFBLOB',
      role: 'Profesor/Médico (50 años)',
      note: 'Barra electrificada\nEsposas anuladoras',
      color: 'blue',
      x: 100,
      y: 720
    },
    {
      id: 'daniel-quon',
      name: 'DANIEL QUON',
      role: 'Profesor',
      color: 'blue',
      x: 100,
      y: 860
    },
    {
      id: 'elena-frutas',
      name: 'ELENA "FRUTAS DEL BOSQUE"',
      role: 'Psicóloga',
      note: '⭐ Clave para libertad',
      color: 'violet',
      x: 100,
      y: 960
    }
  ],

  protagonistas: [
    {
      id: 'sergei',
      name: '🦎 SERGEI',
      player: 'PJ',
      power: 'Metamorfo veterano',
      details: '16-17 años\nEn reformatorio desde 12-13 años\nBromista, líder social',
      color: 'green',
      x: 500,
      y: 480
    },
    {
      id: 'tiritas',
      name: '💪 TIRITAS',
      player: 'Júlia Gasull',
      power: 'Absorbe energía cinética',
      details: '2 años en reformatorio\nMató padre en defensa propia\nCicatrices, traumatizado',
      color: 'green',
      x: 500,
      y: 650
    },
    {
      id: 'kira',
      name: '⚡ KIRA',
      player: 'Adriana F. Gonzalez',
      power: 'Manipuladora eléctrica',
      details: '13-14 años (la más joven)\nRecién llegada\nDejó compañero en coma',
      color: 'green',
      x: 500,
      y: 820
    }
  ],

  internos: [
    {
      id: 'tomas',
      name: '😠 TOMÁS VARGAS',
      note: 'Conflictivo\nTemperamental',
      color: 'orange',
      x: 900,
      y: 480
    },
    {
      id: 'yuki',
      name: '❄️ YUKI TANAKA',
      note: 'Manipula hielo\nBromista',
      color: 'light-blue',
      x: 900,
      y: 580
    },
    {
      id: 'al',
      name: '🌑 AL RASHID',
      note: 'Manipula oscuridad',
      color: 'black',
      x: 900,
      y: 680
    },
    {
      id: 'zara',
      name: '⚙️ ZARA',
      note: 'Niña pequeña\nPoderes con cacharros\nSe ducha con Kira',
      color: 'yellow',
      x: 900,
      y: 780
    },
    {
      id: 'lea',
      name: '🪞 LÉA DUBOIS-NGUYEN',
      note: '14-15 años\nSe transforma al asustarse\nSiempre con espejo\nEvita relacionarse',
      color: 'violet',
      x: 900,
      y: 900
    },
    {
      id: 'jein',
      name: '👻 JEIN PARK',
      note: 'Desaparece en oscuridad\nNo le gusta ducharse\nMolesto por agua\n(posiblemente autista)',
      color: 'grey',
      x: 1150,
      y: 480
    }
  ],

  desaparecidos: [
    {
      id: 'amara',
      name: '💔 AMARA OSEI-BAPTISTE',
      note: 'Empática\nPercibe/envía emociones\nCausaba discordia\n⚠️ DESAPARECIDA',
      color: 'red',
      x: 1400,
      y: 480
    },
    {
      id: 'dimitri',
      name: '👤 DIMITRI VOLKOV-RAMÍREZ',
      note: 'Interno\n⚠️ DESAPARECIDO',
      color: 'red',
      x: 1400,
      y: 620
    }
  ],

  relationships: [
    { from: 'el-senor-nadie', to: 'marcus-coach', label: 'Dirige', color: 'blue' },
    { from: 'el-senor-nadie', to: 'sergei', label: 'Supervisa', color: 'red' },
    { from: 'sergei', to: 'tiritas', label: 'Mejores amigos\n(competición macarrones)', color: 'green', bidirectional: true },
    { from: 'sergei', to: 'kira', label: 'Mentor\n(oreja reptante)', color: 'green', dashed: true },
    { from: 'kira', to: 'zara', label: 'Se duchan juntas', color: 'yellow' },
    { from: 'victor-crofblob', to: 'sergei', label: 'Negociación\n(doble ración)', color: 'blue', dashed: true }
  ]
}
