import cv2
from PyQt6.QtCore import QSize, QDir, Qt
from PyQt6.QtGui import QIcon, QColor
from PyQt6.QtWidgets import (
    QMainWindow,
    QFileDialog,
    QPushButton,
    QWidget,
    QVBoxLayout,
    QScrollArea,
    QHBoxLayout, QGraphicsDropShadowEffect,
)

from src.misc import PathManager, TextRecognizer, FileHistory, FileEntry
from . import TextWindow, CustomButton

APP_NAME = 'TextVisionPy'


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.file_history = FileHistory()
        self.text_recognizer = TextRecognizer()
        self.app_layout = QVBoxLayout()
        self.navbar_layout = QVBoxLayout()
        self.init_ui()

    def init_ui(self):
        self.create_window()
        self.create_layout()
        self.setStyleSheet(self.get_styles())

    def create_window(self):
        self.setWindowTitle(APP_NAME)
        self.setWindowIcon(QIcon(str(PathManager.get("assets/icon.ico"))))
        self.setFixedSize(QSize(700, 400))

    def create_layout(self):
        main_layout = QHBoxLayout()
        main_widget = self.create_main_widget()
        main_widget.setLayout(main_layout)

        navbar = self.create_navbar()
        main_layout.addWidget(navbar)

        app = self.create_app()
        main_layout.addWidget(app)

    def create_main_widget(self):
        main_widget = QWidget()
        main_widget.setObjectName("container")
        self.setCentralWidget(main_widget)
        return main_widget

    def create_navbar(self):
        navbar = QWidget()
        navbar.setLayout(self.navbar_layout)
        navbar.setObjectName("navbar-container")
        self.init_navbar_elements()
        scroll_area = QScrollArea()
        scroll_area.setObjectName("navbar-container")
        scroll_area.setWidgetResizable(True)
        scroll_area.setWidget(navbar)
        return scroll_area

    def init_navbar_elements(self):
        self.clear_layout(self.navbar_layout)
        for el in self.file_history.history:
            self.create_navbar_element(el)
        self.create_add_button()

    def create_navbar_element(self, entry: FileEntry):
        navbar_element = CustomButton()
        navbar_element.setText(entry.create_date.strftime("%Y-%m-%d %H:%M"))
        navbar_element.setObjectName('navbar-element')
        navbar_element.value = entry
        navbar_element.clicked.connect(
            lambda checked, button=navbar_element: self.event_navbar_button_clicked(
                button.value
            )
        )
        self.add_shadow(navbar_element)
        self.navbar_layout.addWidget(navbar_element)

    def create_add_button(self):
        navbar_element = QPushButton("+")
        navbar_element.setObjectName('navbar-element')
        navbar_element.clicked.connect(self.event_plus_button_clicked)
        self.add_shadow(navbar_element)
        self.navbar_layout.addWidget(navbar_element)

    def create_app(self):
        app = QWidget()
        app.setLayout(self.app_layout)
        self.app_layout.setAlignment(Qt.AlignmentFlag.AlignCenter)
        app.setObjectName('app-container')
        self.add_shadow(app)
        self.create_browse_button()
        return app

    def create_browse_button(self):
        btn = QPushButton("Browse File")
        btn.setObjectName('app__browse-button')
        btn.clicked.connect(self.browse_file)
        self.add_shadow(btn)
        self.app_layout.addWidget(btn)

    def browse_file(self):
        file_dialog = QFileDialog()
        file_dialog.setFileMode(QFileDialog.FileMode.ExistingFile)
        file_dialog.setNameFilter("Images (*.png *.jpg *.jpeg)")
        file_dialog.setDirectory(QDir.homePath())
        file_dialog.fileSelected.connect(self.file_selected)
        file_dialog.exec()

    def file_selected(self, file_path):
        text = ''
        try:
            file_path = str(file_path).replace("/", "\\")
            img = cv2.imread(str(file_path))
            text = self.text_recognizer.get_text(img)
            text = " ".join(text.split())
        except Exception as e:
            print(e)
        if text:
            self.file_history.add_entry(file_path, text)
            entry = self.file_history.get_last_entry()
            self.create_text_window(entry)
            self.init_navbar_elements()

    def create_text_window(self, entry: FileEntry):
        self.clear_layout(self.app_layout)
        text_window = TextWindow(entry.text)
        self.app_layout.addWidget(text_window)
        self.create_delete_button(entry.entry_id)

    def create_delete_button(self, entry_id):
        btn = CustomButton()
        btn.setText('Delete file')
        btn.setObjectName('app__delete-btn')
        btn.value = entry_id
        btn.clicked.connect(lambda checked, button=btn: self.event_delete_button_clicked(
                button.value
            ))
        self.add_shadow(btn)
        self.app_layout.addWidget(btn)

    def event_plus_button_clicked(self):
        self.clear_layout(self.app_layout)
        self.create_browse_button()

    def event_navbar_button_clicked(self, entry: FileEntry):
        self.clear_layout(self.app_layout)
        self.create_text_window(entry)

    def event_delete_button_clicked(self, entry_id):
        self.file_history.remove_entry(entry_id)
        self.clear_layout(self.app_layout)
        self.init_navbar_elements()
        self.create_browse_button()

    @staticmethod
    def add_shadow(element):
        shadow = QGraphicsDropShadowEffect(blurRadius=5, xOffset=0, yOffset=4, color=QColor(0, 0, 0, 12))
        element.setGraphicsEffect(shadow)

    @staticmethod
    def get_styles():
        style_path = PathManager.get("src/style.qss")
        with open(style_path, "r") as f:
            style = f.read()
            return style

    @staticmethod
    def clear_layout(layout):
        while layout.count() > 0:
            item = layout.takeAt(0)
            if item.widget():
                item.widget().deleteLater()
