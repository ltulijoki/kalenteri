import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getWeek } from '../../apu/Date'
import { etunollat } from '../../apu/Number'
import Uusi from '../Uusi'
import viikonpaivat from '../../apu/viikonpaivat'
import kuukaudet from '../../apu/kuukaudet'

const Paivakalenteri = ({
  uusiTapahtuma,
  setUusiTapahtuma,
  lisaaTapahtuma,
  tapahtumat,
}) => {
  const aika = useParams().aika
  const [vuosi, setVuosi] = useState(0)
  const [kuu, setKuu] = useState(-1)
  const [paiva, setPaiva] = useState(0)
  const [edel, setEdel] = useState('/kalenteri')
  const [seur, setSeur] = useState('/kalenteri')
  const [invalid, setInvalid] = useState(false)
  const [viikonpaiva, setViikonpaiva] = useState('')
  const [viikko, setViikko] = useState(0)

  useEffect(() => {
    if (!aika) return

    const osat = aika.split('+')
    setVuosi(Number(osat[0]))
    setKuu(Number(osat[1]))
    setPaiva(Number(osat[2]))

    setInvalid(
      Number(osat[1]) < 1 ||
        Number(osat[1]) > 12 ||
        Number(osat[2]) < 1 ||
        Number(osat[2]) > 31
    )

    const d = new Date(Number(osat[0]), Number(osat[1]) - 1, Number(osat[2]))
    setViikonpaiva(viikonpaivat[d.getDay() === 0 ? 7 : d.getDay()])

    var edelDate = new Date(
      new Date(Number(osat[0]), Number(osat[1]) - 1, Number(osat[2])) -
        new Date(1970, 0, 2)
    )
    setEdel(
      `/kalenteri/${edelDate.getFullYear()}+${
        edelDate.getMonth() + 1
      }+${edelDate.getDate()}`
    )

    var seurDate = new Date(
      new Date(Number(osat[0]), Number(osat[1]) - 1, Number(osat[2])) -
        new Date(1970, 0, 0)
    )
    setSeur(
      `/kalenteri/${seurDate.getFullYear()}+${
        seurDate.getMonth() + 1
      }+${seurDate.getDate()}`
    )

    setViikko(
      getWeek(new Date(Number(osat[0]), Number(osat[1]) - 1, Number(osat[2])))
    )
  }, [aika])

  const tapahtumatTanaan = tapahtumat.filter(
    t =>
      t.paiva.getMonth() + 1 === kuu &&
      t.paiva.getFullYear() === vuosi &&
      t.paiva.getDate() === paiva
  )

  if (kuu < 1) return null

  return (
    <div>
      {uusiTapahtuma && (
        <Uusi
          tyyli={{ float: 'right', width: '30%', border: 'solid 1px black' }}
          paiva={`${vuosi}-${etunollat(kuu, 2)}-${etunollat(paiva, 2)}`}
          lisaaTapahtuma={lisaaTapahtuma}
          setUusiTapahtuma={setUusiTapahtuma}
          pieni
        />
      )}
      <div style={{ maxWidth: '70%' }}>
        <h1 style={{ margin: 0 }}>
          {!uusiTapahtuma && (
            <button
              onClick={() => {
                setUusiTapahtuma(true)
              }}
              style={{ float: 'right' }}
            >
              Uusi tapahtuma
            </button>
          )}
          <Link to="/" style={{ float: 'right' }} className="linkki">
            Etusivulle
          </Link>
          <Link to={seur} style={{ float: 'right' }} className="linkki">
            &#8681;
          </Link>
          <Link to={edel} style={{ float: 'right' }} className="linkki">
            &#8679;
          </Link>
          <Link
            to={`/kalenteri/${new Date().getFullYear()}+${
              new Date().getMonth() + 1
            }+${new Date().getDate()}`}
            style={{ float: 'right' }}
            className="linkki"
          >
            Tänään
          </Link>
          <Link
            to={`/kalenteri/${vuosi}`}
            style={{ float: 'right' }}
            className="linkki"
          >
            Vuosi
          </Link>
          <Link
            to={`/kalenteri/${vuosi}+${kuu}`}
            style={{ float: 'right' }}
            className="linkki"
          >
            Kuukausi
          </Link>
          Kalenteri
        </h1>
        {invalid ? (
          'Virheellinen päivämäärä'
        ) : (
          <>
            {viikonpaiva} {paiva}. {kuukaudet[kuu].toLowerCase()}ta {vuosi}{' '}
            (viikko {viikko})
            {tapahtumatTanaan.length > 0 && (
              <>
                <h2>Tapahtumat</h2>
                <ul>
                  {tapahtumatTanaan.map(t => (
                    <li
                      key={t.otsikko}
                      style={{
                        color: t.vari,
                        fontSize: t.koko,
                        maxHeight: 500,
                        overflow: 'auto',
                      }}
                    >
                      <Link
                        to={`/tapahtuma/${t.id}`}
                        className="tlinkki"
                        style={{ color: t.vari }}
                      >
                        {t.alkaa}&#x2010;{t.loppuu} {t.otsikko}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Paivakalenteri
