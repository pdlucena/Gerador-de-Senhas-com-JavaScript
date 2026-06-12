// Variáveis para acessar os elementos do DOM
const inputEl = document.querySelector("#password");
const upperCaseCheckEl = document.querySelector("#uppercase-checkbox");
const numberCheckEl = document.querySelector("#numbers-checkbox");
const symbolCheckEl = document.querySelector("#symbols-checkbox");
const securityIndicatorBar = document.querySelector("#security-indicator-bar");

// Variável global para armazenar o comprimento da senha
let passwordLength = 16;

function generatePassword(){
    let chars = "abcdefghijklmnopqrstuvwxyz";

    // Definindo os diferentes tipos de caracteres que podem ser usados
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+";

    // Se o usuário marcou "Maiúsculas", adicionamos ao pool de caracteres
    if(upperCaseCheckEl.checked){
        chars += upperCaseChars;
    }

    // Se o usuário marcou "Números", adicionamos ao pool de caracteres
    if(numberCheckEl.checked){
        chars += numberChars;
    }

    // Se o usuário marcou "Símbolos", adicionamos ao pool de caracteres
    if(symbolCheckEl.checked){
        chars += symbolChars;
    }

    // Inicializamos uma string vazia para construir a senha
    let password = "";

    for(let i = 0; i < passwordLength; i++){
        // Geramos um número aleatório entre 0 e o tamanho do pool de caracteres
        const randomNumber = Math.floor(Math.random() * chars.length);
        
        // Pegamos o caractere na posição randomNumber e o adicionamos à senha
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    
    // Atribuímos a senha gerada ao campo de input para o usuário ver
    inputEl.value = password;

    // Recalculamos a força da senha e o tamanho da fonte
    calculateQuality();
    calculateFontSize();
}

function calculateQuality(){
    const percent = Math.round(
        (passwordLength / 64) * 35 + 
            (upperCaseCheckEl.checked ? 15 : 0) + 
                (numberCheckEl.checked ? 25 : 0) + 
                    (symbolCheckEl.checked ? 30 : 0));

    // Limitamos o percentual a 100% para a barra não ultrapassar o container
    const limitedPercent = Math.min(percent, 100);
    securityIndicatorBar.style.width = limitedPercent + "%";

    // Lógica de cores baseada na força da senha:
    // - > 69%: SEGURA (verde)
    // - > 50%: AVISO (amarelo)
    // - ≤ 50%: CRÍTICA (vermelho)
    
    // Removemos as classes anteriores antes de adicionar a nova
    if(percent > 69){
        securityIndicatorBar.classList.remove("warning");
        securityIndicatorBar.classList.remove("critical");
        securityIndicatorBar.classList.add("safe");
    }
    else if(percent > 50){
        securityIndicatorBar.classList.remove("safe");
        securityIndicatorBar.classList.remove("critical");
        securityIndicatorBar.classList.add("warning");
    }
    else{
        securityIndicatorBar.classList.remove("safe");
        securityIndicatorBar.classList.remove("warning");
        securityIndicatorBar.classList.add("critical");
    }

    // Se a senha atingiu 100% de força, adicionamos a classe "completed"
    if(limitedPercent >= 100){
        securityIndicatorBar.classList.add("completed");
    }
    else{
        securityIndicatorBar.classList.remove("completed");
    }
}

// Esta função redimensiona o texto da senha conforme seu comprimento aumenta
function calculateFontSize(){
    // Se a senha tem mais de 45 caracteres, usamos a fonte ainda menor
    if(passwordLength > 45){
        inputEl.classList.remove("font-sm");
        inputEl.classList.remove("font-xs");
        inputEl.classList.add("font-xxs");
    }
    // Se a senha tem mais de 32 caracteres, usamos uma fonte extra pequena
    else if(passwordLength > 32){
        inputEl.classList.remove("font-sm");
        inputEl.classList.add("font-xs");
        inputEl.classList.remove("font-xxs");
    }
    // Se a senha tem mais de 22 caracteres, usamos uma fonte pequena
    else if(passwordLength > 22){
        inputEl.classList.add("font-sm");
        inputEl.classList.remove("font-xs");
        inputEl.classList.remove("font-xxs");
    }
    // Se a senha tem 22 caracteres ou menos, usamos o tamanho padrão
    else{
        inputEl.classList.remove("font-sm");
        inputEl.classList.remove("font-xs");
        inputEl.classList.remove("font-xxs");
    }
}

// Esta função copia a senha para a área de transferência do usuário
function copy() {
    navigator.clipboard.writeText(inputEl.value).then(() => {
        copyBtn.textContent = "Copiado!";
        setTimeout(() => copyBtn.textContent = "Copiar Senha", 2000);
    });
}

// Capturamos o slider de tamanho de senha
const passwordLengthEl = document.querySelector("#password-length");

// Este listener detecta quando o usuário move o slider de tamanho
passwordLengthEl.addEventListener("input", function(){
    passwordLength = parseInt(passwordLengthEl.value);
    
    // Atualizamos o texto que mostra o tamanho atual
    document.querySelector("#password-length-text").innerText = passwordLength;
    
    // Geramos uma nova senha com o novo tamanho
    generatePassword();
});

// Quando o usuário marca/desmarca um checkbox, geramos uma nova senha
upperCaseCheckEl.addEventListener("click", generatePassword);
numberCheckEl.addEventListener("click", generatePassword);
symbolCheckEl.addEventListener("click", generatePassword);

// Botão que copia a senha 
document.querySelector("#copy-2").addEventListener("click", copy);

// Quando clica em renovar (reset), geramos uma nova senha
document.querySelector("#renew").addEventListener("click", generatePassword);

// Geramos uma senha inicial quando a página é carregada
generatePassword();