 
    function lockedProfile() {
 
        const mainElement = document.querySelector('#main');
     
        let url = 'http://localhost:3030/jsonstore/advanced/profiles'
     
        fetch(url)
            .then(response => response.json())
            .then(data => {
     
                mainElement.innerHTML = ''
                Object.values(data).forEach(el => createProfile(el))
            })
     
     
        function createProfile(data) {
     
     
            const profileDiv = createEl('div', { class: 'profile' });
     
            const img = createEl('img', { src: './iconProfile2.png', class: 'userIcon' });
            profileDiv.appendChild(img);
     
            profileDiv.appendChild(createEl('label', {}, 'Lock'));
            const inputLock = createEl('input', {
                type: 'radio',
                name: `user${data._id}Locked`,
                value: 'lock',
                checked: true
            });
            profileDiv.appendChild(inputLock);
     
            profileDiv.appendChild(createEl('label', {}, 'Unlock'));
            const inputUnlock = createEl('input', {
                type: 'radio',
                name: `user1Locked`,
                value: 'unlock'
            });
            profileDiv.appendChild(inputUnlock);
     
            profileDiv.appendChild(document.createElement('br'));
            profileDiv.appendChild(document.createElement('hr'));
     
            profileDiv.appendChild(createEl('label', {}, 'Username'));
            profileDiv.appendChild(createEl('input', {
                type: 'text',
                name: `user1Username`,
                value: data.username,
                disabled: true,
                readOnly: true
            }));
     
     
            const userHiddenFieldsDiv = createEl('div', { id: `user1HiddenFields`, style: 'display: none' });
            userHiddenFieldsDiv.appendChild(document.createElement('hr'));
     
            userHiddenFieldsDiv.appendChild(createEl('label', {}, 'Email:'));
            userHiddenFieldsDiv.appendChild(createEl('input', {
                type: 'email',
                name: `user1Email`,
                value: data.email,
                disabled: true,
                readOnly: true
            }));
     
     
            userHiddenFieldsDiv.appendChild(createEl('label', {}, 'Age:'));
            userHiddenFieldsDiv.appendChild(createEl('input', {
                type: 'number',
                name: `user1Age`,
                value: data.age,
                disabled: true,
                readOnly: true
            }));
     
            profileDiv.appendChild(userHiddenFieldsDiv);
     
            const showMoreBtn = createEl('button', {}, 'Show more');
            showMoreBtn.addEventListener('click', () => {
                if (inputUnlock.checked) {
                    if (userHiddenFieldsDiv.style.display === 'none') {
                        userHiddenFieldsDiv.style.display = 'block';
                        showMoreBtn.textContent = 'Hide it';
                    } else {
                        userHiddenFieldsDiv.style.display = 'none';
                        showMoreBtn.textContent = 'Show more';
                    }
                }
            });
            profileDiv.appendChild(showMoreBtn);
     
            mainElement.appendChild(profileDiv);
        }
     
        function createEl(tag, attributes = {}, text = '') {
            const element = document.createElement(tag);
     
            for (const [key, value] of Object.entries(attributes)) {
                element.setAttribute(key, value);
            }
     
            if (text) {
                element.textContent = text;
            }
     
            return element;
        }
    }