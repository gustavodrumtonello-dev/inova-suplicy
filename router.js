// ==============================================================================
// 1. BASE DE DADOS (TURMAS E ALUNOS)
// ==============================================================================
// ==============================================================================
// 1. BASE DE DADOS (TURMAS E ALUNOS COMPLETA)
// ==============================================================================
const turmasData = {
  '6a': {
    nome: '6º Ano Fundamental A',
    frequenciaSemanal: '92%',
    horario: '06:50',
    alunos: [
      { id: 1, nome: 'Lucas Mendes Santos', frequencia: 96, atrasosSemana: 1 },
      { id: 2, nome: 'Ana Silva Ferreira', frequencia: 92, atrasosSemana: 0 },
      { id: 3, nome: 'João Pereira Lima', frequencia: 100, atrasosSemana: 0 },
      { id: 4, nome: 'Mariana Costa Ribeiro', frequencia: 88, atrasosSemana: 2 },
      { id: 5, nome: 'Carlos Eduardo Souza', frequencia: 94, atrasosSemana: 0 },
      { id: 6, nome: 'Beatriz Lima Rocha', frequencia: 90, atrasosSemana: 1 },
      { id: 7, nome: 'Gabriel Rocha Alves', frequencia: 95, atrasosSemana: 0 },
      { id: 8, nome: 'Fernanda Alves Castro', frequencia: 88, atrasosSemana: 2 },
      { id: 9, nome: 'Guilherme Santos Duarte', frequencia: 91, atrasosSemana: 0 },
      { id: 10, nome: 'Larissa Martins Barbosa', frequencia: 97, atrasosSemana: 0 },
      { id: 11, nome: 'Thiago Carvalho Mota', frequencia: 85, atrasosSemana: 3 },
      { id: 12, nome: 'Camila Duarte Ramos', frequencia: 93, atrasosSemana: 0 },
      { id: 13, nome: 'Mateus Barbosa Vieira', frequencia: 98, atrasosSemana: 0 },
      { id: 14, nome: 'Sofia Fernandes Prado', frequencia: 92, atrasosSemana: 1 },
      { id: 15, nome: 'Rodrigo Castro Nunes', frequencia: 89, atrasosSemana: 1 },
      { id: 16, nome: 'Aline Souza Guimarães', frequencia: 94, atrasosSemana: 0 },
      { id: 17, nome: 'Enzo Gabriel Cardoso', frequencia: 96, atrasosSemana: 0 },
      { id: 18, nome: 'Valentina Ribeiro Dias', frequencia: 91, atrasosSemana: 1 },
      { id: 19, nome: 'Felipe Cardoso Moraes', frequencia: 87, atrasosSemana: 2 },
      { id: 20, nome: 'Isabela Freitas Cruz', frequencia: 95, atrasosSemana: 0 },
      { id: 21, nome: 'Bruno Henrique Xavier', frequencia: 93, atrasosSemana: 0 },
      { id: 22, nome: 'Laura Beatriz Moreira', frequencia: 90, atrasosSemana: 1 },
      { id: 23, nome: 'Diego Maradona Silva', frequencia: 82, atrasosSemana: 3 },
      { id: 24, nome: 'Rafaela Lopes Nogueira', frequencia: 96, atrasosSemana: 0 },
      { id: 25, nome: 'Vinicius Junior Fonseca', frequencia: 79, atrasosSemana: 4 },
      { id: 26, nome: 'Amanda Nunes Machado', frequencia: 94, atrasosSemana: 0 }
    ]
  },
  '6b': {
    nome: '6º Ano Fundamental B',
    frequenciaSemanal: '90%',
    horario: '06:50',
    alunos: [
      { id: 27, nome: 'Sérgio Ramos Peixoto', frequencia: 92, atrasosSemana: 1 },
      { id: 28, nome: 'Giovanna Antonelli Sales', frequencia: 94, atrasosSemana: 0 },
      { id: 29, nome: 'Marcelo Vieira Andrade', frequencia: 88, atrasosSemana: 2 },
      { id: 30, nome: 'Patricia Poeta Franco', frequencia: 91, atrasosSemana: 0 },
      { id: 31, nome: 'Caio Paulista Neves', frequencia: 93, atrasosSemana: 0 },
      { id: 32, nome: 'Alice Monteiro Borges', frequencia: 97, atrasosSemana: 0 },
      { id: 33, nome: 'Bernardo Silva Correa', frequencia: 86, atrasosSemana: 2 },
      { id: 34, nome: 'Clara Maria Aguiar', frequencia: 95, atrasosSemana: 0 },
      { id: 35, nome: 'Daniel Oliveira Farias', frequencia: 90, atrasosSemana: 1 },
      { id: 36, nome: 'Eduarda Vasconcelos', frequencia: 89, atrasosSemana: 1 },
      { id: 37, nome: 'Francisco Junqueira', frequencia: 92, atrasosSemana: 0 },
      { id: 38, nome: 'Gabriela Meireles', frequencia: 96, atrasosSemana: 0 },
      { id: 39, nome: 'Heitor Garcia Pessoa', frequencia: 84, atrasosSemana: 3 },
      { id: 40, nome: 'Isadora Barreto Telles', frequencia: 98, atrasosSemana: 0 },
      { id: 41, nome: 'Julio Cesar Caldeira', frequencia: 91, atrasosSemana: 0 },
      { id: 42, nome: 'Kauan Figueiredo', frequencia: 87, atrasosSemana: 2 },
      { id: 43, nome: 'Livia Gondim Marques', frequencia: 93, atrasosSemana: 0 },
      { id: 44, nome: 'Murilo Benevides', frequencia: 95, atrasosSemana: 0 },
      { id: 45, nome: 'Natalia Sampaio Lins', frequencia: 89, atrasosSemana: 1 },
      { id: 46, nome: 'Otavio Cavalcanti', frequencia: 91, atrasosSemana: 1 },
      { id: 47, nome: 'Pedro Henrique Viana', frequencia: 94, atrasosSemana: 0 },
      { id: 48, nome: 'Rebeca Alencar Prado', frequencia: 96, atrasosSemana: 0 },
      { id: 49, nome: 'Samuel Brandão Luz', frequencia: 88, atrasosSemana: 2 },
      { id: 50, nome: 'Tatiana Gusmão Paes', frequencia: 92, atrasosSemana: 0 },
      { id: 51, nome: 'Yuri Alberto Antunes', frequencia: 83, atrasosSemana: 3 },
      { id: 52, nome: 'Yasmin Drummond', frequencia: 97, atrasosSemana: 0 },
      { id: 53, nome: 'Zeca Pagodinho Filho', frequencia: 90, atrasosSemana: 1 }
    ]
  },
  '7a': {
    nome: '7º Ano Fundamental A',
    frequenciaSemanal: '91%',
    horario: '06:50',
    alunos: [
      { id: 54, nome: 'Arthur Pendelton', frequencia: 95, atrasosSemana: 0 },
      { id: 55, nome: 'Bianca Andrade Ramos', frequencia: 91, atrasosSemana: 1 },
      { id: 56, nome: 'Caio Castro Silveira', frequencia: 87, atrasosSemana: 2 },
      { id: 57, nome: 'Deborah Secco Lima', frequencia: 96, atrasosSemana: 0 },
      { id: 58, nome: 'Erick Jacquin Souza', frequencia: 90, atrasosSemana: 1 },
      { id: 59, nome: 'Flavia Alessandra', frequencia: 93, atrasosSemana: 0 },
      { id: 60, nome: 'Gustavo Lima Santos', frequencia: 88, atrasosSemana: 2 },
      { id: 61, nome: 'Helena Bordon', frequencia: 97, atrasosSemana: 0 },
      { id: 62, nome: 'Igor Cavalera', frequencia: 84, atrasosSemana: 3 },
      { id: 63, nome: 'Jéssica Ellen Silva', frequencia: 92, atrasosSemana: 0 },
      { id: 64, nome: 'Kléber Toledo', frequencia: 89, atrasosSemana: 1 },
      { id: 65, nome: 'Luana Piovani', frequencia: 94, atrasosSemana: 0 },
      { id: 66, nome: 'Márcio Garcia', frequencia: 91, atrasosSemana: 0 },
      { id: 67, nome: 'Nathalia Dill', frequencia: 98, atrasosSemana: 0 },
      { id: 68, nome: 'Otávio Müller', frequencia: 86, atrasosSemana: 2 },
      { id: 69, nome: 'Paolla Oliveira', frequencia: 95, atrasosSemana: 0 },
      { id: 70, nome: 'Quentin Tarantino', frequencia: 90, atrasosSemana: 1 },
      { id: 71, nome: 'Rodrigo Santoro', frequencia: 93, atrasosSemana: 0 },
      { id: 72, nome: 'Sabrina Sato', frequencia: 96, atrasosSemana: 0 },
      { id: 73, nome: 'Taís Araújo', frequencia: 92, atrasosSemana: 1 },
      { id: 74, nome: 'Ullisses Correia', frequencia: 85, atrasosSemana: 2 },
      { id: 75, nome: 'Vanessa Giácomo', frequencia: 94, atrasosSemana: 0 },
      { id: 76, nome: 'Wagner Moura', frequencia: 97, atrasosSemana: 0 },
      { id: 77, nome: 'Xuxa Meneghel', frequencia: 89, atrasosSemana: 1 },
      { id: 78, nome: 'Yanna Lavigne', frequencia: 91, atrasosSemana: 0 },
      { id: 79, nome: 'Zezé Di Camargo', frequencia: 82, atrasosSemana: 3 },
      { id: 80, nome: 'Agatha Moreira', frequencia: 95, atrasosSemana: 0 },
      { id: 81, nome: 'Bruno Gagliasso', frequencia: 93, atrasosSemana: 0 }
    ]
  },
  '7b': {
    nome: '7º Ano Fundamental B',
    frequenciaSemanal: '92%',
    horario: '06:50',
    alunos: [
      { id: 82, nome: 'Aline Riscado', frequencia: 90, atrasosSemana: 1 },
      { id: 83, nome: 'Bento Ribeiro', frequencia: 88, atrasosSemana: 2 },
      { id: 84, nome: 'Cauã Reymond', frequencia: 94, atrasosSemana: 0 },
      { id: 85, nome: 'Dani Calabresa', frequencia: 96, atrasosSemana: 0 },
      { id: 86, nome: 'Emílio Dantas', frequencia: 92, atrasosSemana: 0 },
      { id: 87, nome: 'Fernanda Paes Leme', frequencia: 89, atrasosSemana: 1 },
      { id: 88, nome: 'Gregório Duvivier', frequencia: 86, atrasosSemana: 2 },
      { id: 89, nome: 'Heloísa Périssé', frequencia: 95, atrasosSemana: 0 },
      { id: 90, nome: 'Ícaro Silva', frequencia: 91, atrasosSemana: 0 },
      { id: 91, nome: 'Ingrid Guimarães', frequencia: 97, atrasosSemana: 0 },
      { id: 92, nome: 'Jonathan Azevedo', frequencia: 84, atrasosSemana: 3 },
      { id: 93, nome: 'Kéfera Buchmann', frequencia: 93, atrasosSemana: 0 },
      { id: 94, nome: 'Lázaro Ramos', frequencia: 98, atrasosSemana: 0 },
      { id: 95, nome: 'Monica Iozzi', frequencia: 90, atrasosSemana: 1 },
      { id: 96, nome: 'Nicolas Prattes', frequencia: 92, atrasosSemana: 0 },
      { id: 97, nome: 'Paloma Bernardi', frequencia: 87, atrasosSemana: 2 },
      { id: 98, nome: 'Rafael Vitti', frequencia: 94, atrasosSemana: 0 },
      { id: 99, nome: 'Sheron Menezzes', frequencia: 96, atrasosSemana: 0 },
      { id: 100, nome: 'Tatá Werneck', frequencia: 85, atrasosSemana: 3 },
      { id: 101, nome: 'Thiago Lacerda', frequencia: 91, atrasosSemana: 0 },
      { id: 102, nome: 'Vera Fischer', frequencia: 89, atrasosSemana: 1 },
      { id: 103, nome: 'Willian Arão', frequencia: 93, atrasosSemana: 0 },
      { id: 104, nome: 'Yorgos Lanthimos', frequencia: 95, atrasosSemana: 0 },
      { id: 105, nome: 'Zico de Souza', frequencia: 99, atrasosSemana: 0 },
      { id: 106, nome: 'Adriana Esteves', frequencia: 92, atrasosSemana: 1 }
    ]
  },
  '8a': {
    nome: '8º Ano Fundamental A',
    frequenciaSemanal: '92%',
    horario: '06:50',
    alunos: [
      { id: 107, nome: 'Alexandre Nero', frequencia: 94, atrasosSemana: 0 },
      { id: 108, nome: 'Bárbara Paz', frequencia: 90, atrasosSemana: 1 },
      { id: 109, nome: 'Chay Suede', frequencia: 96, atrasosSemana: 0 },
      { id: 110, nome: 'Dira Paes', frequencia: 92, atrasosSemana: 0 },
      { id: 111, nome: 'Edson Celulari', frequencia: 88, atrasosSemana: 2 },
      { id: 112, nome: 'Fábio Assunção', frequencia: 83, atrasosSemana: 3 },
      { id: 113, nome: 'Gloria Pires', frequencia: 98, atrasosSemana: 0 },
      { id: 114, nome: 'Humberto Martins', frequencia: 91, atrasosSemana: 0 },
      { id: 115, nome: 'Isadora Ribeiro', frequencia: 89, atrasosSemana: 1 },
      { id: 116, nome: 'Juliana Paes', frequencia: 95, atrasosSemana: 0 },
      { id: 117, nome: 'Letícia Spiller', frequencia: 93, atrasosSemana: 0 },
      { id: 118, nome: 'Murilo Benício', frequencia: 97, atrasosSemana: 0 },
      { id: 119, nome: 'Nívea Maria', frequencia: 90, atrasosSemana: 1 },
      { id: 120, nome: 'Osmar Prado', frequencia: 86, atrasosSemana: 2 },
      { id: 121, nome: 'Patricia Pillar', frequencia: 94, atrasosSemana: 0 },
      { id: 122, nome: 'Reginaldo Faria', frequencia: 92, atrasosSemana: 0 },
      { id: 123, nome: 'Susana Vieira', frequencia: 96, atrasosSemana: 0 },
      { id: 124, nome: 'Tony Ramos', frequencia: 100, atrasosSemana: 0 },
      { id: 125, nome: 'Umberto Magnani', frequencia: 87, atrasosSemana: 2 },
      { id: 126, nome: 'Vera Holtz', frequencia: 91, atrasosSemana: 0 },
      { id: 127, nome: 'Walmor Chagas', frequencia: 85, atrasosSemana: 3 },
      { id: 128, nome: 'Yolanda Cardoso', frequencia: 93, atrasosSemana: 0 },
      { id: 129, nome: 'Zezé Polessa', frequencia: 95, atrasosSemana: 0 },
      { id: 130, nome: 'Ary Fontoura', frequencia: 98, atrasosSemana: 0 },
      { id: 131, nome: 'Betty Faria', frequencia: 89, atrasosSemana: 1 },
      { id: 132, nome: 'Cássio Gabus Mendes', frequencia: 92, atrasosSemana: 0 },
      { id: 133, nome: 'Denise Fraga', frequencia: 94, atrasosSemana: 0 },
      { id: 134, nome: 'Eva Wilma', frequencia: 96, atrasosSemana: 0 },
      { id: 135, nome: 'Fulvio Stefanini', frequencia: 88, atrasosSemana: 2 }
    ]
  },
  '8b': {
    nome: '8º Ano Fundamental B',
    frequenciaSemanal: '91%',
    horario: '06:50',
    alunos: [
      { id: 136, nome: 'Guilherme Fontes', frequencia: 91, atrasosSemana: 0 },
      { id: 137, nome: 'Helena Ranaldi', frequencia: 95, atrasosSemana: 0 },
      { id: 138, nome: 'Isabela Garcia', frequencia: 93, atrasosSemana: 0 },
      { id: 139, nome: 'José Mayer', frequencia: 82, atrasosSemana: 3 },
      { id: 140, nome: 'Kadu Moliterno', frequencia: 87, atrasosSemana: 2 },
      { id: 141, nome: 'Lília Cabral', frequencia: 97, atrasosSemana: 0 },
      { id: 142, nome: 'Maitê Proença', frequencia: 90, atrasosSemana: 1 },
      { id: 143, nome: 'Nuno Leal Maia', frequencia: 86, atrasosSemana: 2 },
      { id: 144, nome: 'Otávio Augusto', frequencia: 92, atrasosSemana: 0 },
      { id: 145, nome: 'Priscila Fantin', frequencia: 94, atrasosSemana: 0 },
      { id: 146, nome: 'Raul Cortez', frequencia: 98, atrasosSemana: 0 },
      { id: 147, nome: 'Silvia Pfeifer', frequencia: 89, atrasosSemana: 1 },
      { id: 148, nome: 'Tarcísio Meira', frequencia: 99, atrasosSemana: 0 },
      { id: 149, nome: 'Victor Fasano', frequencia: 88, atrasosSemana: 2 },
      { id: 150, nome: 'Yoná Magalhães', frequencia: 93, atrasosSemana: 0 },
      { id: 151, nome: 'Ana Paula Arósio', frequencia: 96, atrasosSemana: 0 },
      { id: 152, nome: 'Bete Coelho', frequencia: 91, atrasosSemana: 0 },
      { id: 153, nome: 'Cristiana Oliveira', frequencia: 90, atrasosSemana: 1 },
      { id: 154, nome: 'Dalton Vigh', frequencia: 85, atrasosSemana: 3 },
      { id: 155, nome: 'Eduardo Moscovis', frequencia: 94, atrasosSemana: 0 },
      { id: 156, nome: 'Felipe Camargo', frequencia: 87, atrasosSemana: 2 },
      { id: 157, nome: 'Giulia Gam', frequencia: 92, atrasosSemana: 0 },
      { id: 158, nome: 'Herson Capri', frequencia: 95, atrasosSemana: 0 },
      { id: 159, nome: 'Ingra Lyberato', frequencia: 89, atrasosSemana: 1 },
      { id: 160, nome: 'Jackson Antunes', frequencia: 93, atrasosSemana: 0 },
      { id: 161, nome: 'Luiza Tomé', frequencia: 91, atrasosSemana: 0 }
    ]
  },
  '9a': {
    nome: '9º Ano Fundamental A',
    frequenciaSemanal: '91%',
    horario: '06:50',
    alunos: [
      { id: 162, nome: 'Marcello Antony', frequencia: 92, atrasosSemana: 0 },
      { id: 163, nome: 'Natália do Vale', frequencia: 96, atrasosSemana: 0 },
      { id: 164, nome: 'Oscar Magrini', frequencia: 84, atrasosSemana: 3 },
      { id: 165, nome: 'Paulo Betti', frequencia: 88, atrasosSemana: 2 },
      { id: 166, nome: 'Renata Sorrah', frequencia: 97, atrasosSemana: 0 },
      { id: 167, nome: 'Stênio Garcia', frequencia: 90, atrasosSemana: 1 },
      { id: 168, nome: 'Thiago Fragoso', frequencia: 93, atrasosSemana: 0 },
      { id: 169, nome: 'Viviane Pasmanter', frequencia: 95, atrasosSemana: 0 },
      { id: 170, nome: 'Zilka Salaberry', frequencia: 98, atrasosSemana: 0 },
      { id: 171, nome: 'Anatti Duarte', frequencia: 89, atrasosSemana: 1 },
      { id: 172, nome: 'Brito Júnior', frequencia: 82, atrasosSemana: 3 },
      { id: 173, nome: 'Cássia Kis', frequencia: 94, atrasosSemana: 0 },
      { id: 174, nome: 'Daniel Boaventura', frequencia: 91, atrasosSemana: 0 },
      { id: 175, nome: 'Eliane Giardini', frequencia: 96, atrasosSemana: 0 },
      { id: 176, nome: 'Fulvia Rosemberg', frequencia: 86, atrasosSemana: 2 },
      { id: 177, nome: 'Gabriel Braga Nunes', frequencia: 92, atrasosSemana: 0 },
      { id: 178, nome: 'Herson Capri Jr', frequencia: 90, atrasosSemana: 1 },
      { id: 179, nome: 'Isabel Fillardis', frequencia: 93, atrasosSemana: 0 },
      { id: 180, nome: 'Jayme Periard', frequencia: 87, atrasosSemana: 2 },
      { id: 181, nome: 'Lícia Magna', frequencia: 95, atrasosSemana: 0 },
      { id: 182, nome: 'Marcos Frota', frequencia: 89, atrasosSemana: 1 },
      { id: 183, nome: 'Neuza Borges', frequencia: 91, atrasosSemana: 0 },
      { id: 184, nome: 'Othon Bastos', frequencia: 97, atrasosSemana: 0 },
      { id: 185, nome: 'Pedro Paulo Rangel', frequencia: 94, atrasosSemana: 0 },
      { id: 186, nome: 'Rosi Campos', frequencia: 90, atrasosSemana: 1 },
      { id: 187, nome: 'Stepan Nercessian', frequencia: 83, atrasosSemana: 3 },
      { id: 188, nome: 'Tato Gabus Mendes', frequencia: 92, atrasosSemana: 0 },
      { id: 189, nome: 'Vicente Barcellos', frequencia: 96, atrasosSemana: 0 },
      { id: 190, nome: 'Zezeh Barbosa', frequencia: 88, atrasosSemana: 2 },
      { id: 191, nome: 'Ariclê Perez', frequencia: 95, atrasosSemana: 0 }
    ]
  },
  '9b': {
    nome: '9º Ano Fundamental B',
    frequenciaSemanal: '90%',
    horario: '06:50',
    alunos: [
      { id: 192, nome: 'Alexandre Borges', frequencia: 91, atrasosSemana: 0 },
      { id: 193, nome: 'Bel Kutner', frequencia: 93, atrasosSemana: 0 },
      { id: 194, nome: 'Cláudio Marzo', frequencia: 85, atrasosSemana: 3 },
      { id: 195, nome: 'Drica Moraes', frequencia: 96, atrasosSemana: 0 },
      { id: 196, nome: 'Ernesto Piccolo', frequencia: 88, atrasosSemana: 2 },
      { id: 197, nome: 'Françoise Forton', frequencia: 92, atrasosSemana: 0 },
      { id: 198, nome: 'Giuseppe Oristanio', frequencia: 89, atrasosSemana: 1 },
      { id: 199, nome: 'Henri Pagnoncelli', frequencia: 94, atrasosSemana: 0 },
      { id: 200, nome: 'Inês Galvão', frequencia: 90, atrasosSemana: 1 },
      { id: 201, nome: 'Jonas Bloch', frequencia: 95, atrasosSemana: 0 },
      { id: 202, nome: 'Kátia Drummond', frequencia: 87, atrasosSemana: 2 },
      { id: 203, nome: 'Lucinha Lins', frequencia: 97, atrasosSemana: 0 },
      { id: 204, nome: 'Mario Gomes', frequencia: 82, atrasosSemana: 4 },
      { id: 205, nome: 'Nuno Leal', frequencia: 91, atrasosSemana: 0 },
      { id: 206, nome: 'Orlando Uprety', frequencia: 93, atrasosSemana: 0 },
      { id: 207, nome: 'Paulo César Grande', frequencia: 86, atrasosSemana: 2 },
      { id: 208, nome: 'Rosamaria Murtinho', frequencia: 96, atrasosSemana: 0 },
      { id: 209, nome: 'Sérgio Mamberti', frequencia: 94, atrasosSemana: 0 },
      { id: 210, nome: 'Tássia Camargo', frequencia: 89, atrasosSemana: 1 },
      { id: 211, nome: 'Umberto Magnani Jr', frequencia: 90, atrasosSemana: 1 },
      { id: 212, nome: 'Virginia Cavendish', frequencia: 95, atrasosSemana: 0 },
      { id: 213, nome: 'Walderez de Barros', frequencia: 98, atrasosSemana: 0 },
      { id: 214, nome: 'Zilbeto Santos', frequencia: 84, atrasosSemana: 3 },
      { id: 215, nome: 'Angela Vieira', frequencia: 92, atrasosSemana: 0 },
      { id: 216, nome: 'Bemvindo Sequeira', frequencia: 88, atrasosSemana: 2 },
      { id: 217, nome: 'Cecil Thiré', frequencia: 91, atrasosSemana: 0 },
      { id: 218, nome: 'Djenane Machado', frequencia: 93, atrasosSemana: 0 }
    ]
  },
  '1ma': {
    nome: '1º Ano Médio A',
    professor: 'Castro',
    horario: '06:50',
    alunos: [
      { id: 219, nome: 'Alfonso Herrera', frequencia: 95, atrasosSemana: 0 },
      { id: 220, nome: 'Anahí Portilla', frequencia: 98, atrasosSemana: 0 },
      { id: 221, nome: 'Christian Chávez', frequencia: 87, atrasosSemana: 2 },
      { id: 222, nome: 'Christopher Uckermann', frequencia: 91, atrasosSemana: 0 },
      { id: 223, nome: 'Dulce María', frequencia: 94, atrasosSemana: 0 },
      { id: 224, nome: 'Maite Perroni', frequencia: 96, atrasosSemana: 0 },
      { id: 225, nome: 'Angelique Boyer', frequencia: 92, atrasosSemana: 1 },
      { id: 226, nome: 'Sebastian Rulli', frequencia: 89, atrasosSemana: 1 },
      { id: 227, nome: 'William Levy', frequencia: 83, atrasosSemana: 3 },
      { id: 228, nome: 'Maite Proença Jr', frequencia: 90, atrasosSemana: 1 },
      { id: 229, nome: 'Jaime Camil', frequencia: 93, atrasosSemana: 0 },
      { id: 230, nome: 'Lucero Hogaza', frequencia: 97, atrasosSemana: 0 },
      { id: 231, nome: 'Fernando Colunga', frequencia: 91, atrasosSemana: 0 },
      { id: 232, nome: 'Gaby Spanic', frequencia: 86, atrasosSemana: 2 },
      { id: 233, nome: 'César Évora', frequencia: 95, atrasosSemana: 0 },
      { id: 234, nome: 'Victoria Ruffo', frequencia: 94, atrasosSemana: 0 },
      { id: 235, nome: 'Eduardo Santamarina', frequencia: 88, atrasosSemana: 2 },
      { id: 236, nome: 'Jacqueline Bracamontes', frequencia: 96, atrasosSemana: 0 },
      { id: 237, nome: 'David Zepeda', frequencia: 90, atrasosSemana: 1 },
      { id: 238, nome: 'Silvia Navarro', frequencia: 92, atrasosSemana: 0 },
      { id: 239, nome: 'Daniel Arenas', frequencia: 85, atrasosSemana: 3 },
      { id: 240, nome: 'Ana Brenda Contreras', frequencia: 93, atrasosSemana: 0 },
      { id: 241, nome: 'Jorge Salinas', frequencia: 89, atrasosSemana: 1 },
      { id: 242, nome: 'Aracely Arámbula', frequencia: 97, atrasosSemana: 0 },
      { id: 243, nome: 'Gabriel Soto', frequencia: 91, atrasosSemana: 0 },
      { id: 244, nome: 'Irina Baeva', frequencia: 94, atrasosSemana: 0 },
      { id: 245, nome: 'Carlos Rivera', frequencia: 98, atrasosSemana: 0 },
      { id: 246, nome: 'Danna Paola', frequencia: 92, atrasosSemana: 1 }
    ]
  },
  '1mb': {
    nome: '1º Ano Médio B',
    professor: 'Duarte',
    horario: '06:50',
    alunos: [
      { id: 247, nome: 'Aitana Ocaña', frequencia: 93, atrasosSemana: 0 },
      { id: 248, nome: 'Bad Bunny Ramos', frequencia: 78, atrasosSemana: 4 },
      { id: 249, nome: 'Camilo Echeverry', frequencia: 96, atrasosSemana: 0 },
      { id: 250, nome: 'Dua Lipa Santos', frequencia: 95, atrasosSemana: 0 },
      { id: 251, nome: 'Ed Sheeran Souza', frequencia: 91, atrasosSemana: 0 },
      { id: 252, nome: 'Feid Salomão', frequencia: 86, atrasosSemana: 2 },
      { id: 253, nome: 'Karol G Ribeiro', frequencia: 94, atrasosSemana: 0 },
      { id: 254, nome: 'Lorde Yelich', frequencia: 90, atrasosSemana: 1 },
      { id: 255, nome: 'Maluma Londoño', frequencia: 88, atrasosSemana: 2 },
      { id: 256, nome: 'Natti Natasha', frequencia: 92, atrasosSemana: 0 },
      { id: 257, nome: 'Ozuna Rosado', frequencia: 84, atrasosSemana: 3 },
      { id: 258, nome: 'Rosalía Vila', frequencia: 97, atrasosSemana: 0 },
      { id: 259, nome: 'Rauw Alejandro', frequencia: 89, atrasosSemana: 1 },
      { id: 260, nome: 'Shawn Mendes', frequencia: 93, atrasosSemana: 0 },
      { id: 261, nome: 'Tini Stoessel', frequencia: 96, atrasosSemana: 0 },
      { id: 262, nome: 'Harry Styles', frequencia: 98, atrasosSemana: 0 },
      { id: 263, nome: 'Olivia Rodrigo', frequencia: 92, atrasosSemana: 1 },
      { id: 264, nome: 'Billie Eilish', frequencia: 87, atrasosSemana: 2 },
      { id: 265, nome: 'Conan Gray', frequencia: 91, atrasosSemana: 0 },
      { id: 266, nome: 'Sabrina Carpenter', frequencia: 95, atrasosSemana: 0 },
      { id: 267, nome: 'Tate McRae', frequencia: 89, atrasosSemana: 1 },
      { id: 268, nome: 'Troye Sivan', frequencia: 94, atrasosSemana: 0 },
      { id: 269, nome: 'Charli XCX', frequencia: 82, atrasosSemana: 3 },
      { id: 270, nome: 'Chappell Roan', frequencia: 90, atrasosSemana: 1 },
      { id: 271, nome: 'Benson Boone', frequencia: 93, atrasosSemana: 0 }
    ]
  },
  '1mc': {
    nome: '1º Ano Médio C',
    professor: 'Santos',
    horario: '06:50',
    alunos: [
      { id: 272, nome: 'Ayrton Senna da Silva', frequencia: 99, atrasosSemana: 0 },
      { id: 273, nome: 'Alain Prost Lechner', frequencia: 94, atrasosSemana: 0 },
      { id: 274, nome: 'Michael Schumacher', frequencia: 97, atrasosSemana: 0 },
      { id: 275, nome: 'Lewis Hamilton', frequencia: 96, atrasosSemana: 0 },
      { id: 276, nome: 'Max Verstappen', frequencia: 95, atrasosSemana: 0 },
      { id: 277, nome: 'Fernando Alonso', frequencia: 91, atrasosSemana: 1 },
      { id: 278, nome: 'Sebastian Vettel', frequencia: 98, atrasosSemana: 0 },
      { id: 279, nome: 'Charles Leclerc', frequencia: 88, atrasosSemana: 2 },
      { id: 280, nome: 'Lando Norris', frequencia: 90, atrasosSemana: 1 },
      { id: 281, nome: 'Carlos Sainz Jr', frequencia: 93, atrasosSemana: 0 },
      { id: 282, nome: 'George Russell', frequencia: 92, atrasosSemana: 0 },
      { id: 283, nome: 'Oscar Piastri', frequencia: 96, atrasosSemana: 0 },
      { id: 284, nome: 'Sergio Perez', frequencia: 81, atrasosSemana: 4 },
      { id: 285, nome: 'Daniel Ricciardo', frequencia: 89, atrasosSemana: 1 },
      { id: 286, nome: 'Valtteri Bottas', frequencia: 87, atrasosSemana: 2 },
      { id: 287, nome: 'Pierre Gasly', frequencia: 91, atrasosSemana: 0 },
      { id: 288, nome: 'Esteban Ocon', frequencia: 84, atrasosSemana: 3 },
      { id: 289, nome: 'Alexander Albon', frequencia: 93, atrasosSemana: 0 },
      { id: 290, nome: 'Yuki Tsunoda', frequencia: 85, atrasosSemana: 3 },
      { id: 291, nome: 'Lance Stroll', frequencia: 79, atrasosSemana: 4 },
      { id: 292, nome: 'Nico Hulkenberg', frequencia: 94, atrasosSemana: 0 },
      { id: 293, nome: 'Kevin Magnussen', frequencia: 86, atrasosSemana: 2 },
      { id: 294, nome: 'Guanyu Zhou', frequencia: 92, atrasosSemana: 0 },
      { id: 295, nome: 'Logan Sargeant', frequencia: 76, atrasosSemana: 5 },
      { id: 296, nome: 'Kimi Raikkonen', frequencia: 90, atrasosSemana: 1 },
      { id: 297, nome: 'Felipe Massa', frequencia: 93, atrasosSemana: 0 },
      { id: 298, nome: 'Rubens Barrichello', frequencia: 88, atrasosSemana: 2 },
      { id: 299, nome: 'Nelson Piquet', frequencia: 89, atrasosSemana: 1 },
      { id: 300, nome: 'Emerson Fittipaldi', frequencia: 95, atrasosSemana: 0 }
    ]
  },
  '2ma': {
    nome: '2º Ano Médio A',
    professor: 'Fernandes',
    horario: '06:50',
    alunos: [
      { id: 301, nome: 'Alisson Becker', frequencia: 97, atrasosSemana: 0 },
      { id: 302, nome: 'Ederson Moraes', frequencia: 95, atrasosSemana: 0 },
      { id: 303, nome: 'Marquinhos Corrêa', frequencia: 94, atrasosSemana: 0 },
      { id: 304, nome: 'Eder Militão', frequencia: 91, atrasosSemana: 1 },
      { id: 305, nome: 'Gabriel Magalhães', frequencia: 93, atrasosSemana: 0 },
      { id: 306, nome: 'Danilo Luiz', frequencia: 89, atrasosSemana: 1 },
      { id: 307, nome: 'Renan Lodi', frequencia: 86, atrasosSemana: 2 },
      { id: 308, nome: 'Casemiro Augusto', frequencia: 96, atrasosSemana: 0 },
      { id: 309, nome: 'Bruno Guimarães', frequencia: 98, atrasosSemana: 0 },
      { id: 310, nome: 'Lucas Paquetá', frequencia: 85, atrasosSemana: 3 },
      { id: 311, nome: 'Rodrygo Goes', frequencia: 95, atrasosSemana: 0 },
      { id: 312, nome: 'Raphinha Dias', frequencia: 92, atrasosSemana: 0 },
      { id: 313, nome: 'Gabriel Jesus', frequencia: 88, atrasosSemana: 2 },
      { id: 314, nome: 'Richarlison Andrade', frequencia: 90, atrasosSemana: 1 },
      { id: 315, nome: 'Gabriel Martinelli', frequencia: 94, atrasosSemana: 0 },
      { id: 316, nome: 'Endrick Felipe', frequencia: 96, atrasosSemana: 0 },
      { id: 317, nome: 'Savinho Moreira', frequencia: 91, atrasosSemana: 0 },
      { id: 318, nome: 'Douglas Luiz', frequencia: 87, atrasosSemana: 2 },
      { id: 319, nome: 'João Gomes', frequencia: 93, atrasosSemana: 0 },
      { id: 320, nome: 'Lucas Beraldo', frequencia: 92, atrasosSemana: 0 },
      { id: 321, nome: 'Yan Couto', frequencia: 89, atrasosSemana: 1 },
      { id: 322, nome: 'Bento Matheus', frequencia: 97, atrasosSemana: 0 },
      { id: 323, nome: 'Rafael Cabral', frequencia: 90, atrasosSemana: 1 },
      { id: 324, nome: 'Bremer Silva', frequencia: 94, atrasosSemana: 0 },
      { id: 325, nome: 'Pepê Aquino', frequencia: 86, atrasosSemana: 2 },
      { id: 326, nome: 'Evanilson Lima', frequencia: 91, atrasosSemana: 0 }
    ]
  },
  '2mb': {
    nome: '2º Ano Médio B',
    professor: 'Costa',
    horario: '06:50',
    alunos: [
      { id: 327, nome: 'Adele Adkins', frequencia: 98, atrasosSemana: 0 },
      { id: 328, nome: 'Beyoncé Knowles', frequencia: 99, atrasosSemana: 0 },
      { id: 329, nome: 'Bruno Mars', frequencia: 92, atrasosSemana: 0 },
      { id: 330, nome: 'Celine Dion', frequencia: 96, atrasosSemana: 0 },
      { id: 331, nome: 'Drake Graham', frequencia: 84, atrasosSemana: 3 },
      { id: 332, nome: 'Eminem Mathers', frequencia: 90, atrasosSemana: 1 },
      { id: 333, nome: 'Frank Ocean', frequencia: 81, atrasosSemana: 4 },
      { id: 334, nome: 'Lady Gaga', frequencia: 97, atrasosSemana: 0 },
      { id: 335, nome: 'Katy Perry', frequencia: 91, atrasosSemana: 0 },
      { id: 336, nome: 'Justin Bieber', frequencia: 83, atrasosSemana: 3 },
      { id: 337, nome: 'Rihanna Fenty', frequencia: 95, atrasosSemana: 0 },
      { id: 338, nome: 'Taylor Swift', frequencia: 100, atrasosSemana: 0 },
      { id: 339, nome: 'Usher Raymond', frequencia: 88, atrasosSemana: 2 },
      { id: 340, nome: 'The Weeknd Tesfaye', frequencia: 93, atrasosSemana: 0 },
      { id: 341, nome: 'Alicia Keys', frequencia: 96, atrasosSemana: 0 },
      { id: 342, nome: 'Coldplay Martin', frequencia: 94, atrasosSemana: 0 },
      { id: 343, nome: 'Lana Del Rey', frequencia: 87, atrasosSemana: 2 },
      { id: 344, nome: 'Post Malone', frequencia: 82, atrasosSemana: 3 },
      { id: 345, nome: 'Ariana Grande', frequencia: 97, atrasosSemana: 0 },
      { id: 346, nome: 'Kendrick Lamar', frequencia: 95, atrasosSemana: 0 },
      { id: 347, nome: 'SZA Rowe', frequencia: 90, atrasosSemana: 1 },
      { id: 348, nome: 'Travis Scott', frequencia: 78, atrasosSemana: 4 },
      { id: 349, nome: 'Doja Cat', frequencia: 89, atrasosSemana: 1 },
      { id: 350, nome: 'Jack Harlow', frequencia: 91, atrasosSemana: 0 },
      { id: 351, nome: 'Megan Thee Stallion', frequencia: 93, atrasosSemana: 0 },
      { id: 352, nome: 'Lizzo Jefferson', frequencia: 92, atrasosSemana: 0 },
      { id: 353, nome: 'Lil Nas X', frequencia: 86, atrasosSemana: 2 }
    ]
  },
  '3ma': {
    nome: '3º Ano Médio A',
    professor: 'Silva',
    horario: '06:50',
    alunos: [
      { id: 354, nome: 'Lionel Messi', frequencia: 100, atrasosSemana: 0 },
      { id: 355, nome: 'Cristiano Ronaldo', frequencia: 100, atrasosSemana: 0 },
      { id: 356, nome: 'Neymar da Silva Jr', frequencia: 85, atrasosSemana: 3 },
      { id: 357, nome: 'Kylian Mbappé', frequencia: 97, atrasosSemana: 0 },
      { id: 358, nome: 'Erling Haaland', frequencia: 98, atrasosSemana: 0 },
      { id: 359, nome: 'Kevin De Bruyne', frequencia: 96, atrasosSemana: 0 },
      { id: 360, nome: 'Mohamed Salah', frequencia: 95, atrasosSemana: 0 },
      { id: 361, nome: 'Robert Lewandowski', frequencia: 94, atrasosSemana: 0 },
      { id: 362, nome: 'Luka Modric', frequencia: 99, atrasosSemana: 0 },
      { id: 363, nome: 'Karim Benzema', frequencia: 88, atrasosSemana: 2 },
      { id: 364, nome: 'Harry Kane', frequencia: 93, atrasosSemana: 0 },
      { id: 365, nome: 'Antoine Griezmann', frequencia: 92, atrasosSemana: 0 },
      { id: 366, nome: 'Virgil van Dijk', frequencia: 96, atrasosSemana: 0 },
      { id: 367, nome: 'Thibaut Courtois', frequencia: 91, atrasosSemana: 0 },
      { id: 368, nome: 'Bernardo Silva', frequencia: 97, atrasosSemana: 0 },
      { id: 369, nome: 'Bruno Fernandes', frequencia: 93, atrasosSemana: 0 },
      { id: 370, nome: 'Ruben Dias', frequencia: 95, atrasosSemana: 0 },
      { id: 371, nome: 'Jude Bellingham', frequencia: 98, atrasosSemana: 0 },
      { id: 372, nome: 'Pedri González', frequencia: 90, atrasosSemana: 1 },
      { id: 373, nome: 'Gavi Páez', frequencia: 86, atrasosSemana: 2 },
      { id: 374, nome: 'Jamal Musiala', frequencia: 94, atrasosSemana: 0 },
      { id: 375, nome: 'Florian Wirtz', frequencia: 96, atrasosSemana: 0 },
      { id: 376, nome: 'Bukayo Saka', frequencia: 97, atrasosSemana: 0 },
      { id: 377, nome: 'Phil Foden', frequencia: 92, atrasosSemana: 0 },
      { id: 378, nome: 'Federico Valverde', frequencia: 99, atrasosSemana: 0 },
      { id: 379, nome: 'Eduardo Camavinga', frequencia: 91, atrasosSemana: 1 },
      { id: 380, nome: 'Aurelien Tchouameni', frequencia: 93, atrasosSemana: 0 },
      { id: 381, nome: 'Lautaro Martínez', frequencia: 89, atrasosSemana: 1 }
    ]
  },
  '3me': {
    nome: '3º Ano Médio E',
    professor: 'Mendes',
    horario: '06:50',
    alunos: [
      { id: 382, nome: 'Casimiro Miguel', frequencia: 82, atrasosSemana: 3 },
      { id: 383, nome: 'Alexandre Gaules', frequencia: 88, atrasosSemana: 2 },
      { id: 384, nome: 'Felipe Neto', frequencia: 91, atrasosSemana: 0 },
      { id: 385, nome: 'Lucas Neto', frequencia: 93, atrasosSemana: 0 },
      { id: 386, nome: 'Pedro Rezende', frequencia: 86, atrasosSemana: 2 },
      { id: 387, nome: 'Julio Cocielo', frequencia: 84, atrasosSemana: 3 },
      { id: 388, nome: 'Whindersson Nunes', frequencia: 80, atrasosSemana: 4 },
      { id: 389, nome: 'Christian Figueiredo', frequencia: 89, atrasosSemana: 1 },
      { id: 390, nome: 'Marcos Mion', frequencia: 95, atrasosSemana: 0 },
      { id: 391, nome: 'Luciano Huck', frequencia: 97, atrasosSemana: 0 },
      { id: 392, nome: 'Celso Portiolli', frequencia: 96, atrasosSemana: 0 },
      { id: 393, nome: 'Rodrigo Faro', frequencia: 90, atrasosSemana: 1 },
      { id: 394, nome: 'Ana Maria Braga', frequencia: 98, atrasosSemana: 0 },
      { id: 395, nome: 'Fátima Bernardes', frequencia: 94, atrasosSemana: 0 },
      { id: 396, nome: 'Pedro Bial', frequencia: 92, atrasosSemana: 0 },
      { id: 397, nome: 'Serginho Groisman', frequencia: 95, atrasosSemana: 0 },
      { id: 398, nome: 'Tiago Leifert', frequencia: 91, atrasosSemana: 0 },
      { id: 399, nome: 'Tadeu Schmidt', frequencia: 93, atrasosSemana: 0 },
      { id: 400, nome: 'Sabrina Sato Jr', frequencia: 89, atrasosSemana: 1 },
      { id: 401, nome: 'Mionzinho Santos', frequencia: 85, atrasosSemana: 2 },
      { id: 402, nome: 'Pyong Lee', frequencia: 92, atrasosSemana: 0 },
      { id: 403, nome: 'Babu Santana', frequencia: 87, atrasosSemana: 2 },
      { id: 404, nome: 'Prior Nogueira', frequencia: 77, atrasosSemana: 5 },
      { id: 405, nome: 'Manu Gavassi', frequencia: 94, atrasosSemana: 0 },
      { id: 406, nome: 'Rafa Kalimann', frequencia: 96, atrasosSemana: 0 },
      { id: 407, nome: 'Juliette Freire', frequencia: 99, atrasosSemana: 0 },
      { id: 408, nome: 'Gil do Vigor', frequencia: 98, atrasosSemana: 0 },
      { id: 409, nome: 'Arthur Picoli', frequencia: 83, atrasosSemana: 3 }
    ]
  }
};

