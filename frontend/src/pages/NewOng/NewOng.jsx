/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useAuth } from "../../provider/AuthContext";
import firebaseApp from "../../../firebase";
import Footer from "../../components/Footer";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdImage, MdClose } from "react-icons/md";

const NewOng = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [loading, user]);

  const [formData, setFormData] = useState({
    name: "",
    cnpj: "",
    address: "",
    description: "",
    site_url: "",
    instagram_url: "",
    facebook_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleLogoChange = (e) => {
    if (e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const deleteImageChange = () => {
    setImage(null);
  };

  const deleteLogoChange = () => {
    setLogo(null);
  };

  console.log(logo, image);

  const verifyFields = () => {
    if (
      !formData?.name ||
      !formData?.cnpj ||
      !formData?.address ||
      !formData?.description ||
      [image, logo].length < 2
    )
      return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verifyFields())
      return alert("Preencha todos os campos do formulário!");
    const images = [image, logo];
    try {
      const storage = getStorage(firebaseApp);
      const uploadPromises = [];

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const storageRef = ref(storage, `ongs/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        // Adiciona a promessa de upload à lista
        const uploadPromise = new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });

        uploadPromises.push(uploadPromise);
      }

      const downloadURLs = await Promise.all(uploadPromises);

      const db = getFirestore(firebaseApp);
      const docRef = await addDoc(collection(db, "ongs"), {
        ...formData,
        img: downloadURLs[0],
        logo: downloadURLs[1],
        createdBy: user.uid,
        createdAt: new Date(),
      });

      alert("ONG criada com sucesso!");
      setTimeout(() => {
        navigate(`/ong/${docRef?.id}`);
      }, 1500);
    } catch (error) {
      console.error("Erro ao criar ong:", error);
    }
  };

  return (
    <>
      <Header actualPage="/new-local" />
      <Box maxW="xl" mx="auto" my={4} p={10} borderWidth={2} borderRadius={4}>
        <Text fontSize="4xl" fontWeight="bold" mb={8}>
          Cadastro do novo local!
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl id="name" mb={4}>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nome"
              required
            />
          </FormControl>
          <FormControl id="cnpj" mb={4}>
            <FormLabel>CNPJ</FormLabel>
            <Textarea
              name="cnpj"
              value={formData.cnpj}
              onChange={handleInputChange}
              placeholder="CNPJ"
              required
            />
          </FormControl>
          <FormControl id="address" mb={4}>
            <FormLabel>Endereço (Cidade e Estado)</FormLabel>
            <Textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Ex: São Paulo - SP"
              required
            />
          </FormControl>
          <FormControl id="description" mb={4}>
            <FormLabel>Descrição sobre a ONG</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Descrição.."
              required
            />
          </FormControl>

          <FormControl id="logo" mb={4}>
            <FormLabel>Logo</FormLabel>

            {logo ? (
              <>
                <Text mt={2}>Imagem Selecionada: {logo.name}</Text>
                <Button leftIcon={<MdClose />} onClick={deleteLogoChange}>
                  Excluir logo
                </Button>
              </>
            ) : (
              <VStack
                spacing={4}
                align="center"
                justify="center"
                border="2px dashed gray"
                p={4}
                rounded="md"
              >
                <Icon as={MdImage} w={10} h={10} color="gray.500" />
                <Text color="gray.500">
                  Arraste e solte uma imagem ou clique para selecionar
                </Text>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  required
                  hidden
                />
                <Button
                  as="label"
                  htmlFor="logo"
                  cursor="pointer"
                  leftIcon={<FaCloudUploadAlt />}
                  colorScheme="teal"
                  variant="outline"
                >
                  Selecione um Logo
                </Button>
              </VStack>
            )}
          </FormControl>

          <FormControl id="image" mb={4}>
            <FormLabel>Imagem do local</FormLabel>

            {image ? (
              <>
                <Text mt={2}>Imagem Selecionada: {image.name}</Text>
                <Button leftIcon={<MdClose />} onClick={deleteImageChange}>
                  Excluir imagem
                </Button>
              </>
            ) : (
              <VStack
                spacing={4}
                align="center"
                justify="center"
                border="2px dashed gray"
                p={4}
                rounded="md"
              >
                <Icon as={MdImage} w={10} h={10} color="gray.500" />
                <Text color="gray.500">
                  Arraste e solte uma imagem ou clique para selecionar
                </Text>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  hidden
                />
                <Button
                  as="label"
                  htmlFor="image"
                  cursor="pointer"
                  leftIcon={<FaCloudUploadAlt />}
                  colorScheme="teal"
                  variant="outline"
                >
                  Selecione uma Imagem
                </Button>
              </VStack>
            )}
          </FormControl>

          <FormControl id="site_url" mb={4}>
            <FormLabel>Site (opcional)</FormLabel>
            <Input
              type="url"
              name="site_url"
              value={formData.site_url}
              onChange={handleInputChange}
              placeholder="https://google.com"
              required
            />
          </FormControl>
          <FormControl id="instagram_url" mb={4}>
            <FormLabel>Link do Instagram (opcional)</FormLabel>
            <Input
              type="url"
              name="instagram_url"
              value={formData.instagram_url}
              onChange={handleInputChange}
              placeholder="https://instagram.com"
              required
            />
          </FormControl>
          <FormControl id="facebook_url" mb={4}>
            <FormLabel>Link do Facebook (opcional)</FormLabel>
            <Input
              type="url"
              name="facebook_url"
              value={formData.facebook_url}
              onChange={handleInputChange}
              placeholder="https://facebook.com"
              required
            />
          </FormControl>
          <Button
            type="submit"
            color="white"
            backgroundColor="gray.800"
            _hover={{ backgroundColor: "gray.600" }}
          >
            Cadastrar Ong
          </Button>
        </form>
      </Box>
      <Footer />
    </>
  );
};

export default NewOng;
