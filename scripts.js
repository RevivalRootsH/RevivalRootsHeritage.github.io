document.addEventListener("DOMContentLoaded", () => {
    // Load JSON data dynamically
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

    // Slideshow initialization
    let slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls
    function changeSlide(n) {
        showSlides(slideIndex += n);
    }

    // Thumbnail dot controls
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let slides = document.querySelectorAll(".slide");
        let dots = document.querySelectorAll(".dot");

        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }

        slides.forEach(slide => slide.style.display = "none");
        dots.forEach(dot => dot.className = dot.className.replace(" active", ""));

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    // Auto-play functionality
    setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
});
