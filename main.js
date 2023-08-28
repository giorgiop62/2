const API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-3.5-turbo";
const API_KEY = "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";

const loader = document.querySelector('.loading');
const modal = document.querySelector(".modal");
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');


async function playCharacter(nameCharacter) {
    // 1. Mostrare il loader
    loader.classList.remove("loading-hidden");
    // 2. Chiamare le Api di Open AI
    // const action = "Saluta nel tuo modo più iconico";
    const action = getRandomAction();
    const temperature = 0.7;
    // 3. Recuperare la risposta
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}` 
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [
                {
                    role: "user",
                    content: `Sei ${nameCharacter} e ${action} con un massimo di 100 caratteri senza mai uscire dal tuo personaggio`
                }
            ],
            temperature: temperature
        })
    })
    const data = await response.json();
    console.log(data.choices[0].message.content);
    
    //const message = data.choices[0].message.content;
    modalContent.innerHTML = `
        <h2>${nameCharacter}</h2>
        <p>${message}</p>
        <code>Character: ${nameCharacter}, action: ${action}, temperature: ${temperature}</code>
    `;
    loader.classList.add("loading-hidden");
    modal.classList.remove("modal-hidden");
}

function getRandomAction() {
    const actions = [
        'salutare nel tuo modo più iconico',
        'dare un consiglio di stile in base ai tuoi gusti',
        'raccontare la tua ultima avventura',
        'svelarmi i tuoi sogni',
        'dirmi chi è il tuo migliore amico',
        'scrivere la tua bio di linkedin'
    ];

    const indexRandom = Math.floor(Math.random() * actions.length); 

    return actions[indexRandom];
}


const characters = document.querySelectorAll(".character");

characters.forEach(function(element) {
    element.addEventListener("click", function() {
        playCharacter(element.dataset.character);
    })
})

modalClose.addEventListener("click", function() {
    modal.classList.add("modal-hidden");
});