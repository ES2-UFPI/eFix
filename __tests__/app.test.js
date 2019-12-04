import api from '../src/services/API';


it('Update Serviço', async (done) => {

  var json = {
    categoria: "Encanador",
    descricao: "Troco canos",
    id_prestador: "9e73686573656ae66d7a99e3fbbb2912802a3ff0da9d856f75bb8e31c73219ec",
    id_servico: "e81daf8fbc2af021a87a9340c33572aa7def531a6d330ecb66c2bd42a0d89cf1",
    nome: "Troca de Canos",
    preco: "130"
  }

  var x = null;

  try{
    const response = await api.updateService(json);
    x = response;
  }
  catch(response){
      console.log("Error: " + x.status);
  }

  expect(x.status).toBe(406);
  done();
});

it('Create service with wrong id_prestador', async (done) => {

  var json = {
    categoria: "Encanador",
    descricao: "Troco canos",
    id_prestador: "1233686573656ae66d7a99e3fbbb2912802a3ff0da9d856f75bb8e31c73219ec",
    id_servico: "e81adf8fbc2af021a87a9340c33572aa7def531a6d330ecb66c2bd42a0d89cf1",
    nome: "Troca de Canos",
    preco: "130"
  }

  var x = null;

  try{
    const response = await api.updateService(json);
    x = response;
  }
  catch(response){
      console.log("Error: " + x.status);
  }

  expect(x.status).toBe(406);
  done();
});
