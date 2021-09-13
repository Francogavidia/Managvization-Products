$(function(){

    $('#getProducts').on('click', function(){
         $.ajax({
             url: '/products',
             success: function(rows){
                let tbody = $('tbody');
                tbody.html('');
                rows.forEach(row => {
                    tbody.append(`
                        <tr>
                            <td class="id">${row.id}</td>
                            <td>
                                <input type="text" class="name" value="${row.name}" />
                            </td>
                            <td>
                            <input type="text" class="description" value="${row.description}" />
                            </td>
                            <td>
                            <input type="text" class="category" list="categ" value="${row.category}" />
                            <datalist id="categ">
                                <option>comida</option>
                                <option>electrodomestico</option>
                                <option>farmacia</option>
                                <option>ferreteria</option>
                                <option>ropa</option>
                            </datalist>  
                            </td>
                            <td>
                            <input type="number" class="price" value="${row.price}" />
                            </td>
                            <td>
                                <button class="update-button">Update</button>
                                <button class="delete-button">Delete</button>
                            </td>
                        </tr>
                   `)
                })
             }
         })
    });

    $('#formProducts').on('submit', function(i){
        i.preventDefault();
        let formNames = $('#formNames');
        let formDescriptions = $('#formDescriptions');
        let formCategorys = $('#formCategorys');
        let formPrices = $('#formPrices');

        $.ajax({
            type: 'POST', 
            url: '/products/add', 
            data: {
                names: formNames.val(),
                descriptions: formDescriptions.val(),
                categorys: formCategorys.val(),
                prices: formPrices.val()
            },
            success: function(response){
                console.log(response),
                $('#getProducts').click();
            }
        })
   });

    $('table').on('click', '.update-button', function(){
        let row = $(this).closest('tr'); 
        let id = row.find('.id').text();
        let name = row.find('.name').val();
        let description = row.find('.description').val();
        let category = row.find('.category').val();
        let price = row.find('.price').val();

            $.ajax({
                url: "/products/update/" + id,
                method: "PUT",
                data: {
                    name: name,
                    description: description,
                    category: category,
                    price: price
                },
                success: function(response){
                    console.log(response);
                    $('#getProducts').click();
                }
            })
        
    })

    $('table').on('click', '.delete-button', function(){
        let row = $(this).closest('tr'); 
        let id = row.find('.id').text();

            $.ajax({
                url: "/products/delete/" + id,
                method: "DELETE",
                success: function(response){
                    console.log(response);
                    $('#getProducts').click();
                }
            })
        
    })
})





                
               

