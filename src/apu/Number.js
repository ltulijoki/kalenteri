export const luvunPituus = luku => luku.toString().length

export const etunollat = (luku, pituus) =>
  luvunPituus(luku) < pituus
    ? '0'.repeat(pituus - luvunPituus(luku)) + luku
    : luku
