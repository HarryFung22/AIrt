import React, { useState } from 'react';
import { Input, Button, Box, Text, VStack, Image, Container } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [hoverState, setHoverState] = useState(false);  

  const handleGenerateImage = async () => {
    const response = await fetch('https://fs9n2dmkua.execute-api.us-east-1.amazonaws.com/diffusion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data: prompt})
    });

    if(response.ok){
      const json = await response.json();
      setImage(json.body);
    }
  }

  return (
    <Box height="80vh" overflow="hidden"> 
      <Container
        maxW="calc(100% - 240px)"
        centerContent  
        height="100%"  
        display="flex"  
        justifyContent="center"  
        alignItems="center"
        style={{ paddingTop: "80px", paddingLeft: "20mm", position: "relative" }}
      >
        <VStack
          spacing={2}
          align="center"
          w="full"
          style={{ marginTop: "20px" }}
        >
          <Text fontSize="6xl" fontWeight="bold" lineHeight="shorter" textAlign="center">
            Integrate AI to enhance
          </Text>
          <Text fontSize="6xl" fontWeight="bold" lineHeight="shorter" color="gray.500" textAlign="center">
            your vision and desires
          </Text>
          <Text fontSize="xl" pt={5} textAlign="center">
            AIrt combines AI with stable diffusion for efficient and widespread information dissemination.
          </Text>
          <Box width="50%" mb={4}>
            <Input
              placeholder="Enter your prompt"
              size="lg"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </Box>
          <Button colorScheme="blue" onClick={handleGenerateImage}>
            Generate Image
          </Button>
          {image && (
            <Box 
              position="relative" 
              style={{ width: '40%', height: '40%' }} 
              onMouseEnter={() => setHoverState(true)}
              onMouseLeave={() => setHoverState(false)}
            >
              <Image 
                src={image} 
                alt="Generated" 
                style={{ width: '100%', height: '100%', filter: hoverState ? 'grayscale(100%)' : 'none' }}
              />
              {/* {hoverState && (
                <Button 
                  onClick={() => uploadToS3({key: prompt, text: image})}
                  position="absolute"
                  top="10px"
                  right="10px"
                  colorScheme="blue"
                  size="sm"
                  zIndex="10"  // Ensure button is clickable by increasing zIndex above image
                >
                  <FontAwesomeIcon icon={faSave} />
                </Button>
              )} */}
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;