from PyQt6.QtWidgets import QWidget, QVBoxLayout, QTextEdit


class TextWindow(QWidget):
    def __init__(self, text: str):
        super().__init__()
        self.init_ui(text)

    def init_ui(self, text: str) -> None:
        self.setWindowTitle("Text Viewer")
        self.setGeometry(400, 200, 400, 300)

        layout = QVBoxLayout()
        self.setLayout(layout)

        text_edit = QTextEdit()
        text_edit.setPlainText(text)
        text_edit.setReadOnly(True)
        layout.addWidget(text_edit)