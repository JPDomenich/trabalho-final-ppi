import express from "express";

const host = "localhost";
const port = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));

let listaUsuarios = [];

let logado = false;


// Rota do index
app.get("/", (req, res) => {
  let index = `
    <html lang="pt-br">
      <head>
          <meta charset="UTF-8">
          <title>Página inicial do site</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
              <div class="container-fluid">
                  <a class="navbar-brand" href="/">Menu do site</a>
                  <div class="collapse navbar-collapse">
                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                          <li class="nav-item">
                              <a class="nav-link" href="/cadastroFornecedor">Cadastrar Fornecedores</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="/listaUsuarios">Listar Fornecedores</a>
                          </li>`
            if(!logado){
              index += `<li class="nav-item">
                              <a class="nav-link" href="/login" ">Logar</a>
                          </li>`
            }
            else{
              index += `<li class="nav-item">
                              <a class="nav-link" href="/sair" >Sair</a>
                          </li>`
            }
                          
            index += `
                      </ul>
                  </div>
              </div>
          </nav>
      </body>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
    </html>
  `; 

  res.send(index);
});

// Rota do Cadastro
app.get("/cadastroFornecedor", (req, res) => {
  let cadastro = `
    <html lang="pt-br">
      <head>
          <meta charset="UTF-8">
          <title>Cadastro de Usuários</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
              <div class="container-fluid">
                  <a class="navbar-brand" href="/">Menu do site</a>
                  <div class="collapse navbar-collapse">
                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                          <li class="nav-item">
                              <a class="nav-link" href="/cadastroFornecedor">Cadastrar Fornecedores</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="/listaUsuarios">Listar Fornecedores</a>
                          </li>`
            if(!logado){
              cadastro += `<li class="nav-item">
                              <a class="nav-link" href="/login" ">Logar</a>
                          </li>`
            }
            else{
              cadastro += `<li class="nav-item">
                              <a class="nav-link" href="/sair" >Sair</a>
                          </li>`
            }
                          
            cadastro += `
                      </ul>
                  </div>
              </div>
          </nav> 
          <div class="container w-75 mb-5 mt-5">
              <form method="POST" action="/cadastroFornecedor" class="row g-3 border p-3 rounded shadow-sm">
                  <fieldset>
                      <legend class="text-center">Cadastro de Usuários</legend>
                  </fieldset>

                  <div class="col-md-4">
                      <label class="form-label">CNPJ</label>
                      <input type="text" class="form-control" name="cnpj" >
                  </div>

                  <div class="col-md-4">
                      <label class="form-label">Razão Social</label>
                      <input type="text" class="form-control" name="social" >
                  </div>

                  <div class="col-md-4">
                      <label class="form-label">Nome Fantasia</label>
                      <input type="text" class="form-control" name="fantasia" >
                  </div>

                  <div class="col-md-4">
                      <label class="form-label">Endereço</label>
                      <input type="text" class="form-control" name="endereco" >
                  </div>

                  <div class="col-md-6">
                      <label class="form-label">Cidade</label>
                      <input type="text" class="form-control" name="cidade">
                  </div>

                  <div class="col-md-3">
                      <label class="form-label">UF</label>
                      <select class="form-select" name="estado">
                          <option value="">Selecione</option>
                          <option>AC</option>
                          <option>AL</option>
                          <option>AP</option>
                          <option>AM</option>
                          <option>BA</option>
                          <option>CE</option>
                          <option>DF</option>
                          <option>ES</option>
                          <option>GO</option>
                          <option>MA</option>
                          <option>MT</option>
                          <option>MS</option>
                          <option>MG</option>
                          <option>PA</option>
                          <option>PB</option>
                          <option>PR</option>
                          <option>PE</option>
                          <option>PI</option>
                          <option>RJ</option>
                          <option>RN</option>
                          <option>RS</option>
                          <option>RO</option>
                          <option>RR</option>
                          <option>SC</option>
                          <option>SP</option>
                          <option>SE</option>
                          <option>TO</option>
                      </select>
                  </div>

                  <div class="col-md-3">
                      <label class="form-label">CEP</label>
                      <input type="text" class="form-control" name="cep" >
                  </div>

                  <div class="col-md-3">
                      <label class="form-label">Email</label>
                      <input type="email" class="form-control" name="email" >
                  </div>

                  <div class="col-md-4">
                      <label class="form-label">Telefone</label>
                      <input type="text" class="form-control" name="tel" >
                  </div>

                  <div class="col-12">
                      <button class="btn btn-primary" type="submit">Cadastrar Usuário</button>
                      <a class="btn btn-secondary" href="/">Voltar</a>
                  </div>
              </form>
          </div>
      </body>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
    </html>
  `;

  res.send(cadastro);
});

