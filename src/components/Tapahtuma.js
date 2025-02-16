import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import kuukaudet from '../apu/kuukaudet'

const Tapahtuma = ({ tapahtuma, poistaTapahtuma }) => {
  const history = useHistory()

  const poista = () => {
    if (
      confirm(
        `Oletko aivan varma, että haluat poistaa tapahtuman ${tapahtuma.otsikko}?`
      )
    ) {
      poistaTapahtuma(tapahtuma.id)
      history.push('/kalenteri')
    }
  }
  return (
    <div>
      <Link
        to={`/kalenteri/${tapahtuma.paiva.getFullYear()}+${
          tapahtuma.paiva.getMonth() + 1
        }+${tapahtuma.paiva.getDate()}`}
        className="linkki"
      >
        Päivä
      </Link>
      <Link
        to={`/kalenteri/${tapahtuma.paiva.getFullYear()}+${
          tapahtuma.paiva.getMonth() + 1
        }`}
        className="linkki"
      >
        Kuukausi
      </Link>
      <Link
        to={`/kalenteri/${tapahtuma.paiva.getFullYear()}`}
        className="linkki"
      >
        Vuosi
      </Link>
      {tapahtuma.otsikko.length + tapahtuma.lisaa.length > 500 && (
        <p>
          Poistonappi löytyy{' '}
          <a href="#poisto" style={{ color: 'black' }}>
            alhaalta
          </a>
        </p>
      )}
      <h1 style={{ color: tapahtuma.vari }}>{tapahtuma.otsikko}</h1>
      <p style={{ color: tapahtuma.vari }}>
        {tapahtuma.paiva.getDate()}.{' '}
        {kuukaudet[tapahtuma.paiva.getMonth() + 1].toLowerCase()}ta{' '}
        {tapahtuma.paiva.getFullYear()} klo {tapahtuma.alkaa}&#x2010;
        {tapahtuma.loppuu}
        <p style={{ whiteSpace: 'pre-wrap' }}>{tapahtuma.lisaa}</p>
        <button onClick={poista} id="poisto">
          Poista
        </button>
      </p>
    </div>
  )
}

export default Tapahtuma
