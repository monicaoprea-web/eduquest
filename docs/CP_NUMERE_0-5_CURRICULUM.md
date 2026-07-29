# Plan de curriculum — Clasa pregătitoare, Matematică, „Numere 0-5”

Acest document pregătește arhitectura pentru cele șase lecții focalizate
pe fiecare cifră (0-5), fără să le implementeze încă — sunt lucru de
sprint viitor. Nu reprezintă conținut de lecție și nu e afișat copilului.

## De ce există deja o lecție de recapitulare

`EQ-CP-MAT-R01` ("Recapitulare — Numerele 0-5") a fost, până la acest
sprint, singura lecție a capitolului (`EQ-CP-MAT-001`) și amesteca liber
cantitățile 0-5. A fost repoziționată ca recapitulare: bună pentru a
consolida ce s-a învățat deja, dar nepotrivită ca primă introducere,
pentru că sare rapid între cantități fără ca vreuna să fie ideea
centrală a momentului.

## Convenția de ID pentru lecțiile individuale

```
EQ-CP-MAT-N0   Numărul și cifra 0
EQ-CP-MAT-N1   Numărul și cifra 1
EQ-CP-MAT-N2   Numărul și cifra 2
EQ-CP-MAT-N3   Numărul și cifra 3
EQ-CP-MAT-N4   Numărul și cifra 4
EQ-CP-MAT-N5   Numărul și cifra 5
```

Toate rămân în `classId: "cp"`, `subjectId: "matematica"`,
`chapterId: "numere"` — același capitol ca recapitularea. Arhitectura
curentă (`ChapterPage` + `contentIndex.js`) afișează deja orice număr
de lecții dintr-un capitol, generat direct din fișierele JSON găsite —
nu e nevoie de nicio modificare de cod ca să apară aceste lecții de
îndată ce vor exista fișierele lor.

Ordinea recomandată în capitol: N0 → N1 → N2 → N3 → N4 → N5 → R01
(recapitularea vine ultima, ca sinteză). Câmpurile `lessonNumber` /
`totalLessons` din fiecare JSON controlează eticheta „Lecția X din Y”;
`EQ-CP-MAT-R01` a fost setată deja la `lessonNumber: 7` anticipând
această ordine.

## Regula centrală: UN singur număr e vedeta lecției

Fiecare lecție individuală trebuie să mențină un singur număr ca idee
centrală. Exemplu pentru „Numărul și cifra 5”:

**Central (majoritatea lecției):**
- recunoașterea cantității 5 (`discoverCount`)
- construirea cantității 5 (`buildQuantity`, o singură rundă cu
  `targetCount: 5`)
- asocierea cantitate ↔ cifra 5 (`quantityToDigit`, rundele arată doar
  spre 5 ca răspuns corect, nu un amestec de cantități)
- trasarea/scrierea cifrei 5 (`writeDigit` — deja construit, disponibil)
- recunoașterea grupurilor de 5 (`findGroup`, rundele au 5 ca țintă)
- compunerea simplă a lui 5 (`challengeSplit` — deja construit,
  disponibil, exact pentru acest scop)

**Secundar / recap ușor (atingeri scurte, NU alternanță egală):**
numerele 0-4 apar doar ca:
- distractori în `quantityToDigit`/`findGroup` (opțiuni greșite)
- comparații ocazionale (`compareGroups`, ex. „5 sau 3, care are mai
  multe?”)
- reamintiri foarte scurte, niciodată ca temă principală a unui card

**De evitat:** alternarea egală între 2, 4, 5, 0, 3 — asta transformă
lecția înapoi într-o recapitulare, nu o introducere focalizată.

## Componente deja disponibile pentru aceste lecții

Toate secțiunile necesare există deja în `sectionRegistry.jsx` și pot
fi populate direct din JSON, fără cod nou:

`discoverCount`, `buildQuantity`, `quantityToDigit`, `discoverZero`
(doar pentru N0), `findGroup`, `compareGroups`, `writeDigit`,
`aroundYou`, `challengeSplit`, `worksheets`, `offlineActivity`,
`curiosity` (formă scurtă + „Pentru curioși”), `parentGuide` (formă
structurată), `summary`, `completionMessage`.

Toate acceptă narație audio (vezi nota din `lessonSchema.js`) — orice
instrucțiune nouă scrisă pentru aceste lecții va fi citită automat
copilului, fără cod suplimentar.

## Ce rămâne de făcut, sprint cu sprint

Nu construim toate cele șase lecții deodată. Recomandare: câte o
lecție per sprint (sau două, pentru N0/N1 care sunt mai simple),
folosind acest document ca ghid de conținut.
