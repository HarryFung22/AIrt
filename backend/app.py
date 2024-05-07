import json
import os
import urllib.request
import io
from PIL import Image
import uuid
import boto3
import base64

API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"
API_TOKEN = os.environ['API_KEY']
bucket_name = os.environ['S3_BUCKET']
s3_client = boto3.client('s3', region_name='us-east-1')
s3 = boto3.resource('s3', region_name='us-east-1')

headers = {"Authorization": f"Bearer {API_TOKEN}"}

def query(payload):
    req = urllib.request.Request(API_URL, headers=headers, method='POST')
    with urllib.request.urlopen(req, json.dumps(payload).encode('utf-8')) as response:
        return response.read() 

def upload_image(image_bytes, prmpt):
    image_name = prmpt + str(uuid.uuid4()) + '.png'
    s3.Object(bucket_name, image_name).put(Body=image_bytes, ContentType='image/png')
    presigned_url = s3_client.generate_presigned_url(ClientMethod='get_object', Params={'Bucket': bucket_name, 'Key': image_name}, ExpiresIn=1000)
    return presigned_url

def lambda_handler(event, context):
    custom_input = event.get('data', 'Crying face')
    
    image_bytes = query({"inputs": custom_input})

    url = upload_image(image_bytes, custom_input)
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': url
    }