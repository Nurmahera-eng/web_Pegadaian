// Array untuk menyimpan barang inventaris
let inventory = [];

// Muat data inventaris yang disimpan dari LocalStorage
window.onload = function() {
    if (localStorage.getItem("inventoryData")) {
        inventory = JSON.parse(localStorage.getItem("inventoryData"));
        displayInventory();
    }      
};

// Fungsi untuk menambahkan item baru ke dalam inventaris
document.getElementById("addItem").addEventListener("click", function() {
    const name = document.getElementById("name").value.trim().toLowerCase();
    const type = document.getElementById("type").value.trim().toLowerCase();
    const brand = document.getElementById("brand").value.trim().toLowerCase();
    const quantity = parseInt(document.getElementById("quantity").value.trim());

    if (name && type && brand && quantity > 0) {
        // Mencari apakah item sudah ada
        const existingItem = inventory.find(item => 
            item.name === name &&
            item.type === type &&
            item.brand === brand
        );

        if (existingItem) {
            // Jika item sudah ada, tambahkan kuantitasnya
            existingItem.quantity += quantity;
        } else {
            // Jika tidak ada, tambahkan item baru
            const newItem = { 
                name: name,
                type: type,
                brand: brand,
                quantity: quantity
            };
            inventory.push(newItem);
        }
        
        localStorage.setItem("inventoryData", JSON.stringify(inventory));
        displayInventory();

        // untuk menghapus kolom masukan
        document.getElementById("name").value = '';
        document.getElementById("type").value = '';
        document.getElementById("brand").value = '';
        document.getElementById("quantity").value = '';
    } else {
        alert("Please fill in all fields correctly");
    }
});
                                   
// Berfungsi untuk menampilkan daftar inventaris
function displayInventory() {
    const tableBody = document.querySelector("#inventoryTable tbody");
    tableBody.innerHTML = "";  
    
    // hapus table
    inventory.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.type}</td>
            <td>${item.brand}</td>
            <td>${item.quantity}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Berfungsi untuk menghapus suatu item dari inventaris
document.getElementById("removeItem").addEventListener("click", function() {
    const name = document.getElementById("removeName").value.trim().toLowerCase();
    const type = document.getElementById("removeType").value.trim().toLowerCase();
    const brand = document.getElementById("removeBrand").value.trim().toLowerCase();
    const quantity = parseInt(document.getElementById("removeQuantity").value.trim());
    

    if (name && type && brand && quantity > 0) {
        const existingItem = inventory.find(item => 
            item.name === name &&
            item.type === type &&
            item.brand === brand
        );

        if (existingItem) {
            if (existingItem.quantity >= quantity) {
                // Kurangi quantity item
                existingItem.quantity -= quantity;

                // Jika quantity item jadi 0, hapus item dari inventory
                if (existingItem.quantity === 0) {
                    const itemIndex = inventory.indexOf(existingItem);
                    inventory.splice(itemIndex, 1);
                }
                
                localStorage.setItem("inventoryData", JSON.stringify(inventory));
                displayInventory();
                alert("Item quantity updated successfully");
            } else {
                alert("Not enough quantity to remove");
            }
        } // dimana kondisi if salah 
        else {
            alert("Item not found");
        }

        // Clear input fields
        document.getElementById("removeName").value = '';
        document.getElementById("removeType").value = '';
        document.getElementById("removeBrand").value = '';
        document.getElementById("removeQuantity").value = '';
    }    // menampilkan pesan kesalahan dengan alert box jika salah satu kolom input tidak diisi dengan benar. 
    else {
        alert("Please fill in all fields to remove an item");
    }
});
