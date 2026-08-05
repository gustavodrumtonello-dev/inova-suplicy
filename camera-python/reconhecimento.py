class Reconhecimento:


    def __init__(self):
        self.pessoas = {}


    def cadastrar(self, nome, rosto):

        self.pessoas[nome] = rosto


    def reconhecer(self, rosto):

        for nome in self.pessoas:

            if rosto == self.pessoas[nome]:
                return nome

        return "Desconhecido"