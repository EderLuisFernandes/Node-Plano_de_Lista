const { select, input, checkbox} = require('@inquirer/prompts')
const { promises } = require('dns')
const fs  = require("fs").promises

mensagem = "Bem Vindo A suas metas!!"

let metas = []

const carregarMetas = async()=>{
    try{
        const dados = await fs.readFile('Metas.json','utf-8')
        metas = JSON.parse(dados)
    }
    catch(error){
        metas =[]
    }
    
}

const salvarMetas = async ()=>{
    await fs.writeFile('Metas.json',JSON.stringify(metas,null ,2))
}
 async function  CadastrarMetas() {
   const meta = await input({message: "Digite a meta"})

   if(meta.length == 0){
    mensagem ="Não pode ter meta vazia!"
    return
   }

 
   metas.push({value:meta, checked: false})
   mensagem = "Metas cadastradas com Sucesso"
}

async function ListaMetas() {
    const resposta = await checkbox({
        message: `Use a seta para  mudar as metas,
o espaço para marca ou desmarca e o Enter para Finalizar a etapa`,
        choices: [...metas],
        instructions: false,

        
    })

    metas.forEach((m)=>{
        m.checked = false
    })


    if(resposta.length == 0 ){
        mensagem =" Nunhma  meta selecionada"
        return
    }
    
    resposta.forEach((resposta)=>{
      const meta = metas.find((procurarMeta)=>{
            return procurarMeta.value == resposta
      })
      meta.checked = true
    })

    mensagem ="Metas Marcada e concluidas"
}

const MetasRealizado = async ()=>{
 const Realizados =  metas.filter((meta)=>{
    return meta.checked
 })
  if(Realizados.length == 0 ){
    mensagem ="Nenhuma meta Realizada 😑"
    return
  }
  await select({
    message:"Metas Realizadas 😁",
    choices:[...Realizados]
  })

}
async function MetasAberta() {
    const abertas =  metas.filter((meta)=>{
        return meta.checked == false
    })
    if(abertas.length == 0 ){
        mensagem ="Nenhuma meta em aberto"
        return
    }
    await select({
        message:"Metas Abertas 🥱",
        choices:[...abertas]
    })
    
}

const DeletarMetas = async ()=>{
   const metasDesmarcadas = metas.map((meta)=>{
        return {value:meta.value, checked: false,disabled: false}
   })

   const itemsDeletados = await checkbox({
    message:"Selecione para Deletar",
    choices:[...metasDesmarcadas],
    instructions: false,
   })


if (itemsDeletados.length === 0) {
     mensagem ='Nenhum item deletado 🤐';
    return;
}
  
   itemsDeletados.forEach((items)=>{
       metas = metas.filter((meta)=>{
            return meta.value != items
        })
   })
   mensagem = "Metas deletada com sucesso"
 
}

const Mensagen = ()=>{
    console.clear()
    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}
const start = async ()=>{
    await carregarMetas()
  while(true){ 
    Mensagen()
    await salvarMetas()
     let opcao = await select({
        message: 'Menu >',
        choices: [{
            name:"Cadastrar metas",
            value:"Cadastrar"
        },
        {
            name:"Lista metas",
            value:"Lista"
        },
        {
            name:"Metas Realizadas",
            value:"Realizado"
        },
        {
            name:"Metas Abertas",
            value:"Metas_Abertas"
        },
        {
            name:"Deletar Metas",
            value:"Deletar_Metas"
        },

        {
            name: "Sair",
            value: "Sair"
        }
    
    ]
    })
    
        switch(opcao){
           case "Cadastrar":
           await CadastrarMetas()
           break
           
           case "Lista":
            await ListaMetas()
            break
           case "Realizado":
            await MetasRealizado()
            break
           
           case "Metas_Abertas":
            await MetasAberta()
            break
           
           case "Deletar_Metas":
            await DeletarMetas()
            break
            

           case "Sair":
            console.log('Até a Proxima')
           return

        }
    }
}

start()