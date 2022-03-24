import React, { useEffect } from "react";
import Home from "views/Home";

import { useAuth } from "contexts/AuthContext";

function App() {

  const { setCurrentAccount, setCurrentNetwork, 
    currentNetwork, setContractAddr
  } = useAuth()

  useEffect(() => {

    const initialCheck = async() => {
      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setCurrentNetwork(parseInt(chainId, 16))
        /*if(currentNetwork===56 || currentNetwork===97) {
          fetch('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=BNB', {
            method: "GET",
            headers: {"X-CMC_PRO_API_KEY": "b9919fde-7b81-4b55-87ef-39bf5a6742ed"}
          })
          .then(response => response.json()) 
          .then(json => console.log(json)); 
        } else if(currentNetwork===128) {
          fetch('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=HT', {
            method: "GET",
            headers: {"X-CMC_PRO_API_KEY": "b9919fde-7b81-4b55-87ef-39bf5a6742ed"}
          })
          .then(response => response.json()) 
          .then(json => console.log(json)); 
        }*/
        window.ethereum.on('accountsChanged', function (accounts) {
          // Time to reload your interface with accounts[0]!
          console.log(accounts[0])
          setCurrentAccount(accounts[0]);
          window.location.reload()
        })
        
        window.ethereum.on('chainChanged', function (chainId) {
          // Time to reload your interface with the new chainId
          setCurrentNetwork(parseInt(chainId, 16))
          /*if(currentNetwork===56 || currentNetwork===97) {
            fetch('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=BNB', {
              method: "GET",
              headers: {"X-CMC_PRO_API_KEY": "b9919fde-7b81-4b55-87ef-39bf5a6742ed"}
            })
            .then(response => response.json()) 
            .then(json => console.log(json)); 
          } else if(currentNetwork===128) {
            fetch('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=HT', {
              method: "GET",
              headers: {"X-CMC_PRO_API_KEY": "b9919fde-7b81-4b55-87ef-39bf5a6742ed"}
            })
            .then(response => response.json()) 
            .then(json => console.log(json)); 
          }*/
          window.location.reload()
        })
      } catch(err) {
        console.log(err)
      }
    }
    initialCheck();

  }, [setCurrentAccount, setCurrentNetwork, setContractAddr, currentNetwork]);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
