import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Uusi from '../Uusi'
import Kuukausikalenteri from './Kuukausi'

const Vuosikalenteri = ({
  uusiTapahtuma,
  setUusiTapahtuma,
  lisaaTapahtuma,
}) => {
  const aika = useParams().aika
  const [vuosi, setVuosi] = useState(0)
  const [edel, setEdel] = useState('/kalenteri')
  const [seur, setSeur] = useState('/kalenteri')

  useEffect(() => {
    if (!aika) return
    setVuosi(Number(aika))

    var edelDate = new Date(Number(aika), 1, 1)
    setEdel(`/kalenteri/${edelDate.getFullYear() - 1}`)

    var seurDate = new Date(Number(aika), 1, 1)
    setSeur(`/kalenteri/${seurDate.getFullYear() + 1}`)
  }, [aika])

  return (
    <div>
      {uusiTapahtuma && (
        <Uusi
          tyyli={{ float: 'right', width: '30%', border: 'solid 1px black' }}
          paiva={`${vuosi}-01-01`}
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
            to={`/kalenteri/${new Date().getFullYear()}`}
            style={{ float: 'right' }}
            className="linkki"
          >
            Tänään
          </Link>
          Kalenteri
        </h1>
        Vuosi {vuosi}
        <br />
        {[...Array(12).keys()].map(k => (
          <Link key={k} to={`/kalenteri/${vuosi}+${k + 1}`} className="tlinkki">
            <Kuukausikalenteri
              tapahtumat={[]}
              pieni
              aika={`${vuosi}+${k + 1}`}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Vuosikalenteri
