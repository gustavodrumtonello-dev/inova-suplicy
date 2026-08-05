import sqlite3

class Banco:


    def __init__(self, caminho):

        self.conn = sqlite3.connect(caminho)


    def criar_tabela(self):

        comando = """
        CREATE TABLE IF NOT EXISTS pessoas(
            id INTEGER PRIMARY KEY,
            nome TEXT,
            caminho_rosto TEXT
        )
        """

        self.conn.execute(comando)
        self.conn.commit()