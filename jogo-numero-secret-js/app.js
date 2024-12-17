let litasDenumerosSorteados = [];
let numeroLimite = 10;

//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Adivinhe o número secreto';

// Para evitar a repetição a cima utilizo :

let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
campo.innerHTML = texto;
// para por narração no site. Site ResponsiveVoice para tirar dúvidas
//responsiveVoice.speak(texto,'Brazilian Portuguese Female', {rate :1.2});


// Mas, usando o Responsive voice pode ser que dê o erreo no console. Novo método sem o erro do responsiveVoice : Para resolver esse erro, podemos usar uma outra alternativa de biblioteca, chamada Web Speech API, que tem o mesmo objetivo da ResponsiveVoice.
if ('speechSynthesis' in window) {
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; 
    utterance.rate = 1.2; 
    window.speechSynthesis.speak(utterance); 
} else {
    console.log("Web Speech API não suportada neste navegador.");
}
}
function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}


exibirTextoNaTela();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou');
        
        let palavraTentativa = tentativas > 1? 'Tentativas' : 'tentativa';
        let mensagemTentativas =  `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}! `;
        exibirTextoNaTela('p', mensagemTentativas );

        //Estou usando esse document.getElementById para ativar o botão "Novo jogo/reiniciar", que estava desativado.
        document.getElementById('reiniciar').removeAttribute('disabled');
    }  
     else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número é menor!');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        
        tentativas++;
        limparCampo();
    } 

    
        if(chute < numeroSecreto){
            exibirTextoNaTela('p', 'O número é maior !');
        } }
    

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = litasDenumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        litasDenumerosSorteados = [];
    }

    if(litasDenumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio (); 
    } else{
        litasDenumerosSorteados.push(numeroEscolhido);
        console.log(litasDenumerosSorteados);
        return numeroEscolhido;
    }
}
// Limpar campo de preenchimento automaticamente.
function limparCampo(){
    chute = document.querySelector('input');
    // Sem texto, pq se não vai ter nada, vai limpar o campo, o campo de onde é preenchido o chute, tem que estar vazia.
    chute.value = '';
}
// Função para quando acertar, clicar no "novo jogo" resetar o game.
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    // Mudar o status do "Novo Jogo" para só poder clicar quando acertar. Resumindo, vai ficar desabilitado, e esse comando que tá embaixo dessa anotação é pra fazer com que ele seja habilitado apenas quando a pessoa acertar o número secreto.
    document.getElementById('reiniciar').setAttribute('disabled', true)
}