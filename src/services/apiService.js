//conexção com a api-extenso e evento de button/validação
export function sendRequest() {
    const valorInput = document.getElementById('valor');
    const extendoInput = document.getElementById('quantidadePorExtenso');

    const valorinput = async () => {
        const valor = valorInput.value;

        //primeira letra maiuscula
        const capitalizeFirstLetter = string => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        //validação se o campo estiver vazio
        if (valor.trim() === '') {
            extendoInput.value = '';
            return;
        }

        try {
            const response = await fetch(`https://api-extenso.vercel.app/converter/${valor}`);
            const data = await response.json();

            extendoInput.value = capitalizeFirstLetter(data.extenso);
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };
    valorInput.addEventListener('keydown', async event => {
        if (event.key === 'Enter' || event.key === 'enter') {
            event.preventDefault();
            await valorinput();
        }
    });

    valorInput.addEventListener('blur', async event => {
        await valorinput();
    });
}
