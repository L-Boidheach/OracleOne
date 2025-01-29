const totnum = document.getElementById('txtnum');
const tnames = document.getElementById('txtnames');
const res = document.getElementById('res');

function MainBtn(){
    const nomes = tnames.value.split(',').map(name => name.trim()).filter(name => name !== "");
    const qtd = parseInt(totnum.value);

    if (qtd > nomes.length){
        window.alert(`A quantidade de nomes sorteados é invalida.`);
        return
    } else if (qtd <= 0){
        window.alert(`A quantidade de nomes sorteados é invalida.`);
        return
    } else if (qtd === nomes.length) {
        window.alert(`A quantidade de nomes sorteados é igual o número de nomes disponível.`);
        return
    }

    const sorteio = []
    while (sorteio.length < qtd){
        const ComputerChoice = Math.floor(Math.random() * nomes.length);
        const vencedor = nomes[ComputerChoice];
        if (!sorteio.includes(vencedor)){
            sorteio.push(vencedor);
        }
    }
    res.innerHTML = `os sorteados foram <br> ${sorteio.join('<br>')}`;
}