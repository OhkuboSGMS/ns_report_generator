from docx import Document

file_name = "test.docx"

document = Document(file_name)

for i,par in enumerate(document.paragraphs):
    print(i,par.text)
for i,tbl in enumerate(document.tables):
    for row in tbl.rows:
        for cell in row.cells:
                print(cell.text,end="")
        print()
