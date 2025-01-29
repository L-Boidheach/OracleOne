const totnum = document.getElementById('txtnum');
const tnames = document.getElementById('txtnames');
const res = document.getElementById('res');

function MainBtn() {
    if (!validarEntrada()) return; // Verifica entrada
    const rawNomes = tnames.value.split(',').map(name => name.trim()).filter(name => name !== "");
    
    const duplicatas = removerDuplicatas(rawNomes); // verifica duplicatas
    if (duplicatas.length > 0) {
        window.alert(`O nome ${duplicatas.join(', ')} aparece mais de uma vez na lista.`);
        return;
    }

    const nomes = [...new Set(rawNomes)];
    const qtd = parseInt(totnum.value);

    if (!validarQuantidade(qtd, nomes.length)) return;

    const sorteio = sortearNomes(nomes, qtd); 

    confetti(); //Biblioteca: canvas-confetti (https://github.com/catdad/canvas-confetti)
    atualizarResultado(sorteio); 
}

function validarEntrada() {
    if (tnames.value === "" || totnum.value === "") {
        window.alert("Por favor, preencha todos os campos.");
        return false;
    }
    return true;
}

function removerDuplicatas(rawNomes) {
    const counts = {};
    let duplicatas = [];

    rawNomes.forEach(name => {
        counts[name] = (counts[name] || 0) + 1;
        if (counts[name] === 2) {
            duplicatas.push(name);
        }
    });

    return duplicatas;
}

function validarQuantidade(qtd, nomeCount) {
    if (qtd > nomeCount) {
        window.alert(`A quantidade de nomes sorteados é inválida.`);
        return false;
    } else if (qtd <= 0) {
        window.alert(`A quantidade de nomes sorteados é inválida.`);
        return false;
    } else if (qtd === nomeCount) {
        window.alert(`A quantidade de nomes sorteados é igual ao número de nomes disponível.`);
        return false;
    }
    return true;
}

function sortearNomes(nomes, qtd) {
    const shuffledNames = ShuffleArray(nomes);
    return shuffledNames.slice(0, qtd);
}

function atualizarResultado(sorteio) {
    res.innerHTML = `Os sorteados foram: <br> 
        ${sorteio.map(name => `<span style="color: #4B69FC;">${name}</span>`)}`;
}

function ShuffleArray(Array) {
    for (let i = Array.length - 1; i > 0; i--) {
        const m = Math.floor(Math.random() * (i + 1));
        [Array[i], Array[m]] = [Array[m], Array[i]];
    }
    return Array;
}

function limparLista() {
    tnames.value = "";
    totnum.value = "";
    res.innerHTML = "";
    totnum.focus();
}

tnames.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        MainBtn(); 
    }
});