import cv2
import numpy as np
# img stacking function
def stackImages(scale,imgArray):
    rows = len(imgArray)
    cols = len(imgArray[0])
    rowsAvailable = isinstance(imgArray[0], list)
    width = imgArray[0][0].shape[1]
    height = imgArray[0][0].shape[0]
    if rowsAvailable:
        for x in range ( 0, rows):
            for y in range(0, cols):
                if imgArray[x][y].shape[:2] == imgArray[0][0].shape [:2]:
                    imgArray[x][y] = cv2.resize(imgArray[x][y], (0, 0), None, scale, scale)
                else:
                    imgArray[x][y] = cv2.resize(imgArray[x][y], (imgArray[0][0].shape[1], imgArray[0][0].shape[0]), None, scale, scale)
                if len(imgArray[x][y].shape) == 2: imgArray[x][y]= cv2.cvtColor( imgArray[x][y], cv2.COLOR_GRAY2BGR)
        imageBlank = np.zeros((height, width, 3), np.uint8)
        hor = [imageBlank]*rows
        hor_con = [imageBlank]*rows
        for x in range(0, rows):
            hor[x] = np.hstack(imgArray[x])
        ver = np.vstack(hor)
    else:
        for x in range(0, rows):
            if imgArray[x].shape[:2] == imgArray[0].shape[:2]:
                imgArray[x] = cv2.resize(imgArray[x], (0, 0), None, scale, scale)
            else:
                imgArray[x] = cv2.resize(imgArray[x], (imgArray[0].shape[1], imgArray[0].shape[0]), None,scale, scale)
            if len(imgArray[x].shape) == 2: imgArray[x] = cv2.cvtColor(imgArray[x], cv2.COLOR_GRAY2BGR)
        hor= np.hstack(imgArray)
        ver = hor
    return ver

# trackbar window
cv2.namedWindow('TrackBars')
cv2.resizeWindow(
    "TrackBars",
    640,
    240
    )
# value to change in the track bar
# window to put it in
# min value, max value (we only have until 179)
# function everytime the trackbar changes value
def empty(a):
    pass

# create trackbars to change values

    # define color ranges in which our colors to be
    # define limits, if the image region falls within that range, grab that
    # we do not know the max/min values? -> use trackbars to play around with the values

cv2.createTrackbar("Hue Min", "TrackBars", 0, 179, empty)
cv2.createTrackbar("Hue Max", "TrackBars", 179, 179, empty)
cv2.createTrackbar("Sat Min", "TrackBars", 0, 255, empty)
cv2.createTrackbar("Sat Max", "TrackBars", 255, 255, empty)
cv2.createTrackbar("Val Max", "TrackBars", 0, 255, empty)
cv2.createTrackbar("Val Min", "TrackBars", 255, 255, empty)

# set mask values as initial
# cv2.createTrackbar("Hue Min","TrackBars",0,179,empty)
# cv2.createTrackbar("Hue Max","TrackBars",179,179,empty)
# cv2.createTrackbar("Sat Min","TrackBars",14,255,empty)
# cv2.createTrackbar("Sat Max","TrackBars",255,255,empty)
# cv2.createTrackbar("Val Min","TrackBars",181,255,empty)
# cv2.createTrackbar("Val Max","TrackBars",255,255,empty)


# put in loop to get the values constantly
while True:
    ## reading image with path
    img = cv2.imread("resources/balls.jpg")
    
    # read trackbar values to apply onto the image
    # convert to hsv space
    imgHSV = cv2.cvtColor(
        img,
        cv2.COLOR_BGR2HSV

    )

    # which trackbar window does it belong
    h_min = cv2.getTrackbarPos("Hue Min", "TrackBars")
    h_max = cv2.getTrackbarPos("Hue Max", "TrackBars")
    s_min = cv2.getTrackbarPos("Sat Min", "TrackBars")
    s_max = cv2.getTrackbarPos("Sat Max", "TrackBars")
    v_min = cv2.getTrackbarPos("Val Min", "TrackBars")
    v_max = cv2.getTrackbarPos("Val Max", "TrackBars")

    print(h_min, h_max, s_min, s_max, v_min, v_max)

    # create mask to filter out the car of interest
    lower = np.array([h_min, s_min, v_min])
    upper = np.array([h_max, s_max, v_max])

    # filter out and give us the filtered image of that color
    mask = cv2.inRange(
        imgHSV,
        lower,
        upper

    )

    # with the mask, create a new image with the orange car only
    # use the bitwise AND operation to add 2 images tgt to create a new image
    # check both images, if pixels both present, store in new image
    imgResult = cv2.bitwise_and(img, img, mask=mask)


    # display image, passing in name of window, image that you want to display
    # cv2.imshow("original", img)
    # cv2.imshow("HSV", imgHSV)
    # cv2.imshow("mask", mask)
    # cv2.imshow("result", imgResult)
    
    # stack images
    imgStack = stackImages(0.6, [[img, imgHSV], [mask, imgResult]])
    cv2.imshow("stacked images", imgStack)

    if cv2.waitKey(1) & 0xFF ==ord('q'): 
        break
