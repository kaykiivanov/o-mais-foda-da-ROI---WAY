let currentStep = 1;
const totalSteps = 3;
const userData = {
    name: '',
    age: ''
};

function nextStep(step) {
    if (step > currentStep) {
        if (!validateStep(currentStep)) return;
    }

    // Hide current step
    document.getElementById(`step-${currentStep}`).classList.remove('active');

    // Update step
    currentStep = step;

    // Show new step
    document.getElementById(`step-${currentStep}`).classList.add('active');

    // Update progress
    updateProgress();
}

function validateStep(step) {
    if (step === 1) {
        const name = document.getElementById('name').value.trim();
        if (name.length < 3) {
            alert('Por favor, informe seu nome completo.');
            return false;
        }
        userData.name = name;
    } else if (step === 2) {
        const age = document.getElementById('age').value;
        if (!age || age < 18) {
            alert('Você deve ser maior de 18 anos.');
            return false;
        }
        userData.age = age;
    }
    return true;
}

function updateProgress() {
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('step-text');

    const percentage = (currentStep / totalSteps) * 100;
    fill.style.width = `${percentage}%`;

    if (currentStep <= totalSteps) {
        text.innerText = `Passo ${currentStep} de ${totalSteps}`;
    }

    if (currentStep === 3) {
        setupWhatsAppButton();
    }
}

async function setupWhatsAppButton() {
    const btn = document.getElementById('whatsapp-btn');
    const phoneNumber = '5511999999999'; // Substitua pelo número real
    const message = `Olá! Meu nome é ${userData.name}, tenho ${userData.age} anos e gostaria de mais informações.`;
    const encodedMessage = encodeURIComponent(message);

    // Salvar no Supabase
    try {
        const { error } = await window.supabase
            .from('leads')
            .insert([
                { name: userData.name, age: parseInt(userData.age), created_at: new Date() }
            ]);

        if (error) console.error('Erro ao salvar no Supabase:', error);
        else console.log('Dados salvos com sucesso!');
    } catch (err) {
        console.error('Erro inesperado:', err);
    }

    btn.onclick = () => {
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };
}
