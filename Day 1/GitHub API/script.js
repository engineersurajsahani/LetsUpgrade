function handleSubmit() {
    const userInput = document.getElementById('userInput').value.trim();
    const result = document.getElementById('result');
    const API_URL = `https://api.github.com/users/${userInput}`;

    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error("User not found");
            return response.json();
        })
        .then((data) => {
            result.classList.remove('hidden');
            result.innerHTML = `
                <img src="${data.avatar_url}" alt="${data.name}">
                <h2>${data.name || 'No Name Provided'}</h2>
                <p><strong>Username:</strong> ${data.login}</p>
                <p><strong>Location:</strong> ${data.location || 'Not available'}</p>
                <p><strong>Bio:</strong> ${data.bio || 'Not available'}</p>
                <p><strong>Blog:</strong> <a href="${data.blog}" target="_blank">${data.blog || 'Not available'}</a></p>
                <p><strong>Company:</strong> ${data.company || 'Not available'}</p>
                <p><strong>Followers:</strong> ${data.followers}</p>
                <p><strong>Following:</strong> ${data.following}</p>
                <p><strong>Public Repos:</strong> ${data.public_repos}</p>
                <p><strong>GitHub Profile:</strong> <a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
            `;
        })
        .catch(error => {
            result.classList.remove('hidden');
            result.innerHTML = `<p style="color: red; text-align: center;">${error.message}</p>`;
        });
}
