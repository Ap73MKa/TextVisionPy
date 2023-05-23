import cv2
from PyQt6.QtCore import QSize, QDir
from PyQt6.QtGui import QIcon
from PyQt6.QtWidgets import QMainWindow, QFileDialog, QPushButton

from src.misc import PathManager, TextRecognizer
from . import TextWindow

APP_NAME = 'TextVisionPy'


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.init_ui()

    def create_window(self):
        self.setWindowTitle(APP_NAME)
        self.setWindowIcon(QIcon(str(PathManager.get('assets/icon.ico'))))
        self.setFixedSize(QSize(700, 400))

    def browse_file(self):
        file_dialog = QFileDialog()
        file_dialog.setFileMode(QFileDialog.FileMode.ExistingFile)
        file_dialog.setNameFilter("Images (*.png *.jpg *.jpeg)")
        file_dialog.setDirectory(QDir.homePath())
        file_dialog.fileSelected.connect(self.file_selected)
        file_dialog.exec()

    def create_layout(self):
        btn = QPushButton("Browse File", self)
        btn.clicked.connect(self.browse_file)
        btn.setGeometry(50, 50, 200, 30)

    def file_selected(self, file_path):
        file_path = str(file_path).replace('/', '\\')
        try:
            text_recognizer = TextRecognizer()
            img = cv2.imread(str(file_path))
            text = text_recognizer.get_text(img)
            text_window = TextWindow(text)
            self.setCentralWidget(text_window)
        except Exception as e:
            print(e)

    def init_ui(self):
        self.create_window()
        self.create_layout()
