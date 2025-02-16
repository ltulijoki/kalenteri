import React from 'react'
import { Link } from 'react-router-dom'

const Etusivu = () => {
  return (
    <div>
      <Link to="/kalenteri" className="linkki">
        Avaa kalenteri
      </Link>
    </div>
  )
}

export default Etusivu
