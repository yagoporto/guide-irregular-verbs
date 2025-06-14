//Conexeao com o Banco de dados Supabase
const supabaseUrl = 'https://tmmartjzmaqfwhjvkzsq.supabase.co';
const supabasekey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbWFydGp6bWFxZndoanZrenNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NzIxOTgsImV4cCI6MjA2NTM0ODE5OH0.7Iziq0Gktqum3_biWstQATLTTV8l6xscjiKx-ZMv9hg'
const { createClient } = supabase; 
const supabaseInstance = createClient(supabaseUrl, supabasekey);


//Mapeamento dos botões e containers
document.addEventListener('DOMContentLoaded', () => {
    const buttom_submit = document.getElementById("submit");
    console.log("Mapeamento buttom_submit:", buttom_submit); // Adicione estes logs para depurar
    const buttom_seachALL = document.getElementById("searchAll");
    console.log("Mapeamento buttom_seachALL:", buttom_seachALL); // Adicione estes logs para depurar
    const container_dados = document.getElementById("verbListContainer");
    console.log("Mapeamento container_dados:", container_dados); // Adicione estes logs para depurar
    const search_form = document.getElementById("searchForm");
    console.log("Mapeamento search_form:", search_form); // Adicione estes logs para depurar


    //função para buscar todos os verbos do banco de dados
    async function searchAllVerbs(){
        let verb = document.getElementById("verb").value;
        const {data: verbs, error} = await supabaseInstance
            .from('verbs')
            .select('*')

        if (error) {
            console.error('Erro ao buscar verbos:', error.message);
            alert('Ocorreu um erro ao buscar os verbos. Por favor, tente novamente mais tarde.');
            return; // Sai da função se houver um erro
        }
        console.log("Verbos encontrados:", verbs);

        displayVerbs(verbs); // Chama a função para exibir os verbos encontrados
    }

    async function seachEspecificVerb(){
        container_dados.innerHTML = '';// limpar conteudo anterios

        let verb = document.getElementById("verb").value;
        verb = verb.toLowerCase(); // Converte o verbo para minúsculas para a busca
        console.log(verb);
        //verifica se o campo de verbos esta vazio e retorno um alerta
        if (verb.trim() === ''){
            alert('Please enter a verb to search.');
            return; // Sai da função se o campo estiver vazio
        }

        const {data: verbs, error} = await supabaseInstance
            .from('verbs')
            .select('*')
            .eq('verbs', verb); // Busca por verbos que contenham a string digitada

            if (error) {
                console.error('Error searching for verbs:', error.message);
                alert('An error occurred while fetching verbs. Please try again later.');
                return; // Sai da função se houver um erro
            }

            console.log("Found verbs:", verbs);

            displayVerbs(verbs);
    }

    //função para exbibir os dados encontrados no banco de dados
    async function displayVerbs(verbs) {
        container_dados.innerHTML = ''; // Limpa o conteúdo anterior
        if (verbs.length === 0) {
            container_dados.innerHTML = '<p>No verb found.</p>';
            return;
        }
        let htmlContent = '<ul class="w3-ul">';
        verbs.forEach(verbs => {
            htmlContent += `<br><li  style="font-size: 20px;" >${verbs.verbs} | ${verbs.irregular_verbs} <br> ${verbs.phrase}</li>`;
        });
        htmlContent += '</ul>';
        container_dados.innerHTML = htmlContent; // Atualiza o conteúdo do container
        console.log("Verbos exibidos:", verbs);
    }


    buttom_seachALL.addEventListener('click', searchAllVerbs);
    search_form.addEventListener('submit', (event) => {
        event.preventDefault(); // IMPEDE O RECARREGAMENTO DA PÁGINA
        seachEspecificVerb(); // Chama a função de busca específica
    });

});