// Post do Cadastro
app.post("/cadastroFornecedor", (req, res) => {
  const { cnpj, social, fantasia, endereco, cidade, estado, cep, email, tel } = req.body;

  if (cnpj && social && fantasia && endereco && cidade && estado && cep && email && tel) {
    listaUsuarios.push({ cnpj, social, fantasia, endereco, cidade, estado, cep, email, tel });
  } 
  else {
    let devolve = `<html lang="pt-br">
      <head>
          <meta charset="UTF-8">
          <title>Cadastro de Usuários</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
              <div class="container-fluid">
                  <a class="navbar-brand" href="/">Menu do site</a>
                  <div class="collapse navbar-collapse">
                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                          <li class="nav-item">
                              <a class="nav-link" href="/cadastroFornecedor">Cadastrar Fornecedores</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="/listaUsuarios">Listar Fornecedores</a>
                          </li>
                          `;
            if(!logado){
              devolve += `<li class="nav-item">
                              <a class="nav-link" href="/login" ">Logar</a>
                          </li>`;
            }
            else{
              devolve += `<li class="nav-item">
                              <a class="nav-link" href="/sair" >Sair</a>
                          </li>`;
            }
                          
            devolve += `
                      </ul>
                  </div>
              </div>
          </nav>
          <div class="container w-75 mb-5 mt-5">
              <form method="POST" action="/cadastroFornecedor" class="row g-3 border p-3 rounded shadow-sm">
                  <fieldset>
                      <legend class="text-center">Cadastro de Usuários</legend>
                  </fieldset>

                  <div class="col-md-4">
                      <label class="form-label">CNPJ</label>
                      <input type="text" class="form-control" name="cnpj" value="${cnpj}">
                  `;
          if(!cnpj){
            devolve += `<div>
                          <p>Por favor, informe o CNPJ do fornecedor</p>
                        </div>`;
          }
           devolve += `
           </div>
                  <div class="col-md-4">
                      <label class="form-label">Razão Social</label>
                      <input type="text" class="form-control" name="social" value="${social}">
                  
          `;
          if(!social){
            devolve += `<div>
                          <p>Por favor, informe a Razão Social do fornecedor</p>
                        </div>`;
          }
           devolve += `
                </div>
                  <div class="col-md-4">
                      <label class="form-label">Nome Fantasia</label>
                      <input type="text" class="form-control" name="fantasia" value="${fantasia}">
                  `;

          if(!fantasia){
            devolve += `<div>
                          <p>Por favor, informe o Nome Fantasia do fornecedor</p>
                        </div>`;
          }
           devolve += `
           </div>
                  <div class="col-md-4">
                      <label class="form-label">Endereço</label>
                      <input type="text" class="form-control" name="endereco" value="${endereco}" >
                  `;

          if(!endereco){
            devolve += `<div>
                          <p>Por favor, informe o endereço do fornecedor</p>
                        </div>`;
          }
           devolve += `
            </div>
                  <div class="col-md-6">
                      <label class="form-label">Cidade</label>
                      <input type="text" class="form-control" name="cidade" value="${cidade}">
                  `;
          if(!cidade){
            devolve += `<div>
                          <p>Por favor, informe cidade do fornecedor</p>
                        </div>`;
          }
           devolve += `
           
            </div>
                  <div class="col-md-3">
                      <label class="form-label">UF</label>
                      <select class="form-select" name="estado" value="${estado}">
                          <option value="">Selecione</option>
                          <option>AC</option>
                          <option>AL</option>
                          <option>AP</option>
                          <option>AM</option>
                          <option>BA</option>
                          <option>CE</option>
                          <option>DF</option>
                          <option>ES</option>
                          <option>GO</option>
                          <option>MA</option>
                          <option>MT</option>
                          <option>MS</option>
                          <option>MG</option>
                          <option>PA</option>
                          <option>PB</option>
                          <option>PR</option>
                          <option>PE</option>
                          <option>PI</option>
                          <option>RJ</option>
                          <option>RN</option>
                          <option>RS</option>
                          <option>RO</option>
                          <option>RR</option>
                          <option>SC</option>
                          <option>SP</option>
                          <option>SE</option>
                          <option>TO</option>
                      </select>
                  `;
          if(!estado){
            devolve += `<div>
                          <p>Por favor, informe o estado do fornecedor</p>
                        </div>`;
          }
           devolve += `
            </div>
                  <div class="col-md-3">
                      <label class="form-label">CEP</label>
                      <input type="text" class="form-control" name="cep" value="${cep}">
                  `;
          if(!cep){
            devolve += `<div>
                          <p>Por favor, informe o CEP do fornecedor</p>
                        </div>`;
          }
           devolve += `
            </div>
                  <div class="col-md-3">
                      <label class="form-label">Email</label>
                      <input type="email" class="form-control" name="email" value="${email}">
                  `;
          if(!email){
            devolve += `<div>
                          <p>Por favor, informe o email do fornecedor</p>
                        </div>`;
          }
           devolve += `
            </div>
                  <div class="col-md-4">
                      <label class="form-label">Telefone</label>
                      <input type="text" class="form-control" name="tel" value="${tel}">
                  `;
          if(!tel){
            devolve += `<div>
                          <p>Por favor, informe o telefone do fornecedor</p>
                        </div>`;
          }
           devolve += `
                </div>
                  <div class="col-12">
                      <button class="btn btn-primary" type="submit">Cadastrar Usuário</button>
                      <a class="btn btn-secondary" href="/">Voltar</a>
                  </div>
              </form>
          </div>
      </body>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
    </html>`;

    res.send(devolve)
  }
});

