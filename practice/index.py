from PIL import Image # python imaging library
import pandas as pd
import numpy as np    # numpy library
import os
import base64

dataset_path = "./test_dataset"
dataset = os.listdir(dataset_path)
numpy_array = None

def numpy_array_to_pd_dataframe(numpy_array):
  numpy_array_flat = numpy_array.reshape(numpy_array.shape[0], -1) # turn 3d numpy array into 2d
  data_frame = pd.DataFrame(numpy_array_flat)
  return data_frame


def process_image():
    global numpy_array  # Use the global keyword to indicate you're modifying the global variable

    for file in dataset: # only one file rn so the output is just one dataframe
      path = os.path.join(dataset_path, file)
      if path.endswith(".tif"):
        tif_image = Image.open(path)
        numpy_array = np.array(tif_image)
        print("numpy array created")
        print(numpy_array)

print("-------------------------------------------------------")
process_image()
print("creating frame")
data_frame = numpy_array_to_pd_dataframe(numpy_array)
print("writing csv")
data_frame.to_csv('train_data.csv', index=False)


# print("-------------------------------------------------------")
# print("writing file")
# np.savetxt('gingivitis.csv', numpy_arrays)

# def pad_numpy_arrays(numpy_data):

# I ran into an error that ChatGPT thinks was caused by the numpy arrays having different lengths, 
# so I made this function to add zeros onto the arrays so that all have equal length. 

# This was the error:
# ValueError: setting an array element with a sequence. The requested array has an inhomogeneous 
# shape after 1 dimensions. The detected shape was (39,) + inhomogeneous part.

  # max_length = max(len(arr) for arr in numpy_data)
  # padded_numpy_arrays = [np.pad(arr, (0, max_length - len(arr)), 'constant') for arr in numpy_data]
  # return padded_numpy_arrays