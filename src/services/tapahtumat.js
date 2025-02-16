import axios from 'axios'

const url = '/tapahtumat'

const muutaPaivaDateksi = t => {
  return { ...t, paiva: new Date(t.paiva) }
}

const haeTapahtumat = async () =>
  (await axios.get(url)).data.map(muutaPaivaDateksi)

const lisaaTapahtuma = async data =>
  muutaPaivaDateksi((await axios.post(url, data)).data)

const poistaTapahtuma = async id => {
  await axios.delete(`${url}/${id}`)
}

export default { haeTapahtumat, lisaaTapahtuma, poistaTapahtuma }
