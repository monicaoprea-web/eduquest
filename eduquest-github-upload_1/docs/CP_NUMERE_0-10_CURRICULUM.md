# Plan de curriculum — Clasa pregătitoare, Matematică
## Capitolul „Numerele naturale de la 0 la 10”

Acest document e planul de curriculum, nu conținut de lecție — nu e
afișat copilului. Înlocuiește versiunea anterioară
(`CP_NUMERE_0-5_CURRICULUM.md`), care acoperea doar 0-5.

## Structura completă

```
1.  Numărul și cifra 1
2.  Numărul și cifra 2
3.  Numărul și cifra 3
4.  Numărul și cifra 0        ← implementată (EQ-CP-MAT-N0)
5.  Numărul și cifra 4
6.  Numărul și cifra 5
7.  Numărul și cifra 6
8.  Numărul și cifra 7
9.  Numărul și cifra 8
10. Numărul și cifra 9
11. Numărul 10

    (mai târziu)
12. Ordonarea numerelor naturale de la 0 la 10
13. Compararea mulțimilor prin punere în corespondență
14. Compararea numerelor de la 0 la 10
```

Observă că 0 e predată a **patra**, nu prima — după ce copilul are deja
un simț concret al cantității (1, 2, 3), abia atunci i se introduce
absența ei. Nu schimbați această ordine fără un motiv pedagogic clar.

`EQ-CP-MAT-R01` ("Recapitulare — Numerele 0-5") **nu** face parte din
această listă numerotată. Rămâne disponibilă ca lecție opțională/
intermediară — utilă pentru consolidare, dar nu ca introducere a vreunui
număr. Nu are `lessonNumber`/`totalLessons`, tocmai ca să nu pretindă o
poziție fixă în secvență.

## Convenția de ID

```
EQ-CP-MAT-N0   Numărul și cifra 0   (implementată)
EQ-CP-MAT-N1   Numărul și cifra 1
EQ-CP-MAT-N2   Numărul și cifra 2
EQ-CP-MAT-N3   Numărul și cifra 3
EQ-CP-MAT-N4   Numărul și cifra 4
EQ-CP-MAT-N5   Numărul și cifra 5
EQ-CP-MAT-N6   Numărul și cifra 6
EQ-CP-MAT-N7   Numărul și cifra 7
EQ-CP-MAT-N8   Numărul și cifra 8
EQ-CP-MAT-N9   Numărul și cifra 9
EQ-CP-MAT-N10  Numărul 10
EQ-CP-MAT-O10  Ordonarea 0-10
EQ-CP-MAT-C1   Compararea mulțimilor prin punere în corespondență
EQ-CP-MAT-C2   Compararea numerelor de la 0 la 10
```

Toate: `classId: "cp"`, `subjectId: "matematica"`, `chapterId: "numere"`.
Ordinea de afișare e controlată automat de câmpul `lessonNumber` din
fiecare JSON (vezi `contentIndex.js` — sortare adăugată în acest
sprint), nu de numele fișierului sau ordinea de descoperire.

## Regula centrală: UN singur număr e vedeta lecției

O lecție „Numărul și cifra 5” trebuie să predea în principal 5. NU
alternează egal între 2, 4, 0, 3, 5. Celelalte numere apar doar ca:

- retrieval scurt (o atingere, nu o secțiune întreagă)
- distractori (ex. în `findGroup`, opțiuni greșite)
- comparații (`compareGroups`)
- exemple de sprijin

**BUN** (folosit deja în `EQ-CP-MAT-N0`): „Găsește grupul gol” — opțiunile
includ grupuri cu 1, 2, 3, 4 obiecte ca distractori, dar ținta rămâne
mereu 0.

**GREȘIT**: „Pune 2 mere. Pune 4 mere. Pune 5 mere. Pune 3 mere.” — asta
devine o lecție amestecată, nu una focalizată.

## Componente disponibile, deja narate și cu feedback vorbit

Fără cod nou necesar pentru următoarele lecții — totul se configurează
din JSON:

`discoverCount`, `buildQuantity`, `quantityToDigit`, `discoverZero`
(în special pentru N0), `findGroup`, `compareGroups`, `writeDigit`,
`numberWorksheet` (fișa A4 — deocamdată doar cifra 0 are conținut
vizual; `character` diferit de "0" arată un mesaj „nu e încă
disponibilă” în loc să crape), `aroundYou`, `challengeSplit` (potrivit
mai ales pentru „Numărul și cifra 5”, compunere), `offlineActivity`,
`curiosity` (formă scurtă + „Pentru curioși”), `parentGuide` (formă
structurată), `summary`, `completionMessage`.

Toate secțiunile de tip întrebare (`CountObjects`, `FindGroup`,
`CompareGroups`, `MatchPairs`, `SortObjects`, quiz-ul din
`DiscoverZeroCard`) au acum feedback **vorbit**, nu doar scris, cu
scaffolding progresiv: prima greșeală → încurajare generică; a doua
greșeală (și următoarele) → indiciu specific, dacă lecția îl definește
(`hintText`/`hintAudio`), altfel continuă cu încurajări generice —
niciodată „Greșit”.

## Fișa de lucru (worksheet) — familia „Numărul și cifra X”

`Worksheet0.jsx` e implementarea de referință. Structura standard (A-G:
cifră mare de trasat, cantitate, trasare ghidată, scriere independentă,
găsește grupul țintă, potrivire cifră-cantitate, mini-provocare) e
documentată complet în specificația sprintului „CP Numbers 0–10
Foundation”. Pentru fiecare cifră nouă (1-9), construiți un fișier
`WorksheetN.jsx` care reutilizează `WorksheetPage`/`WorksheetSection`,
adaptând doar conținutul ilustrat — nu structura paginii.

## Ce rămâne de făcut, sprint cu sprint

O singură lecție per sprint (poate două pentru cele mai simple: 1, 2).
Nu implementați mai multe deodată — riscul e conținut generic,
neverificat manual.
