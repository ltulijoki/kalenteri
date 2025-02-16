import React from 'react'
import { Link, useHistory } from 'react-router-dom'

const Uusi = ({ tyyli, paiva, lisaaTapahtuma, setUusiTapahtuma, pieni }) => {
  const history = useHistory()

  const onSubmit = event => {
    event.preventDefault()
    lisaaTapahtuma({
      otsikko: event.target.otsikko.value,
      paiva: event.target.paiva.valueAsDate,
      alkaa: event.target.alkaa.value,
      loppuu: event.target.loppuu.value,
      lisaa: event.target.lisaa.value,
      vari: event.target.vari.value,
      koko: event.target.koko.value,
    })
    history.push('/kalenteri')
  }

  return (
    <div style={tyyli}>
      {pieni && (
        <>
          <button
            className="linkki"
            onClick={() => setUusiTapahtuma(false)}
            style={{ float: 'right' }}
          >
            &times;
          </button>
          <Link to="/uusi" className="linkki" style={{ float: 'right' }}>
            <img src="/kuvat/Suurenna25.png" />
          </Link>
        </>
      )}
      <h1 style={{ margin: 0 }}>Uusi tapahtuma</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="otsikko">Otsikko</label>
        <input type="text" name="otsikko" id="otsikko" required />
        <br />
        <label htmlFor="paiva">Paiva</label>
        <input
          type="date"
          name="paiva"
          id="paiva"
          defaultValue={paiva}
          required
        />
        <br />
        <label htmlFor="alkaa">Alkaa</label>
        <input
          type="time"
          name="alkaa"
          id="alkaa"
          defaultValue="00:00"
          required
        />
        <br />
        <label htmlFor="loppuu">Loppuu</label>
        <input
          type="time"
          name="loppuu"
          id="loppuu"
          defaultValue="23:59"
          required
        />
        <br />
        <label htmlFor="lisaa">Lisätietoja</label>
        <br />
        <textarea name="lisaa" id="lisaa" rows="10" cols="50"></textarea>
        <br />
        <label htmlFor="vari">Väri</label>
        <input
          type="color"
          name="vari"
          id="vari"
          defaultValue="#000000"
          required
        />
        <fieldset>
          <legend>Koko</legend>
          <input type="radio" name="koko" id="xxs" value="xx-small" />
          <label htmlFor="xxs" style={{ fontSize: 'xx-small' }}>
            Tosi tosi pieni
          </label>
          <br />
          <input type="radio" name="koko" id="xs" value="x-small" />
          <label htmlFor="xs" style={{ fontSize: 'x-small' }}>
            Tosi pieni
          </label>
          <br />
          <input type="radio" name="koko" id="s" value="small" />
          <label htmlFor="s" style={{ fontSize: 'small' }}>
            Pieni
          </label>
          <br />
          <input type="radio" name="koko" id="m" value="medium" checked />
          <label htmlFor="m" style={{ fontSize: 'medium' }}>
            Normaali
          </label>
          <br />
          <input type="radio" name="koko" id="l" value="large" />
          <label htmlFor="l" style={{ fontSize: 'large' }}>
            Iso
          </label>
          <br />
          <input type="radio" name="koko" id="xl" value="x-large" />
          <label htmlFor="xl" style={{ fontSize: 'x-large' }}>
            Tosi iso
          </label>
          <br />
          <input type="radio" name="koko" id="xxl" value="xx-large" />
          <label htmlFor="xxl" style={{ fontSize: 'xx-large' }}>
            Tosi tosi iso
          </label>
        </fieldset>
        <button type="submit">Tallenna</button>
      </form>
    </div>
  )
}

export default Uusi
