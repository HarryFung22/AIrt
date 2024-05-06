import React, { useState } from 'react';
import { Input, Button, Box, Text, VStack, Image, Container } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import AWS from 'aws-sdk';
// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [hoverState, setHoverState] = useState(false);  

  //s3 setup
  const region =  process.env.REACT_APP_REGION;
  const bucket =  process.env.REACT_APP_BUCKET;
  const accessKey =  process.env.REACT_APP_ACCESS_KEY;
  const secretKey =  process.env.REACT_APP_SECRET_ACCESS_KEY;

  AWS.config.update({
    region: region,
    accessKeyId: accessKey,
    secretAccessKey: secretKey
  });

  const s3 = new AWS.S3();

  const uploadToS3 = async ({key, text}) => {
    const params = {Bucket: bucket, Key: key, Body: text, ContentType: 'text/plain'};

    try {
      await s3.putObject(params).promise();
      console.log("Successfully uploaded text to " + bucket + "/" + key);
    } catch (err) {
      console.error("Error uploading text: ", err);
    }

  }

  const handleGenerateImage = async () => {
    const response = await fetch(`http://localhost:8000?prompt=${prompt}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if(response.ok){
      const imgData = await response.text();
      setImage(imgData);
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
                src={`data:image/png;base64,${image}`} 
                alt="Generated" 
                style={{ width: '100%', height: '100%', filter: hoverState ? 'grayscale(100%)' : 'none' }}
              />
              {hoverState && (
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
              )}
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;