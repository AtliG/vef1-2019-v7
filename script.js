/**
 * Verkefni 7 – Gisk leikur
 *
 * Leikur sem snýst um að giska á tölu milli 0 og 100
 */


/**
 * Global fylki sem geymir fjölda ágiskana í leikjum
 * Ef fylki er tómt hefur enginn leikur verið spilaður.
 * Ef fylki er [2, 3] hafa verið spilaðir tveir leikir þar sem:
 *  - Fyrsti leikur kláraðist í tveim ágiskunum.
 *  - Seinni leikur kláraðist í þrem ágiskunum.
 */

const games = [];


/**
 * Byrjar leikinn okkar með því að kalla í play().
 * Eftir að play() klárar þá er boðið notandanum að spila annann leik með confirm()
 * Ef notandi ýtir á "ok" þá er annar leikur spilaður.
 * Ef notandi ýtir á "cancel" þá er sótt niðurstöður með getResults() og þær birtar með alert().
 */
function start() {
  if (play()) {
    while (confirm("Viltu spila aftur?")) {
      if(!play()){
        break;
      }
    }
  }
  getResults();
}

/**
 * Spilar einn leik. Sér um að:
 *  - Velja tölu af handahófi í byrjun með randomNumber()
 *  - Biðja notanda um tölu með prompt()
 *  - Vinna úr intaki frá notanda með parseGuess()
 *  - Láta vita hversu nálægt eða rétt gisk er með getResponse() og alert()
 *  - Haldautan um fjölda ágiskana
 *  - Vista fjölda ágiskana í "games" fylki þegar búið er að giska rétt
 * 
 * Ef notandi ýtir á cancel þegar beðið er um ágiskun skal hætta í leik en ekki vista ágiskanir
 *  - t.d. með því að nota break í lykkju.
 * 
 * Þarf aðútfæra með lykkju og flæðisstýringum
 */
function play() {
  const random = randomNumber(1, 100);
  console.log(random);
  let numOfGuess = 0;
  while (input = prompt("Veldu tölu á bilinu 1-100", '')) {
    let guess = parseGuess(input);
    alert(getResponse(guess, random));
    numOfGuess++;
    if (getResponse(guess, random) === "Rétt") {
      games.push(numOfGuess);
      return true;
    }
  }
  if (input === null) {
    alert('Hætt í leik');
    return false;
  }
}

/**
 * Skilar niðurstöðum um spilaða leiki sem streng.
 * Fjöldi liekja er skilað ásamt meðalfjölda giska, t.d.:
 *    "þú spilaðir 10 leiki
 *     Meðalfjöldi ágiskana var 5"
 * ATH að meðalfjöldi kemur í nýrri línu.
 * Ef enginn leikur var spilaður er skilað:
 *    "Þú spilaðir engann leik >_<"
 */
function getResults() {
  if (games.length > 0) {
    if (games.length === 1) {
      alert('Þú spilaðir ' + games.length + ' leik.' +
        "\n" + 'Meðalfjödli ágiskana var ' + calculateAverage() + '.');
    } else {
      alert('Þú spilaðir ' + games.length + ' leiki.' +
        "\n" + 'Meðalfjödli ágiskana var ' + calculateAverage() + '.');
    }
  }
  else {
    alert('Þú spilaðir engan leik >_<.')
  }
}

/**
 * Reiknar út og skilar meðal ágiskunum í öllum leikjum sem geymdir eru í 
 * global breytu "games". Skilar gildi með tveim aukastöfum.
 * Ef games = [3,3,4] er niðurstaðan (3+3+4)/3 = 3.66666667
 * og henni skilað sem 3.67
 * 
 * þarf að útfæra með lykkju.
 */
function calculateAverage() {
  let guesses = 0;
  for (let i = 0; i < games.length; i++) {
    guesses += games[i];
  }
  return (guesses / games.length).toFixed(2);
}

/**
 * tekur in input sem streng og skilar þeirri tölu sem hægt er að ná þar úr.
 * Ef ekki er hægt að ná tölu úr input er skilað null
 */
function parseGuess(input) {
  return parseInt(input);
}

/**
 * Skilar svari sem birta á notanda sem streng, tekur inn tvær breytur
 *  - guess sem tölu, ágiskun notanda
 *  - correct sem tölu, rétt gildi
 * Ef guess er < 0 eða ekki tala skal skila strengnum "Ekki rétt"
 * Ef guess er nákvæmlega sama og correct skal skila strengnum "Rétt"
 * Ef munur er undir 5 (|correct - guess| < 5) skal skila "Mjög nálægt"
 * Ef munur er undir 10 skal skila "Nálægt"
 * Ef munur er undir 20 skal skila "Frekar langt frá"
 * Ef munur er undir 50 skal skila "Langt frá"
 * Annars skal skila "Mjög langt frá"
 * 
 * Þarf að útfæra með flæðistýringu.
 * Math.abs skilar algildi tölu: |a| = Math.abs(a)
 */
function getResponse(guess, correct) {
  distance = Math.abs(correct - guess);

  if (distance < 0 || isNaN(distance)) {
    return 'Ekki rétt';
  }

  if (distance === 0) {
    return 'Rétt';
  }
  if (distance < 5) {
    return 'Mjög nálægt';
  } else if (distance < 10) {
    return 'Nálægt';
  } else if (distance < 20) {
    return 'Frekar langt frá';
  } else if (distance < 50) {
    return 'Langt frá';
  }

  return 'Mjög langt frá';
}

/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Byrjar leik
start();
