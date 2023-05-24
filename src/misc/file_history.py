import datetime
import pickle
import uuid
from . import PathManager


class FileEntry:
    def __init__(self, image_path: str, text: str, entry_id: str = None):
        self.entry_id: str = entry_id if entry_id else str(uuid.uuid4())
        self.image_path: str = image_path
        self.text: str = text
        self.create_date: datetime = datetime.datetime.now()


class FileHistory:
    def __init__(self):
        self.history: [FileEntry] = self.load_history()

    def add_entry(self, file_path: str, text: str) -> None:
        entry = FileEntry(file_path, text)
        self.history.append(entry)
        self.save_history()

    def get_entry(self, entry_id: str) -> FileEntry | None:
        for entry in self.history:
            if entry.entry_id == entry_id:
                return entry
        return None

    def get_last_entry(self) -> FileEntry:
        return self.history[len(self.history) - 1]

    def remove_entry(self, entry_id: str) -> None:
        for entry in self.history:
            if entry.entry_id == entry_id:
                self.history.remove(entry)
                self.save_history()
                break

    def save_history(self) -> None:
        with open(PathManager.get("data/history.pkl"), "wb") as file:
            pickle.dump(self.history, file)

    @staticmethod
    def load_history() -> [FileEntry]:
        try:
            with open(PathManager.get("data/history.pkl"), "rb") as file:
                history = pickle.load(file)
        except (FileNotFoundError, EOFError):
            history = []
        return history
