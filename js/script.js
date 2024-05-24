document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('#development-area a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const page = this.getAttribute('data-page');
            cargarContenido(page);
        });
    });

    const form = document.getElementById('form-form');
    const skillsSelect = document.getElementById('skills');
    const addSkillButton = document.getElementById('add-skill');
    const removeSkillButton = document.getElementById('remove-skill'); 
    const selectedSkillsContainer = document.getElementById('selected-skills');
    const skillsInput = document.getElementById('skills-input');
    const fileInput = document.getElementById('inputFile');

    let selectedSkills = [];

    addSkillButton.addEventListener('click', () => {
        const selectedSkill = skillsSelect.value;

        if (selectedSkills.length < 3 && !selectedSkills.includes(selectedSkill)) {
            selectedSkills.push(selectedSkill);
            updateSelectedSkillsDisplay();
        }
    });
    
    removeSkillButton.addEventListener('click', () => {
        const selectedSkillToRemove = skillsSelect.value;
        const indexToRemove = selectedSkills.indexOf(selectedSkillToRemove);
        
        if (indexToRemove !== -1) {
            selectedSkills.splice(indexToRemove, 1);
            updateSelectedSkillsDisplay();
        }
    });

    form.addEventListener('submit', event => {
        event.preventDefault();

        if (!validarNombre() && !validarTelefono() && !validarProfession()) {
            return; 
        }

        const fullName = form['full-name'].value;
        const profession = form['profession'].value;
        const phone = form['telefono'].value;
        const email = form['email'].value;
        const linkedin = form['linkedin'].value;
        var imagen = document.getElementById('imagen').files[0];

        skillsInput.value = selectedSkills.join(', ');

        const reader = new FileReader();
        reader.onload = function(e) {
            const imagenBase64 = e.target.result;
            const newWindow = window.open('', '_blank');
            newWindow.document.write(`
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Tarjeta de Postulación</title>
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                            background-color: #f4f4f9;
                        }
                        .card-preview {
                            max-width: 400px;
                            width: 100%;
                            background-color: #fff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        .card-preview img {
                            max-width: 100%;
                            height: auto;
                        }
                        .card-preview p {
                            margin: 5px 0;
                        }
                        .card-preview h3 {
                            margin-top: 0;
                            color: #333;
                        }
                        footer {
                            background-color: #333;
                            color: #fff;
                            text-align: center;
                            padding: 5px 0;
                            font-size: 0.7em;
                            position: fixed;
                            bottom: 0;
                            width: 100%;
                        }
                    </style>
                </head>
                <body>
                    <div class="card-preview">
                        <img src="${imagenBase64}" alt="Imagen">
                        <h3>${fullName}</h3>
                        <p><strong>Profesión:</strong> ${profession}</p>
                        <p><strong>Teléfono:</strong> ${phone}</p>
                        <p><strong>Correo Electrónico:</strong> ${email}</p>
                        <p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>
                        <p><strong>Habilidades:</strong> ${selectedSkills.join(', ')}</p>
                    </div>
                    <footer>
                        <p>&copy; 2024 Desarrolladora de Software</p>
                    </footer>
                </body>
                </html>
            `);
        };

        reader.readAsDataURL(imagen);
    });

    function updateSelectedSkillsDisplay() {
        selectedSkillsContainer.innerHTML = '';
        selectedSkills.forEach(skill => {
            const skillSpan = document.createElement('span');
            skillSpan.textContent = skill;
            selectedSkillsContainer.appendChild(skillSpan);
        });
    }

    function validarNombre() {
        const nombreCompletoInput = document.getElementById("full-name");
        const nombreCompleto = nombreCompletoInput.value;
        const regex = /^[a-zA-Z\s]+$/;
        const nameError = document.getElementById("name-error");

        if (!regex.test(nombreCompleto)) {
            nameError.style.display = "block";
            nombreCompletoInput.classList.add("is-invalid");
            return false;
        } else {
            nameError.style.display = "none";
            nombreCompletoInput.classList.remove("is-invalid");
        }

        return true;
    }

    function validarTelefono() {
        const telefonoInput = document.getElementById("telefono");
        const telefono = telefonoInput.value;
        const regexTelefono = /^[0-9]+$/;
        const phoneError = document.getElementById("phone-error");
    
        if (!regexTelefono.test(telefono)) {
            phoneError.style.display = "block";
            telefonoInput.classList.add("is-invalid");
            return false;
        } else {
            phoneError.style.display = "none";
            telefonoInput.classList.remove("is-invalid");
        }
        return true;
    };

    function validarProfession() {
        const professionInput = document.getElementById("profession");
        const profession = professionInput.value;
        const regexProfession = /^[a-zA-Z\s]+$/;
        const professionError = document.getElementById("profession-error");
    
        if (!regexProfession.test(profession)) {
            professionError.style.display = "block";
            professionInput.classList.add("is-invalid");
            return false;
        } else {
            professionError.style.display = "none";
            professionInput.classList.remove("is-invalid");
        }
        return true;
    };

});

function cargarContenido(page) {
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.querySelector('#content-area').innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching page:', error);
        });
}
