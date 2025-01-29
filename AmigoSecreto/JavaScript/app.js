const totnum = document.getElementById('txtnum');
const tnames = document.getElementById('txtnames');
const res = document.getElementById('res');

function MainBtn() {
    if (tnames.value === "" || totnum.value === "") {
        window.alert("Por favor, preencha todos os campos.");
        return; 
    }

    const rawNomes = tnames.value.split(',').map(name => name.trim()).filter(name => name !== "");

    const counts = {};
    let duplicatas = [];

    rawNomes.forEach(name => {
        counts[name] = (counts[name] || 0) + 1;
        if (counts[name] === 2) { 
            duplicatas.push(name);
        }
    });

    if (duplicatas.length > 0) {
        window.alert(`O nome ${duplicatas.join(', ')} aparece mais de uma vez na lista.`);
        return;
    }

    const nomes = [...new Set(rawNomes)];
    const qtd = parseInt(totnum.value);

    if (qtd > nomes.length) {
        window.alert(`A quantidade de nomes sorteados é inválida.`);
        return;
    } else if (qtd <= 0) {
        window.alert(`A quantidade de nomes sorteados é inválida.`);
        return;
    } else if (qtd === nomes.length) {
        window.alert(`A quantidade de nomes sorteados é igual ao número de nomes disponível.`);
        return;
    }

    const shuffledNames = ShuffleArray(nomes);
    const sorteio = shuffledNames.slice(0, qtd);
    res.innerHTML = `Os sorteados foram: <br> ${sorteio.join('<br>')}`;
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
