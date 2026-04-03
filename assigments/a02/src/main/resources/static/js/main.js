// Gerenciamento de Estado
let products = [];
let orders = [];

// Configuração da API
const API_BASE = '/api';

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    refreshData();
    setupForms();
});

async function refreshData() {
    await fetchProducts();
    await fetchOrders();
}

// Navegação entre Seções
async function showSection(sectionId) {
    if (sectionId === 'new-order' || sectionId === 'products') {
        await fetchProducts(); // Garante dados frescos antes de mudar de seção
    }

    document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));
    document.getElementById(`section-${sectionId}`).classList.remove('hidden');
    
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${sectionId}`).classList.add('active');
}

// Busca de Dados (API)
async function fetchProducts() {
    try {
        const res = await fetch(`${API_BASE}/produtos`);
        products = await res.json();
        renderProducts();
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
    }
}

async function fetchOrders() {
    try {
        const res = await fetch(`${API_BASE}/pedidos`);
        orders = await res.json();
        renderOrders();
    } catch (err) {
        console.error('Erro ao buscar pedidos:', err);
    }
}

// Renderização de Interface
function renderProducts() {
    const list = document.getElementById('products-list');
    list.innerHTML = products.map(p => {
        const tipoTraduzido = p.tipo === 'eletronico' ? 'Eletrônico' : (p.tipo === 'perecivel' ? 'Perecível' : 'Geral');
        return `
            <tr>
                <td style="font-weight: 700; color: #818cf8;">#${p.id}</td>
                <td><span class="badge ${p.tipo}">${tipoTraduzido}</span></td>
                <td><div style="font-weight: 600;">${p.nome}</div></td>
                <td style="font-family: monospace; font-size: 1.1rem;">R$ ${p.preco.toFixed(2)}</td>
                <td><span style="background: rgba(255,255,255,0.05); padding: 0.2rem 0.5rem; border-radius: 4px;">${p.estoque} un</span></td>
                <td style="color: var(--text-muted); font-size: 0.85rem;">${renderSpecifics(p)}</td>
                <td>
                    <div class="actions-cell">
                        <button class="btn-icon edit" onclick="editProduct(${p.id})">Editar</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function renderSpecifics(p) {
    if (p.tipo === 'eletronico') return `⚡ Voltagem: ${p.voltagem}`;
    if (p.tipo === 'perecivel') return `📅 Validade: ${p.dataValidade}`;
    return '-';
}

function renderOrders() {
    const list = document.getElementById('orders-list');
    list.innerHTML = orders.map(o => `
        <tr>
            <td style="font-weight: 700;">PED-${o.id}</td>
            <td>${new Date(o.data).toLocaleString('pt-BR')}</td>
            <td style="color: var(--text-muted);">${o.itens.length} itens registrados</td>
            <td style="font-size: 1.15rem; font-weight: 800; color: var(--secondary);">R$ ${o.valorTotal.toFixed(2)}</td>
        </tr>
    `).join('');
}

// Edição de Produto
function editProduct(id) {
    const p = products.find(p => p.id === id);
    if (!p) return;

    document.getElementById('modal-title').innerText = 'Editar Produto';
    document.getElementById('prod-id').value = p.id;
    document.getElementById('prod-name').value = p.nome;
    document.getElementById('prod-price').value = p.preco;
    document.getElementById('prod-stock').value = p.estoque;
    document.getElementById('prod-type').value = p.tipo;
    
    toggleProductFields();

    if (p.tipo === 'eletronico') document.getElementById('prod-voltage').value = p.voltagem;
    if (p.tipo === 'perecivel') document.getElementById('prod-expiry').value = p.dataValidade;

    openModal('product-modal');
}

function openNewProductModal() {
    document.getElementById('modal-title').innerText = 'Cadastrar Novo Produto';
    document.getElementById('product-form').reset();
    document.getElementById('prod-id').value = '';
    toggleProductFields();
    openModal('product-modal');
}

