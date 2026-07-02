export const classes = [
  {
    id: "c1",
    name: "Clasa I",
    worlds: [
      {
        id: "mat",
        name: "Insula Numerelor",
        subject: "Matematică",
        description: "Învață prin exemple, jocuri și exerciții simple.",
        lessons: [
          {
            id: "adunarea-pana-la-10",
            title: "Adunarea până la 10",
            duration: "5 min",
            level: "Ușor",
            goal: "Copilul înțelege că adunarea înseamnă să punem lucruri împreună.",
            videoScript: "Ai 3 mere și primești încă 2. Le punem împreună și le numărăm: 1, 2, 3, 4, 5. Deci 3 + 2 = 5.",
            explanation: [
              "Adunarea înseamnă să punem la un loc două sau mai multe cantități.",
              "Folosim semnul +, care se citește „plus”.",
              "Rezultatul adunării ne spune câte lucruri avem în total."
            ],
            example: "Ai 4 cuburi și primești încă 1 cub. Acum ai 5 cuburi. 4 + 1 = 5.",
            quiz: [
              { question: "2 + 3 = ?", options: ["4", "5", "6"], answer: "5" },
              { question: "1 + 4 = ?", options: ["3", "5", "6"], answer: "5" },
              { question: "5 + 2 = ?", options: ["7", "8", "9"], answer: "7" }
            ],
            printable: [
              "1 + 2 = ___",
              "3 + 4 = ___",
              "5 + 1 = ___",
              "2 + 6 = ___",
              "4 + 4 = ___"
            ],
            parentTip: "Folosește obiecte reale: mere, creioane, cuburi. Copilul înțelege mai ușor când vede și atinge."
          },
          {
            id: "ce-este-scaderea",
            title: "Ce este scăderea?",
            duration: "5 min",
            level: "Ușor",
            goal: "Copilul înțelege că scăderea înseamnă să luăm o parte dintr-un întreg.",
            videoScript: "Ai 5 baloane. Două zboară. Numărăm câte au rămas: 1, 2, 3. Deci 5 - 2 = 3.",
            explanation: [
              "Scăderea înseamnă să luăm o parte dintr-un număr.",
              "Folosim semnul -, care se citește „minus”.",
              "Rezultatul ne arată câte lucruri au rămas."
            ],
            example: "Ai 6 bomboane și mănânci 2. Îți rămân 4 bomboane. 6 - 2 = 4.",
            quiz: [
              { question: "5 - 2 = ?", options: ["2", "3", "4"], answer: "3" },
              { question: "4 - 1 = ?", options: ["2", "3", "4"], answer: "3" },
              { question: "7 - 3 = ?", options: ["4", "5", "6"], answer: "4" }
            ],
            printable: [
              "5 - 1 = ___",
              "6 - 2 = ___",
              "8 - 3 = ___",
              "9 - 4 = ___",
              "10 - 5 = ___"
            ],
            parentTip: "Pune 5 obiecte pe masă, ascunde 2 și întreabă copilul câte au rămas."
          }
        ]
      },
      {
        id: "rom",
        name: "Castelul Cuvintelor",
        subject: "Limba română",
        description: "Sunete, litere, cuvinte și propoziții.",
        lessons: [
          {
            id: "sunetul-litera-a",
            title: "Sunetul și litera A",
            duration: "4 min",
            level: "Ușor",
            goal: "Copilul recunoaște sunetul A și litera A în cuvinte simple.",
            videoScript: "Astăzi ascultăm sunetul A. Îl auzim în cuvinte precum: albină, avion, apă.",
            explanation: [
              "Litera A poate fi mare: A.",
              "Litera a poate fi mică: a.",
              "Sunetul A se aude în multe cuvinte: apă, ac, arici."
            ],
            example: "Cuvântul „avion” începe cu sunetul A.",
            quiz: [
              { question: "Care cuvânt începe cu A?", options: ["avion", "mere", "soare"], answer: "avion" },
              { question: "Care este litera mare?", options: ["a", "A", "m"], answer: "A" }
            ],
            printable: [
              "Încercuiește litera A: A M A S A",
              "Scrie litera A de 5 ori.",
              "Spune 3 cuvinte care încep cu A."
            ],
            parentTip: "Caută împreună cu copilul obiecte din casă care încep cu sunetul A."
          }
        ]
      }
    ]
  }
];

export const logicActivities = [
  {
    id: "gaseste-intrusul",
    title: "Găsește intrusul",
    description: "Care nu se potrivește: măr, pară, mașină, banană?",
    answer: "mașină"
  }
];

export const curiosities = [
  {
    id: "caracatita",
    title: "Știai că o caracatiță are trei inimi?",
    text: "Două inimi trimit sângele spre branhii, iar una îl trimite în restul corpului."
  }
];
