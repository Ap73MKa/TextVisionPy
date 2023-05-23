import cv2
from PyQt6.QtCore import QSize, QDir, Qt
from PyQt6.QtGui import QIcon
from PyQt6.QtWidgets import QMainWindow, QFileDialog, QPushButton, QWidget, QVBoxLayout, QLabel, QScrollArea, \
    QHBoxLayout

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
        main_widget = QWidget()
        self.setCentralWidget(main_widget)
        main_layout = QHBoxLayout()
        main_widget.setLayout(main_layout)

        left_block = QWidget()
        left_layout = QVBoxLayout()
        left_block.setLayout(left_layout)

        for i in range(3):
            item_button = QPushButton(f'element {i + 1}')
            item_button.setFixedSize(150, 100)
            left_layout.addWidget(item_button)

        item_button = QPushButton('+')
        item_button.setFixedSize(150, 100)
        left_layout.addWidget(item_button)
        scroll_area = QScrollArea()
        scroll_area.setFixedWidth(200)
        scroll_area.setAlignment(Qt.AlignmentFlag.AlignCenter)
        scroll_area.setWidget(left_block)
        main_layout.addWidget(scroll_area)

        right_block = QWidget()
        right_layout = QVBoxLayout()
        right_block.setLayout(right_layout)

        # info_label = QLabel("Информация об элементе")
        # right_layout.addWidget(info_label)

        btn = QPushButton("Browse File")
        btn.clicked.connect(self.browse_file)
        btn.setGeometry(50, 50, 200, 30)
        right_layout.addWidget(btn)
        main_layout.addWidget(right_block)

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
