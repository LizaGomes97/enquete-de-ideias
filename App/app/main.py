from flask import Flask, render_template, request, redirect, url_for
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')



 # Ajax ?
@app.route('/sugestoes', methods=['GET', 'POST'])
def sugestoes():
    if request.method == 'POST':
        titulo = request.form['title']
        descricao = request.form['description']
        liguagem = request.form['language']
        complexidade = request.form['complexity']
        
        sugestoes.append({
            'titulo': titulo,
            'descricao': descricao,
            'linguagem': liguagem,
            'complexidade': complexidade
        })

        print(titulo,descricao,liguagem,complexidade)
        return redirect(url_for('index')) 
    return render_template('sugestoes.html',sugestoes=sugestoes)

if __name__ == '__main__':
    app.run(debug=True)
