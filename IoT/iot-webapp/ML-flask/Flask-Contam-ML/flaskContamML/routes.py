from random import random
from flask import render_template, url_for, flash, redirect, request, jsonify
from flaskContamML import app
import os
import time
import torch 
import torch.nn as nn 
from torchvision import transforms
from PIL import Image
import numpy as np


model_path = '/Users/zishanpan/Desktop/capstone-code/Capstone-Hyphalab-ISTD2022/IoT/iot-webapp/ML-flask/Flask-Contam-ML/flaskContamML/resnet18_hyphaAug.pth'
loaded_model = torch.load(model_path)
loaded_model.eval()

def transform_image(path):
    name, ext = os.path.splitext(path)
    img = Image.open(path)
    w, h = img.size

    # Setting the points for cropped image
    # dir_out = '/output'
    crop_rect1 = (0, 0, w/2, h/2)
    crop_rect2 = (w/2, 0, w, h/2)
    crop_rect3 = (0, h/2, w/2, h)
    crop_rect4 = (w/2, h/2, w, h)

    # cropping image into 4

    upper_left = img.crop(crop_rect1)
    upper_right = img.crop(crop_rect2)
    lower_left = img.crop(crop_rect3)
    lower_right = img.crop(crop_rect4)
    
    mean = np.array([0.5, 0.5, 0.5])
    std = np.array([0.25, 0.25, 0.25])
    transform = transforms.Compose([transforms.Resize((256,256)),
                                    # transforms.CenterCrop(224),
                                    transforms.ToTensor(),
                                    transforms.Normalize(mean, std)])


    img1 = transform(upper_left).unsqueeze(0)
    img2 = transform(upper_right).unsqueeze(0)
    img3 = transform(lower_left).unsqueeze(0)
    img4 = transform(lower_right).unsqueeze(0)
    img_tensor = torch.cat((img1, img2, img3, img4), 0)
    # print(img_tensor.shape)
    return img_tensor
    
def get_prediction(image_tensor):
    output = loaded_model(image_tensor)
    _, preds = torch.max(output, 1)
    is_contaminated = 0 in preds

    return "contam" if is_contaminated else "no_contam"
    
    # return transform(image)





# test route
@app.route("/")
def home():
    return "hi"


@app.route("/receive", methods=['post'])
def receive():
    files = request.files
    # does not work getting the frigin filename
    # filename = request.form

    img_file = files.get('file')
    print(img_file)
    # ltr on need save somewhere else 
    t = time.time()

    path = f'{t}.png'
    img_file.save(path)
    
    img_tensor = transform_image(path)
    pred_result = get_prediction(img_tensor)
    print(pred_result)
    response = jsonify("Image received!")
    response.headers.add('Access-Control-Allow-Origin', '*')

    

    return pred_result

