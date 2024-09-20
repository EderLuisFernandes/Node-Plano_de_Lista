## [x]Criar metas
## [x]Lista metas
 - []Metas realizadas
 - []Metas abetas
## [x] Marca e desmarca  metas
## [x] Remover metas
## [x] Sistema de mensages


## Métodos de array : push, filter, forEach, find: e chamado de HOF[   "HIGHER ORDER FUNCTIONS" ]
# require  
 - eu nescessito d eum modeulo que vem de fora 
 - ele e chamado de comujs
 - ... usando o spreed operaitor ele é usado para  faze rum copia  de tudo que ja exite.. o famosos espalho  jogar todos os items em algo novo. 
  -  vamos aplica ro forEach  para cada resposta ele vai cria um avarial meta e vai buscar co

  resposta.forEach((resposta)=>{
      const meta = metas.find((procurarMeta)=>{
            return procurarMeta.value = resposta
      })
      meta.checked
    })

    -Esse codiog ele vai fazer uma procura na minha lista procurar emta =  a 1 meta se sim vai para checked se for falso ele vai pruicra ate acha o selecionado
