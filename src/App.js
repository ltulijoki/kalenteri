import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import Uusi from './components/Uusi'
import Etusivu from './components/Etusivu'
import Tapahtuma from './components/Tapahtuma'
import Kalenteri from './components/kalenterit'
import tapahtumaService from './services/tapahtumat'

const App = () => {
  const [tapahtumat, setTapahtumat] = useState([])
  const [uusiTapahtuma, setUusiTapahtuma] = useState(false)

  const lisaaTapahtuma = async data => {
    setUusiTapahtuma(false)
    setTapahtumat(
      tapahtumat.concat(await tapahtumaService.lisaaTapahtuma(data))
    )
  }

  const poistaTapahtuma = async id => {
    await tapahtumaService.poistaTapahtuma(id)
    setTapahtumat(tapahtumat.filter(t => t.id !== id))
  }

  useEffect(() => {
    tapahtumaService.haeTapahtumat().then(t => setTapahtumat(t))
  }, [])

  const tapahtumaMatch = useRouteMatch('/tapahtuma/:id')
  const tapahtuma = tapahtumaMatch
    ? tapahtumat.find(t => t.id === Number(tapahtumaMatch.params.id))
    : null

  return (
    <Switch>
      <Route path="/kalenteri/:aika">
        <Kalenteri
          uusiTapahtuma={uusiTapahtuma}
          setUusiTapahtuma={setUusiTapahtuma}
          lisaaTapahtuma={lisaaTapahtuma}
          tapahtumat={tapahtumat}
        />
      </Route>
      <Route path="/kalenteri">
        <Redirect
          to={`/kalenteri/${new Date().getFullYear()}+${
            new Date().getMonth() + 1
          }`}
        />
      </Route>
      <Route path="/uusi">
        <Uusi
          paiva={new Date().toISOString().split('T')[0]}
          lisaaTapahtuma={lisaaTapahtuma}
        />
      </Route>
      <Route path="/tapahtuma/:id">
        <Tapahtuma tapahtuma={tapahtuma} poistaTapahtuma={poistaTapahtuma} />
      </Route>
      <Route path="/">
        <Etusivu />
      </Route>
    </Switch>
  )
}

export default App
