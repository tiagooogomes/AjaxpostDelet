let sobreOquePesquisar = "";
            let reciboSetTimeout = 0;
            const imputText = document.getElementById("campo");
            const button = document.getElementById("button");
            const delet = document.getElementById("delet")


            function definirplaceholder() {
                const selecionar = document.getElementById("selecao");
                const opcaoSelecionada = selecionar.options[selecionar.selectedIndex].value;
                
                if(opcaoSelecionada === "id"){
                    imputText.placeholder = "INFORME O ID";
                    sobreOquePesquisar = "pesquisaID";
                    imputText.disabled = false;

                } else if (opcaoSelecionada === "nome"){
                    imputText.placeholder = "INFORME O NOME";
                    sobreOquePesquisar = "pesquisaNome";
                    imputText.disabled = false;

                } else if (opcaoSelecionada === "email"){
                    imputText.placeholder = "INFORME O EMAIL";
                    sobreOquePesquisar = "pesquisaEmail"; 
                    imputText.disabled = false;
                
                } else {
                    imputText.placeholder = "SELECIONE UM FILTRO";
                };
            };

            imputText.addEventListener("input", function() {
                const oQueFoiPesquisado = imputText.value;
                const respostas = document.getElementById("respostas");
                const colocarNaTabela = document.getElementById("tabela");
                
                clearTimeout(reciboSetTimeout);

                reciboSetTimeout = setTimeout(function(){

                    if(oQueFoiPesquisado.length > 3){      

                        fetch("http://localhost:4000/consultar?" + sobreOquePesquisar + "=" + oQueFoiPesquisado)
                            .then(function(resposta){
                                const teste = resposta.json();
                                return teste
                            })
                            .then(function(users){
                                colocarNaTabela.innerHTML = ""; 
                                respostas.innerHTML = users.length;

                                users.forEach((produto) => {

                                    const linha = document.createElement("tr");
                                    const imprimirID = document.createElement("th");
                                    const imprimirNome = document.createElement("th");
                                    const imprimirEmail = document.createElement("th");
                                    
                                    imprimirID.appendChild(document.createTextNode(produto.id));
                                    imprimirNome.appendChild(document.createTextNode(produto.nome));
                                    imprimirEmail.appendChild(document.createTextNode(produto.email));

                                    linha.appendChild(imprimirID);
                                    linha.appendChild(imprimirNome);
                                    linha.appendChild(imprimirEmail);
                                
                                    colocarNaTabela.appendChild(linha);
                                });
                            });
                    }else {
                        colocarNaTabela.innerHTML = ""; 
                    };       
                }, 2000);    
            });
        

            button.addEventListener("click", function() {
                const id = Number(document.getElementById("id").value);
                const nome = document.getElementById("nome").value;
                const email = document.getElementById("email").value;
                const teste = document.getElementById("id");

                fetch("http://localhost:4000/adicionar?", {        
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "id": id,
                        "nome": nome,
                        "email": email
                    })
                })

                .then(function(resposta){
                    const teste = resposta.json();
                    return teste
                })

                .then(function(users){
                    console.log(users);
                    teste.innerHTML = "";
                });

            });

            delet.addEventListener('click', function() {

                const i = document.getElementById("numero").value;

                fetch("http://localhost:4000/remover/" + i, {
                    method: 'DELETE'
                })

                .then(function(resposta){
                    const teste = resposta.json();
                    return teste
                })

                .then(function(users){
                    console.log(users);
                });

                
            });
        