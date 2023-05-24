from PyQt6.QtCore import pyqtSignal
from PyQt6.QtWidgets import QPushButton


class CustomButton(QPushButton):
    valueChanged = pyqtSignal(str)

    def __init__(self, parent=None):
        super().__init__(parent)
        self._value = None

    @property
    def value(self):
        return self._value

    @value.setter
    def value(self, new_value):
        self._value = new_value
