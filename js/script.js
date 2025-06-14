//Conexeao com o Banco de dados Supabase
const supabaseUrl = 'https://tmmartjzmaqfwhjvkzsq.supabase.co';
const supabasekey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbWFydGp6bWFxZndoanZrenNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NzIxOTgsImV4cCI6MjA2NTM0ODE5OH0.7Iziq0Gktqum3_biWstQATLTTV8l6xscjiKx-ZMv9hg'
const { createClient } = supabase; 
const supabaseInstance = createClient(supabaseUrl, supabasekey);


//Mapeamento dos botões e containers
const buttom_submit = document.getElementById("submit");
const buttom_seachALL = document.getElementById("searchAll");
const containerDados = document.getElementById("verbListContainer");

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
    containerDados.innerHTML = '';// limpar conteudo anterios
    if (verb.trim() === ''){
        alert('Please enter a verb to search.');
    }
}

//função para exbibir os dados encontrados no banco de dados
async function displayVerbs(verbs) {
    containerDados.innerHTML = ''; // Limpa o conteúdo anterior
    if (verbs.length === 0) {
        containerDados.innerHTML = '<p>Nenhum verbo encontrado.</p>';
        return;
    }
    let htmlContent = '<ul>';
    verbs.forEach(verbs => {
        htmlContent += `<br><p>${verbs.verbs} &#11166; ${verbs.irregular_verbs} <br> ${verbs.phrase}</p>`;
    });
    htmlContent += '</ul>';
    containerDados.innerHTML = htmlContent; // Atualiza o conteúdo do container
    console.log("Verbos exibidos:", verbs);
    if (verbs.length > 0) {
        alert(`Foram encontrados ${verbs.length} verbos.`);
    } else {
        alert('Nenhum verbo encontrado.');
    }
}


buttom_seachALL.addEventListener('click', searchAllVerbs);
buttom_submit.addEventListener('click', seachEspecificVerb);