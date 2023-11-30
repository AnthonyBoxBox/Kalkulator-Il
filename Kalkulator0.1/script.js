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

  const poprzednie = parseFloat(poprzednieDzialanie) // Konwertujemy poprzednie działanie na liczbę zmiennoprzecinkową
  const aktualne = parseFloat(aktualneDzialanie) // Konwertujemy aktualne działanie na liczbę zmiennoprzecinkową

  if (isNaN(poprzednie) || isNaN(aktualne)) {
    return
  }

  switch (operacja) {
    case '+':
      dzialanie = poprzednieliczba + aktualne
      break
      case '-':
        dzialanie = poprzednie - aktualne
      break
      case '×':
        dzialanie = poprzednie * aktualne
      break
      case '÷':
      if (aktualne === 0)
      {
        wyczyscWynik()
        return
      }
        dzialanie = poprzednie / aktualne
      break
      case '^':
        dzialanie = Math.pow(poprzednie, aktualne)
      break
      case '%':
        dzialanie = poprzednie / 100 * aktualne
      break
      case '√':
        dzialanie = Math.pow(poprzednie, 1 / aktualne)
      break
      case 'log':
        dzialanie = Math.log(poprzednie) / Math.log(aktualne)
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
