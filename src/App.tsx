import './App.css';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import bongoCat from './assets/bongo-cat-transparent.gif';
import { AES, enc } from 'crypto-js';
function App() {
  const { width, height } = useWindowSize();

  const query = new URLSearchParams(window.location.search);

  return (
    <>
      <div className='App'>
        <Confetti width={width} height={height} />
        <img
          width='100%'
          style={{
            maxWidth: '500px',
          }}
          src={bongoCat}
          className='App-logo'
          alt='logo'
        />
        <h1>
          <div
            // @danger
            dangerouslySetInnerHTML={{
              __html: decodeURIComponent(
                decryptWithAES(query.get('txt') || '')
              ),
            }}
          />

          <br />
        </h1>
        <h2>-A</h2>
      </div>
    </>
  );
}

const encryptWithAES = (text: string) => {
  const passphrase = 'kamukamu2';
  return AES.encrypt(text, passphrase).toString();
};

const decryptWithAES = (ciphertext: string) => {
  const passphrase = 'kamukamu2';
  const bytes = AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(enc.Utf8);
  return originalText;
};

export default App;
