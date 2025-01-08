fetch('data/cultures.json')
  .then(response => response.json())
  .then(cultures => {
    const contentDiv = document.getElementById('content');

    cultures.forEach(culture => {
      const cultureDiv = document.createElement('div');
      cultureDiv.innerHTML = `
        <h2>${culture.name}</h2>
        <p>${culture.description}</p>
        <h3>Images</h3>
        <div class="image-gallery">
        ${culture.images.map(image => `<img src="${image.url}" alt="${image.alt}">`).join('')}
        </div>
        <h3>Audio</h3>
        <div class="audio-clips">
        ${culture.audio.map(audio => `<audio controls src="${audio.url}"></audio><p>${audio.title}</p>`).join('')}
        </div>
        <h3>Customs</h3>
        <ul>
          ${culture.customs.map(custom => `<li><h3>${custom.name}</h3><p>${custom.description}</p></li>`).join('')}
        </ul>
      `;
      contentDiv.appendChild(cultureDiv);
    });
  });
