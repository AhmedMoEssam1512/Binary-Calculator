import Card from './card.jsx'
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'Binary Calculator';
  }, []);
  return(
  <>
      <Card/>
  </>
  );  
}
export default App