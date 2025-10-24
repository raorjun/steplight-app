# StepLight

StepLight is a wearable assistive device that helps people with visual impairments safely cross the street. It identifies pedestrian walk signals using a lightweight machine learning model and determines when it is safe to cross. The device (wearable system with a Coral Dev Board) then communicates this information to the user through audio or haptic feedback, enabling them to cross safely and confidently.

Slides: https://docs.google.com/presentation/d/1Rc-n1Y8_Tk-mCUnh-dwE9cQgTwym9d0YS0M6IvwiqOE/

## Features
- Detects pedestrian signals in real time  
- Alerts users when it is safe to cross  
- Provides audio or haptic feedback for accessibility  
- Runs efficiently on low-cost, wearable hardware  

## Tech Stack
- **Hardware:** Coral Dev Board, camera module, microcontroller interface  
- **Software:** TensorFlow Lite, OpenCV, Python, React Native (companion app)  
- **Model:** Binary image classifier for U.S. pedestrian walk signals  
- **Deployment:** Edge TPU acceleration for real-time, on-device inference  
