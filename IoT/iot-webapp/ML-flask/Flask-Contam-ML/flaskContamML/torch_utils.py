import io
import torch 
import torch.nn as nn 
from torchvision import datasets, models, transforms
from PIL import Image
import numpy as np
from itertools import product
import os

model_path = 'model_trained/resnet18_hyphaAug.pth'
loaded_model = torch.load(model_path)
# print(loaded_model)
loaded_model.eval()

def tile(path):
    name, ext = os.path.splitext(path)
    # img = Image.open(os.path.join(dir_in, filename))

    img = Image.open(path)
    w, h = img.size
    
    # Setting the points for cropped image
    dir_out = '/output'
    crop_rect1 = (0, 0, w/2, h/2)
    crop_rect2 = (w/2, 0, w, h/2)
    crop_rect3 = (0, h/2, w/2, h)
    crop_rect4 = (w/2, h/2, w, h)

    dir_out = 'output'
    upper_left = img.crop(crop_rect1).save(os.path.join(dir_out, "1.png"))
    upper_right = img.crop(crop_rect2).save(os.path.join(dir_out, "2.png"))
    lower_left = img.crop(crop_rect3).save(os.path.join(dir_out, "3.png"))
    lower_right = img.crop(crop_rect4).save(os.path.join(dir_out, "4.png"))
        
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
                                    transforms.CenterCrop(224),
                                    transforms.ToTensor(),
                                    transforms.Normalize(mean, std)])


    img1 = transform(upper_left).unsqueeze(0)
    img2 = transform(upper_left).unsqueeze(0)
    img3 = transform(upper_left).unsqueeze(0)
    img4 = transform(upper_left).unsqueeze(0)
    img_tensor = torch.cat((img1, img2, img3, img4), 0)
    return img_tensor
    
    
    # return transform(image)

path1 = 'sample_data/contam.jpg'
path2 = 'sample_data/nocontam.jpg'

def get_prediction(image_tensor, model):
    output = model(image_tensor)
    _, preds = torch.max(output, 1)
    is_contaminated = 0 in preds
    return is_contaminated

def clean_up(img_path):
    os.remove(img_path)
img_tensor = transform_image(path1)
print(get_prediction(img_tensor, loaded_model))
# clean_up(path2)
