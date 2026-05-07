const p = document.getElementById("parrafo");

const card = document.querySelector("#demo-dom");
const strong = card.querySelector("strong");

const btn = document.getElementById("btnCambiar")
btn.addEventListener("click", () => {
    p.textContent = "El texto ha sido transformado";
});

const link = document.getElementById("linkTailwind");
link.addEventListener("click", (event) => {
    event.preventDefault();
    alert("No puedes ir a Tailwind CSS");
});

const form = document.getElementById("formTodo");
const input = document.getElementById("inputTodo");
const lista = document.getElementById("lista");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valor = input.value.trim()
    if (!valor) return;
    const li = document.createElement("li");
    li.innerHTML = `${valor} <button class="cursor-pointer p-4 tet-lg" data-accion="done">✅</button> <button class="cursor-pointer" data-accion="borrar">🗑️</button>`;
    lista.appendChild(li);
    form.reset()
    input.focus();
});

lista.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return
    const li = btn.closest("li")
    const accion = btn.dataset.accion;
    if (accion === "done") {li.classList.add("text-green-400")}
    if (accion === "borrar") {li.remove()}
});