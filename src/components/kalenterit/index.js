import React from 'react'
import { useParams } from 'react-router-dom'
import Kuukausikalenteri from './Kuukausi'
import Paivakalenteri from './Paiva'
import Vuosikalenteri from './Vuosi'

const Kalenteri = ({
  uusiTapahtuma,
  setUusiTapahtuma,
  lisaaTapahtuma,
  tapahtumat,
}) => {
  const aika = useParams().aika
  if (!aika) return

  if (aika.split('+').length === 1)
    return (
      <Vuosikalenteri
        uusiTapahtuma={uusiTapahtuma}
        setUusiTapahtuma={setUusiTapahtuma}
        lisaaTapahtuma={lisaaTapahtuma}
      />
    )

  if (aika.split('+').length === 2)
    return (
      <Kuukausikalenteri
        uusiTapahtuma={uusiTapahtuma}
        setUusiTapahtuma={setUusiTapahtuma}
        lisaaTapahtuma={lisaaTapahtuma}
        tapahtumat={tapahtumat}
      />
    )

  if (aika.split('+').length === 3)
    return (
      <Paivakalenteri
        uusiTapahtuma={uusiTapahtuma}
        setUusiTapahtuma={setUusiTapahtuma}
        lisaaTapahtuma={lisaaTapahtuma}
        tapahtumat={tapahtumat}
      />
    )
}

export default Kalenteri
