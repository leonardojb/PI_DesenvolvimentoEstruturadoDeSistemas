import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { collection, getDocs, getFirestore } from "firebase/firestore"
import firebaseApp from "../firebase"
import FullSpin from "./components/FullSpin"
import Header from "./components/Header"
import Footer from "./components/Footer"


function App() {
  const db = getFirestore(firebaseApp)
  const [todasOngs, setTodasOngs] = useState([])
  const [ongsLoading, setOngsLoading] = useState(true)

  async function callMe() {
    const querySnapshot = await getDocs(collection(db, "ongs"));
    const ongs = []
    querySnapshot.forEach((doc) => {
      ongs.push({ ...doc.data(), id: doc.id })
    });
    console.log(ongs)
    setTodasOngs(ongs)
    setOngsLoading(false)
  }

  useEffect(() => {
    callMe()
  }, [])

  if (ongsLoading) {
    return <FullSpin />
  }

  return (
    <>
      <Header actualPage="/home" />
      <Box mx="auto" p={8}>
        Home
      </Box>
      <Footer />
    </>
  )
}

export default App
