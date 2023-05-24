import sys

from PyQt6.QtWidgets import QApplication
from pytesseract import pytesseract

from src.interface import MainWindow

PATH_TO_TESSERACT = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


def main():
    pytesseract.tesseract_cmd = PATH_TO_TESSERACT
    app = QApplication([])
    window = MainWindow()
    window.show()
    sys.exit(app.exec())


if __name__ == "__main__":
    main()
