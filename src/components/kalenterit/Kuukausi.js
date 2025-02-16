import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getWeek } from '../../apu/Date'
import { etunollat } from '../../apu/Number'
import kuukaudet from '../../apu/kuukaudet'
import Uusi from '../Uusi'

const Kuukausikalenteri = ({
  uusiTapahtuma,
  setUusiTapahtuma,
  lisaaTapahtuma,
  tapahtumat,
  pieni,
  aika: pAika,
}) => {
  const aika = pAika || useParams().aika
  const [paivat, setPaivat] = useState([])
  const [vuosi, setVuosi] = useState(0)
  const [kuu, setKuu] = useState(-1)
  const [edel, setEdel] = useState('/kalenteri')
  const [seur, setSeur] = useState('/kalenteri')
  const [invalid, setInvalid] = useState(false)

  useEffect(() => {
    if (!aika) return

    const osat = aika.split('+')
    setVuosi(Number(osat[0]))
    setKuu(Number(osat[1]))

    setInvalid(Number(osat[1]) < 1 || Number(osat[1]) > 12)

    const eka = new Date(Number(osat[0]) - 1, Number(osat[1]) - 1, 1)
    const ekaViikonpaiva = (eka.getDay() === 0 ? 7 : eka.getDay()) + 1
    const paivienMaara = new Date(Number(osat[0]), Number(osat[1]), 0).getDate()

    var edelDate = new Date(Number(osat[0]), Number(osat[1]) - 2, 1)
    setEdel(
      `/kalenteri/${
        edelDate.getMonth() + 1 === 0
          ? edelDate.getFullYear() - 1
          : edelDate.getFullYear()
      }+${edelDate.getMonth() + 1 === 0 ? 12 : edelDate.getMonth() + 1}`
    )

    var seurDate = new Date(Number(osat[0]), Number(osat[1]), 1)
    setSeur(
      `/kalenteri/${
        seurDate.getMonth() + 1 === 13
          ? seurDate.getFullYear() + 1
          : seurDate.getFullYear()
      }+${seurDate.getMonth() + 1 === 13 ? 1 : seurDate.getMonth() + 1}`
    )

    var i = 0

    const uudetPaivat = []
    for (var v = 0; v < 6; v++) {
      var viikko = []
      var onPaivia = false
      for (var p = 0; p < 7; p++) {
        console.log(ekaViikonpaiva, p)
        if (v === 0 && ekaViikonpaiva > p) viikko.push('')
        else {
          if (i === paivienMaara) viikko.push('')
          else {
            onPaivia = true
            i++
            viikko.push(i)
          }
        }
      }
      if (onPaivia) uudetPaivat.push(viikko)
    }
    setPaivat(uudetPaivat)
  }, [aika])

  const tapahtumatTassaKuussa = tapahtumat.filter(
    t => t.paiva.getMonth() + 1 === kuu && t.paiva.getFullYear() === vuosi
  )

  return (
    <div style={{ display: pieni ? 'inline-block' : 'block' }}>
      {uusiTapahtuma && !pieni && (
        <Uusi
          tyyli={{ float: 'right', width: '30%', border: 'solid 1px black' }}
          paiva={`${vuosi}-${etunollat(kuu, 2)}-01`}
          lisaaTapahtuma={lisaaTapahtuma}
          setUusiTapahtuma={setUusiTapahtuma}
          pieni
        />
      )}
      <div style={{ maxWidth: '70%' }}>
        {!pieni && (
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
              }`}
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
            Kalenteri
          </h1>
        )}
        {invalid ? (
          'Virheellinen päivämäärä'
        ) : (
          <>
            {kuukaudet[kuu]} {!pieni && vuosi}
            <table className={pieni ? 'pieni' : ''}>
              <tbody>
                <tr>
                  {[
                    'Viikko',
                    'Maanantai',
                    'Tiistai',
                    'Keskiviikko',
                    'Torstai',
                    'Perjantai',
                    'Lauantai',
                    'Sunnuntai',
                  ].map(t => (
                    <td key={t}>{pieni ? t.charAt(0) : t}</td>
                  ))}
                </tr>
                {paivat.map(viikko => (
                  <tr key={viikko}>
                    <td>
                      {getWeek(
                        new Date(
                          vuosi,
                          kuu - 1,
                          viikko[0] === '' ? viikko[6] : viikko[0]
                        )
                      )}
                    </td>
                    {viikko.map(paiva => (
                      <td key={paiva}>
                        <Link
                          className="paiva tlinkki"
                          to={`/kalenteri/${vuosi}+${kuu}+${paiva}`}
                        >
                          {paiva}
                        </Link>
                        {!pieni && (
                          <ul>
                            {tapahtumatTassaKuussa
                              .filter(t => t.paiva.getDate() === paiva)
                              .map(t => (
                                <li
                                  key={t.otsikko}
                                  style={{ color: t.vari, fontSize: t.koko }}
                                >
                                  <Link
                                    to={`/tapahtuma/${t.id}`}
                                    className="tlinkki"
                                    style={{ color: t.vari }}
                                  >
                                    {t.otsikko}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  )
}

export default Kuukausikalenteri
