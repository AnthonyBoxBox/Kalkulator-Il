const liczby = document.querySelectorAll('.liczba') // Zbieramy wszystkie elementy z klasą 'liczba'
const operatory = document.querySelectorAll('.operator') // Zbieramy wszystkie elementy z klasą 'operator'
const wyczysc = document.querySelector('.wyczysc') // Znajdujemy element z klasą 'wyczysc'
const usun = document.querySelector('.usun') // Znajdujemy element z klasą 'usun'
const rownosc = document.querySelector('.rownosc') // Znajdujemy element z klasą 'rownosc'
const wynikPoprzednie = document.querySelector('.poprzednie-dzialanie') // Znajdujemy element z klasą 'poprzednie-dzialanie'
const wynikAktualne = document.querySelector('.aktualne-dzialanie') // Znajdujemy element z klasą 'aktualne-dzialanie'

let aktualneDzialanie = '' // Zmienna przechowująca aktualne wprowadzone działanie
let operacja = undefined // Zmienna przechowująca aktualnie wybraną operację
let poprzednieDzialanie = '' // Zmienna przechowująca poprzednie wprowadzone działanie

const oblicz = () => {
  let dzialanie
  
  if (!poprzednieDzialanie || !aktualneDzialanie) {
    return
  }

  const poprzednieliczba = parseFloat(poprzednieDzialanie) // Konwertujemy poprzednie działanie na liczbę zmiennoprzecinkową
  const aktualneliczba = parseFloat(aktualneDzialanie) // Konwertujemy aktualne działanie na liczbę zmiennoprzecinkową

  if (isNaN(poprzednieliczba) || isNaN(aktualneliczba)) {
    return
  }

  switch (operacja) {
    case '+':
      dzialanie = poprzednieliczba + aktualneliczba
      break
      case '-':
        dzialanie = poprzednieliczba - aktualneliczba
      break
      case '×':
        dzialanie = poprzednieliczba * aktualneliczba
      break
      case '÷':
      if (aktualneliczba === 0)
      {
        wyczyscWynik()
        return
      }
        dzialanie = poprzednieliczba / aktualneliczba
      break
      case '^':
        dzialanie = Math.pow(poprzednieliczba, aktualneliczba)
      break
      case '%':
        dzialanie = poprzednieliczba / 100 * aktualneliczba
      break
      case '√':
        dzialanie = Math.pow(poprzednieliczba, 1 / aktualneliczba)
      break
      case 'log':
        dzialanie = Math.log(poprzednieliczba) / Math.log(aktualneliczba)
      break
    default:
      return
  }
  aktualneDzialanie = dzialanie
  operacja = undefined
  poprzednieDzialanie = ''

}

const wybierzOperacje = (operator) => {
  if (aktualneDzialanie === '') {
    return
  }
  if (poprzednieDzialanie !== '') {
    const poprzednie = wynikPoprzednie.innerText
    if (aktualneDzialanie.toString() === '0' &&  poprzednie[poprzednie.length - 1] === '÷') {
      wyczyscWynik()
      return
    }
    oblicz()
  }

  operacja = operator
  poprzednieDzialanie = aktualneDzialanie
  aktualneDzialanie = ''
}

const dodajLiczbe = (liczba) => {
  if (liczba === '•') {
    if (aktualneDzialanie.includes('.')) {
      return
    }
    liczba = '.'
  }

  aktualneDzialanie = aktualneDzialanie.toString() + liczba.toString()
}

const usunLiczbe = () => {
  aktualneDzialanie = aktualneDzialanie.toString().slice(0, -1)
}

const zaktualizujWynik = () => {
  wynikAktualne.innerText = aktualneDzialanie

  if (operacja != null) {
  wynikPoprzednie.innerText = poprzednieDzialanie + operacja
  } else {
    wynikPoprzednie.innerText = ''
  }
}

const wyczyscWynik = () => {
  aktualneDzialanie = ''
  operacja = undefined
  poprzednieDzialanie = ''
}

liczby.forEach((liczba) => {
  liczba.addEventListener('click', () => {
    dodajLiczbe(liczba.innerText)
    zaktualizujWynik()
  })
})

operatory.forEach((operator) => {
  operator.addEventListener('click', () => {
    wybierzOperacje(operator.innerText)
    zaktualizujWynik()
  })
})

rownosc.addEventListener('click', () => {
  oblicz()
  zaktualizujWynik()
})

usun.addEventListener('click', () => {
  usunLiczbe()
  zaktualizujWynik()
})

wyczysc.addEventListener('click', () => {
  wyczyscWynik()
  zaktualizujWynik()
})
