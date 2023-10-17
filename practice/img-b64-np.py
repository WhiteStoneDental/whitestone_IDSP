from PIL import Image # python imaging library
import numpy as np    # numpy library
import os
import base64

def img_to_base64(img_file_path):
  with open(img_file_path, "rb") as img_file:
    #                       read binary
    base64_string = base64.b64encode(img_file.read()).decode('utf-8')
    return base64_string

def base64_to_numpy_array(base64_string):
  # turn b64 str into python bytes object so it works with numpy
  decoded_base64_string = base64.b64decode(base64_string)
  numpy_array = np.frombuffer(decoded_base64_string, dtype=np.uint8)
  #                                                  datatype of numpy array items
  return numpy_array

# get image from user
user_teeth = "" # need to bring image from frontend
base64_string = img_to_base64(user_teeth)
numpy_array = base64_to_numpy_array(base64_string)
data_frame = numpy_array_to_pd_dataframe(numpy_array)
data_frame.to_csv('train_data.csv', index=False)

np.savetxt('userteeth.csv', numpy_array)