// Rota do list
app.get("/listaUsuarios", (req, res) => {
  let conteudo = `
    <html lang="pt-br">
      <head>
          <meta charset="UTF-8">
          <title>Lista de Usuários</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body> 
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
              <div class="container-fluid">
                  <a class="navbar-brand" href="/">Menu do site</a>
                  <div class="collapse navbar-collapse">
                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                          <li class="nav-item">
                              <a class="nav-link" href="/cadastroFornecedor">Cadastrar Fornecedores</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="/listaUsuarios">Listar Fornecedores</a>
                          </li>`
            if(!logado){
              conteudo += `<li class="nav-item">
                              <a class="nav-link" href="/login" ">Logar</a>
                          </li>`
            }
            else{
              conteudo += `<li class="nav-item">
                              <a class="nav-link" href="/sair" >Sair</a>
                          </li>`
            }
                          
            conteudo += `
                      </ul>
                  </div>
              </div>
          </nav>
          <div class="container w-75 mb-5 mt-5">
              <h2 class="text-center mb-4">Lista de Usuários Cadastrados</h2>
              <table class="table table-striped table-hover">
                  <thead>
                      <tr>
                          <th>CNPJ</th>
                          <th>Razão Social</th>
                          <th>Nome Fantasia</th>
                          <th>Endereço</th>
                          <th>Cidade</th>
                          <th>UF</th>
                          <th>CEP</th>
                          <th>Email</th>
                          <th>Telefone</th>
                      </tr>
                  </thead>
                  <tbody>`;

  for (let usuario of listaUsuarios) {
    conteudo += `
      <tr>
          <td>${usuario.cnpj}</td>
          <td>${usuario.social}</td>
          <td>${usuario.fantasia}</td>
          <td>${usuario.endereco}</td>
          <td>${usuario.cidade}</td>
          <td>${usuario.estado}</td>
          <td>${usuario.cep}</td>
          <td>${usuario.email}</td>
          <td>${usuario.tel}</td>
      </tr>`;
  }

  conteudo += `
                  </tbody>
              </table>
              <a class="btn btn-secondary" href="/cadastroFornecedor">Cadastrar novo usuário</a>
          </div>
      </body>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
    </html>`;

  res.send(conteudo);
});

