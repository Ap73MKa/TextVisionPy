from easyocr import Reader

LANG_LIST = ["en", "ru"]


# class TextRecognizer:
#     def _find_contours(self, img: numpy.ndarray):
#         gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#         _, threshold = cv2.threshold(
#             gray, 0, 255, cv2.THRESH_OTSU | cv2.THRESH_BINARY_INV
#         )
#         rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (18, 18))
#         dilation = cv2.dilate(threshold, rect_kernel, iterations=1)
#         contours, _ = cv2.findContours(
#             dilation, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE
#         )
#         return contours
#
#     def _get_text_by_contours(self, img: numpy.ndarray, contours):
#         res = []
#         for cnt in contours:
#             x, y, w, h = cv2.boundingRect(cnt)
#             cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
#             cropped = img[y : y + h, x : x + w]
#             res.append(pytesseract.image_to_string(cropped))
#         return "".join(res)
#
#     def get_text(self, image) -> str:
#         contours = self._find_contours(image)
#         return self._get_text_by_contours(image, contours)


class TextRecognizer:
    @staticmethod
    def get_text(image_path: str) -> str:
        reader = Reader(LANG_LIST)
        result = reader.readtext(image_path, detail=0, paragraph=True)
        return " ".join(result)
