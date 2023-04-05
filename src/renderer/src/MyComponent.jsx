import { useState } from 'react'
import * as R from 'ramda'
const { ipcRenderer } = window.electron

function MyComponent() {
  const [imagePath, setImagePath] = useState('')
  const [text, setText] = useState('')

  // Funkce pro získání cesty k obrázku z API a nastavení stavu imagePath
  async function getImage() {
    const response = await fetch('https://randomuser.me/api/')
    const data = await response.json()
    const pickedData = R.head(data.results)
    const { name, picture } = pickedData

    setImagePath(picture)
    setText(name)

    console.log(data.results)
    console.log(picture)
  }

  const handleClick = () => {
    ipcRenderer.send('notification', 'Zpráva pro hlavní proces') // Odeslání zprávy po kliknutí na tlačítko
    console.log('Zpráva odeslána')
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        {imagePath.large && (
          <img style={{ display: 'block', margin: '0 auto' }} src={imagePath.large} alt="Obrázek" />
        )}
        {text && (
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {text.first} {text.last}
          </p>
        )}
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
            getImage()
            handleClick()
          }}
        >
          Zobrazit obrázek a text
        </button>
      </div>
    </div>
  )
}

export default MyComponent