app.get("/login", (req, res) => {
  let login = `
    <html lang="pt-br">
      <head>
          <meta charset="UTF-8">
          <title>Cadastro de Usuários</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
              <div class="container-fluid">
                  <a class="navbar-brand" href="/">Menu do site</a>
                  <div class="collapse navbar-collapse">
                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                          <li class="nav-item">
                              <a class="nav-link" href="/cadastroFornecedor">Cadastrar Fornecedores</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="/listaUsuarios">Listar Fornecedores</a>
                          </li>`
            if(!logado){
              login += `<li class="nav-item">
                              <a class="nav-link" href="/login" ">Logar</a>
                          </li>`
            }
            else{
              login += `<li class="nav-item">
                              <a class="nav-link" href="/sair" >Sair</a>
                          </li>`
            }
                          
            login += `
                      </ul>
                  </div>
              </div>
          </nav>
          <div class="container w-75 mb-5 mt-5">
              <form method="POST" action="/login" class="row g-3 border p-3 rounded shadow-sm">
                  <fieldset>
                      <legend class="text-center">Cadastro de Usuários</legend>
                  </fieldset>

                  <div class="col-md-4">
                      <label class="form-label">Usuário</label>
                      <input type="text" class="form-control" name="user" >
                  </div>

                  <div class="col-md-4">
                      <label class="form-label">Senha</label>
                      <input type="password" class="form-control" name="senha" >
                  </div>

                  <div class="col-12">
                      <button class="btn btn-primary" type="submit">Entrar</button>
                      <a class="btn btn-secondary" href="/">Voltar</a>
                  </div>
              </form>
          </div>
      </body>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
    </html>
  `;
  
  res.send(login);
});

// Rota do Login
app.post("/login", (req, res) => {
  const { user, senha} = req.body;

  if (user == "admin" && senha == "12345678") { 
    logado = true;
    res.redirect("/");
  } 
  else {
    let erro = `
    <html lang="pt-br">
      <head>
          <meta charset="UTF-8">
          <title>Cadastro de Usuários</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
              <div class="container-fluid">
                  <a class="navbar-brand" href="/">Menu do site</a>
                  <div class="collapse navbar-collapse">
                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                          <li class="nav-item">
                              <a class="nav-link" href="/cadastroFornecedor">Cadastrar Fornecedores</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="/listaUsuarios">Listar Fornecedores</a>
                          </li>`
            if(!logado){
              erro += `<li class="nav-item">
                              <a class="nav-link" href="/login" ">Logar</a>
                          </li>`
            }
            else{
              erro += `<li class="nav-item">
                              <a class="nav-link" href="/sair" >Sair</a>
                          </li>`
            }
                          
            erro += `
                      </ul>
                  </div>
              </div>
          </nav>
          <div class="container w-75 mb-5 mt-5">
              <form method="POST" action="/login" class="row g-3 border p-3 rounded shadow-sm">
                  <fieldset>
                      <legend class="text-center">Cadastro de Usuários</legend>
                  </fieldset>

                  <div class="col-md-4">
                      <label class="form-label">Usuário</label>
                      <input type="text" class="form-control" name="user" >
                  `;

            if(user != "admin"){
              if(!user){
              erro += `<div>
                          <p>Por Favor, insíra o usuário</p>
                        </div>`;
              }
              else{
                erro += `<div>
                          <p>Usuário Incorreto</p>
                        </div>`;
              }
            }

              erro += ` 
                </div>
                  <div class="col-md-4">
                        <label class="form-label">Senha</label>
                        <input type="password" class="form-control" name="senha" >
                    `;

            if(senha != "12345678"){
              erro += `<div>
                          <p>senha Incorreta</p>
                        </div>`;
            }
            if(!senha){
              erro += `<div>
                          <p>Por Favor, insirá senha</p>
                        </div>`;
            }
            erro += `
              </div>
                  <div class="col-12">
                      <button class="btn btn-primary" type="submit">Entrar</button>
                      <a class="btn btn-secondary" href="/">Voltar</a>
                  </div>
              </form>
          </div>
      </body>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
    </html>
  `;

    res.send(erro);
  }
});

//Rota da Saida
app.get("/sair", (req, res) => {
  logado = false;
  res.send(`
    <script>
      alert("Logout efetuado com sucesso!");
      window.location.href = "/";
    </script>
  `);
});

// Inicializa o Servidor
app.listen(port, host, () => {
  console.log(`Servidor Funcionado! Caminho: http://${host}:${port}/`);
});
