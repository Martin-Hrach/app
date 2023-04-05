import R from 'ramda'
import { useState } from 'react'

function Twitch() {
  const [twitchData, setTwitchData] = useState(null)
  const [twitchError, setTwitchError] = useState(null)

  const getTwitchData = async () => {
    try {
      const response = await fetch('https://api.twitch.tv/helix/streams?user_login=monstercat')
      const data = await response.json()
      setTwitchData(data)
    } catch (error) {
      setTwitchError(error)
    }
  }

  const handleClick = () => {
    getTwitchData()
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        {twitchData && (
          <div>
            <img
              style={{ display: 'block', margin: '0 auto' }}
              src={R.path(['data', 0, 'thumbnail_url'], twitchData)}
              alt="Obrázek"
            />
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
              {R.path(['data', 0, 'title'], twitchData)}
            </p>
          </div>
        )}
        {twitchError && <p style={{ color: 'red' }}>Nastala chyba</p>}
      </div>
      <div>
        <button
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            color: 'black'
          }}
          onClick={() => {
            handleClick()
          }}
        >
          Zobrazit obrázek a text
        </button>
      </div>
    </div>
  )
}

export default Twitch