// Logica de Formulários
function setupForms() {
    document.getElementById('product-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const type = document.getElementById('prod-type').value;
        const id = document.getElementById('prod-id').value;
        const payload = {
            tipo: type,
            nome: document.getElementById('prod-name').value,
            preco: parseFloat(document.getElementById('prod-price').value),
            estoque: parseInt(document.getElementById('prod-stock').value)
        };

        if (id) payload.id = parseInt(id);
        if (type === 'eletronico') payload.voltagem = document.getElementById('prod-voltage').value;
        if (type === 'perecivel') payload.dataValidade = document.getElementById('prod-expiry').value;

        try {
            const res = await fetch(`${API_BASE}/produtos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                closeModal('product-modal');
                await fetchProducts();
                e.target.reset();
            }
        } catch (err) {
            console.error('Erro ao salvar produto:', err);
        }
    });
}

function toggleProductFields() {
    const type = document.getElementById('prod-type').value;
    document.getElementById('extra-fields-eletronico').classList.add('hidden');
    document.getElementById('extra-fields-perecivel').classList.add('hidden');

    if (type === 'eletronico') document.getElementById('extra-fields-eletronico').classList.remove('hidden');
    if (type === 'perecivel') document.getElementById('extra-fields-perecivel').classList.remove('hidden');
}

// Controle de Modais
function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

// Lógica de Criação de Pedido
async function addOrderItemRow() {
    // Forçar atualização da lista de produtos antes de abrir a linha, se necessário
    if (products.length === 0) await fetchProducts();

    const container = document.getElementById('current-order-items');
    const rowId = Date.now();
    
    const row = document.createElement('div');
    row.className = 'order-item-row';
    row.id = `row-${rowId}`;
    row.innerHTML = `
        <select class="order-item-prod" onchange="updateRowMax(this); calculateOrderTotal()">
            <option value="">Selecione um Produto...</option>
            ${products.map(p => {
                const available = p.estoque > 0 ? `Disponível: ${p.estoque}` : 'SEM ESTOQUE';
                const disabled = p.estoque <= 0 ? 'disabled' : '';
                return `<option value="${p.id}" data-price="${p.preco}" data-stock="${p.estoque}" ${disabled}>
                    ${p.nome} (R$ ${p.preco.toFixed(2)}) — ${available}
                </option>`;
            }).join('')}
        </select>
        <input type="number" class="order-item-qty" value="1" min="1" onchange="validateQty(this); calculateOrderTotal()">
        <button class="btn-text" onclick="removeOrderItemRow('${rowId}')" style="color: var(--accent);">Remover</button>
    `;
    container.appendChild(row);
}

function updateRowMax(select) {
    const qtyInput = select.parentElement.querySelector('.order-item-qty');
    const selectedOption = select.options[select.selectedIndex];
    const stock = selectedOption.dataset.stock;
    if (stock) {
        qtyInput.max = stock;
        if (parseInt(qtyInput.value) > parseInt(stock)) {
            qtyInput.value = stock;
        }
    }
}

function validateQty(input) {
    const max = parseInt(input.max);
    if (max && parseInt(input.value) > max) {
        alert(`Quantidade máxima disponível: ${max}`);
        input.value = max;
    }
}

function removeOrderItemRow(id) {
    const el = document.getElementById(`row-${id}`);
    if (el) el.remove();
    calculateOrderTotal();
}

function calculateOrderTotal() {
    let total = 0;
    const rows = document.querySelectorAll('.order-item-row:not(.header)');
    rows.forEach(row => {
        const select = row.querySelector('.order-item-prod');
        const qty = row.querySelector('.order-item-qty').value;
        const price = select.options[select.selectedIndex]?.dataset.price;
        if (price) {
            total += parseFloat(price) * parseInt(qty);
        }
    });
    document.getElementById('pending-order-total').innerText = `R$ ${total.toFixed(2)}`;
}

async function submitOrder() {
    const rows = document.querySelectorAll('.order-item-row:not(.header)');
    const items = [];
    
    rows.forEach((row, index) => {
        const select = row.querySelector('.order-item-prod');
        const qty = parseInt(row.querySelector('.order-item-qty').value);
        const prodId = select.value;
        const price = parseFloat(select.options[select.selectedIndex]?.dataset.price);

        if (prodId) {
            const productData = products.find(p => p.id === parseInt(prodId));
            items.push({
                codigoItem: `ITM-${Date.now()}-${index}`,
                qtde: qty,
                valorItem: price * qty,
                produto: { 
                    id: parseInt(prodId),
                    tipo: productData ? productData.tipo : 'common'
                }
            });
        }
    });

    if (items.length === 0) return alert('Adicione pelo menos um item ao carrinho.');

    try {
        const res = await fetch(`${API_BASE}/pedidos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itens: items })
        });
        if (res.ok) {
            alert('Venda registrada e sincronizada com sucesso!');
            document.getElementById('current-order-items').innerHTML = '';
            calculateOrderTotal();
            await fetchOrders();
            showSection('orders');
        }
    } catch (err) {
        console.error('Erro ao enviar pedido:', err);
        alert('Erro ao processar venda no servidor.');
    }
}
