from roboflow import Roboflow
# from decouple import config
# API_KEY = config('API_KEY')
rf = Roboflow(api_key="nvoAQs0gPPDx9ef5z5Zj")
project = rf.workspace().project("white-stone")
model = project.version(1).model

# print(model.predict("testimg.jpg", confidence=40, overlap=30).json())

response = model.predict("junteeth.jpg", confidence=40, overlap=30).json()

for pred in response["predictions"]:
    print(pred["class"])
    # print(pred["confidence"])

# visualize your prediction
model.predict("junteeth.jpg", confidence=40, overlap=30).save("prediction.jpg")

# infer on an image hosted elsewhere
print(model.predict("URL_OF_YOUR_IMAGE", hosted=True, confidence=40, overlap=30).json())

