// Load JSON data and display content dynamically
document.addEventListener("DOMContentLoaded", () => {
    fetch('cultures.json')
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('content');

            // Create sections for each culture
            Object.keys(data).forEach(culture => {
                const section = document.createElement('section');
                section.innerHTML = `
                    <h2>${culture} Culture</h2>
                    <p>${data[culture].description || data[culture].history}</p>
                    <h3>Notable Figures:</h3>
                    <ul>
                        ${(data[culture].notableFigures || []).map(figure => `<li>${figure}</li>`).join('')}
                    </ul>
                    <h3>Attractions/Events:</h3>
                    <ul>
                        ${(data[culture].attractions || data[culture].events || []).map(event => `<li>${event}</li>`).join('')}
                    </ul>
                `;
                contentDiv.appendChild(section);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});

// Responsive navigation toggle
const navToggle = document.querySelector('nav ul');
if (window.innerWidth < 768) {
    navToggle.style.display = 'none';
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Menu';
    toggleButton.style.marginBottom = '10px';
    document.querySelector('header').appendChild(toggleButton);

    toggleButton.addEventListener('click', () => {
        navToggle.style.display = navToggle.style.display === 'none' ? 'block' : 'none';
    });
}
