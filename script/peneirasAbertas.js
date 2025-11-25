var peneiras = [
            { id: 1, name: 'Peneira Futebol - São Paulo Futebol Club', category: 'futebol', price: 150, image: '⚽', description: 'Categorias sub-15 e sub-17', location: 'São Paulo - SP', date: '15/12/2025', vacancies: 30 },
            { id: 2, name: 'Peneira Futebol Feminino - Sport Club Corinthians Paulista', category: 'futebol', price: 100, image: '⚽', description: 'Todas as categorias femininas', location: 'São Paulo - SP', date: '20/12/2025', vacancies: 25 },
            { id: 3, name: 'Peneira Basquete - Franca Basquete', category: 'basquete', price: 120, image: '🏀', description: 'Sub-16 e sub-18', location: 'Franca - SP', date: '18/12/2025', vacancies: 20 },
            { id: 4, name: 'Peneira Vôlei - Minas Tenis Club', category: 'volei', price: 130, image: '🏐', description: 'Iniciantes e intermediários', location: 'Belo Horizonte - MG', date: '22/12/2025', vacancies: 18 },
            { id: 5, name: 'Peneira Handebol - Esporte Clube Pinheiros', category: 'handebol', price: 110, image: '🤾', description: 'Sub-14 a sub-17', location: 'São Paulo - SP', date: '28/12/2025', vacancies: 22 },
            { id: 6, name: 'Peneira Futsal - JEC Futsal - Joinville', category: 'futsal', price: 180, image: '⚽', description: 'Sub-13 com estrutura profissional', location: 'Joinville - SC', date: '10/01/2026', vacancies: 35 },
            { id: 7, name: 'Peneira Futsal - Magnus Futsal', category: 'futsal', price: 90, image: '⚽', description: 'Todas as idades', location: 'Sorocaba - SP', date: '05/01/2026', vacancies: 28 },
            { id: 8, name: 'Peneira Basquete Feminino - SESI Araraquara', category: 'basquete', price: 140, image: '🏀', description: 'Sub-15 e sub-17 feminino', location: 'Araraquara - SP', date: '12/01/2026', vacancies: 16 },
            { id: 9, name: 'Peneira Futebol - Palmeiras Futebol Club', category: 'futebol', price: 200, image: '⚽', description: 'Alto rendimento sub-20', location: 'São Paulo - SP', date: '25/01/2026', vacancies: 40 },
            { id: 10, name: 'Peneira Vôlei - Goias Esporte Clube', category: 'volei', price: 80, image: '🏐', description: 'Alto rendimento sub-20', location: 'Goiania - GO', date: '15/01/2026', vacancies: 12 }
        ];

        var sportFilter = document.getElementById('filter-sport');
        var priceFilter = document.getElementById('filter-price');
        var grid = document.getElementById('peneiras-grid');
        var resultCount = document.getElementById('result-count');

        function createCard(p) {
            var card = document.createElement('div');
            card.className = 'peneira-card';
            
            var cardImage = document.createElement('div');
            cardImage.className = 'card-image';
            cardImage.textContent = p.image;
            
            var cardContent = document.createElement('div');
            cardContent.className = 'card-content';
            
            var title = document.createElement('h3');
            title.className = 'card-title';
            title.textContent = p.name;
            
            var desc = document.createElement('p');
            desc.className = 'card-description';
            desc.textContent = p.description;
            
            var info = document.createElement('div');
            info.className = 'card-info';
            
            var loc = document.createElement('div');
            loc.className = 'info-item';
            loc.textContent = '📍 ' + p.location;
            
            var date = document.createElement('div');
            date.className = 'info-item';
            date.textContent = '📅 ' + p.date;
            
            var vac = document.createElement('div');
            vac.className = 'info-item';
            vac.textContent = '👥 ' + p.vacancies + ' vagas';
            
            info.appendChild(loc);
            info.appendChild(date);
            info.appendChild(vac);
            
            var footer = document.createElement('div');
            footer.className = 'card-footer';
            
            var price = document.createElement('span');
            price.className = 'card-price';
            price.textContent = 'R$ ' + p.price.toFixed(2);
            
            var btn = document.createElement('button');
            btn.className = 'card-button';
            btn.textContent = 'Inscrever-se';
            
            footer.appendChild(price);
            footer.appendChild(btn);
            
            cardContent.appendChild(title);
            cardContent.appendChild(desc);
            cardContent.appendChild(info);
            cardContent.appendChild(footer);
            
            card.appendChild(cardImage);
            card.appendChild(cardContent);
            
            return card;
        }

        function filterPeneiras() {
            var sport = sportFilter.value;
            var price = priceFilter.value;

            var filtered = [];
            for (var i = 0; i < peneiras.length; i++) {
                var peneira = peneiras[i];
                var sportMatch = sport === 'todos' || peneira.category === sport;
                
                var priceMatch = true;
                if (price !== 'todos') {
                    if (price === '0-100') priceMatch = peneira.price <= 100;
                    else if (price === '100-150') priceMatch = peneira.price > 100 && peneira.price <= 150;
                    else if (price === '150-200') priceMatch = peneira.price > 150 && peneira.price <= 200;
                    else if (price === '200+') priceMatch = peneira.price > 200;
                }

                if (sportMatch && priceMatch) {
                    filtered.push(peneira);
                }
            }

            renderPeneiras(filtered);
            resultCount.textContent = filtered.length;
        }

        function renderPeneiras(data) {
            grid.innerHTML = '';
            
            if (data.length === 0) {
                var empty = document.createElement('div');
                empty.className = 'empty-state';
                empty.innerHTML = '<div class="empty-state-icon">🔍</div><h3>Nenhuma peneira encontrada</h3><p>Tente ajustar os filtros para ver mais opções</p>';
                grid.appendChild(empty);
                return;
            }

            for (var i = 0; i < data.length; i++) {
                grid.appendChild(createCard(data[i]));
            }
        }

        sportFilter.addEventListener('change', filterPeneiras);
        priceFilter.addEventListener('change', filterPeneiras);

        renderPeneiras(peneiras);