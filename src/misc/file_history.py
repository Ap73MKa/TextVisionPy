import datetime
import pickle
import uuid

from . import PathManager


class FileEntry:
    def __init__(self, file_path, text, entry_id=None):
        self.file_path = file_path
        self.text = text
        self.entry_id = entry_id if entry_id else str(uuid.uuid4())
        self.create_date = datetime.datetime.now()


class FileHistory:
    def __init__(self):
        self.history: [FileEntry] = self.load_history()

    def add_entry(self, file_path, text):
        entry = FileEntry(file_path, text)
        self.history.append(entry)
        self.save_history()

    def get_entry(self, entry_id):
        for entry in self.history:
            if entry.entry_id == entry_id:
                return entry
        return None

    def get_last_entry(self):
        return self.history[len(self.history) - 1]

    def remove_entry(self, entry_id):
        for entry in self.history:
            if entry.entry_id == entry_id:
                self.history.remove(entry)
                self.save_history()
                break

    def save_history(self):
        with open(PathManager.get("data/history.pkl"), "wb") as file:
            pickle.dump(self.history, file)

    @staticmethod
    def load_history():
        try:
            with open(PathManager.get("data/history.pkl"), "rb") as file:
                history = pickle.load(file)
        except FileNotFoundError:
            history = []
        return history
