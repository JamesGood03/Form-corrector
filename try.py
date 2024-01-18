import cv2
import numpy as np
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

MARGIN = 10  # pixels
ROW_SIZE = 10  # pixels
FONT_SIZE = 1
FONT_THICKNESS = 1
TEXT_COLOR = (255, 0, 0)  # red

def visualize(image, detection_result, max_items=3) -> np.ndarray:
    """Draws bounding boxes on the input image and returns it.
    Args:
        image: The input RGB image.
        detection_result: The list of all "Detection" entities to be visualized.
    Returns:
        Image with bounding boxes.
    """
    count = 0
    for detection in detection_result.detections:
        # Draw bounding_box
        bbox = detection.bounding_box
        start_point = int(bbox.origin_x), int(bbox.origin_y)
        end_point = int(bbox.origin_x + bbox.width), int(bbox.origin_y + bbox.height)
        cv2.rectangle(image, start_point, end_point, TEXT_COLOR, 3)

        # Draw label and score
        for category in detection.categories:
            category_name = category.category_name
            probability = round(category.score, 2)
            result_text = category_name + ' (' + str(probability) + ')'

            # Adjust text location for each label
            text_location = (MARGIN + int(bbox.origin_x), MARGIN + ROW_SIZE + int(bbox.origin_y))
            cv2.putText(image, result_text, text_location, cv2.FONT_HERSHEY_PLAIN,
                        FONT_SIZE, TEXT_COLOR, FONT_THICKNESS)

            # Print label and coordinates
            print(f"Object {count + 1}:")
            print(f"  - Label: {category_name}")
            print(f"  - Coordinates: X: {start_point[0]}, Y: {start_point[1]}, Width: {bbox.width}, Height: {bbox.height}")

        count += 1
        if count >= max_items:
            break  # Exit the loop after visualizing the specified number of items

    return image



IMAGE_FILE = '1.jpg'

# Load the input image using OpenCV
img = cv2.imread(IMAGE_FILE)

