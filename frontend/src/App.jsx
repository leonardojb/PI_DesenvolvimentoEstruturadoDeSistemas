import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase";
import FullSpin from "./components/FullSpin";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAuth } from "./provider/AuthContext";
import { useNavigate } from "react-router-dom";
import { OngCard } from "./components/OngCard";

function App() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const db = getFirestore(firebaseApp);
  const [todasOngs, setTodasOngs] = useState([]);
  const [ongsLoading, setOngsLoading] = useState(true);

  async function callMe() {
    const querySnapshot = await getDocs(collection(db, "ongs"));
    const ongs = [];
    querySnapshot.forEach((doc) => {
      ongs.push({ ...doc.data(), id: doc.id });
    });
    console.log(ongs);
    setTodasOngs(ongs);
    setOngsLoading(false);
  }

  const newLocal = () => {
    navigate("/new-ong");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    callMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && ongsLoading) {
    return <FullSpin />;
  }

  return (
    <>
      <Header actualPage="/home" />
      <Box mx="auto" p={8}>
        <Text fontSize="4xl" fontWeight="bold" mb={8}>
          ONGs
        </Text>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={8}
        >
          {todasOngs?.map((item) => (
            <OngCard key={item?.id} item={item} />
          ))}
        </Grid>
        <Box mt="8">
          {user && <Button onClick={newLocal}>Cadastrar local</Button>}
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default App;
