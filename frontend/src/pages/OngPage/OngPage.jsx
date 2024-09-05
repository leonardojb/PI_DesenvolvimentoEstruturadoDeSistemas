/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebaseApp from "../../../firebase";
import FullSpin from "../../components/FullSpin";
import { Box, Heading, Image, Link, Text, IconButton } from "@chakra-ui/react";
import { useAuth } from "../../provider/AuthContext";
import Header from "../../components/Header";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export const OngPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { loading: loadingUser } = useAuth();
  const db = getFirestore(firebaseApp);
  const [ong, setOng] = useState(null);
  const [loading, setLoading] = useState(true);

  const docRef = doc(db, "ongs", params?.id);
  const getLocal = async () => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setOng(docSnap.data());
    } else {
      navigate("/home");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (params?.id) {
      getLocal();
    }
  }, [params]);

  if (loading && loadingUser) return <FullSpin />;

  return (
    <>
      <Header />
      <Box maxW="2xl" mx="auto" p={8}>
        <Heading as="h1" size="2xl" fontWeight="bold" mb={2}>
          {ong?.address}
        </Heading>
        <Heading
          as="h2"
          size="xl"
          fontWeight="semibold"
          color="gray.600"
          mb={4}
        >
          {ong?.name}
        </Heading>
        <Image
          src={ong?.img}
          alt={ong?.name}
          mb={6}
          w="full"
          h="auto"
          style={{ aspectRatio: "640/400", objectFit: "cover" }}
        />
        <Text mb={6}>{ong?.description}</Text>
        Site da instituicão:{" "}
        <Link href={ong?.site_url} isExternal>
          {ong?.site_url}
        </Link>
        <Box display="flex" flexDirection="row">
          {ong?.instagram_url && (
            <IconButton
              icon={<FaInstagram size={24} />}
              variant="ghost"
              onClick={() => window.open(ong?.instagram_url, "blank")}
            />
          )}
          {ong?.facebook_url && (
            <IconButton
              icon={<FaFacebook size={24} />}
              variant="ghost"
              onClick={() => window.open(ong?.facebook_url, "blank")}
            />
          )}
        </Box>
        <Box>
          <>
            Criado em{" "}
            {new Date(ong?.createdAt?.seconds * 1000)?.toLocaleDateString()}
          </>
          <Image
            src={ong?.logo}
            alt={ong?.name}
            boxSize="120px"
            objectFit="contain"
            borderRadius="full"
          />
        </Box>
      </Box>
      <Footer />
    </>
  );
};