// ==============================================================================
// 2. TEMPLATES DAS PÁGINAS ESTÁTICAS E RENDERIZADORES
// ==============================================================================

function renderPainel() {
  const alunosAtrasados = [
    { nome: 'Lucas Mendes Andrade', turma: '3º Ano B', turno: 'Matutino', horario: '07:05', atraso: '+15m' },
    { nome: 'Ana Clara Silva', turma: '1º Ano A', turno: 'Matutino', horario: '07:12', atraso: '+22m' },
    { nome: 'Gabriel Ramos Oliveira', turma: '1º Ano B', turno: 'Matutino', horario: '07:18', atraso: '+28m' },
    { nome: 'Matheus Henrique Costa', turma: '1º Ano A', turno: 'Matutino', horario: '07:02', atraso: '+12m' },
    { nome: 'Beatriz Santos Souza', turma: '3º Ano A', turno: 'Matutino', horario: '07:15', atraso: '+25m' },
    { nome: 'Guilherme Ferreira Lima', turma: '3º Ano E', turno: 'Matutino', horario: '07:20', atraso: '+30m' }
  ];

  return `
    <div class="page-header" style="margin-bottom: 24px;">
      <h1 style="font-size: 24px; font-weight: 700; color: #00236f; margin: 0;">Visão Geral - Hoje</h1>
      <p style="font-size: 14px; color: #64748b; margin: 4px 0 0 0;">Acompanhamento de fluxo de entrada e controle de frequência</p>
    </div>

    <!-- Indicadores Principais -->
    <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 32px;">
      <div class="card" style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <span style="font-size: 14px; color: #64748b;">Total de Alunos</span>
        <div style="font-size: 28px; font-weight: 700; color: #1e293b; margin-top: 8px;">1,248</div>
        <span style="font-size: 12px; color: #64748b;">Matriculados ativos</span>
      </div>
      <div class="card" style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <span style="font-size: 14px; color: #64748b;">Presentes</span>
        <div style="font-size: 28px; font-weight: 700; color: #16a34a; margin-top: 8px;">1,156</div>
        <span style="font-size: 12px; color: #16a34a; font-weight: 600;">↑ 92.6% Frequência</span>
      </div>
      <div class="card" style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <span style="font-size: 14px; color: #64748b;">Ausentes</span>
        <div style="font-size: 28px; font-weight: 700; color: #e11d48; margin-top: 8px;">92</div>
        <span style="font-size: 12px; color: #e11d48; font-weight: 600;">↓ 7.4% Faltas</span>
      </div>
    </section>

    <!-- Cabeçalho da Seção de Atrasados -->
    <div style="margin-bottom: 16px;">
      <h2 style="font-size: 20px; font-weight: 700; color: #dc2626; margin: 0;">Alunos Atrasados</h2>
    </div>

    <!-- Cards de Atrasados -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
      ${alunosAtrasados.map(aluno => `
        <div style="background: #fff; padding: 16px; border-radius: 8px; border: 1px solid #fee2e2;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong style="color: #1e293b; display: block;">${aluno.nome}</strong>
              <span style="font-size: 13px; color: #64748b;">${aluno.turma} • ${aluno.turno}</span>
            </div>
            <span style="background: #fef2f2; color: #991b1b; font-size: 12px; font-weight: 600; padding: 4px 8px; border-radius: 4px;">
              Chegada: ${aluno.horario} (${aluno.atraso})
            </span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderTurmasGrid() {
  const cardsHTML = Object.entries(turmasData).map(([id, turma]) => {
    const totalAlunos = turma.alunos.length;
    const mediaPresenca = totalAlunos > 0
      ? Math.round(turma.alunos.reduce((acc, a) => acc + a.frequencia, 0) / totalAlunos)
      : 0;

    let colorClass = '#2563eb';
    if (mediaPresenca >= 90) colorClass = '#16a34a';
    if (mediaPresenca < 80) colorClass = '#dc2626';

    return `
      <div onclick="window.location.hash = '#/turma/${id}'" 
           style="background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;"
           onmouseover="this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1)'; this.style.transform='translateY(-2px)';"
           onmouseout="this.style.boxShadow='none'; this.style.transform='translateY(0)';">
        <div>
          <h3 style="font-size: 18px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">${turma.nome}</h3>
          <p style="font-size: 13px; • Horário: ${turma.horario}</p>
        </div>
        <div style="background-color: #f8fafc; border-radius: 6px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">ALUNOS</span>
            <span style="font-size: 18px; font-weight: 700; color: #1e293b;">${totalAlunos}</span>
          </div>
          <div style="text-align: right;">
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">PRESENÇA</span>
            <span style="font-size: 18px; font-weight: 700; color: ${colorClass};">${mediaPresenca}%</span>
          </div>
        </div>
        <div style="width: 100%; height: 6px; background-color: #e2e8f0; border-radius: 999px; overflow: hidden;">
          <div style="width: ${mediaPresenca}%; height: 100%; background-color: ${colorClass}; border-radius: 999px;"></div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h1 style="font-size: 24px; font-weight: 700; color: #0f172a; margin: 0;">Painel de Turmas</h1>
      <button style="background-color: #00236f; color: #ffffff; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; font-size: 14px; cursor: pointer;">+ Nova Turma</button>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
      ${cardsHTML}
    </div>
  `;
}

function renderDetalhesTurma(turmaId) {
  const turma = turmasData[turmaId];

  if (!turma) {
    return `
      <div style="padding: 24px; text-align: center;">
        <h2 style="color: #1e293b;">Turma não encontrada.</h2>
        <a href="#/turmas" style="color: #00236f; font-weight: 600; text-decoration: none;">← Voltar para a lista de turmas</a>
      </div>
    `;
  }

  const linhasAlunos = turma.alunos.map(aluno => {
    const statusAtraso = aluno.atrasosSemana > 0
      ? `<span style="background: #fef3c7; color: #92400e; font-size: 12px; font-weight: 600; padding: 4px 8px; border-radius: 4px;">${aluno.atrasosSemana} atraso(s) na semana</span>`
      : `<span style="background: #dcfce7; color: #166534; font-size: 12px; font-weight: 600; padding: 4px 8px; border-radius: 4px;">Nenhum atraso</span>`;

    const progressoCor = aluno.frequencia >= 90 ? '#16a34a' : (aluno.frequencia >= 80 ? '#eab308' : '#dc2626');

    return `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 14px 16px; font-weight: 600; color: #1e293b;">${aluno.nome}</td>
        <td style="padding: 14px 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-weight: 700; color: #334155; min-width: 40px;">${aluno.frequencia}%</span>
            <div style="width: 100px; height: 6px; background-color: #e2e8f0; border-radius: 999px; overflow: hidden;">
              <div style="width: ${aluno.frequencia}%; height: 100%; background-color: ${progressoCor}; border-radius: 999px;"></div>
            </div>
          </div>
        </td>
        <td style="padding: 14px 16px;">${statusAtraso}</td>
      </tr>
    `;
  }).join('');

  return `
    <div style="margin-bottom: 24px;">
      <a href="#/turmas" style="color: #64748b; text-decoration: none; font-size: 14px; font-weight: 600; display: inline-block; margin-bottom: 12px;">← Voltar para Turmas</a>
      <h1 style="font-size: 24px; font-weight: 700; color: #00236f; margin: 0;">${turma.nome}</h1>
      <p style="font-size: 14px; color: #64748b; margin: 4px 0 0 0;">Prof(a). Responsável: ${turma.professor} • Horário limite: ${turma.horario}</p>
    </div>

    <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
        <thead>
          <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">
            <th style="padding: 14px 16px;">Nome do Aluno</th>
            <th style="padding: 14px 16px;">Frequência Semanal (%)</th>
            <th style="padding: 14px 16px;">Atrasos na Semana</th>
          </tr>
        </thead>
        <tbody>
          ${linhasAlunos}
        </tbody>
      </table>
    </div>
  `;
}

function renderRelatorios() {
  return `
    <div style="margin-bottom: 24px;">
      <h1 style="font-size: 24px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">Relatórios e Gestão</h1>
      <p style="font-size: 14px; color: #64748b; margin: 0;">Emissão e exportação de documentos consolidados de assiduidade</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
      <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h3 style="font-size: 18px; font-weight: 700; color: #1e293b; margin: 0 0 8px 0;">📅 Relatório Diário</h3>
        <p style="font-size: 14px; color: #64748b; margin: 0 0 16px 0;">Consolidado contendo entradas no horário e registros de atraso do dia.</p>
        <button style="width: 100%; padding: 10px; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; color: #334155; font-weight: 600; cursor: pointer;">Gerar PDF</button>
      </div>

      <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h3 style="font-size: 18px; font-weight: 700; color: #1e293b; margin: 0 0 8px 0;">📊 Relatório Semanal</h3>
        <p style="font-size: 14px; color: #64748b; margin: 0 0 16px 0;">Resumo consolidado de presença, faltas e contagem de atrasos dos últimos 7 dias.</p>
        <button style="width: 100%; padding: 10px; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; color: #334155; font-weight: 600; cursor: pointer;">Exportar CSV</button>
      </div>
    </div>
  `;
}


// ==============================================================================
// 3. ROTEADOR SINGLE PAGE APPLICATION (SPA)
// ==============================================================================

function navigate() {
  const hash = window.location.hash.replace(/^#\/?/, '') || 'painel';
  const pageContent = document.getElementById('page-content');

  if (!pageContent) return;

  const [route, id] = hash.split('/');

  // Mapeamento dinâmico de views
  if (route === 'painel') {
    pageContent.innerHTML = renderPainel();
  } else if (route === 'turmas') {
    pageContent.innerHTML = renderTurmasGrid();
  } else if (route === 'turma' && id) {
    pageContent.innerHTML = renderDetalhesTurma(id);
  } else if (route === 'relatorios') {
    pageContent.innerHTML = renderRelatorios();
  } else if (route === 'configuracoes') {
    pageContent.innerHTML = renderConfiguracoes();
  } else {
    pageContent.innerHTML = renderPainel();
  }

  // Atualização dos estados de menu/navegação
  document.querySelectorAll('.nav-item').forEach(item => {
    const pageAttr = item.getAttribute('data-page');
    if (pageAttr === route || (route === 'turma' && pageAttr === 'turmas')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Ouvintes globais
window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', navigate);