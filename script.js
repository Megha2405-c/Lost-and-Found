// REPORT ITEM
const form = document.getElementById("itemForm");

if (form) {

    form.addEventListener("submit", async function(event) {

        event.preventDefault();

        const item = {
            type: document.getElementById("type").value,
            itemName: document.getElementById("itemName").value,
            category: document.getElementById("category").value,
            description: document.getElementById("description").value,
            location: document.getElementById("location").value,
            date: document.getElementById("date").value,
            contact: document.getElementById("contact").value
        };

        try {

            const response = await fetch("/add-item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            });

            const result = await response.json();

            document.getElementById("message").innerText =
                result.message;

            form.reset();

        } catch (error) {

            console.log(error);

            document.getElementById("message").innerText =
                "Something went wrong. Please try again.";
        }

    });

}


// SEARCH ITEMS
async function searchItems() {

    try {

        const response = await fetch("/items");

        const items = await response.json();

        const searchText =
            document.getElementById("searchBox").value.toLowerCase();

        const filteredItems = items.filter(function(item) {

            return (
                item.itemName.toLowerCase().includes(searchText) ||
                item.category.toLowerCase().includes(searchText) ||
                item.location.toLowerCase().includes(searchText)
            );

        });

        displayItems(filteredItems);

    } catch (error) {

        console.log(error);

    }

}


// DISPLAY ITEMS
function displayItems(items) {

    const container = document.getElementById("items");

    container.innerHTML = "";

    if (items.length === 0) {

        container.innerHTML =
            "<p>No items found.</p>";

        return;
    }

    items.forEach(function(item) {

        const card = document.createElement("div");

        card.innerHTML = `
            <hr>

            <h3>${item.itemName}</h3>

            <p>
                <strong>Type:</strong>
                ${item.type}
            </p>

            <p>
                <strong>Category:</strong>
                ${item.category}
            </p>

            <p>
                <strong>Description:</strong>
                ${item.description}
            </p>

            <p>
                <strong>Location:</strong>
                ${item.location}
            </p>

            <p>
                <strong>Date:</strong>
                ${item.date}
            </p>

            <p>
                <strong>Status:</strong>
                ${item.status}
            </p>
        `;

        container.appendChild(card);

    });

}