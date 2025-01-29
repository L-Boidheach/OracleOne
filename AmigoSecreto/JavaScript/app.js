const totnum = document.getElementById('txtnum');
const tnames = document.getElementById('txtnames');
const res = document.getElementById('res');
const nameList = document.getElementById('nameList');

function MainBtn() {
    if (!validarEntrada()) return; 
    const rawNomes = tnames.value.split(',').map(name => name.trim()).filter(name => name !== "");
    
    const duplicatas = removerDuplicatas(rawNomes); 
    if (duplicatas.length > 0) {
        window.alert(`O nome ${duplicatas.join(', ')} aparece mais de uma vez na lista.`);
        return;
    }

    const nomes = [...new Set(rawNomes)];
    const qtd = parseInt(totnum.value);

    if (!validarQuantidade(qtd, nomes.length)) return;

    const sorteio = sortearNomes(nomes, qtd); 

    atualizarResultado(sorteio);
    displayNameList(nomes);
    confetti(); //Biblioteca: canvas-confetti (https://github.com/catdad/canvas-confetti)
    
}

function displayNameList(names){
    nameList.innerHTML = ''
    names.forEach(name => {
        const listItem = document.createElement('div');
        listItem.textContent = name;
        const deletebtn = document.createElement('button');
        deletebtn.textContent = 'delete';
        deletebtn.addEventListener('click', () => {
            deleteName(name);
        });

        listItem.appendChild(deletebtn);
        nameList.appendChild(listItem);
    })
}

function deleteName(name){
    const rawNomes = tnames.value.split(',').map(n => n.trim()).filter(n => n !== "");
    const updatedNames = rawNomes.filter(n => n !== name);
    tnames.value = updatedNames.join(', ');
    displayNameList(updatedNames);
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
   const qtd = parseInt(totnum.value);

   if (qtd === 1){
    res.innerHTML = `O sorteado foi: <br> 
        ${sorteio.map(name => `<span style="color: #4B69FC;">${name}</span>`).join('')}`;
   } else {
    res.innerHTML = `Os sorteados foram: <br> 
        ${sorteio.map(name => `<span style="color: #4B69FC;">${name}</span>`).join(', ')}`;
   }
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
    nameList.innerHTML = "";
    totnum.focus();
}

tnames.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        MainBtn(); 
    }
});